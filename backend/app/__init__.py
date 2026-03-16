from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_talisman import Talisman


db = SQLAlchemy()
migrate = Migrate()

from config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Conecta SQLAlchemy con Flask
    db.init_app(app)
    #Conecta las migraciones con Flask y la BD
    migrate.init_app(app, db)
    # Permite requests desde React
    CORS(app)

    # Seguridad: Headers de seguridad (Talisman)
    # En producción deberías configurar el CSP adecuadamente
    # Desactivamos force_https para pruebas locales si es necesario, pero en producción DEBE ser True
    import os
    force_https = os.environ.get('FLASK_ENV') == 'production'
    Talisman(app, content_security_policy=None, force_https=force_https)

    # Importar y registrar blueprints
    from .routes.recommendations import recommendations_bp
    from .routes.shoes import shoes_bp
    from .routes.auth import auth_bp

    #Todas las rutas empiezan con /api (ej: /api/recommend)
    app.register_blueprint(recommendations_bp, url_prefix='/api')
    app.register_blueprint(shoes_bp, url_prefix='/api')
    app.register_blueprint(auth_bp, url_prefix='/api')
    # app.register_blueprint(main_blueprint)

    # Crear tablas en la base de datos
    with app.app_context():
        db.create_all()

    return app
