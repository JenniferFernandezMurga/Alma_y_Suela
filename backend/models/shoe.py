# from __init__ import db
# from datetime import datetime

# class Shoe(db.Model):
#     __tablename__ = 'shoe'

#     id = db.Column(db.Integer, primary_key=True)
#     brand = db.Column(db.String(50), nullable=False)
#     model = db.Column(db.String(100), nullable=False)
#     category = db.Column(db.String(50), nullable=False)
#     price = db.Column(db.Float)
#     image_url = db.Column(db.String(255))
#     additional_images = db.Column(db.Text)
#     affiliate_ready = db.Column(db.Boolean, default=True)
#     affiliate_link = db.Column(db.String(255))
#     partner_name = db.Column(db.String(100), default="amazon")
#     width_fit = db.Column(db.String(20))
#     arch_support = db.Column(db.String(20))
#     weight_capacity = db.Column(db.String(20))
#     best_for_activity = db.Column(db.String(100))
#     cushioning = db.Column(db.String(20))
#     footstrike_support = db.Column(db.String(20))
#     distance_capacity = db.Column(db.String(20))
#     carbon_plate = db.Column(db.Boolean, default=False)
#     best_for_distance = db.Column(db.String(20))
#     gender = db.Column(db.String(20), default='unisex')
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)

#     # Relaciones (se añadirán después)
#     favorites = db.relationship('Favorite', backref='shoe', lazy='dynamic', cascade='all, delete-orphan')

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'brand': self.brand,
#             'model': self.model,
#             'category': self.category,
#             'price': self.price,
#             'image_url': self.image_url,
#             'affiliate_link': self.affiliate_link,
#             'partner_name': self.partner_name,
#             'width_fit': self.width_fit,
#             'arch_support': self.arch_support,
#             'weight_capacity': self.weight_capacity,
#             'best_for_activity': self.best_for_activity,
#             'cushioning': self.cushioning,
#             'footstrike_support': self.footstrike_support,
#             'distance_capacity': self.distance_capacity,
#             'carbon_plate': self.carbon_plate,
#             'best_for_distance': self.best_for_distance,
#             'gender': self.gender
#         }

#     # Ya no necesitamos affiliate_link como campo único
#     # Pero lo mantenemos por compatibilidad

from __init__ import db
from datetime import datetime

class Shoe(db.Model):
    __tablename__ = 'shoe'

    id = db.Column(db.Integer, primary_key=True)

    # Información básica
    brand = db.Column(db.String(50), nullable=False)
    model = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False)  # running, trail, gym, barefoot
    gender = db.Column(db.String(20), default='unisex')  # male, female, unisex

    # Precio e imágenes
    price = db.Column(db.Float)
    image_url = db.Column(db.String(255))
    additional_images = db.Column(db.Text)  # JSON con URLs adicionales

    # Características técnicas (nuevas)
    drop_mm = db.Column(db.Integer, nullable=True)  # Drop en milímetros
    weight_grams = db.Column(db.Integer, nullable=True)  # Peso en gramos
    sole_type = db.Column(db.String(50), nullable=True)  # 'Vibram', 'Contagrip', 'Continental'
    lug_depth = db.Column(db.String(20), nullable=True)  # '4mm', '6mm', '8mm'
    waterproof = db.Column(db.Boolean, default=False)
    terrain = db.Column(db.String(50), nullable=True)  # 'asfalto', 'mixto', 'técnico'

    # Características para matching (existentes y mejoradas)
    cushioning = db.Column(db.String(20))  # minimal, medium, maximum
    arch_support = db.Column(db.String(20))  # low, neutral, high
    footstrike_support = db.Column(db.String(20))  # pronation, supination, neutral
    width_fit = db.Column(db.String(20))  # narrow, standard, wide

    # Para qué tipo de corredor
    runner_weight = db.Column(db.String(20))  # light, medium, heavy (peso del corredor)
    best_for_activity = db.Column(db.String(100))  # road_running, trail_running, gym, walking
    distance_capacity = db.Column(db.String(20))  # short, medium, long, ultra
    carbon_plate = db.Column(db.Boolean, default=False)

    # Metadatos
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relaciones
    favorites = db.relationship('Favorite', backref='shoe', lazy='dynamic', cascade='all, delete-orphan')
    affiliate_links = db.relationship('AffiliateLink', back_populates='shoe', lazy='dynamic', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'brand': self.brand,
            'model': self.model,
            'category': self.category,
            'gender': self.gender,
            'price': self.price,
            'image_url': self.image_url,
            'additional_images': self.additional_images,

            # Nuevas características
            'drop_mm': self.drop_mm,
            'weight_grams': self.weight_grams,
            'sole_type': self.sole_type,
            'lug_depth': self.lug_depth,
            'waterproof': self.waterproof,
            'terrain': self.terrain,

            # Características de matching
            'cushioning': self.cushioning,
            'arch_support': self.arch_support,
            'footstrike_support': self.footstrike_support,
            'width_fit': self.width_fit,
            'runner_weight': self.runner_weight,
            'best_for_activity': self.best_for_activity,
            'distance_capacity': self.distance_capacity,
            'carbon_plate': self.carbon_plate,

            'created_at': self.created_at.isoformat() if self.created_at else None
        }

    @property
    def best_price(self):
        """Obtener el mejor precio de afiliados"""
        best = self.affiliate_links.order_by(AffiliateLink.price).first()
        return best.price if best else self.price

    @property
    def affiliate_count(self):
        """Número de tiendas afiliadas"""
        return self.affiliate_links.count()