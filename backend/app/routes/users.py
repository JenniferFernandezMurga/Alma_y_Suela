# routes/auth.py
from flask import Blueprint, request, jsonify
from app import db
from app.models import User
import jwt
import datetime
from werkzeug.security import check_password_hash

users_bp = Blueprint('users', __name__)

# Clave secreta para JWT - cámbiala por una más segura en producción
JWT_SECRET = 'tu_clave_secreta_muy_segura_aqui'

def generate_token(user_id):
    """Genera un token JWT para el usuario"""
    payload = {
        'user_id': user_id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm='HS256')

@users_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        # Validar campos requeridos
        required_fields = ['name', 'email', 'password']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    "success": False,
                    "error": f"El campo {field} es requerido"
                }), 400
        
        # Verificar si el usuario ya existe
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user:
            return jsonify({
                "success": False,
                "error": "Ya existe un usuario con este email"
            }), 400
        
        # Crear nuevo usuario
        new_user = User(
            name=data['name'],
            email=data['email']
        )
        new_user.set_password(data['password'])
        
        db.session.add(new_user)
        db.session.commit()
        
        # Generar token
        token = generate_token(new_user.id)
        
        return jsonify({
            "success": True,
            "message": "Usuario registrado exitosamente",
            "token": token,
            "user": new_user.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@users_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        # Validar campos requeridos
        if not data.get('email') or not data.get('password'):
            return jsonify({
                "success": False,
                "error": "Email y contraseña son requeridos"
            }), 400
        
        # Buscar usuario
        user = User.query.filter_by(email=data['email']).first()
        
        if not user or not user.check_password(data['password']):
            return jsonify({
                "success": False,
                "error": "Credenciales incorrectas"
            }), 401
        
        # Generar token
        token = generate_token(user.id)
        
        return jsonify({
            "success": True,
            "message": "Login exitoso",
            "token": token,
            "user": user.to_dict()
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@users_bp.route('/me', methods=['GET'])
def get_current_user():
    try:
        # Obtener token del header
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({
                "success": False,
                "error": "Token requerido"
            }), 401
        
        token = auth_header.split(' ')[1]
        
        # Decodificar token
        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
            user_id = payload['user_id']
        except jwt.ExpiredSignatureError:
            return jsonify({
                "success": False,
                "error": "Token expirado"
            }), 401
        except jwt.InvalidTokenError:
            return jsonify({
                "success": False,
                "error": "Token inválido"
            }), 401
        
        # Buscar usuario
        user = User.query.get(user_id)
        if not user:
            return jsonify({
                "success": False,
                "error": "Usuario no encontrado"
            }), 404
        
        return jsonify({
            "success": True,
            "user": user.to_dict()
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500