import React from 'react';
import { Link } from 'react-router-dom';

const Cookies = () => {
    return (
        <div className="cookies-page">
            {/* Hero simple */}
            <div className="cookies-hero" style={{
                background: 'linear-gradient(135deg, #2E8B57 0%, #5D4037 100%)',
                color: 'white',
                padding: '60px 0',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
                        <i className="fas fa-cookie-bite me-3"></i>
                        Política de Cookies
                    </h1>
                    <p>Última actualización: 23 de febrero de 2025</p>
                </div>
            </div>

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        
                        {/* Introducción */}
                        <div className="cookies-section mb-5">
                            <h2 className="h4 mb-3" style={{ color: '#5D4037', borderBottom: '2px solid #2E8B57', paddingBottom: '10px' }}>
                                1. ¿Qué son las cookies?
                            </h2>
                            <p>
                                Las cookies son pequeños archivos de texto que se almacenan en tu navegador cuando visitas una página web. 
                                Sirven para que el sitio web pueda recordar tus preferencias, mejorar tu experiencia de navegación y, 
                                en algunos casos, mostrar publicidad relevante.
                            </p>
                            <p>
                                En runwise utilizamos cookies propias y de terceros para distintos fines, siempre con tu consentimiento 
                                (excepto las cookies técnicas, que son necesarias para el funcionamiento de la web).
                            </p>
                        </div>

                        {/* Tipos de cookies */}
                        <div className="cookies-section mb-5">
                            <h2 className="h4 mb-3" style={{ color: '#5D4037', borderBottom: '2px solid #2E8B57', paddingBottom: '10px' }}>
                                2. Tipos de cookies que utilizamos
                            </h2>

                            <h5 className="mt-4">2.1. Cookies técnicas (necesarias)</h5>
                            <p>
                                Son esenciales para que la web funcione correctamente. Permiten la navegación básica, 
                                el registro de usuarios y el acceso a áreas seguras. No requieren tu consentimiento previo.
                            </p>
                            <table className="table table-sm">
                                <thead>
                                    <tr><th>Nombre</th><th>Función</th><th>Duración</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td>session_id</td><td>Mantener tu sesión iniciada</td><td>Sesión</td></tr>
                                    <tr><td>csrf_token</td><td>Protección contra ataques CSRF</td><td>Sesión</td></tr>
                                </tbody>
                            </table>

                            <h5 className="mt-4">2.2. Cookies de preferencias</h5>
                            <p>
                                Permiten recordar tus preferencias (idioma, región, etc.) para mejorar tu experiencia.
                            </p>
                            <table className="table table-sm">
                                <thead>
                                    <tr><th>Nombre</th><th>Función</th><th>Duración</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td>cookie_consent</td><td>Recordar si aceptaste las cookies</td><td>1 año</td></tr>
                                </tbody>
                            </table>

                            <h5 className="mt-4">2.3. Cookies de afiliados / marketing</h5>
                            <p>
                                Estas cookies las establecen los programas de afiliados a los que estamos adheridos 
                                (Decathlon, TradeDoubler, AWIN, etc.) cuando haces clic en un enlace de afiliado. 
                                Sirven para identificar que la compra provino de nuestra recomendación y poder atribuirte 
                                la comisión correspondiente, <strong>sin coste adicional para ti</strong>.
                            </p>
                            <p><strong>Importante:</strong> Estas cookies solo se activan si aceptas las cookies de marketing.</p>
                            <table className="table table-sm">
                                <thead>
                                    <tr><th>Proveedor</th><th>Nombre</th><th>Función</th><th>Duración</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td>Rakuten (Decathlon)</td><td>rakuten_affiliate</td><td>Seguimiento de afiliados</td><td>30 días</td></tr>
                                    <tr><td>TradeDoubler</td><td>tduid</td><td>Seguimiento de afiliados</td><td>30 días</td></tr>
                                    <tr><td>AWIN</td><td>awin_affiliate</td><td>Seguimiento de afiliados</td><td>30 días</td></tr>
                                </tbody>
                            </table>

                            <h5 className="mt-4">2.4. Cookies de análisis</h5>
                            <p>
                                Utilizamos Google Analytics para entender cómo los usuarios interactúan con nuestra web, 
                                qué páginas visitan más y cómo podemos mejorar.
                            </p>
                            <table className="table table-sm">
                                <thead>
                                    <tr><th>Nombre</th><th>Función</th><th>Duración</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td>_ga</td><td>Identificar usuarios únicos</td><td>2 años</td></tr>
                                    <tr><td>_gid</td><td>Identificar usuarios</td><td>24 horas</td></tr>
                                    <tr><td>_gat</td><td>Limitar peticiones</td><td>1 minuto</td></tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Cómo gestionar cookies */}
                        <div className="cookies-section mb-5">
                            <h2 className="h4 mb-3" style={{ color: '#5D4037', borderBottom: '2px solid #2E8B57', paddingBottom: '10px' }}>
                                3. ¿Cómo puedes gestionar las cookies?
                            </h2>
                            
                            <h5 className="mt-3">3.1. A través del banner de cookies</h5>
                            <p>
                                Cuando entras por primera vez en nuestra web, aparece un banner donde puedes:
                            </p>
                            <ul>
                                <li><strong>Aceptar todas:</strong> Aceptas todos los tipos de cookies.</li>
                                <li><strong>Rechazar todas:</strong> Solo se instalarán las cookies técnicas necesarias.</li>
                                <li><strong>Configurar:</strong> Puedes elegir qué categorías de cookies aceptas.</li>
                            </ul>
                            <p>
                                Puedes cambiar tus preferencias en cualquier momento haciendo clic en el icono de configuración 
                                de cookies que aparece en la esquina inferior izquierda de la web.
                            </p>

                            <h5 className="mt-3">3.2. A través de la configuración del navegador</h5>
                            <p>
                                También puedes bloquear o eliminar las cookies desde la configuración de tu navegador:
                            </p>
                            <ul>
                                <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
                                <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies</li>
                                <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies</li>
                                <li><strong>Edge:</strong> Configuración → Cookies y permisos</li>
                            </ul>
                        </div>

                        {/* Cambios en la política */}
                        <div className="cookies-section mb-5">
                            <h2 className="h4 mb-3" style={{ color: '#5D4037', borderBottom: '2px solid #2E8B57', paddingBottom: '10px' }}>
                                4. Cambios en la política de cookies
                            </h2>
                            <p>
                                Podemos actualizar esta política de cookies periódicamente para reflejar cambios en los servicios 
                                que utilizamos o en la normativa aplicable. Te recomendamos revisar esta página de vez en cuando.
                            </p>
                            <p>
                                Si realizamos cambios significativos que afecten a tu privacidad, te lo notificaremos 
                                a través de la web o por email (si tienes cuenta).
                            </p>
                        </div>

                        {/* Contacto */}
                        <div className="cookies-section mb-5">
                            <h2 className="h4 mb-3" style={{ color: '#5D4037', borderBottom: '2px solid #2E8B57', paddingBottom: '10px' }}>
                                5. Contacto
                            </h2>
                            <p>
                                Si tienes dudas sobre nuestra política de cookies, puedes contactarnos en:
                            </p>
                            <div className="card bg-light p-3">
                                <p className="mb-1"><strong>Email:</strong> [runwise.web@gmail.com]</p>
                                <p className="mb-0"><strong>Web:</strong> [runwise.com]</p>
                            </div>
                        </div>

                        {/* Nota legal */}
                        <div className="alert alert-warning mt-4">
                            <i className="fas fa-gavel me-2"></i>
                            <small>
                                Esta política de cookies cumple con lo establecido en la Ley 34/2002 de Servicios de la Sociedad 
                                de la Información (LSSI) y el Reglamento General de Protección de Datos (RGPD).
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cookies;