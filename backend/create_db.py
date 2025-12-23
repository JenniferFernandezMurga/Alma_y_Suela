# create_db.py
from app import create_app, db
import os

app = create_app()

print("🚀 INICIANDO CREACIÓN DE BASE DE DATOS")
print("=" * 50)

with app.app_context():
    # 1. Verificar configuración
    db_uri = app.config['SQLALCHEMY_DATABASE_URI']
    print(f"📊 Configuración de BD: {db_uri}")
    
    # 2. Extraer ruta del archivo
    if 'sqlite:///' in db_uri:
        # Manejar diferentes formatos
        if db_uri == 'sqlite:///:memory:':
            print("⚠️  Usando base de datos en memoria (no se guardará en archivo)")
            db_path = ":memory:"
        else:
            db_path = db_uri.replace('sqlite:///', '')
            print(f"📁 Ruta del archivo: {db_path}")
    else:
        print(f"⚠️  Formato de BD no reconocido: {db_uri}")
        db_path = "shoes.db"  # Valor por defecto
    
    # 3. Crear tablas
    print("\n🔨 Creando tablas...")
    try:
        db.create_all()
        print("✅ Tablas creadas exitosamente")
    except Exception as e:
        print(f"❌ Error creando tablas: {e}")
        exit(1)
    
    # 4. Verificar archivo físico
    if db_path != ":memory:" and os.path.exists(db_path):
        print(f"✅ Archivo de base de datos creado: {db_path}")
        print(f"📏 Tamaño: {os.path.getsize(db_path)} bytes")
    elif db_path == ":memory:":
        print("✅ Base de datos en memoria creada")
    else:
        print(f"⚠️  El archivo {db_path} no se creó físicamente")
        
    # 5. Listar tablas creadas
    print("\n📋 TABLAS CREADAS:")
    from sqlalchemy import inspect
    inspector = inspect(db.engine)
    
    tablas = inspector.get_table_names()
    if tablas:
        for tabla in tablas:
            print(f"  • {tabla}")
            # Mostrar columnas
            columnas = inspector.get_columns(tabla)
            for col in columnas:
                nullable = "NULL" if col['nullable'] else "NOT NULL"
                print(f"    - {col['name']} ({col['type']}) {nullable}")
    else:
        print("  ❌ No se encontraron tablas")
    
    print("\n" + "=" * 50)
    print("🎉 PROCESO COMPLETADO")

print("\n💡 Para verificar la BD, ejecuta: python verificar_db.py")