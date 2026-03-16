import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/blog.css';

const ComoMedirAnchoPie = () => {
    return (
        <div className="blog-post">
            <div className="blog-hero">
                <h1>¿Cómo medir el ancho de tu pie?</h1>
                <p>Guía práctica para elegir la zapatilla con la horma perfecta</p>
            </div>

            <div className="blog-content container">
                <div className="row">
                    <div className="col-lg-8 mx-auto">
                        <div className="blog-section">
                            <h2>Por qué es importante el ancho del pie</h2>
                            <p>
                                El ancho del pie es tan importante como la talla. Una zapatilla demasiado estrecha
                                puede causar ampollas, juanetes y molestias; mientras que una demasiado ancha no
                                sujetará correctamente el pie, provocando inestabilidad.
                            </p>
                        </div>

                        <div className="blog-section">
                            <h2>Método casero para medir el ancho</h2>

                            <div className="method-step">
                                <h3>Paso 1: Prepara los materiales</h3>
                                <ul>
                                    <li>Un folio en blanco</li>
                                    <li>Un lápiz</li>
                                    <li>Una regla o cinta métrica</li>
                                </ul>
                            </div>

                            <div className="method-step">
                                <h3>Paso 2: Calca tu pie</h3>
                                <p>
                                    Coloca el folio en el suelo, apoya el pie descalzo y marca con el lápiz
                                    el contorno completo. Hazlo con el peso del cuerpo repartido normalmente.
                                </p>
                            </div>

                            <div className="method-step">
                                <h3>Paso 3: Mide la anchura</h3>
                                <p>
                                    Con la regla, mide la distancia entre los puntos más anchos de tu pie
                                    (generalmente a la altura de los metatarsianos).
                                </p>
                            </div>

                            <div className="method-step">
                                <h3>Paso 4: Compara con la tabla</h3>
                                <table className="size-table">
                                    <thead>
                                        <tr>
                                            <th>Medida (cm)</th>
                                            <th>Ancho</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Menos de 9 cm</td>
                                            <td><span className="badge-narrow">Estrecho</span></td>
                                        </tr>
                                        <tr>
                                            <td>9 - 10.5 cm</td>
                                            <td><span className="badge-standard">Normal</span></td>
                                        </tr>
                                        <tr>
                                            <td>Más de 10.5 cm</td>
                                            <td><span className="badge-wide">Ancho</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="blog-section">
                            <h2>Consejos adicionales</h2>
                            <ul>
                                <li>Mide por la tarde: los pies se hinchan ligeramente durante el día</li>
                                <li>Usa los calcetines con los que correrás habitualmente</li>
                                <li>Mide ambos pies y usa la medida del más ancho</li>
                            </ul>
                        </div>

                        <div className="blog-cta">
                            <Link to="/recommend" className="btn-primary">
                                <i className="fas fa-magic"></i>
                                Hacer el test ahora
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComoMedirAnchoPie;