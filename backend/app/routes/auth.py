from flask import Blueprint, request, jsonify
from ..models import User
from .. import db
import traceback

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/auth/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        name = data.get('name')

        if not email or not password:
            return jsonify({"success": False, "error": "Email and password are required"}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({"success": False, "error": "User already exists"}), 400

        user = User(email=email, name=name)
        user.set_password(password)

        db.session.add(user)
        db.session.commit()

        return jsonify({
            "success": True,
            "message": "User registered successfully",
            "user": user.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "error": str(e)}), 500

@auth_bp.route('/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"success": False, "error": "Email and password are required"}), 400

        user = User.query.filter_by(email=email).first()

        if user is None or not user.check_password(password):
            return jsonify({"success": False, "error": "Invalid email or password"}), 401

        return jsonify({
            "success": True,
            "message": "Logged in successfully",
            "user": user.to_dict()
        }), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
