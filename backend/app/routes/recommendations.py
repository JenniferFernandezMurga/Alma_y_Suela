from flask import Blueprint, request, jsonify, current_app
import traceback
from ..models import Shoe
from ..services.recommendation_engine import recommend_shoes_optimized

recommendations_bp = Blueprint('recommendations', __name__)

@recommendations_bp.route('/recommend', methods=['POST'])
def get_recommendations():
    try:
        user_data = request.json
        current_app.logger.info(f"Recommendation request received for user: {user_data}")
        
        # Validación básica
        required_fields = ['gender', 'foot_width', 'arch_type', 'weight', 'activity_type']
        if not all(field in user_data for field in required_fields):
            return jsonify({"error": "Faltan campos requeridos"}), 400
        
        # ✅ USAR EL NUEVO SISTEMA HÍBRIDO
        recommendations = recommend_shoes_optimized(user_data)
        
        return jsonify({
            "success": True,
            "recommendations": recommendations,
            "stats": {
                "total_recommendations": len(recommendations),
                "user_data_received": user_data
            }
        })
    
    except Exception as e:
        current_app.logger.error(f"Error processing recommendation: {str(e)}")
        current_app.logger.error(traceback.format_exc())
        return jsonify({"error": "An internal error occurred during recommendation."}), 500
