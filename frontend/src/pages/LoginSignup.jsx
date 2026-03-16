import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShoe } from '../context/ShoeStore';
import '../styles/LoginSignup.css';

const LoginSignup = () => {
    const { actions } = useShoe();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            if (isSignup) {
                const result = await actions.register(name, email, password);
                if (result.success) {
                    setSuccessMessage('¡Cuenta creada con éxito!');
                    setTimeout(() => navigate('/'), 2000);
                } else {
                    setError(result.error);
                }
            } else {
                const result = await actions.login(email, password);
                if (result.success) {
                    navigate('/');
                } else {
                    setError(result.error);
                }
            }
        } catch (err) {
            setError('Error al conectar con el servidor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-signup-container">
            <div className="auth-card">
                {/* Logo y título */}
                <div className="auth-header">
                    <div className="auth-logo">🏃 StepWise</div>
                    <h2>{isSignup ? 'Crea tu cuenta' : 'Inicia sesión'}</h2>
                    <p>
                        {isSignup 
                            ? 'Únete para guardar tus recomendaciones' 
                            : 'Accede a tu cuenta personal'
                        }
                    </p>
                </div>

                {/* Formulario */}
                <form className="auth-form" onSubmit={handleSubmit}>
                    {isSignup && (
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Nombre completo"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="form-input"
                            />
                        </div>
                    )}
                    
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}
                    {successMessage && <div className="success-message">{successMessage}</div>}

                    <button 
                        type="submit" 
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? 'Cargando...' : (isSignup ? 'Crear cuenta' : 'Iniciar sesión')}
                    </button>
                </form>

                {/* Cambiar entre login/signup */}
                <div className="auth-switch">
                    <p>
                        {isSignup ? '¿Ya tienes cuenta? ' : '¿No tienes cuenta? '}
                        <span 
                            className="switch-link"
                            onClick={() => {
                                setIsSignup(!isSignup);
                                setError('');
                                setSuccessMessage('');
                            }}
                        >
                            {isSignup ? 'Inicia sesión' : 'Regístrate'}
                        </span>
                    </p>
                </div>

                {/* Volver al home */}
                <div className="auth-footer">
                    <Link to="/" className="back-link">
                        ← Volver al inicio
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;