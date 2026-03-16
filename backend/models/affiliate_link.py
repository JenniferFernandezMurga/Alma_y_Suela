from __init__ import db
from datetime import datetime

class AffiliateLink(db.Model):
    __tablename__ = 'affiliate_links'

    id = db.Column(db.Integer, primary_key=True)
    shoe_id = db.Column(db.Integer, db.ForeignKey('shoe.id'), nullable=False)
    partner_name = db.Column(db.String(100), nullable=False)
    partner_logo = db.Column(db.String(255), nullable=True)
    affiliate_url = db.Column(db.String(500), nullable=False)
    price = db.Column(db.Float, nullable=False)
    original_price = db.Column(db.Float, nullable=True)
    currency = db.Column(db.String(3), default='EUR')
    in_stock = db.Column(db.Boolean, default=True)
    shipping_info = db.Column(db.String(255), nullable=True)
    is_primary = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relación con Shoe
    shoe = db.relationship('Shoe', back_populates='affiliate_links')

    def to_dict(self):
        return {
            'id': self.id,
            'shoe_id': self.shoe_id,
            'partner_name': self.partner_name,
            'partner_logo': self.partner_logo,
            'affiliate_url': self.affiliate_url,
            'price': self.price,
            'original_price': self.original_price,
            'currency': self.currency,
            'in_stock': self.in_stock,
            'shipping_info': self.shipping_info,
            'is_primary': self.is_primary
        }