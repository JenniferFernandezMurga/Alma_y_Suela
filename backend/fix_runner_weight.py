from __init__ import create_app, db
from sqlalchemy import text

app = create_app()

with app.app_context():
    with db.engine.connect() as conn:
        # 1. Verificar si ya existe runner_weight
        result = conn.execute(text("PRAGMA table_info(shoe)"))
        columns = [row[1] for row in result]
        
        if 'runner_weight' not in columns:
            print("➕ Creando columna runner_weight...")
            conn.execute(text("ALTER TABLE shoe ADD COLUMN runner_weight VARCHAR(20)"))
            
            # 2. Copiar datos de weight_capacity a runner_weight
            print("📋 Copiando datos de weight_capacity a runner_weight...")
            conn.execute(text("UPDATE shoe SET runner_weight = weight_capacity"))
            
            conn.commit()
            print("✅ Columna runner_weight creada y datos copiados")
        else:
            print("⏭️ La columna runner_weight ya existe")
        
        # 3. Verificar resultado
        result = conn.execute(text("SELECT id, brand, model, weight_capacity, runner_weight FROM shoe LIMIT 5"))
        print("\n📊 Verificación (primeros 5 registros):")
        for row in result:
            print(f"  {row.id}: {row.brand} {row.model} - weight_capacity: {row.weight_capacity} → runner_weight: {row.runner_weight}")