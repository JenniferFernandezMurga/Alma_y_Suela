from functools import wraps
from flask import jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from models.user import User

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        try:
            verify_jwt_in_request()
            user_id = get_jwt_identity()
            current_user = User.query.get(user_id)

            if not current_user:
                return jsonify({'error': 'Usuario no encontrado'}), 401

            if not current_user.is_active:
                return jsonify({'error': 'Usuario inactivo'}), 401

        except Exception as e:
            return jsonify({'error': 'Token inválido o expirado'}), 401

        return f(current_user, *args, **kwargs)
    return decorated

def admin_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        try:
            verify_jwt_in_request()
            user_id = get_jwt_identity()
            current_user = User.query.get(user_id)

            if not current_user or not current_user.is_admin:
                return jsonify({'error': 'Acceso no autorizado'}), 403

        except Exception as e:
            return jsonify({'error': 'Token inválido o expirado'}), 401

        return f(current_user, *args, **kwargs)
    return decorated