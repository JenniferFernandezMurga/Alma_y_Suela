import React from "react"
import { Link } from "react-router-dom"

const ProductCard = ({ product }) => {
    // Usar los nombres en inglés que vienen del backend
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

    // Función para traducir valores al español para mostrar
    const traducirValor = (valor) => {
        const traducciones = {
            "high": "alto",
            "medium": "medio",
            "low": "bajo",
            "maximum": "máxima",
            "minimal": "mínima",
            "standard": "estándar",
            "long": "larga",
            "short": "corta",
            "neutral": "neutral",
            "narrow": "estrecho",
            "road_running": "running en carretera",
            "gym": "gimnasio",
            "training": "entrenamiento",
            "marathon": "maratón",
            "light": "ligero",
            "heavy": "pesado"
        }
        return traducciones[valor] || valor
    }

    // Función para obtener badge de categoría
    const getCategoryBadge = (category) => {
        const colores = {
            "running": "primary",
            "trail": "success",
            "gym": "warning",
            "lifestyle": "info"
        }
        return colores[category] || "secondary"
    }

    return (
        <div className="card product-card h-100 shadow-sm">
            {/* Badge de categoría */}
            <div className="position-absolute top-0 start-0 p-2">
                <span className={`badge bg-${getCategoryBadge(category)}`}>
                    {category?.charAt(0).toUpperCase() + category?.slice(1)}
                </span>
            </div>

            {/* Badge de placa de carbono */}
            {carbonPlate && (
                <div className="position-absolute top-0 end-0 p-2">
                    <span className="badge bg-dark">
                        ⚡ Carbono
                    </span>
                </div>
            )}

            {/* Imagen del producto */}
            <Link to={`/shoes/${id}`} className="text-decoration-none">
                <img
                    src={image || "/images/placeholder-shoe.jpg"}
                    className="card-img-top p-3"
                    alt={`${brand} ${model}`}
                    style={{
                        height: "200px",
                        objectFit: "contain",
                        transition: "transform 0.3s ease"
                    }}
                    onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
                    onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                />
            </Link>

            {/* Contenido de la card */}
            <div className="card-body d-flex flex-column">
                {/* Marca */}
                <small className="text-muted text-uppercase fw-bold">{brand}</small>

                {/* Modelo */}
                <h6 className="card-title mt-1" style={{ minHeight: "48px" }}>
                    <Link to={`/shoes/${id}`} className="text-dark text-decoration-none">
                        {model}
                    </Link>
                </h6>

                {/* Especificaciones técnicas */}
                <div className="specs-section mb-3">
                    <div className="row small text-muted g-1">
                        {/* Amortiguación */}
                        {cushioning && (
                            <div className="col-6">
                                <strong>Amortiguación:</strong> {traducirValor(cushioning)}
                            </div>
                        )}

                        {/* Distancia */}
                        {distance && (
                            <div className="col-6">
                                <strong>Distancia:</strong> {traducirValor(distance)}
                            </div>
                        )}

                        {/* Tipo de pisada */}
                        {footstrike && (
                            <div className="col-6">
                                <strong>Pisada:</strong> {traducirValor(footstrike)}
                            </div>
                        )}

                        {/* Ancho */}
                        {width && (
                            <div className="col-6">
                                <strong>Ancho:</strong> {traducirValor(width)}
                            </div>
                        )}
                    </div>
                </div>

                {/* Actividad recomendada */}
                {bestActivity && (
                    <div className="activity-section mb-3">
                        <small className="text-muted d-block mb-1">Ideal para:</small>
                        <span className="badge bg-light text-dark border">
                            {traducirValor(bestActivity)}
                        </span>
                    </div>
                )}

                {/* Precio y acción */}
                <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="h5 text-primary mb-0">{price}€</span>

                        {/* Enlace de afiliado */}
                        {affiliateLink && affiliateLink !== "#" && (
                            <a
                                href={affiliateLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline-success btn-sm"
                            >
                                Comprar
                            </a>
                        )}
                    </div>

                    {/* Botón de detalles */}
                    <Link 
                        to={`/shoes/${id}`}
                        className="btn btn-primary w-100"
                    >
                        <i className="fas fa-info-circle me-2"></i>
                        Ver detalles
                    </Link>
                </div>
            </div>

            {/* Efectos hover */}
            <style>{`
                .product-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    border: 1px solid #e9ecef;
                }
                .product-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
                }
            `}</style>
        </div>
    )
}

export default ProductCard