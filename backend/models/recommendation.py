from __init__ import db
from datetime import datetime
from sqlalchemy.dialects.sqlite import JSON  # Para SQLite
# Para PostgreSQL: from sqlalchemy.dialects.postgresql import JSON

class Recommendation(db.Model):
    __tablename__ = 'recommendations'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    query_data = db.Column(JSON, nullable=False)
    results = db.Column(JSON, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'query_data': self.query_data,
            'results': self.results,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }