import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from __init__ import create_app, db  # Cambiado de 'app' a '__init__'
from models.shoe import Shoe  # Cambiado de 'app.models' a 'models.shoe'
from services.sample_data import create_sample_shoes  # Cambiado de 'app.services' a 'services.sample_data'

def populate_database():
    """Poblar la base de datos con zapatillas de ejemplo"""
    
    app = create_app('development')  # Especificamos entorno
    
    with app.app_context():
        # Verificar si ya existen datos
        existing_shoes = Shoe.query.count()
        if existing_shoes > 0:
            print(f"⚠️  Ya existen {existing_shoes} zapatillas en la BD")
            response = input("¿Quieres borrar y recrear? (s/n): ")
            if response.lower() != 's':
                print("❌ Operación cancelada")
                return
        
        # Limpiar tabla existente
        if existing_shoes > 0:
            db.session.query(Shoe).delete()
            db.session.commit()
            print("✅ Tabla limpiada")
        
        # Crear nuevas zapatillas
        print("\n📦 Cargando datos de ejemplo...")
        sample_shoes = create_sample_shoes()
        shoes_created = 0
        errors = 0
        
        for i, shoe_data in enumerate(sample_shoes, 1):
            try:
                # Verificar datos mínimos requeridos
                if not shoe_data.get('brand') or not shoe_data.get('model'):
                    print(f"   [{i}] ⚠️  Datos incompletos: falta marca o modelo")
                    errors += 1
                    continue
                
                # Asegurar que affiliate_link tenga valor
                if 'affiliate_link' not in shoe_data or not shoe_data['affiliate_link']:
                    shoe_data['affiliate_link'] = '#'
                
                shoe = Shoe(**shoe_data)
                db.session.add(shoe)
                shoes_created += 1
                
                # Mostrar progreso
                if shoes_created % 5 == 0:
                    print(f"   → Insertadas {shoes_created} zapatillas...")
                    
            except Exception as e:
                print(f"   [{i}] ❌ Error creando {shoe_data.get('brand', '?')} {shoe_data.get('model', '?')}: {e}")
                errors += 1
        
        # Commit final
        db.session.commit()
        
        # Mostrar resultados
        print(f"\n{'='*50}")
        print(f"✅ RESULTADOS FINALES")
        print(f"{'='*50}")
        print(f"   📊 Total procesadas: {len(sample_shoes)}")
        print(f"   ✅ Insertadas: {shoes_created}")
        print(f"   ❌ Errores: {errors}")
        
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
        
        print(f"\n📊 ESTADÍSTICAS:")
        print(f"{'-'*30}")
        for key, value in stats.items():
            print(f"   {key:10}: {value}")
        
        # Mostrar primeras zapatillas
        if shoes_created > 0:
            print(f"\n📋 PRIMERAS 5 ZAPATILLAS:")
            print(f"{'-'*50}")
            for shoe in Shoe.query.limit(5).all():
                print(f"   • {shoe.brand} {shoe.model} - {shoe.price}€ ({shoe.gender})")

if __name__ == '__main__':
    print("🚀 Iniciando población de base de datos...")
    print(f"{'='*50}")
    populate_database()