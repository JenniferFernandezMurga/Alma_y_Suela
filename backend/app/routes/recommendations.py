# from flask import Blueprint, request, jsonify
# from app.models import Shoe
# from app.services.recommendation_engine import calculate_match_score

# recommendations_bp = Blueprint('recommendations', __name__)

# @recommendations_bp.route('/recommend', methods=['POST'])
# def get_recommendations():
#     try:
#         user_data = request.json
#         print(f"🔍 Datos recibidos del frontend: {user_data}")
        
#         # ✅ VALIDACIÓN ACTUALIZADA CON GÉNERO
#         required_fields = ['gender', 'foot_width', 'arch_type', 'weight', 'activity_type']  # ✅ Género agregado
#         if not all(field in user_data for field in required_fields):
#             return jsonify({"error": "Faltan campos requeridos"}), 400
        
#         # ✅ VALIDACIÓN ADICIONAL: Verificar tipos de datos
#         if not isinstance(user_data.get('weight'), (int, float)):
#             print("⚠️  Weight no es número, convirtiendo...")
#             try:
#                 user_data['weight'] = int(user_data['weight'])
#             except (ValueError, TypeError):
#                 user_data['weight'] = 70
        
#         print(f"🔍 Datos validados: {user_data}")
        
#         # Obtener todas las zapatillas de la BD
#         all_shoes = Shoe.query.all()
#         print(f"🔍 Zapatillas en BD: {len(all_shoes)}")
        
#         # Calcular recomendaciones
#         recommendations = []
#         for shoe in all_shoes:
#             score = calculate_match_score(user_data, shoe)
            
#             if score >= 50:
#                 shoe_data = shoe.to_dict()
#                 shoe_data['match_score'] = score
#                 shoe_data['match_percentage'] = f"{score}%"
#                 recommendations.append(shoe_data)
        
#         print(f"✅ Recomendaciones encontradas: {len(recommendations)}")
        
#         recommendations.sort(key=lambda x: x['match_score'], reverse=True)
        
#         return jsonify({
#             "success": True,
#             "recommendations": recommendations[:5],
#             "user_data_received": user_data
#         })
    
#     except Exception as e:
#         print(f"❌ ERROR: {str(e)}")
#         import traceback
#         print(f"❌ TRACEBACK: {traceback.format_exc()}")
#         return jsonify({"error": str(e)}), 500

from flask import Blueprint, request, jsonify, current_app
import traceback
from app.models import Shoe
from app.services.recommendation_engine import recommend_shoes_optimized

recommendations_bp = Blueprint('recommendations', __name__)

# @recommendations_bp.route('/recommend', methods=['POST'])
# def get_recommendations():
#     try:
#         user_data = request.json
#         print(f"🔍 Usuario: {user_data}")
        
#         # ✅ VALIDACIÓN ACTUALIZADA CON GÉNERO
#         required_fields = ['gender', 'foot_width', 'arch_type', 'weight', 'activity_type']
#         if not all(field in user_data for field in required_fields):
#             return jsonify({"error": "Faltan campos requeridos"}), 400
        
#         # ✅ VALIDACIÓN ADICIONAL: Verificar tipos de datos
#         if not isinstance(user_data.get('weight'), (int, float)):
#             print("⚠️  Weight no es número, convirtiendo...")
#             try:
#                 user_data['weight'] = int(user_data['weight'])
#             except (ValueError, TypeError):
#                 user_data['weight'] = 70
        
#         print(f"🔍 Datos validados: {user_data}")
        
#         # Obtener todas las zapatillas de la BD
#         all_shoes = Shoe.query.all()
#         recommendations = []
#         rejected_shoes = []  # ✅ NUEVO: Para debugging
        
#         for shoe in all_shoes:
#             score, veto_reasons = calculate_match_score(user_data, shoe)  # ✅ Ahora retorna tupla
            
#             if score > 0:  # ✅ Solo si NO fue vetada
#                 shoe_data = shoe.to_dict()
#                 shoe_data['match_score'] = score
#                 shoe_data['match_percentage'] = f"{score}%"
#                 recommendations.append(shoe_data)
#             else:
#                 # ✅ Guardar info de zapatillas rechazadas para debugging
#                 rejected_shoes.append({
#                     'shoe': f"{shoe.brand} {shoe.model}",
#                     'gender': getattr(shoe, 'gender', 'unisex'),
#                     'reasons': veto_reasons
#                 })
        
#         print(f"✅ Aprobadas: {len(recommendations)}, Rechazadas: {len(rejected_shoes)}")
        
#         # Debug: mostrar algunas rechazadas
#         for rejected in rejected_shoes[:3]:
#             print(f"❌ Rechazada: {rejected['shoe']} (Género: {rejected['gender']}) - Razones: {rejected['reasons']}")
        
#         recommendations.sort(key=lambda x: x['match_score'], reverse=True)
        
#         return jsonify({
#             "success": True,
#             "recommendations": recommendations[:8],
#             "stats": {
#                 "total_evaluated": len(all_shoes),
#                 "approved": len(recommendations),
#                 "rejected": len(rejected_shoes)
#             }
#         })
    
#     except Exception as e:
#         print(f"❌ ERROR: {str(e)}")
#         import traceback
#         print(f"❌ TRACEBACK: {traceback.format_exc()}")
#         return jsonify({"error": str(e)}), 500
    

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

    