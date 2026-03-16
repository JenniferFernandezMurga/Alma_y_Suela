import React from "react"
import { useLocation, Link } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import "../styles/RecommendationResults.css"

const RecommendationResults = () => {
    const location = useLocation()
    const { recommendations = [], userData } = location.state || {}

    const getMatchColor = (percentage) => {
        const num = parseInt(percentage)
        if (num >= 90) return 'excellent'
        if (num >= 75) return 'good'
        if (num >= 60) return 'medium'
        return 'low'
    }

    if (!recommendations || recommendations.length === 0) {
        return (
            <div className="results-page">
                <div className="empty-state">
                    <div className="empty-icon">
                        <i className="fas fa-hiking"></i>
                    </div>
                    <h2>No encontramos recomendaciones</h2>
                    <p>Intenta ajustar tus criterios de búsqueda</p>
                    <Link to="/recommend" className="btn-primary">
                        <i className="fas fa-arrow-left"></i>
                        Volver
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="results-page">
            {/* Hero con imagen */}
            <div className="results-hero">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <div className="hero-icon">
                        <i className="fas fa-magic"></i>
                    </div>
                    <h1>¡Tus zapatillas ideales!</h1>
                    <p>Basado en tu perfil de corredor</p>
                    
                    {userData && (
                        <div className="profile-summary">
                            <span className="profile-tag">
                                <i className="fas fa-venus-mars"></i>
                                {userData.gender === 'male' ? 'Hombre' : 'Mujer'}
                            </span>
                            <span className="profile-tag">
                                <i className="fas fa-weight-scale"></i>
                                {userData.weight}kg
                            </span>
                            <span className="profile-tag">
                                <i className="fas fa-running"></i>
                                {userData.activity_type === 'road_running' ? 'Asfalto' :
                                 userData.activity_type === 'trail_running' ? 'Trail' :
                                 userData.activity_type === 'gym' ? 'Gym' : 'Caminar'}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Grid de resultados */}
            <div className="results-container">
                <div className="results-grid">
                    {recommendations.map((product, index) => (
                        <div key={product.id} className="product-card-wrapper">
                            <div className="product-card">
                                {/* Badges integrados - Usando las clases del CSS */}
                                <div className="card-badges-container">
                                    <span className="position-badge">#{index + 1}</span>
                                    <span className={`match-badge ${getMatchColor(product.match_percentage)}`}>
                                        {product.match_percentage}
                                    </span>
                                </div>

                                {/* ProductCard con tamaño pequeño */}
                                <ProductCard product={product} size="small" />

                                {/* Detalles del match - Usando las clases del CSS */}
                                {product.match_details && product.match_details.length > 0 && (
                                    <details className="match-details-section">
                                        <summary>
                                            <i className="fas fa-info-circle"></i>
                                            ¿Por qué es compatible?
                                        </summary>
                                        <ul className="match-list">
                                            {product.match_details.map((detail, i) => (
                                                <li key={i}>
                                                    <i className={`fas fa-${detail.includes('✅') ? 'check' : 'info'}-circle`}></i>
                                                    {detail.replace('✅ ', '').replace('⚠️ ', '')}
                                                </li>
                                            ))}
                                        </ul>
                                    </details>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Botones */}
                <div className="results-actions">
                    <Link to="/recommend" className="btn-outline">
                        <i className="fas fa-redo-alt"></i>
                        Nuevo test
                    </Link>
                    {/* <Link to="/" className="btn-primary">
                        <i className="fas fa-home"></i>
                        Inicio
                    </Link> */}
                </div>
            </div>
        </div>
    )
}

export default RecommendationResults