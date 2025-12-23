# verificar_conexion.py
from app import create_app, db

app = create_app()

print("🔌 VERIFICANDO CONEXIÓN DE FLASK")
print("=" * 50)

print(f"📊 Configuración en app/__init__.py:")
print(f"   SQLALCHEMY_DATABASE_URI = '{app.config['SQLALCHEMY_DATABASE_URI']}'")

with app.app_context():
    try:
        # Intentar una consulta simple
        from sqlalchemy import text
        resultado = db.session.execute(text("SELECT name FROM sqlite_master WHERE type='table'")).fetchall()
        
        print(f"\n✅ Flask está conectado correctamente")
        print(f"📋 Tablas encontradas: {len(resultado)}")
        
        for tabla in resultado:
            print(f"   • {tabla[0]}")
            
    except Exception as e:
        print(f"\n❌ Error de conexión: {e}")