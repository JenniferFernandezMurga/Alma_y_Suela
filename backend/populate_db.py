import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import create_app, db
from app.models import Shoe
from app.services.sample_data import create_sample_shoes

# def populate_database():
#     app = create_app()

#     with app.app_context():
#         # Limpiar tabla existente
#         db.drop_all()
#         db.create_all()

#         # Crear zapatillas de ejemplo
#         sample_shoes = create_sample_shoes()

#         for shoe_data in sample_shoes:
#             shoe = Shoe(**shoe_data)
#             db.session.add(shoe)

#         db.session.commit()
#         print(f"✅ Base de datos poblada con {len(sample_shoes)} zapatillas")

# if __name__ == '__main__':
#     populate_database()

def populate_database():
    """Poblar la base de datos con zapatillas de ejemplo"""
    from app import create_app, db
    from app.models import Shoe

    app = create_app()
    
    with app.app_context():
        # Verificar si ya existen datos
        existing_shoes = Shoe.query.count()
        if existing_shoes > 0:
            print(f"⚠️  Ya existen {existing_shoes} zapatillas en la BD")
            response = input("¿Quieres borrar y recrear? (s/n): ")
            if response.lower() != 's':
                print("Cancelado")
                return
        
        # Limpiar tabla existente
        db.session.query(Shoe).delete()
        db.session.commit()
        print("✅ Tabla limpiada")

        # Crear nuevas zapatillas
        sample_shoes = create_sample_shoes()
        shoes_created = 0
        
        for shoe_data in sample_shoes:
            try:
                shoe = Shoe(**shoe_data)
                db.session.add(shoe)
                shoes_created += 1
            except Exception as e:
                print(f"❌ Error creando {shoe_data['brand']} {shoe_data['model']}: {e}")
        
        db.session.commit()
        print(f"✅ Base de datos poblada con {shoes_created} zapatillas")

        # Mostrar estadísticas
        stats = {
            'total': Shoe.query.count(),
            'hombres': Shoe.query.filter_by(gender='male').count(),
            'mujeres': Shoe.query.filter_by(gender='female').count(),
            'unisex': Shoe.query.filter_by(gender='unisex').count(),
            'running': Shoe.query.filter_by(category='running').count(),
            'gym': Shoe.query.filter_by(category='gym').count(),
            'walking': Shoe.query.filter_by(category='walking').count()
        }
        
        print("\n📊 ESTADÍSTICAS:")
        for key, value in stats.items():
            print(f"   {key}: {value}")

if __name__ == '__main__':
    populate_database()