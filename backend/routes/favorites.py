from flask import Blueprint, request, jsonify, current_app
from __init__ import db
from models.user import User
from models.shoe import Shoe
from models.favorite import Favorite
from utils.decorators import token_required

favorites_bp = Blueprint('favorites', __name__)

@favorites_bp.route('/favorites', methods=['GET'])
@token_required
def get_favorites(current_user):
    """Obtener todos los favoritos del usuario"""
    try:
        favorites = Favorite.query.filter_by(user_id=current_user.id).all()
        
        return jsonify({
            'success': True,
            'count': len(favorites),
            'favorites': [fav.to_dict() for fav in favorites]
        }), 200
        
    except Exception as e:
        current_app.logger.error(f"Error obteniendo favoritos: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Error interno del servidor'
        }), 500

@favorites_bp.route('/favorites/<int:shoe_id>', methods=['POST'])
@token_required
def add_favorite(current_user, shoe_id):
    """Añadir zapatilla a favoritos"""
    try:
        # Verificar que la zapatilla existe
        shoe = Shoe.query.get(shoe_id)
        if not shoe:
            return jsonify({
                'success': False,
                'error': 'Zapatilla no encontrada'
            }), 404
        
        # Verificar si ya está en favoritos
        existing = Favorite.query.filter_by(
            user_id=current_user.id,
            shoe_id=shoe_id
        ).first()
        
        if existing:
            return jsonify({
                'success': False,
                'error': 'La zapatilla ya está en favoritos'
            }), 409
        
        # Crear favorito
        favorite = Favorite(
            user_id=current_user.id,
            shoe_id=shoe_id
        )
        
        db.session.add(favorite)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Zapatilla añadida a favoritos',
            'favorite': favorite.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error añadiendo favorito: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Error interno del servidor'
        }), 500

@favorites_bp.route('/favorites/<int:shoe_id>', methods=['DELETE'])
@token_required
def remove_favorite(current_user, shoe_id):
    """Eliminar zapatilla de favoritos"""
    try:
        favorite = Favorite.query.filter_by(
            user_id=current_user.id,
            shoe_id=shoe_id
        ).first()
        
        if not favorite:
            return jsonify({
                'success': False,
                'error': 'La zapatilla no está en favoritos'
            }), 404
        
        db.session.delete(favorite)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Zapatilla eliminada de favoritos'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error eliminando favorito: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Error interno del servidor'
        }), 500

@favorites_bp.route('/favorites/check/<int:shoe_id>', methods=['GET'])
@token_required
def check_favorite(current_user, shoe_id):
    """Verificar si una zapatilla está en favoritos"""
    try:
        favorite = Favorite.query.filter_by(
            user_id=current_user.id,
            shoe_id=shoe_id
        ).first()
        
        return jsonify({
            'success': True,
            'is_favorite': favorite is not None
        }), 200
        
    except Exception as e:
        current_app.logger.error(f"Error verificando favorito: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Error interno del servidor'
        }), 500

@favorites_bp.route('/favorites/clear', methods=['DELETE'])
@token_required
def clear_favorites(current_user):
    """Eliminar todos los favoritos"""
    try:
        Favorite.query.filter_by(user_id=current_user.id).delete()
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Todos los favoritos han sido eliminados'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error eliminando favoritos: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Error interno del servidor'
        }), 500