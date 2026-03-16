from __init__ import create_app
import os

# Determinar entorno (development por defecto)
config_name = os.getenv('FLASK_ENV', 'development')
app = create_app(config_name)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=(config_name == 'development'))