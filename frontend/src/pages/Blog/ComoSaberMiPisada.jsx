import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/blog.css';

const ComoSaberMiPisada = () => {
    return (
        <div className="blog-post">
            <div className="blog-hero">
                <h1>¿Cómo saber tu tipo de pisada?</h1>
                <p>Guía completa para identificar si eres pronador, supinador o neutro</p>
            </div>
            
            <div className="blog-content container">
                <div className="row">
                    <div className="col-lg-8 mx-auto">
                        <div className="blog-section">
                            <h2>¿Qué es el tipo de pisada?</h2>
                            <p>
                                El tipo de pisada describe cómo se mueve tu pie al correr. Es la combinación 
                                de tres movimientos: flexibilidad del arco, rotación del tobillo y apoyo del pie. 
                                Elegir la zapatilla incorrecta puede provocar lesiones por sobreuso.
                            </p>
                        </div>

                        <div className="blog-section">
                            <h2>Los tres tipos de pisada</h2>
                            
                            <div className="pisada-card pisada-neutral">
                                <div className="pisada-icon">👣</div>
                                <div className="pisada-content">
                                    <h4>Pisada Neutra</h4>
                                    <p>
                                        <strong>Cómo es:</strong> El pie apoya en el talón, rota ligeramente hacia dentro 
                                        y despega de manera uniforme. Es la pisada más eficiente y la que menos 
                                        riesgo de lesiones tiene.
                                    </p>
                                    <p>
                                        <strong>Qué zapatilla usar:</strong> Zapatillas neutras con buena amortiguación.
                                    </p>
                                </div>
                            </div>

                            <div className="pisada-card pisada-pronador">
                                <div className="pisada-icon">👣</div>
                                <div className="pisada-content">
                                    <h4>Pisada Pronadora</h4>
                                    <p>
                                        <strong>Cómo es:</strong> El pie gira excesivamente hacia dentro después del 
                                        apoyo. El arco tiende a colapsar. Es común en personas con pie plano.
                                    </p>
                                    <p>
                                        <strong>Riesgos:</strong> Fascitis plantar, tendinitis tibial, dolor en la rodilla.
                                    </p>
                                    <p>
                                        <strong>Qué zapatilla usar:</strong> Zapatillas de estabilidad o control de pisada.
                                    </p>
                                </div>
                            </div>

                            <div className="pisada-card pisada-supinador">
                                <div className="pisada-icon">👣</div>
                                <div className="pisada-content">
                                    <h4>Pisada Supinadora</h4>
                                    <p>
                                        <strong>Cómo es:</strong> El pie gira hacia fuera, con poco movimiento de 
                                        rotación. El arco es alto y rígido. El impacto se concentra en la parte externa.
                                    </p>
                                    <p>
                                        <strong>Riesgos:</strong> Fracturas por estrés, esguinces de tobillo, fascitis.
                                    </p>
                                    <p>
                                        <strong>Qué zapatilla usar:</strong> Zapatillas neutras con máxima amortiguación.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="blog-section">
                            <h2>Métodos para identificar tu pisada</h2>
                            
                            <h3>1. Test de la zapatilla usada</h3>
                            <p>Observa el desgaste de tus zapatillas viejas:</p>
                            <ul>
                                <li>
                                    <strong>Desgaste en el centro del talón y antepié:</strong> Pisada neutra
                                </li>
                                <li>
                                    <strong>Desgaste en la parte interna:</strong> Pronador
                                </li>
                                <li>
                                    <strong>Desgaste en la parte externa:</strong> Supinador
                                </li>
                            </ul>

                            <h3>2. Análisis en tienda especializada</h3>
                            <p>
                                Muchas tiendas de running ofrecen análisis de pisada gratuitos con cinta de correr 
                                y cámara de video. Es el método más fiable.
                            </p>

                            <h3>3. Aplicaciones móviles</h3>
                            <p>
                                Existen apps que analizan tu pisada grabando en cámara lenta mientras corres en una cinta.
                            </p>
                        </div>

                        <div className="blog-section">
                            <h2>Tabla comparativa de tipos de pisada</h2>
                            <table className="size-table">
                                <thead>
                                    <tr>
                                        <th>Característica</th>
                                        <th>Neutro</th>
                                        <th>Pronador</th>
                                        <th>Supinador</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Movimiento del pie</strong></td>
                                        <td>Equilibrado</td>
                                        <td>Gira hacia dentro</td>
                                        <td>Gira hacia fuera</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Arco del pie</strong></td>
                                        <td>Normal</td>
                                        <td>Bajo / Plano</td>
                                        <td>Alto</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Desgaste de zapatilla</strong></td>
                                        <td>Centro</td>
                                        <td>Parte interna</td>
                                        <td>Parte externa</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Zapatilla recomendada</strong></td>
                                        <td>Neutra</td>
                                        <td>Estabilidad</td>
                                        <td>Amortiguación</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="blog-section">
                            <h2>Consejos para elegir zapatilla según tu pisada</h2>
                            <ul>
                                <li>
                                    <strong>Si eres neutro:</strong> Tienes más libertad, cualquier zapatilla neutra 
                                    de calidad te servirá. Céntrate en la amortiguación y el tipo de carrera.
                                </li>
                                <li>
                                    <strong>Si eres pronador:</strong> Necesitas una zapatilla con soporte medial 
                                    (una pieza más densa en la parte interna) para controlar el giro.
                                </li>
                                <li>
                                    <strong>Si eres supinador:</strong> Busca máxima amortiguación y flexibilidad 
                                    para compensar la falta de absorción de impactos natural.
                                </li>
                            </ul>
                        </div>

                        <div className="blog-cta">
                            <Link to="/recommend" className="btn-primary">
                                <i className="fas fa-magic"></i>
                                Descubre tu zapatilla ideal
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComoSaberMiPisada;