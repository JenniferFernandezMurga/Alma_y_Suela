from app.database import db  # <-- Importar desde database.py
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import json

class Shoe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    
    # Información básica
    brand = db.Column(db.String(50), nullable=False)
    model = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float)
    
    # Imágenes 
    image_url = db.Column(db.String(255))
    additional_images = db.Column(db.Text)  # JSON con más imágenes
    
    # Affiliate system (PREPARADO)
    affiliate_ready = db.Column(db.Boolean, default=True)
    affiliate_link = db.Column(db.String(255))
    partner_name = db.Column(db.String(100), default="amazon")  # amazon, zalando, etc.
    
    # Características para matching
    width_fit = db.Column(db.String(20))  # narrow, standard, wide
    arch_support = db.Column(db.String(20))  # low, neutral, high
    weight_capacity = db.Column(db.String(20))  # light, medium, heavy
    best_for_activity = db.Column(db.String(100))  # road_running, trail_running, gym, tennis, basketball
    cushioning = db.Column(db.String(20))  # minimal, medium, maximum
    footstrike_support = db.Column(db.String(20))  # pronation, supination, neutral
    distance_capacity = db.Column(db.String(20))  # short, medium, long
    carbon_plate = db.Column(db.Boolean, default=False)  # Si tiene placa de carbono
    best_for_distance = db.Column(db.String(20))  # 5k, 10k, half_marathon, marathon, ultra
    gender = db.Column(db.String(20), default='unisex')  # 'male', 'female', 'unisex'


    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'brand': self.brand,
            'model': self.model,
            'category': self.category,
            'price': self.price,
            'image_url': self.image_url,
            'affiliate_link': self.affiliate_link,
            'partner_name': self.partner_name,
            'width_fit': self.width_fit,
            'arch_support': self.arch_support,
            'weight_capacity': self.weight_capacity,
            'best_for_activity': self.best_for_activity,
            'cushioning': self.cushioning,
            'footstrike_support': self.footstrike_support,
            'distance_capacity': self.distance_capacity,
            'carbon_plate': self.carbon_plate,
            'best_for_distance': self.best_for_distance,
            'gender': self.gender
        }

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)  # Cambiado de password a password_hash
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    preferences = db.Column(db.Text, default='{}')  # JSON
    favorite_shoes = db.Column(db.Text, default='[]')  # Array de IDs
    saved_recommendations = db.Column(db.Text, default='[]')  # Array de objetos

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'created_at': self.created_at.isoformat(),
            'preferences': self.preferences,
            'favorite_shoes': self.favorite_shoes,
            'saved_recommendations': self.saved_recommendations
        }

class UserSession(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    session_data = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)