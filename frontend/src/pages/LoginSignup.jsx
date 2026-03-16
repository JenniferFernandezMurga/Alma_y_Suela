// src/pages/LoginSignup.jsx - VERSIÓN MEJORADA ESTÉTICAMENTE
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginSignup.css';

const LoginSignup = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const validateForm = () => {
        if (isLogin) {
            if (!formData.email || !formData.password) {
                setError('Por favor, completa todos los campos');
                return false;
            }
        } else {
            if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
                setError('Por favor, completa todos los campos');
                return false;
            }
            if (formData.password !== formData.confirmPassword) {
                setError('Las contraseñas no coinciden');
                return false;
            }
            if (formData.password.length < 6) {
                setError('La contraseña debe tener al menos 6 caracteres');
                return false;
            }
        }
        return true;
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
        
    //     if (!validateForm()) {
    //         return;
    //     }

    //     setLoading(true);
    //     setError('');

    //     try {
    //         // Simulación de API
    //         console.log('Enviando datos:', formData);
    //         await new Promise(resolve => setTimeout(resolve, 1000));
            
    //         // Guardar datos simulados
    //         const userData = isLogin 
    //             ? { email: formData.email, name: 'Usuario Demo' }
    //             : { email: formData.email, name: formData.name };
            
    //         localStorage.setItem('user', JSON.stringify(userData));
    //         localStorage.setItem('isAuthenticated', 'true');
            
    //         navigate('/');
            
    //     } catch (error) {
    //         console.error('Error en autenticación:', error);
    //         setError(isLogin 
    //             ? 'Email o contraseña incorrectos' 
    //             : 'Error en el registro. Intenta nuevamente.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }

  setLoading(true);
  setError('');

  try {
    // Simulación de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userData = isLogin 
      ? { email: formData.email, name: 'Usuario Demo', id: Date.now() }
      : { email: formData.email, name: formData.name, id: Date.now() };
    
    const token = 'mock-jwt-token-' + Date.now();
    
    // Guardar en localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isAuthenticated', 'true');
    
    // ✅ NUEVO: Restaurar intención de favorito
    const redirectAfterLogin = sessionStorage.getItem('redirectAfterLogin');
    const favoriteIntent = sessionStorage.getItem('favoriteIntent');
    
    if (redirectAfterLogin) {
      sessionStorage.removeItem('redirectAfterLogin');
      navigate(redirectAfterLogin);
    } else {
      navigate('/');
    }
    
  } catch (error) {
    setError(isLogin 
      ? 'Email o contraseña incorrectos' 
      : 'Error en el registro. Intenta nuevamente.');
  } finally {
    setLoading(false);
  }
};

    return (
        <div className="login-signup-page">
            {/* Fondo decorativo */}
            <div className="background-design">
               <div className="background-image"></div>
            </div>

            <div className="auth-container">
                {/* Logo en la esquina superior */}
                <div className="logo-corner">
                    <Link to="/" className="logo-link">
                        <i className="fas fa-shoe-prints logo-icon"></i>
                        <span className="logo-text">runwise</span>
                    </Link>
                </div>

                <div className="auth-card-wrapper">
                    {/* Tarjeta principal */}
                    <div className="auth-main-card">
                        {/* Encabezado */}
                        <div className="auth-header">
                            <div className="brand-icon">
                                <i className="fas fa-running"></i>
                            </div>
                            <h1 className="auth-title">
                                {isLogin ? 'Bienvenido de vuelta' : 'Comienza tu viaje'}
                            </h1>
                            <p className="auth-subtitle">
                                {isLogin 
                                    ? 'Ingresa para continuar tu búsqueda de la zapatilla perfecta' 
                                    : 'Únete a miles de runners que ya encontraron su calzado ideal'
                                }
                            </p>
                        </div>

                        {/* Toggle buttons */}
                        <div className="mode-toggle">
                            <button 
                                className={`mode-btn ${isLogin ? 'active' : ''}`}
                                onClick={() => setIsLogin(true)}
                                disabled={loading}
                            >
                                <i className="fas fa-sign-in-alt"></i>
                                Iniciar Sesión
                            </button>
                            <button 
                                className={`mode-btn ${!isLogin ? 'active' : ''}`}
                                onClick={() => setIsLogin(false)}
                                disabled={loading}
                            >
                                <i className="fas fa-user-plus"></i>
                                Registrarse
                            </button>
                        </div>

                        {/* Formulario */}
                        <form className="auth-form" onSubmit={handleSubmit}>
                            {error && (
                                <div className="alert-message error">
                                    <i className="fas fa-exclamation-triangle"></i>
                                    <span>{error}</span>
                                </div>
                            )}

                            {!isLogin && (
                                <div className="input-group animated-input">
                                    <div className="input-icon">
                                        <i className="fas fa-user"></i>
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-input"
                                        placeholder="Nombre completo"
                                        value={formData.name}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                    <div className="input-underline"></div>
                                </div>
                            )}

                            <div className="input-group animated-input">
                                <div className="input-icon">
                                    <i className="fas fa-envelope"></i>
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-input"
                                    placeholder="Correo electrónico"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                <div className="input-underline"></div>
                            </div>

                            <div className="input-group animated-input">
                                <div className="input-icon">
                                    <i className="fas fa-lock"></i>
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-input"
                                    placeholder="Contraseña"
                                    value={formData.password}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                <div className="input-underline"></div>
                            </div>

                            {!isLogin && (
                                <div className="input-group animated-input">
                                    <div className="input-icon">
                                        <i className="fas fa-lock"></i>
                                    </div>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className="form-input"
                                        placeholder="Confirmar contraseña"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                    <div className="input-underline"></div>
                                </div>
                            )}

                            {isLogin && (
                                <div className="form-options">
                                    <label className="checkbox-container">
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                        <span className="checkbox-label">Recordar sesión</span>
                                    </label>
                                    <Link to="/forgot-password" className="forgot-link">
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                </div>
                            )}

                            <button 
                                type="submit" 
                                className="submit-btn"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <div className="spinner-small"></div>
                                        <span>{isLogin ? 'Iniciando sesión...' : 'Creando cuenta...'}</span>
                                    </>
                                ) : (
                                    <>
                                        <i className={`fas ${isLogin ? 'fa-sign-in-alt' : 'fa-user-check'}`}></i>
                                        <span>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</span>
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Separador */}
                        <div className="separator">
                            <span className="separator-line"></span>
                            <span className="separator-text">o continúa con</span>
                            <span className="separator-line"></span>
                        </div>

                        {/* Login social */}
                        <div className="social-login">
                            <button type="button" className="social-btn google">
                                <i className="fab fa-google"></i>
                                <span>Google</span>
                            </button>
                            <button type="button" className="social-btn facebook">
                                <i className="fab fa-facebook-f"></i>
                                <span>Facebook</span>
                            </button>
                        </div>

                        {/* Enlace para cambiar */}
                        <div className="switch-container">
                            <p className="switch-text">
                                {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
                                <button 
                                    type="button"
                                    className="switch-link"
                                    onClick={() => setIsLogin(!isLogin)}
                                    disabled={loading}
                                >
                                    {isLogin ? ' Regístrate' : ' Inicia sesión'}
                                </button>
                            </p>
                        </div>
                    </div>

                    {/* Panel lateral informativo (solo en desktop) */}
                    <div className="info-panel">
                        <div className="info-content">
                            <h3 className="info-title">
                                <i className="fas fa-star"></i>
                                Beneficios exclusivos
                            </h3>
                            <ul className="benefits-list">
                                <li className="benefit-item">
                                    <i className="fas fa-check-circle"></i>
                                    <span>Guarda tus recomendaciones</span>
                                </li>
                                <li className="benefit-item">
                                    <i className="fas fa-check-circle"></i>
                                    <span>Accede a tu historial de búsquedas</span>
                                </li>
                                <li className="benefit-item">
                                    <i className="fas fa-check-circle"></i>
                                    <span>Compara diferentes modelos</span>
                                </li>
                                <li className="benefit-item">
                                    <i className="fas fa-check-circle"></i>
                                    <span>Recibe ofertas personalizadas</span>
                                </li>
                            </ul>
                            <div className="testimonial">
                                <p className="testimonial-text">
                                    "Gracias a runwise encontré las zapatillas perfectas para mi maratón. ¡Increíble precisión!"
                                </p>
                                <p className="testimonial-author">- Carlos M., Runner</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;