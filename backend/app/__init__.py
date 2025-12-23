# from flask import Flask
# from flask_migrate import Migrate
# from flask_cors import CORS
# from app.database import db  # <-- Importar desde database.py

# migrate = Migrate()

# def create_app():
#     app = Flask(__name__)
    
#     app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///shoes.db'
#     app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#  # PostgreSQL para producción/desarrollo
#     app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL') or \
#         'postgresql://postgres:postgres@localhost:5432/stepwise'

#     db.init_app(app)
#     migrate.init_app(app, db)
#     CORS(app)

#     with app.app_context():
#         # Importar modelos
#         from app import models
        
#         # Importar y registrar blueprints
#         from app.routes.recommendations import recommendations_bp
#         from app.routes.shoes import shoes_bp
#         from app.routes.users import users_bp

#         app.register_blueprint(recommendations_bp, url_prefix='/api')
#         app.register_blueprint(shoes_bp, url_prefix='/api')
#         app.register_blueprint(users_bp, url_prefix='/api')

#         db.create_all()
        
#     return app


import os
from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from app.database import db
from dotenv import load_dotenv

# Cargar variables de entorno desde .env
load_dotenv()

migrate = Migrate()

def create_app():
    app = Flask(__name__)
    
    # Configuración de la base de datos
    # PostgreSQL para producción/desarrollo, SQLite como fallback
    # app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL') or \
    #     'postgresql://postgres:postgres@localhost:5432/stepwise'
    
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///shoes.db'

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Inicializar extensiones
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)

    # Registrar blueprints
    register_blueprints(app)
    
    # NO usar db.create_all() si usas Flask-Migrate
    # Las tablas se crean con: flask db upgrade
    
    return app

def register_blueprints(app):
    """Registrar todos los blueprints"""
    from app.routes.recommendations import recommendations_bp
    from app.routes.shoes import shoes_bp
    from app.routes.users import users_bp

    app.register_blueprint(recommendations_bp, url_prefix='/api')
    app.register_blueprint(shoes_bp, url_prefix='/api')
    app.register_blueprint(users_bp, url_prefix='/api')