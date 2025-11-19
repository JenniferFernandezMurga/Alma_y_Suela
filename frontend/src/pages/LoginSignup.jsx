// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useShoe } from '../context/ShoeStore';
// import '../styles/LoginSignup.css';

// const LoginSignup = () => {
//     const { actions, state } = useShoe(); // ← AÑADIR state aquí
//     const navigate = useNavigate();

//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [isSignup, setIsSignup] = useState(false);

//     // Limpiar errores al cambiar entre login/signup
//     useEffect(() => {
//         // Si tienes una acción para limpiar errores, úsala aquí
//         // actions.clearAuthError(); 
//     }, [isSignup]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         try {
//             if (isSignup) {
//                 await actions.register({ name, email, password }, navigate);
//             } else {
//                 await actions.login(email, password, navigate);
//             }
//         } catch (err) {
//             console.log('Error capturado en componente:', err);
//         }
//     };

//     return (
//         <div className="login-signup-container">
//             <div className="auth-card">
//                 {/* Logo y título */}
//                 <div className="auth-header">
//                     <div className="auth-logo">
//                         <img 
//                             src="/images/logoAlmaYSuela.png" 
//                             alt="Logo" 
//                             style={{ height: "60px" }} 
//                         />
//                         Alma & Suela
//                     </div>
//                     <h2>{isSignup ? 'Crea tu cuenta' : 'Inicia sesión'}</h2>
//                     <p>
//                         {isSignup 
//                             ? 'Únete para guardar tus recomendaciones' 
//                             : 'Accede a tu cuenta personal'
//                         }
//                     </p>
//                 </div>

//                 {/* Mostrar errores de auth - CORREGIDO */}
//                 {state?.auth?.authError && (
//                     <div className="error-message">{state.auth.authError}</div>
//                 )}

//                 {/* Formulario */}
//                 <form className="auth-form" onSubmit={handleSubmit}>
//                     {isSignup && (
//                         <div className="form-group">
//                             <input
//                                 type="text"
//                                 placeholder="Nombre completo"
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                                 required
//                                 className="form-input"
//                                 disabled={state?.auth?.authLoading}
//                             />
//                         </div>
//                     )}
                    
//                     <div className="form-group mt-1">
//                         <input
//                             type="email"
//                             placeholder="Correo electrónico"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                             className="form-input"
//                             disabled={state?.auth?.authLoading}
//                         />
//                     </div>
                    
//                     <div className="form-group mt-1">
//                         <input
//                             type="password"
//                             placeholder="Contraseña"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                             className="form-input"
//                             disabled={state?.auth?.authLoading}
//                             minLength="6"
//                         />
//                     </div>

//                     <button 
//                         type="submit" 
//                         className="auth-button mt-2"
//                         disabled={state?.auth?.authLoading}
//                     >
//                         {state?.auth?.authLoading ? (
//                             <>
//                                 <div className="spinner"></div>
//                                 {isSignup ? 'Creando cuenta...' : 'Iniciando sesión...'}
//                             </>
//                         ) : (
//                             isSignup ? 'Crear cuenta' : 'Iniciar sesión'
//                         )}
//                     </button>
//                 </form>

//                 {/* Cambiar entre login/signup */}
//                 <div className="auth-switch text-center mt-3">
//                     <p>
//                         {isSignup ? '¿Ya tienes cuenta? ' : '¿No tienes cuenta? '}
//                         <span 
//                             className="switch-link"
//                             onClick={() => {
//                                 setIsSignup(!isSignup);
//                                 setName('');
//                                 setEmail('');
//                                 setPassword('');
//                             }}
//                         >
//                             {isSignup ? 'Inicia sesión' : 'Regístrate'}
//                         </span>
//                     </p>
//                 </div>

//                 {/* Volver al home */}
//                 <div className="auth-footer text-center mt-2">
//                     <Link to="/" className="back-link">
//                         ← Volver al inicio
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LoginSignup;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShoe } from '../context/ShoeStore';
import '../styles/LoginSignup.css';

const LoginSignup = () => {
    const { actions, state } = useShoe();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [localError, setLocalError] = useState('');

    useEffect(() => {
        setLocalError('');
    }, [isSignup]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');
        
        if (!email || !password) {
            setLocalError('Por favor, completa todos los campos');
            return;
        }
        
        if (isSignup && !name) {
            setLocalError('Por favor, ingresa tu nombre');
            return;
        }

        try {
            if (isSignup) {
                await actions.register({ name, email, password }, navigate);
            } else {
                await actions.login(email, password, navigate);
            }
        } catch (err) {
            console.log('Error capturado en componente:', err);
            setLocalError(err.message || 'Error en la autenticación');
        }
    };

    const toggleAuthMode = () => {
        setIsSignup(!isSignup);
        setName('');
        setEmail('');
        setPassword('');
        setLocalError('');
    };

    return (
        <div className="login-signup-container">
            <div className="auth-card">
                {/* Logo centrado y mejorado */}
                <div className="auth-header">
                    <div className="auth-logo-wrapper">
                        <img 
                            src="/images/logomonsin1.png" 
                            alt="Logo Alma & Suela" 
                            className="auth-logo-image"
                        />
                    </div>
                    <h2 className="auth-title">{isSignup ? 'Crea tu cuenta' : 'Inicia sesión'}</h2>
                    <p className="auth-subtitle">
                        {isSignup 
                            ? 'Únete para guardar tus recomendaciones' 
                            : 'Accede a tu cuenta personal'
                        }
                    </p>
                </div>

                {/* Mensajes de error */}
                {(localError || state?.auth?.authError) && (
                    <div className="auth-error-message">
                        {localError || state.auth.authError}
                    </div>
                )}

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
                                disabled={state?.auth?.authLoading}
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
                            disabled={state?.auth?.authLoading}
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
                            disabled={state?.auth?.authLoading}
                            minLength="6"
                        />
                        {isSignup && (
                            <small className="password-hint">
                                Mínimo 6 caracteres
                            </small>
                        )}
                    </div>

                    <button 
                        type="submit" 
                        className="auth-button"
                        disabled={state?.auth?.authLoading}
                    >
                        {state?.auth?.authLoading ? (
                            <>
                                <span className="auth-spinner"></span>
                                {isSignup ? 'Creando cuenta...' : 'Iniciando sesión...'}
                            </>
                        ) : (
                            isSignup ? 'Crear cuenta' : 'Iniciar sesión'
                        )}
                    </button>
                </form>

                {/* Cambiar entre login/signup */}
                <div className="auth-switch text-center">
                    <p className="auth-switch-text">
                        {isSignup ? '¿Ya tienes cuenta? ' : '¿No tienes cuenta? '}
                        <span 
                            className="switch-link"
                            onClick={toggleAuthMode}
                            role="button"
                            tabIndex={0}
                            onKeyPress={(e) => e.key === 'Enter' && toggleAuthMode()}
                        >
                            {isSignup ? 'Inicia sesión' : 'Regístrate'}
                        </span>
                    </p>
                </div>

                {/* Volver al home */}
                <div className="auth-footer text-center">
                    <Link to="/" className="back-link">
                        ← Volver al inicio
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;