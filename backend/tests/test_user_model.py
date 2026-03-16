import pytest
from __init__ import create_app, db
from models.user import User

@pytest.fixture(scope='module')
def test_app():
    """Configura una aplicación Flask para tests."""
    app = create_app()
    app.config.update({
        "TESTING": True,
        "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:"
    })

    with app.app_context():
        db.create_all()
        yield app
        db.drop_all()

@pytest.fixture(scope='module')
def test_client(test_app):
    """Un cliente de prueba para la aplicación."""
    return test_app.test_client()

def test_user_model(test_app):
    """
    Test para verificar la creación de un modelo User.
    """
    with test_app.app_context():
        # Crear una instancia de User
        user = User(email="test@example.com", name="Test User")
        user.password = "password123"

        # Añadir y guardar en la base de datos en memoria
        db.session.add(user)
        db.session.commit()

        # Verificar que el usuario fue guardado
        assert user.id is not None
        assert user.email == "test@example.com"

        # Consultar la base de datos para confirmar
        retrieved_user = User.query.filter_by(email="test@example.com").first()
        assert retrieved_user is not None
        assert retrieved_user.email == user.email
