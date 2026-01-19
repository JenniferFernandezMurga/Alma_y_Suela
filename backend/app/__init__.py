from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS


db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///shoes.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Desactivar seguimiento de modificaciones para ahorrar memoria

    #Conectar extensiones a la app
    #Inicializar extensiones

    # Conecta SQLAlchemy con Flask
    db.init_app(app)
    #Conecta las migraciones con Flask y la BD
    migrate.init_app(app, db)
    # Permite requests desde React (puerto 3000) a Flask (puerto 5000)
    CORS(app)

    # Importar y registrar blueprints
    from .routes.recommendations import recommendations_bp
    from .routes.shoes import shoes_bp

    #Todas las rutas empiezan con /api (ej: /api/recommend)
    app.register_blueprint(recommendations_bp, url_prefix='/api')
    app.register_blueprint(shoes_bp, url_prefix='/api')
    # app.register_blueprint(main_blueprint)

    # Crear tablas en la base de datos
    with app.app_context():
        db.create_all()

    return app
