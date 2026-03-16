from __init__ import create_app, db
from sqlalchemy import text

app = create_app()

with app.app_context():
    # Conectar directamente a la BD usando text() para SQL raw
    with db.engine.connect() as conn:
        # Verificar qué columnas ya existen
        result = conn.execute(text("PRAGMA table_info(shoe)"))
        columns = [row[1] for row in result]

        print("📊 Columnas actuales:", columns)
        print("="*60)

        # Lista de nuevas columnas a añadir - CAMBIADO 'drop' POR 'drop_mm'
        new_columns = [
            ('drop_mm', 'INTEGER'),        # Cambiado de 'drop' a 'drop_mm' para evitar palabra reservada
            ('weight_grams', 'INTEGER'),
            ('sole_type', 'VARCHAR(50)'),
            ('lug_depth', 'VARCHAR(20)'),
            ('waterproof', 'BOOLEAN DEFAULT 0'),
            ('terrain', 'VARCHAR(50)')
        ]

        added = 0
        for col_name, col_type in new_columns:
            if col_name not in columns:
                try:
                    conn.execute(text(f"ALTER TABLE shoe ADD COLUMN {col_name} {col_type}"))
                    conn.commit()
                    print(f"✅ Añadida columna: {col_name}")
                    added += 1
                except Exception as e:
                    print(f"❌ Error añadiendo {col_name}: {e}")
            else:
                print(f"⏭️ Columna ya existe: {col_name}")

        if added > 0:
            print("="*60)
            print(f"✅ {added} columnas añadidas correctamente")
        else:
            print("="*60)
            print("✅ Todas las columnas ya existían")