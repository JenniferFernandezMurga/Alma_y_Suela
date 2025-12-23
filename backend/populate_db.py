from app import create_app, db
from app.models import Shoe
from app.services.sample_data import create_sample_shoes

def populate_database():
    app = create_app()
    
    with app.app_context():
        # 1. CREAR TABLAS si no existen
        # db.create_all()
        # print("✅ Tablas creadas/verificadas")
        
        # 2. Limpiar datos existentes (opcional)
        shoe_count = Shoe.query.count()
        if shoe_count > 0:
            print(f"⚠️  Encontradas {shoe_count} zapatillas existentes")
            respuesta = input("¿Borrar y recrear? (s/n): ")
            if respuesta.lower() == 's':
                db.session.query(Shoe).delete()
                db.session.commit()
                print("✅ Datos anteriores eliminados")
            else:
                print("✅ Manteniendo datos existentes")
                return
        
        # 3. Crear nuevas zapatillas
        sample_shoes = create_sample_shoes()
        
        for shoe_data in sample_shoes:
            shoe = Shoe(**shoe_data)
            db.session.add(shoe)
        
        db.session.commit()
        print(f"✅ {len(sample_shoes)} zapatillas creadas")
        
        # 4. Mostrar resumen
        print(f"\n📊 Zapatillas en base de datos: {Shoe.query.count()}")
        print("🎯 ¡Base de datos lista!")

if __name__ == '__main__':
    populate_database()