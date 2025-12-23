from flask import Blueprint, request, jsonify
from app.database import db 
from app.models import User
import jwt
import datetime
from werkzeug.security import check_password_hash
import json

users_bp = Blueprint('users', __name__)

# Clave secreta para JWT
JWT_SECRET = 'tu_clave_secreta_muy_segura_aqui'

def generate_token(user_id):
    """Genera un token JWT para el usuario"""
    payload = {
        'user_id': user_id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm='HS256')

def get_user_from_token():
    """Extrae usuario del token JWT"""
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return None
    
    token = auth_header.split(' ')[1]
    
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        return User.query.get(payload['user_id'])
    except:
        return None

# ========== ENDPOINTS ==========

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
            email=data['email'],
            preferences='{}',  # JSON vacío por defecto
            favorite_shoes='[]',  # Array vacío
            saved_recommendations='[]'  # Array vacío
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
        user = get_user_from_token()
        
        if not user:
            return jsonify({
                "success": False,
                "error": "Token inválido o expirado"
            }), 401
        
        # to_dict() ya parsea los JSONs
        return jsonify({
            "success": True,
            "user": user.to_dict()
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@users_bp.route('/me/update', methods=['PUT'])
def update_user_profile():
    try:
        user = get_user_from_token()
        
        if not user:
            return jsonify({
                "success": False,
                "error": "Token inválido o expirado"
            }), 401
        
        data = request.get_json()
        
        # Actualizar campos
        if 'preferences' in data:
            user.preferences = json.dumps(data['preferences'])
        
        if 'favorite_shoes' in data:
            user.favorite_shoes = json.dumps(data['favorite_shoes'])
        
        if 'saved_recommendations' in data:
            user.saved_recommendations = json.dumps(data['saved_recommendations'])
        
        db.session.commit()
        
        return jsonify({
            "success": True,
            "message": "Perfil actualizado",
            "user": user.to_dict()
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "error": str(e)}), 500

@users_bp.route('/me/favorites', methods=['POST'])
def add_favorite():
    try:
        user = get_user_from_token()
        
        if not user:
            return jsonify({
                "success": False,
                "error": "Token inválido o expirado"
            }), 401
        
        shoe_id = request.json.get('shoe_id')
        
        if not shoe_id:
            return jsonify({
                "success": False,
                "error": "shoe_id es requerido"
            }), 400
        
        # Obtener favoritos actuales
        favorites = json.loads(user.favorite_shoes) if user.favorite_shoes else []
        
        # Añadir si no existe
        if shoe_id not in favorites:
            favorites.append(shoe_id)
            user.favorite_shoes = json.dumps(favorites)
            db.session.commit()
            
            return jsonify({
                "success": True,
                "message": "Añadido a favoritos",
                "favorites": favorites
            })
        else:
            return jsonify({
                "success": True,
                "message": "Ya está en favoritos",
                "favorites": favorites
            })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "error": str(e)}), 500

@users_bp.route('/me/favorites/<int:shoe_id>', methods=['DELETE'])
def remove_favorite(shoe_id):
    try:
        user = get_user_from_token()
        
        if not user:
            return jsonify({
                "success": False,
                "error": "Token inválido o expirado"
            }), 401
        
        favorites = json.loads(user.favorite_shoes) if user.favorite_shoes else []
        
        # Filtrar para quitar el shoe_id
        new_favorites = [fav for fav in favorites if fav != shoe_id]
        
        if len(new_favorites) != len(favorites):  # Se eliminó algo
            user.favorite_shoes = json.dumps(new_favorites)
            db.session.commit()
            
            return jsonify({
                "success": True,
                "message": "Eliminado de favoritos",
                "favorites": new_favorites
            })
        else:
            return jsonify({
                "success": True,
                "message": "No estaba en favoritos",
                "favorites": favorites
            })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "error": str(e)}), 500

# Endpoint para guardar recomendaciones
@users_bp.route('/me/save-recommendation', methods=['POST'])
def save_recommendation():
    try:
        user = get_user_from_token()
        
        if not user:
            return jsonify({
                "success": False,
                "error": "Token inválido o expirado"
            }), 401
        
        recommendation = request.json.get('recommendation')
        
        if not recommendation:
            return jsonify({
                "success": False,
                "error": "recommendation es requerido"
            }), 400
        
        # Obtener recomendaciones guardadas
        saved = json.loads(user.saved_recommendations) if user.saved_recommendations else []
        
        # Añadir nueva recomendación
        saved.append({
            **recommendation,
            'saved_at': datetime.datetime.utcnow().isoformat()
        })
        
        user.saved_recommendations = json.dumps(saved)
        db.session.commit()
        
        return jsonify({
            "success": True,
            "message": "Recomendación guardada",
            "saved_recommendations": saved
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "error": str(e)}), 500