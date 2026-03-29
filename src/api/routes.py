"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta, datetime, timezone
import bcrypt, os


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/users', methods=['GET'])
def get_users():
    usuarios = db.session.execute(db.select(User)).scalars().all()
    return jsonify({'total': len(usuarios), 'users': [user.serialize() for user in usuarios]}), 200

@api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_users(user_id):
    usuario = db.session.execute(db.select(User).filter_by(id = user_id)).scalar_one_or_none()
    
    if not usuario:
        return jsonify({'msg': f'Usuario con id {user_id} no encontrado'}), 404
    
    try:
        db.session.delete(usuario)
        db.session.commit()
        
        return jsonify({'msg': 'Usuario eliminado correctamente', 'id': usuario.id}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'msg': 'Error eliminando usuario', 'error': str(e)}), 500
    

@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    firstname = data['firstname']
    lastname = data['lastname']
    email = data['email']
    password = data['password']
    

    if not firstname or not lastname or not email or not password:
        return jsonify({'msg': 'Todos los datos son obligatorios'}), 400
    
    try:
        existe = db.session.execute(db.select(User).filter_by(email = email)).scalar_one_or_none()
    
        if existe:
            return jsonify({'msg': f'El email {email} ya está registrado'}), 400

        salt = bcrypt.gensalt()
        password_hash = bcrypt.hashpw(password.encode('utf-8'), salt)

        nuevo_usuario = User(
            firstname=firstname,
            lastname=lastname,
            email=email, 
            password=password_hash.decode('utf-8'), 
            is_active=True
        )

        db.session.add(nuevo_usuario)
        db.session.commit()

        return jsonify({'msg': "Usuario creado correctamente", 'user': nuevo_usuario.serialize()}), 200
    except Exception as e:
        return jsonify({'msg': 'Error al registrar usuario'}), 500

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data:
        return jsonify({'msg': 'No ha proporcionado información para login'}), 400

    email = data['email']
    password = data['password']
    
    try:
        usuario = db.session.execute(db.select(User).filter_by(email = email)).scalar_one_or_none()
        
        print(usuario)
        
        if not usuario or not bcrypt.checkpw(password.encode('utf-8'), usuario.password.encode('utf-8')):
            return jsonify({'msg': 'Las credenciales no son correctas'}), 401
        
        token = create_access_token(identity=str(usuario.id))
        expires_in = int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES', 3600))
        expires_at = (datetime.now(timezone.utc) + timedelta(seconds = expires_in)).isoformat()
        
        return jsonify({
            'user': usuario.serialize(),
            'msg': 'Login correcto',
            'token': token,
            "token_type": 'bearer',
            "expires_in": expires_in,
            "expires_at": expires_at
        }), 200
        
    except Exception as e:
        return jsonify({'msg': f'Error al loguearse: {str(e)}'}), 500
    
# @api.route('/logout', methods=['POST'])
# @jwt_required()
# def logout():
#     return jsonify({'msg': 'Sessión cerrada'})

@api.route('/privado', methods=['GET'])
@jwt_required()
def privado():
    current_user = get_jwt_identity()
    usuario = db.session.execute(db.select(User).filter_by(id = current_user)).scalar_one_or_none()
    
    return jsonify(usuario.serialize())