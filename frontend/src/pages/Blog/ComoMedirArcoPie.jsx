import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/blog.css';

const ComoMedirArcoPie = () => {
    return (
        <div className="blog-post">
            <div className="blog-hero">
                <h1>¿Cómo saber tu tipo de arco?</h1>
                <p>Descubre si tienes el arco bajo, normal o alto con este sencillo test</p>
            </div>

            <div className="blog-content container">
                <div className="row">
                    <div className="col-lg-8 mx-auto">
                        <div className="blog-section">
                            <h2>¿Por qué es importante el arco del pie?</h2>
                            <p>
                                El arco del pie determina cómo distribuyes el peso y el impacto al correr.
                                Un arco inadecuado para tu tipo de zapatilla puede provocar lesiones como
                                fascitis plantar, tendinitis o sobrecargas.
                            </p>

                            <div className="ilustration">
                                <img
                                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500"
                                    alt="Tipos de arco del pie"
                                    style={{ maxWidth: '100%', borderRadius: '12px' }}
                                />
                            </div>
                        </div>

                        <div className="blog-section">
                            <h2>El test del papel mojado</h2>
                            <p>Este es el método más sencillo y fiable para determinar tu tipo de arco:</p>

                            <div className="method-step">
                                <h3>Paso 1: Prepara los materiales</h3>
                                <ul>
                                    <li>Una hoja de papel oscuro o cartulina</li>
                                    <li>Agua</li>
                                    <li>Una bandeja poco profunda</li>
                                    <li>Toalla</li>
                                </ul>
                            </div>

                            <div className="method-step">
                                <h3>Paso 2: Moja tu pie</h3>
                                <p>
                                    Llena la bandeja con un poco de agua (apenas 1 cm). Moja la planta de tu pie
                                    completamente, asegurándote de que quede bien empapada.
                                </p>
                            </div>

                            <div className="method-step">
                                <h3>Paso 3: Pisa el papel</h3>
                                <p>
                                    Coloca el papel en el suelo y pisa firmemente con todo tu peso. Mantén la
                                    posición unos segundos para que se marque bien la huella.
                                </p>
                            </div>

                            <div className="method-step">
                                <h3>Paso 4: Observa la huella</h3>
                                <p>
                                    Levanta el pie y observa la marca que has dejado. Compara con estas imágenes:
                                </p>
                            </div>
                        </div>

                        <div className="blog-section">
                            <h2>Tipos de arco según la huella</h2>

                            <div className="pisada-card pisada-neutral">
                                <div className="pisada-icon">🦶</div>
                                <div className="pisada-content">
                                    <h4>Arco Normal (Neutro)</h4>
                                    <p>
                                        La huella muestra el antepié conectado al talón por una banda de ancho moderado.
                                        El arco se curva ligeramente hacia dentro. Es el tipo más común y equilibrado.
                                    </p>
                                    <span className="badge-standard">Recomendación: Zapatillas neutras</span>
                                </div>
                            </div>

                            <div className="pisada-card pisada-pronador">
                                <div className="pisada-icon">🦶</div>
                                <div className="pisada-content">
                                    <h4>Arco Bajo (Pie Plano)</h4>
                                    <p>
                                        La huella muestra el pie casi completo, con poca curvatura en el arco.
                                        El pie tiende a girar hacia dentro (pronación) al correr.
                                    </p>
                                    <span className="badge-wide">Recomendación: Zapatillas de estabilidad</span>
                                </div>
                            </div>

                            <div className="pisada-card pisada-supinador">
                                <div className="pisada-icon">🦶</div>
                                <div className="pisada-content">
                                    <h4>Arco Alto (Pie Cavo)</h4>
                                    <p>
                                        La huella muestra solo el talón y el antepié, con una conexión muy estrecha
                                        o inexistente. El pie tiende a girar hacia fuera (supinación).
                                    </p>
                                    <span className="badge-narrow">Recomendación: Zapatillas con amortiguación</span>
                                </div>
                            </div>
                        </div>

                        <div className="blog-section">
                            <h2>Tabla de referencia rápida</h2>
                            <table className="size-table">
                                <thead>
                                    <tr>
                                        <th>Tipo de arco</th>
                                        <th>Características</th>
                                        <th>Recomendación</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Normal</strong></td>
                                        <td>Curvatura moderada, pisada neutra</td>
                                        <td>Zapatillas neutras</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Bajo (Plano)</strong></td>
                                        <td>Poco arco, pronación</td>
                                        <td>Estabilidad / Control de pisada</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Alto (Cavo)</strong></td>
                                        <td>Arco muy marcado, supinación</td>
                                        <td>Amortiguación extra</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="blog-section">
                            <h2>Consejos adicionales</h2>
                            <ul>
                                <li>Haz la prueba con ambos pies (pueden ser diferentes)</li>
                                <li>Si tienes dudas, busca la ayuda de un podólogo deportivo</li>
                                <li>El tipo de arco puede cambiar con la edad o lesiones</li>
                            </ul>
                        </div>

                        <div className="blog-cta">
                            <Link to="/recommend" className="btn-primary">
                                <i className="fas fa-magic"></i>
                                Hacer el test con estos datos
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComoMedirArcoPie;