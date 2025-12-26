from app import db
from datetime import datetime

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

# Sistema de usuarios OPCIONAL (para futuro)
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class UserSession(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)  # Optional
    session_data = db.Column(db.Text)  # JSON con preferencias
    created_at = db.Column(db.DateTime, default=datetime.utcnow)