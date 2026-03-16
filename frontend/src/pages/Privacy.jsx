import React from 'react';
import { Link } from 'react-router-dom';

const Privacy = () => {
    return (
        <div className="privacy-page">
            {/* Hero simple */}
            <div className="privacy-hero" style={{
                background: 'linear-gradient(135deg, #2E8B57 0%, #5D4037 100%)',
                color: 'white',
                padding: '60px 0',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
                        <i className="fas fa-shield-alt me-3"></i>
                        Política de Privacidad
                    </h1>
                    <p>Última actualización: 23 de febrero de 2025</p>
                </div>
            </div>

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        {/* Introducción */}
                        <div className="privacy-section mb-5">
                            <h2 className="h4 mb-3" style={{ color: '#5D4037', borderBottom: '2px solid #2E8B57', paddingBottom: '10px' }}>
                                1. Introducción
                            </h2>
                            <p>
                                En <strong>runwise</strong>, respetamos tu privacidad y nos comprometemos a proteger tus datos personales. 
                                Esta política de privacidad te informará sobre cómo cuidamos tus datos personales cuando visitas nuestra web 
                                (independientemente de dónde la visites) y te informará sobre tus derechos de privacidad y cómo te protege la ley.
                            </p>
                            <p className="mt-3">
                                Esta web es apta para ser utilizada por mayores de 14 años. Los menores de esta edad no están autorizados 
                                a registrarse como usuarios sin la autorización previa de sus padres o tutores.
                            </p>
                        </div>

                        {/* Responsable del tratamiento */}
                        <div className="privacy-section mb-5">
                            <h2 className="h4 mb-3" style={{ color: '#5D4037', borderBottom: '2px solid #2E8B57', paddingBottom: '10px' }}>
                                2. Responsable del tratamiento
                            </h2>
                            <p><strong>¿Quién es el responsable del tratamiento de tus datos?</strong></p>
                            <ul className="list-unstyled">
                                <li className="mb-2">
                                    <i className="fas fa-user text-success me-2"></i>
                                    <strong>Identidad:</strong> runwise
                                </li>
                                <li className="mb-2">
                                    <i className="fas fa-envelope text-success me-2"></i>
                                    <strong>Email de contacto:</strong> info@runwise.es
                                </li>
                                <li className="mb-2">
                                    <i className="fas fa-globe text-success me-2"></i>
                                    <strong>Web:</strong> runwise.es
                                </li>
                                <li className="mb-2">
                                    <i className="fas fa-map-marker-alt text-success me-2"></i>
                                    <strong>Domicilio:</strong> España
                                </li>
                            </ul>
                        </div>

                        {/* Datos que recogemos */}
                        <div className="privacy-section mb-5">
                            <h2 className="h4 mb-3" style={{ color: '#5D4037', borderBottom: '2px solid #2E8B57', paddingBottom: '10px' }}>
                                3. ¿Qué datos personales recogemos?
                            </h2>
                            <p>Dependiendo de cómo interactúes con nuestra web, podemos recoger diferentes tipos de datos:</p>
                            
                            <h5 className="mt-4">3.1. Datos que nos proporcionas directamente</h5>
                            <ul>
                                <li><strong>Datos de registro:</strong> Cuando creas una cuenta, recogemos tu nombre, email y contraseña (encriptada).</li>
                                <li><strong>Datos de perfil:</strong> Si completas tu perfil, podemos recoger tu peso, altura, tipo de pisada, actividad preferida y foto de perfil.</li>
                                <li><strong>Comunicaciones:</strong> Si te pones en contacto con nosotros, guardamos la correspondencia.</li>
                            </ul>

                            <h5 className="mt-4">3.2. Datos recogidos automáticamente</h5>
                            <ul>
                                <li><strong>Datos de uso:</strong> Cómo interactúas con nuestra web, páginas visitadas, tiempo de navegación.</li>
                                <li><strong>Datos técnicos:</strong> Dirección IP, tipo de navegador, sistema operativo, configuración de zona horaria.</li>
                                <li><strong>Datos de cookies:</strong> Utilizamos cookies para el funcionamiento de la web y para el seguimiento de afiliados (más información en nuestra <Link to="/cookies">Política de Cookies</Link>).</li>
                            </ul>
                        </div>

                        {/* Finalidad del tratamiento */}
                        <div className="privacy-section mb-5">
                            <h2 className="h4 mb-3" style={{ color: '#5D4037', borderBottom: '2px solid #2E8B57', paddingBottom: '10px' }}>
                                4. ¿Con qué finalidad tratamos tus datos personales?
                            </h2>
                            <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th>Finalidad</th>
                                        <th>Base legal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Gestionar tu registro y darte de alta como usuario</td>
                                        <td>Ejecución de un contrato (términos y condiciones)</td>
                                    </tr>
                                    <tr>
                                        <td>Prestar el servicio de recomendación de zapatillas</td>
                                        <td>Ejecución de un contrato</td>
                                    </tr>
                                    <tr>
                                        <td>Gestionar tus favoritos y recomendaciones guardadas</td>
                                        <td>Ejecución de un contrato</td>
                                    </tr>
                                    <tr>
                                        <td>Enviarte comunicaciones relacionadas con el servicio (no comerciales)</td>
                                        <td>Cumplimiento de una obligación legal</td>
                                    </tr>
                                    <tr>
                                        <td>Enviarte boletines comerciales (solo si aceptas)</td>
                                        <td>Consentimiento</td>
                                    </tr>
                                    <tr>
                                        <td>Gestionar enlaces de afiliados para generar ingresos</td>
                                        <td>Interés legítimo</td>
                                    </tr>
                                    <tr>
                                        <td>Analizar el uso de la web para mejorarla</td>
                                        <td>Interés legítimo</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Enlaces de afiliados (MUY IMPORTANTE) */}
                        <div className="privacy-section mb-5">
                            <h2 className="h4 mb-3" style={{ color: '#5D4037', borderBottom: '2px solid #2E8B57', paddingBottom: '10px' }}>
                                5. Enlaces de afiliados
                            </h2>
                            <div className="alert alert-info" role="alert">
                                <i className="fas fa-info-circle me-2"></i>
                                <strong>Importante:</strong> Esta web participa en programas de afiliados.
                            </div>
                            <p>
                                runwise participa en el programa de afiliados de <strong>Decathlon</strong> (a través de Rakuten Advertising) 
                                y otros programas de afiliación de tiendas de deporte. Esto significa que:
                            </p>
                            <ul>
                                <li>
                                    <strong>Enlaces de afiliados:</strong> Algunos enlaces a productos que encuentras en nuestra web 
                                    son enlaces de afiliados. Si haces clic en ellos y realizas una compra, podemos recibir una comisión, 
                                    <strong>sin coste adicional para ti</strong>.
                                </li>
                                <li>
                                    <strong>Cookies de seguimiento:</strong> Estos enlaces utilizan cookies para identificar que la 
                                    compra provino de nuestra recomendación. Puedes obtener más información en nuestra 
                                    <Link to="/cookies"> Política de Cookies</Link>.
                                </li>
                                <li>
                                    <strong>Transparencia:</strong> Siempre identificamos claramente cuándo un enlace es de afiliado, 
                                    ya sea con un icono o con un texto aclaratorio.
                                </li>
                            </ul>
                            <p className="mt-3">
                                Las empresas afiliadas (Decathlon, Rakuten, etc.) tienen sus propias políticas de privacidad. 
                                Te recomendamos consultarlas si tienes dudas sobre cómo tratan tus datos.
                            </p>
                        </div>

                        {/* Conservación de datos */}
                        <div className="privacy-section mb-5">
                            <h2 className="h4 mb-3" style={{ color: '#5D4037', borderBottom: '2px solid #2E8B57', paddingBottom: '10px' }}>
                                6. Plazo de conservación de tus datos
                            </h2>
                            <ul>
                                <li><strong>Datos de cuenta:</strong> Mientras mantengas tu cuenta activa. Si la eliminas, tus datos se borrarán en un plazo máximo de 30 días.</li>
                                <li><strong>Datos de perfil:</strong> Hasta que solicites su modificación o eliminación.</li>
                                <li><strong>Datos de navegación (cookies):</strong> Según lo indicado en nuestra Política de Cookies.</li>
                                <li><strong>Datos para envíos comerciales:</strong> Hasta que solicites la baja.</li>
                            </ul>
                        </div>

                        {/* Destinatarios de los datos */}
                        <div className="privacy-section mb-5">
                            <h2 className="h4 mb-3" style={{ color: '#5D4037', borderBottom: '2px solid #2E8B57', paddingBottom: '10px' }}>
                                7. Destinatarios de tus datos
                            </h2>
                            <p>Tus datos podrán ser comunicados a:</p>
                            <ul>
                                <li>
                                    <strong>Proveedores de servicios:</strong> Empresas que nos ayudan a prestar el servicio 
                                    (hosting, email, análisis web). Todos ellos cumplen con la normativa de protección de datos.
                                </li>
                                <li>
                                    <strong>Programas de afiliados:</strong> Cuando haces clic en un enlace de afiliado, 
                                    compartimos cierta información técnica (como tu IP) con la plataforma de afiliados 
                                    (Rakuten, AWIN, etc.) para que puedan atribuir correctamente la venta.
                                </li>
                                <li>
                                    <strong>Administraciones públicas:</strong> Cuando exista una obligación legal.
                                </li>
                            </ul>
                        </div>

                        {/* Transferencias internacionales */}
                        <div className="privacy-section mb-5">
                            <h2 className="h4 mb-3" style={{ color: '#5D4037', borderBottom: '2px solid #2E8B57', paddingBottom: '10px' }}>
                                8. Transferencias internacionales
                            </h2>
                            <p>
                                Algunos de nuestros proveedores (como plataformas de afiliados) pueden estar ubicados fuera del 
                                Espacio Económico Europeo. En estos casos, nos aseguramos de que:
                            </p>
                            <ul>
                                <li>El país destino ofrece un nivel de protección adecuado (decisiones de adecuación de la Comisión Europea).</li>
                                <li>O se utilizan cláusulas contractuales tipo aprobadas por la Comisión Europea.</li>
                            </ul>
                        </div>

                        {/* Derechos del usuario */}
                        <div className="privacy-section mb-5">
                            <h2 className="h4 mb-3" style={{ color: '#5D4037', borderBottom: '2px solid #2E8B57', paddingBottom: '10px' }}>
                                9. Tus derechos
                            </h2>
                            <p>Tienes derecho a:</p>
                            <div className="row">
                                <div className="col-md-6">
                                    <ul>
                                        <li><strong>Acceso:</strong> Saber qué datos tenemos tuyos.</li>
                                        <li><strong>Rectificación:</strong> Corregir datos inexactos.</li>
                                        <li><strong>Supresión:</strong> Que eliminemos tus datos.</li>
                                        <li><strong>Oposición:</strong> Que dejemos de tratar tus datos.</li>
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    <ul>
                                        <li><strong>Limitación:</strong> Restringir el tratamiento.</li>
                                        <li><strong>Portabilidad:</strong> Recibir tus datos en formato estructurado.</li>
                                        <li><strong>Retirar el consentimiento:</strong> En cualquier momento.</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="mt-3">
                                Para ejercer tus derechos, envíanos un email a <strong>info@runwise.es</strong> indicando el derecho que quieres ejercer. 
                                Te responderemos en el plazo máximo de un mes.
                            </p>
                            <p>
                                Si no estás satisfecho con nuestra respuesta, tienes derecho a presentar una reclamación ante la 
                                <strong> Agencia Española de Protección de Datos (AEPD)</strong> (www.aepd.es).
                            </p>
                        </div>

                        {/* Cambios en la política */}
                        <div className="privacy-section mb-5">
                            <h2 className="h4 mb-3" style={{ color: '#5D4037', borderBottom: '2px solid #2E8B57', paddingBottom: '10px' }}>
                                10. Cambios en la política de privacidad
                            </h2>
                            <p>
                                Podemos actualizar esta política de privacidad periódicamente. Te notificaremos cualquier cambio 
                                significativo a través de la web o por email si el cambio te afecta directamente.
                            </p>
                            <p className="mt-3">
                                Te recomendamos revisar esta página regularmente para estar informado de cómo protegemos tus datos.
                            </p>
                        </div>

                        {/* Contacto */}
                        <div className="privacy-section mb-5">
                            <h2 className="h4 mb-3" style={{ color: '#5D4037', borderBottom: '2px solid #2E8B57', paddingBottom: '10px' }}>
                                11. Contacto
                            </h2>
                            <div className="card bg-light p-4">
                                <p className="mb-2"><strong>Responsable:</strong> runwise</p>
                                <p className="mb-2"><strong>Email:</strong> info@runwise.es</p>
                                <p className="mb-0"><strong>Web:</strong> runwise.es</p>
                            </div>
                        </div>

                        {/* Nota legal adicional */}
                        <div className="alert alert-warning mt-4">
                            <i className="fas fa-gavel me-2"></i>
                            <small>
                                Esta política de privacidad está basada en los requisitos del Reglamento General de Protección de Datos (RGPD) 
                                y la Ley Orgánica de Protección de Datos y Garantía de los Derechos Digitales (LOPDGDD). 
                                Fue actualizada por última vez el 23 de febrero de 2025.
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;