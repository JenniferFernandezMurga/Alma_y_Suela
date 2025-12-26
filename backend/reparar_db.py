# arreglar_bd.py
import sqlite3
import os

print("🔨 CREANDO BASE DE DATOS COMPLETA")
print("=" * 50)

# 1. Crear archivo si no existe
if os.path.exists('shoes.db'):
    print("🗑️  Eliminando archivo viejo...")
    os.remove('shoes.db')

# 2. Conectar y crear tablas
conn = sqlite3.connect('shoes.db')
cursor = conn.cursor()

# TABLA SHOE
cursor.execute('''
CREATE TABLE shoe (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    model TEXT,
    gender TEXT,
    size REAL,
    color TEXT,
    price REAL,
    description TEXT,
    image_url TEXT,
    category TEXT,
    width_fit TEXT,
    arch_support TEXT,
    cushioning TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
''')
print("✅ Tabla 'shoe' creada")

# TABLA USER
cursor.execute('''
CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    preferences TEXT,
    favorite_shoes TEXT,
    saved_recommendations TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
''')
print("✅ Tabla 'user' creada")

# TABLA USER_SESSION
cursor.execute('''
CREATE TABLE user_session (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    session_data TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user (id)
)
''')
print("✅ Tabla 'user_session' creada")

# 3. Insertar datos de EJEMPLO
zapatillas = [
    ('Nike Air Max 270', 'Nike', 'Air Max 270', 'Unisex', 42.0, 'Black/White', 149.99, 'Running shoes with Air technology', 'https://example.com/nike1.jpg', 'Running', 'Medium', 'High', 'Max'),
    ('Adidas Ultraboost 22', 'Adidas', 'Ultraboost 22', 'Unisex', 41.0, 'Blue/White', 179.99, 'Premium running shoes', 'https://example.com/adidas1.jpg', 'Running', 'Medium', 'Medium', 'Boost'),
    ('Converse Chuck Taylor', 'Converse', 'Chuck Taylor', 'Unisex', 39.0, 'White', 65.00, 'Classic canvas shoes', 'https://example.com/converse1.jpg', 'Casual', 'Wide', 'Low', 'Basic'),
]

cursor.executemany('''
INSERT INTO shoe (name, brand, model, gender, size, color, price, description, image_url, category, width_fit, arch_support, cushioning) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
''', zapatillas)
print(f"✅ {len(zapatillas)} zapatillas insertadas")

# Usuario de prueba
cursor.execute('''
INSERT INTO user (username, email, password_hash) 
VALUES ('testuser', 'test@example.com', 'hashed_pass_123')
''')
print("✅ Usuario 'testuser' creado")

# 4. Verificar
cursor.execute('SELECT COUNT(*) FROM shoe')
shoe_count = cursor.fetchone()[0]

cursor.execute('SELECT COUNT(*) FROM user')
user_count = cursor.fetchone()[0]

conn.commit()
conn.close()

# 5. Resultado final
print("\n" + "=" * 50)
print("🎉 ¡BASE DE DATOS CREADA EXITOSAMENTE!")
print(f"📊 Zapatillas: {shoe_count}")
print(f"📊 Usuarios: {user_count}")
print(f"📁 Archivo: shoes.db ({os.path.getsize('shoes.db')} bytes)")
print("\n💡 Ahora ejecuta: flask run")
print("=" * 50)