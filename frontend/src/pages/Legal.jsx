import React from 'react';
import { Link } from 'react-router-dom';

const Legal = () => {
    return (
        <div className="legal-page">
            {/* Hero simple */}
            <div className="legal-hero" style={{
                background: 'linear-gradient(135deg, #2E8B57 0%, #5D4037 100%)',
                color: 'white',
                padding: '60px 0',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
                        <i className="fas fa-gavel me-3"></i>
                        Aviso Legal
                    </h1>
                    <p>Última actualización: 23 de febrero de 2025</p>
                </div>
            </div>

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">

                        {/* Identificación */}
                        <div className="legal-section mb-5">
                            <h2 className="h4 mb-3" style={{ color: '#5D4037', borderBottom: '2px solid #2E8B57', paddingBottom: '10px' }}>
                                1. Identificación del titular
                            </h2>
                            <p>
                                En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002,
                                de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE),
                                se facilitan los siguientes datos identificativos:
                            </p>
                            <ul className="list-unstyled">
                                <li className="mb-2">
                                    <i className="fas fa-user text-success me-2"></i>
                                    <strong>Titular:</strong> runwise
                                </li>
                                <li className="mb-2">
                                    <i className="fas fa-envelope text-success me-2"></i>
                                    <strong>Email de contacto:</strong> runwise.web@gmail.com
                                </li>
                                <li className="mb-2">
                                    <i className="fas fa-globe text-success me-2"></i>
                                    <strong>Web:</strong> runwise.com
                                </li>
                                <li className="mb-2">
                                    <i className="fas fa-map-marker-alt text-success me-2"></i>
                                    <strong>Domicilio:</strong> España
                                </li>
                            </ul>
                            <p className="mt-3">
                                <small className="text-muted">
                                    Nota: Dado que esta web opera bajo el régimen de actividad ocasional,
                                    no se facilita NIF/CIF en este aviso legal por ser un dato de carácter personal.
                                    En caso de requerirse para alguna gestión, se proporcionará de forma privada.
                                </small>
                            </p>
                        </div>

                        {/* Propiedad intelectual */}
                        <div className="legal-section mb-5">
                            <h2 className="h4 mb-3" style={{ color: '#5D4037', borderBottom: '2px solid #2E8B57', paddingBottom: '10px' }}>
                                2. Propiedad intelectual e industrial
                            </h2>
                            <p>
                                Todos los contenidos de esta web (textos, imágenes, logotipos, diseño, estructura, etc.)
                                son propiedad de runwise o se utilizan con licencia de sus respectivos titulares.
                            </p>
                            <p>
                                Queda prohibida la reproducción total o parcial, distribución, comunicación pública
                                o transformación de los contenidos sin la autorización expresa del titular.
                            </p>
                            <p>
                                Las marcas, nombres comerciales y signos distintivos que aparecen en la web pertenecen
                                a sus respectivos propietarios (Nike, Adidas, Salomon, Decathlon, etc.) y se utilizan
                                únicamente con fines de identificación y promoción de productos.
                            </p>
                        </div>

                        {/* Enlaces de afiliados */}
                        <div className="legal-section mb-5">
                            <h2 className="h4 mb-3" style={{ color: '#5D4037', borderBottom: '2px solid #2E8B57', paddingBottom: '10px' }}>
                                3. Enlaces de afiliados y transparencia
                            </h2>
                            <div className="alert alert-info">
                                <i className="fas fa-info-circle me-2"></i>
                                <strong>Importante:</strong> Esta web participa en programas de afiliados.
                            </div>
                            <p>
                                runwise forma parte de programas de afiliados de:
                            </p>
                            <ul>
                                <li><strong>Decathlon</strong> a través de Rakuten Advertising</li>
                                <li><strong>TradeDoubler</strong> (Nike, Adidas, Zalando, etc.)</li>
                                <li><strong>AWIN</strong> (El Corte Inglés, ForumSport, etc.)</li>
                            </ul>
                            <p>
                                Esto significa que:
                            </p>
                            <ul>
                                <li>
                                    Cuando haces clic en un enlace de afiliado y realizas una compra,
                                    podemos recibir una comisión, <strong>sin coste adicional para ti</strong>.
                                </li>
                                <li>
                                    Los precios que ves en los enlaces son los mismos que en la tienda oficial.
                                </li>
                                <li>
                                    Nuestras recomendaciones son independientes y no están condicionadas por los programas
                                    de afiliados. Recomendamos productos que consideramos útiles para nuestros usuarios,
                                    basándonos en sus características y necesidades.
                                </li>
                            </ul>
                            <p>
                                Siempre identificamos claramente los enlaces de afiliados, ya sea con un icono
                                o con un texto aclaratorio.
                            </p>
                        </div>

                        {/* Exención de responsabilidad */}
                        <div className="legal-section mb-5">
                            <h2 className="h4 mb-3" style={{ color: '#5D4037', borderBottom: '2px solid #2E8B57', paddingBottom: '10px' }}>
                                4. Exención de responsabilidad
                            </h2>

                            <h5 className="mt-3">4.1. Contenido de la web</h5>
                            <p>
                                La información proporcionada en esta web tiene carácter meramente informativo y no constituye
                                asesoramiento profesional. runwise no se hace responsable de los daños o perjuicios que
                                pudieran derivarse del uso de la información contenida en la web.
                            </p>

                            <h5 className="mt-3">4.2. Enlaces externos</h5>
                            <p>
                                Esta web contiene enlaces a sitios web externos (Decathlon, TradeDoubler, etc.)
                                sobre los que no tenemos control. No nos hacemos responsables del contenido,
                                políticas de privacidad o prácticas de estos sitios.
                            </p>

                            <h5 className="mt-3">4.3. Funcionamiento de la web</h5>
                            <p>
                                runwise no garantiza la disponibilidad continua y permanente de la web,
                                pudiendo producirse interrupciones por causas técnicas, de mantenimiento u otras.
                            </p>
                        </div>

                        {/* Ley aplicable */}
                        <div className="legal-section mb-5">
                            <h2 className="h4 mb-3" style={{ color: '#5D4037', borderBottom: '2px solid #2E8B57', paddingBottom: '10px' }}>
                                5. Ley aplicable y jurisdicción
                            </h2>
                            <p>
                                Las presentes condiciones se rigen por la legislación española.
                                Para cualquier controversia que pudiera derivarse del acceso o uso de la web,
                                las partes se someten a los juzgados y tribunales de Sevilla,
                                siempre que la normativa aplicable no disponga otra cosa.
                            </p>
                        </div>

                        {/* Contacto */}
                        <div className="legal-section mb-5">
                            <h2 className="h4 mb-3" style={{ color: '#5D4037', borderBottom: '2px solid #2E8B57', paddingBottom: '10px' }}>
                                6. Contacto
                            </h2>
                            <p>
                                Para cualquier consulta relacionada con este aviso legal, puedes escribirnos a:
                            </p>
                            <div className="card bg-light p-3">
                                <p className="mb-1"><strong>Email:</strong> runwise.web@gmail.com</p>
                                <p className="mb-0"><strong>Web:</strong> <runwise className="com"></runwise></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Legal;