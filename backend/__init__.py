from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from config import config_by_name
import os

# Inicializar extensiones
db = SQLAlchemy()
migrate = Migrate()
cors = CORS()
jwt = JWTManager()
bcrypt = Bcrypt()

def create_app(config_name='development'):
    app = Flask(__name__)
    
    # Cargar configuración según el entorno
    app.config.from_object(config_by_name[config_name])
    
    # Inicializar extensiones con la app
    db.init_app(app)
    migrate.init_app(app, db)
    
    # Configurar CORS
    CORS(app, origins=app.config['CORS_ORIGINS'], supports_credentials=True)
    
    jwt.init_app(app)
    bcrypt.init_app(app)
    
    # Crear carpeta de uploads si no existe
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
    
    # Registrar blueprints
    from routes.shoes import shoes_bp
    from routes.recommendations import recommendations_bp
    from routes.auth import auth_bp
    from routes.users import users_bp
    from routes.favorites import favorites_bp
    from routes.affiliates import affiliates_bp
    
    app.register_blueprint(shoes_bp, url_prefix='/api')
    app.register_blueprint(recommendations_bp, url_prefix='/api')
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(users_bp, url_prefix='/api/users')
    app.register_blueprint(favorites_bp, url_prefix='/api')
    app.register_blueprint(affiliates_bp, url_prefix='/api')
    
    # Crear tablas si no existen (solo para desarrollo)
    if app.config['DEBUG']:
        with app.app_context():
            db.create_all()
    
    @app.route('/health')
    def health_check():
        return {
            'status': 'healthy',
            'environment': config_name
        }, 200
    
    return app

# Exportar para facilitar importaciones
__all__ = ['db', 'migrate', 'jwt', 'bcrypt', 'create_app']