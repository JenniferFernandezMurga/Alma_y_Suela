from flask import Blueprint, jsonify, request
from models.shoe import Shoe
from models.affiliate_link import AffiliateLink
from __init__ import db

affiliates_bp = Blueprint('affiliates', __name__)

@affiliates_bp.route('/shoe/<int:shoe_id>/prices', methods=['GET'])
def get_shoe_prices(shoe_id):
    """Obtener todos los precios de afiliados para una zapatilla"""
    try:
        # Verificar que la zapatilla existe
        shoe = Shoe.query.get(shoe_id)
        if not shoe:
            return jsonify({
                'success': False,
                'error': 'Zapatilla no encontrada'
            }), 404

        # Obtener enlaces de afiliados
        links = AffiliateLink.query.filter_by(shoe_id=shoe_id).all()

        # Ordenar por precio (más barato primero)
        links.sort(key=lambda x: x.price)

        return jsonify({
            'success': True,
            'shoe_id': shoe_id,
            'shoe_name': f"{shoe.brand} {shoe.model}",
            'links': [link.to_dict() for link in links]
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@affiliates_bp.route('/shoe/<int:shoe_id>/best-price', methods=['GET'])
def get_best_price(shoe_id):
    """Obtener el mejor precio para una zapatilla"""
    try:
        best_link = AffiliateLink.query.filter_by(shoe_id=shoe_id)\
            .order_by(AffiliateLink.price).first()

        if best_link:
            return jsonify({
                'success': True,
                'link': best_link.to_dict()
            })
        else:
            return jsonify({
                'success': False,
                'error': 'No hay precios disponibles'
            }), 404

    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@affiliates_bp.route('/affiliates/stats', methods=['GET'])
def get_affiliate_stats():
    """Obtener estadísticas de afiliados (para panel de admin)"""
    try:
        total_links = AffiliateLink.query.count()
        shoes_with_links = db.session.query(AffiliateLink.shoe_id).distinct().count()

        # Agrupar por partner
        partner_stats = db.session.query(
            AffiliateLink.partner_name,
            db.func.count(AffiliateLink.id)
        ).group_by(AffiliateLink.partner_name).all()

        return jsonify({
            'success': True,
            'stats': {
                'total_links': total_links,
                'shoes_with_links': shoes_with_links,
                'by_partner': {name: count for name, count in partner_stats}
            }
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500