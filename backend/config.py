# config.py
import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))

class Config:
    # Configuración de base de datos
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'shoes.db')
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Clave secreta para sesiones
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'clave-temporal-desarrollo'
    
    # Configuración para migraciones
    SQLALCHEMY_ECHO = False  # Cambia a True para ver queries SQL