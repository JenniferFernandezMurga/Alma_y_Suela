# app/routes/auth.py
from flask import Blueprint, current_app, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from functools import wraps

from models.user import User
from __init__ import db

auth_bp = Blueprint('auth', __name__)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        if not token:
            return jsonify({'error': 'Token missing'}), 401
        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = User.query.get(data['user_id'])
        except:
            return jsonify({'error': 'Invalid token'}), 401
        return f(current_user, *args, **kwargs)
    return decorated

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    hashed = generate_password_hash(data['password'])
    user = User(email=data['email'], password_hash=hashed, name=data['name'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'success': True})

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if user and check_password_hash(user.password_hash, data['password']):
        token = jwt.encode({'user_id': user.id}, current_app.config['SECRET_KEY'])
        return jsonify({'token': token, 'user': user.to_dict()})
    return jsonify({'error': 'Invalid credentials'}), 401