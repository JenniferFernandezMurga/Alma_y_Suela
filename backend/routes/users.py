from flask import Blueprint, request, jsonify, current_app
from __init__ import db, bcrypt
from models.user import User
from utils.decorators import token_required

users_bp = Blueprint('users', __name__)

@users_bp.route('/profile', methods=['GET'])
@token_required
def get_profile(current_user):
    """Obtener perfil del usuario"""
    return jsonify({
        'success': True,
        'user': current_user.to_dict()
    }), 200

@users_bp.route('/profile', methods=['PUT'])
@token_required
def update_profile(current_user):
    """Actualizar perfil de usuario"""
    try:
        data = request.json
        
        # Campos permitidos para actualizar
        allowed_fields = [
            'name', 'bio', 'city', 'birth_date', 'gender',
            'foot_width', 'arch_type', 'weight', 'height', 'foot_size',
            'activity_type', 'running_level', 'target_distance'
        ]
        
        # Actualizar solo los campos permitidos
        for field in allowed_fields:
            if field in data:
                setattr(current_user, field, data[field])
        
        # Manejar imagen de perfil
        if 'profile_image' in data:
            current_user.profile_image = data['profile_image']
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Perfil actualizado correctamente',
            'user': current_user.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error actualizando perfil: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Error interno del servidor'
        }), 500

@users_bp.route('/preferences', methods=['GET'])
@token_required
def get_preferences(current_user):
    """Obtener preferencias de running"""
    return jsonify({
        'success': True,
        'preferences': {
            'foot_width': current_user.foot_width,
            'arch_type': current_user.arch_type,
            'weight': current_user.weight,
            'height': current_user.height,
            'foot_size': current_user.foot_size,
            'activity_type': current_user.activity_type,
            'running_level': current_user.running_level,
            'target_distance': current_user.target_distance
        }
    }), 200

@users_bp.route('/preferences', methods=['PUT'])
@token_required
def update_preferences(current_user):
    """Actualizar preferencias de running"""
    try:
        data = request.json
        
        preference_fields = [
            'foot_width', 'arch_type', 'weight', 'height', 'foot_size',
            'activity_type', 'running_level', 'target_distance'
        ]
        
        for field in preference_fields:
            if field in data:
                setattr(current_user, field, data[field])
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Preferencias actualizadas',
            'preferences': {
                'foot_width': current_user.foot_width,
                'arch_type': current_user.arch_type,
                'weight': current_user.weight,
                'height': current_user.height,
                'foot_size': current_user.foot_size,
                'activity_type': current_user.activity_type,
                'running_level': current_user.running_level,
                'target_distance': current_user.target_distance
            }
        }), 200
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error actualizando preferencias: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Error interno del servidor'
        }), 500

@users_bp.route('/profile/image', methods=['POST'])
@token_required
def upload_profile_image(current_user):
    """Subir imagen de perfil"""
    try:
        if 'image' not in request.files:
            return jsonify({
                'success': False,
                'error': 'No se envió ninguna imagen'
            }), 400
        
        file = request.files['image']
        
        # Validar tipo de archivo
        allowed_extensions = {'png', 'jpg', 'jpeg', 'gif'}
        if not file.filename or '.' not in file.filename:
            return jsonify({
                'success': False,
                'error': 'Formato de archivo no válido'
            }), 400
            
        ext = file.filename.rsplit('.', 1)[1].lower()
        if ext not in allowed_extensions:
            return jsonify({
                'success': False,
                'error': 'Solo se permiten imágenes (png, jpg, jpeg, gif)'
            }), 400
        
        # Aquí procesarías la imagen (guardar en servidor o Cloudinary)
        # Por simplicidad, guardamos la referencia
        filename = f"user_{current_user.id}_{file.filename}"
        file.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
        
        current_user.profile_image = f"/uploads/{filename}"
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Imagen subida correctamente',
            'profile_image': current_user.profile_image
        }), 200
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error subiendo imagen: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Error interno del servidor'
        }), 500

@users_bp.route('/profile/image', methods=['DELETE'])
@token_required
def delete_profile_image(current_user):
    """Eliminar imagen de perfil"""
    try:
        current_user.profile_image = None
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Imagen eliminada correctamente'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error eliminando imagen: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Error interno del servidor'
        }), 500