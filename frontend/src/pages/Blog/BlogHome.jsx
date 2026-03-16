import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/blog.css';

const BlogHome = () => {
    const articles = [
        {
            id: 1,
            title: "¿Cómo medir el ancho de tu pie?",
            description: "Aprende a medir correctamente el ancho de tu pie para elegir la zapatilla perfecta.",
            icon: "📏",
            link: "/blog/como-medir-ancho-pie",
            category: "Guía"
        },
        {
            id: 2,
            title: "¿Cómo saber tu tipo de arco?",
            description: "Descubre si tienes el arco bajo, normal o alto con este sencillo test del papel mojado.",
            icon: "🦶",
            link: "/blog/como-medir-arco-pie",
            category: "Test"
        },
        {
            id: 3,
            title: "Tipos de pisada: guía completa",
            description: "Aprende a identificar si eres pronador, supinador o neutro y qué zapatilla elegir.",
            icon: "👣",
            link: "/blog/como-saber-mi-pisada",
            category: "Running"
        }
    ];

    return (
        <div className="blog-page">
            <div className="blog-hero">
                <h1>Blog de Running</h1>
                <p>Aprende todo lo necesario para elegir tus zapatillas ideales</p>
            </div>

            <div className="blog-container">
                <div className="blog-grid">
                    {articles.map(article => (
                        <Link to={article.link} key={article.id} className="blog-card">
                            <div className="blog-card-icon">{article.icon}</div>
                            <div className="blog-card-content">
                                <span className="blog-card-category">{article.category}</span>
                                <h2>{article.title}</h2>
                                <p>{article.description}</p>
                                <span className="blog-card-link">
                                    Leer artículo
                                    <i className="fas fa-arrow-right"></i>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogHome;