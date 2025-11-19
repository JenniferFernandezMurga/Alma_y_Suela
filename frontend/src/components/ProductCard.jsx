import React from "react"
import { Link } from "react-router-dom"
import "../styles/ProductCard.css"

const ProductCard = ({ product }) => {
    const {
        id,
        brand = "Brand",
        model = "Model",
        price = 0,
        image_url: image,
        category = "running",
        cushioning = "medium",
        best_for_activity: bestActivity,
        distance_capacity: distance,
        footstrike_support: footstrike,
        width_fit: width,
        carbon_plate: carbonPlate = false,
        affiliate_link: affiliateLink
    } = product || {}

    const traducirValor = (valor) => {
        const traducciones = {
            "high": "alto", "medium": "medio", "low": "bajo",
            "maximum": "máxima", "minimal": "mínima", "standard": "estándar",
            "long": "larga", "short": "corta", "neutral": "neutral",
            "narrow": "estrecho", "road_running": "running", "gym": "gimnasio",
            "training": "entrenamiento", "marathon": "maratón", "light": "ligero",
            "heavy": "pesado", "trail_running": "trail"
        }
        return traducciones[valor] || valor
    }

    const getCategoryColor = (category) => {
        const colors = {
            "running": "linear-gradient(135deg, #8fbc8f, #2e8b57)",
            "trail": "linear-gradient(135deg, #d2b48c, #a0522d)",
            "gym": "linear-gradient(135deg, #ff6b6b, #ff8e53)",
            "lifestyle": "linear-gradient(135deg, #667eea, #764ba2)",
            "training": "linear-gradient(135deg, #48bb78, #38a169)"
        }
        return colors[category] || "linear-gradient(135deg, #718096, #4a5568)"
    }

    const getCategoryIcon = (category) => {
        const icons = {
            "running": "🏃‍♂️",
            "trail": "🥾", 
            "gym": "💪",
            "lifestyle": "👟",
            "training": "⚡"
        }
        return icons[category] || "👟"
    }

    return (
        <div className="product-card">
            {/* Badges superiores */}
            <div className="badges-container">
                <span 
                    className="category-badge"
                    style={{ background: getCategoryColor(category) }}
                >
                    {getCategoryIcon(category)} {category?.charAt(0).toUpperCase() + category?.slice(1)}
                </span>
                {carbonPlate && (
                    <span className="carbon-badge">
                        ⚡ Placa Carbono
                    </span>
                )}
            </div>

            {/* Imagen del producto */}
            <div className="card-img-container">
                <Link to={`/shoes/${id}`}>
                    <img 
                        src={image || "/images/placeholder-shoe.jpg"} 
                        className="card-img-top" 
                        alt={`${brand} ${model}`}
                    />
                </Link>
            </div>

            {/* Contenido de la card */}
            <div className="card-body">
                {/* Marca y Modelo */}
                <div className="brand-name">{brand}</div>
                <h6 className="model-name">
                    <Link to={`/shoes/${id}`}>
                        {model}
                    </Link>
                </h6>

                {/* Especificaciones técnicas */}
                <div className="specs-grid">
                    {cushioning && (
                        <div className="spec-item">
                            <span className="spec-label">Amortiguación</span>
                            <span className="spec-value">{traducirValor(cushioning)}</span>
                        </div>
                    )}
                    {distance && (
                        <div className="spec-item">
                            <span className="spec-label">Distancia</span>
                            <span className="spec-value">{traducirValor(distance)}</span>
                        </div>
                    )}
                    {footstrike && (
                        <div className="spec-item">
                            <span className="spec-label">Tipo Pisada</span>
                            <span className="spec-value">{traducirValor(footstrike)}</span>
                        </div>
                    )}
                    {width && (
                        <div className="spec-item">
                            <span className="spec-label">Ancho</span>
                            <span className="spec-value">{traducirValor(width)}</span>
                        </div>
                    )}
                </div>

                {/* Actividad recomendada */}
                {bestActivity && (
                    <div className="activity-section">
                        <span className="activity-badge">
                            🎯 {traducirValor(bestActivity)}
                        </span>
                    </div>
                )}

                {/* Precio y Acciones */}
                <div className="price-section">
                    <div className="price">{price}€</div>
                </div>

                <div className="actions-grid">
                    <Link 
                        to={`/shoes/${id}`}
                        className="btn-details"
                    >
                        🔍 Ver detalles
                    </Link>
                    
                    {affiliateLink && affiliateLink !== "#" && (
                        <a 
                            href={affiliateLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn-buy"
                        >
                            🛒 Comprar
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductCard