from flask import Blueprint, jsonify, request
from models import Shoe
from __init__ import db

shoes_bp = Blueprint('shoes', __name__)

@shoes_bp.route('/shoes', methods=['GET'])
def get_all_shoes():
    """
    Devuelve TODAS las zapatillas de la base de datos real
    """
    try:
        # Obtener todas las zapatillas de la BD
        shoes = Shoe.query.all()
        
        # Convertir a JSON
        shoes_data = [shoe.to_dict() for shoe in shoes]
        
        return jsonify({
            "success": True,
            "count": len(shoes_data),
            "shoes": shoes_data
        })
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500
    
# @shoes_bp.route('/shoes/search', methods=['GET'])
# def search_shoes():
#     """
#     Busca zapatillas por término de búsqueda y categoría
#     """
#     try:
#         query = request.args.get('q', '', type=str)
#         category = request.args.get('category', 'todo', type=str)
        
#         print(f"🔍 Búsqueda: query='{query}', category='{category}'")
        
#         base_query = Shoe.query
        
#         if query:
#             search_term = f'%{query}%'
            
#             if category == 'marca':
#                 shoes = base_query.filter(Shoe.brand.ilike(search_term))
#             elif category == 'tipo':
#                 shoes = base_query.filter(Shoe.category.ilike(search_term))
#             elif category == 'sexo':
#                 # Si tienes campo gender, úsalo aquí
#                 shoes = base_query.filter(Shoe.gender.ilike(search_term))
#             else:  # búsqueda general
#                 shoes = base_query.filter(
#                     db.or_(
#                         Shoe.brand.ilike(search_term),
#                         Shoe.model.ilike(search_term),
#                         Shoe.category.ilike(search_term)
#                     )
#                 )
#         else:
#             shoes = base_query.all()
        
#         shoes_data = [shoe.to_dict() for shoe in shoes]
        
#         return jsonify({
#             "success": True,
#             "count": len(shoes_data),
#             "shoes": shoes_data
#         })
    
#     except Exception as e:
#         print(f"❌ Error: {str(e)}")
#         return jsonify({
#             "success": False,
#             "error": str(e)
#         }), 500
    

@shoes_bp.route('/shoes/search', methods=['GET'])
def search_shoes():
    """
    Busca zapatillas con múltiples filtros acumulables
    """
    try:
        # Obtener todos los parámetros de búsqueda
        query = request.args.get('q', '', type=str)
        marca = request.args.get('marca', '', type=str)
        activity = request.args.get('activity', '', type=str)
        precio_min = request.args.get('precio_min', 0, type=int)
        precio_max = request.args.get('precio_max', 1000, type=int)
        
        print(f"🔍 Búsqueda avanzada - Query: '{query}', Marca: '{marca}', Actividad: '{activity}', Precio: {precio_min}-{precio_max}")
        
        # Construir query base
        base_query = Shoe.query
        
        # APLICAR TODOS LOS FILTROS (acumulativos)
        
        # 1. Filtro por término de búsqueda (si existe)
        if query:
            search_term = f'%{query}%'
            base_query = base_query.filter(
                db.or_(
                    Shoe.brand.ilike(search_term),
                    Shoe.model.ilike(search_term),
                    Shoe.category.ilike(search_term)
                )
            )
        
        # 2. Filtro por marca (si se seleccionó)
        if marca:
            base_query = base_query.filter(Shoe.brand.ilike(f'%{marca}%'))
        
        # 3. Filtro por actividad (si se seleccionó)
        if activity:
            base_query = base_query.filter(Shoe.best_for_activity == activity)
        
        # 4. Filtro por precio (si no es el rango por defecto)
        if precio_min > 0 or precio_max < 1000:
            base_query = base_query.filter(Shoe.price.between(precio_min, precio_max))
        
        # Ejecutar query con todos los filtros aplicados
        shoes = base_query.all()
        
        print(f"✅ Resultados encontrados: {len(shoes)}")
        
        shoes_data = [shoe.to_dict() for shoe in shoes]
        
        return jsonify({
            "success": True,
            "count": len(shoes_data),
            "shoes": shoes_data
        })
    
    except Exception as e:
        print(f"❌ Error en búsqueda: {str(e)}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@shoes_bp.route('/shoes/<int:id>', methods= ['GET'])
def get_shoe_by_id(id):
    try:
        shoe = Shoe.query.get(id)

        if not shoe:
            return jsonify({
                "success":False,
                "error": "Zapatilla no encontrada"
            }), 404
        return jsonify({

            "success":True,
            "shoe": shoe.to_dict()
        })
    
    except Exception as e:
        return jsonify({
            "success":False,
            "error": str(e)
        }), 500
