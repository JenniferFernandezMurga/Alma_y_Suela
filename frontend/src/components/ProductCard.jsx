import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useFavorites } from "../context/FavoritesContext"
import { useShoe } from "../context/ShoeStore"
import "../styles/ProductCard.css"

const ProductCard = ({ product, showFavoriteButton = true, size = 'normal', showQuickActions = true }) => {
    const { state, actions } = useShoe()
    const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
    const navigate = useNavigate()
    
    const [isFavoriteLoading, setIsFavoriteLoading] = useState(false)
    const [showTooltip, setShowTooltip] = useState(false)
    const [imageError, setImageError] = useState(false)
    const [localIsFavorite, setLocalIsFavorite] = useState(false)

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
    } = product || {}

    // Verificar autenticación
    useEffect(() => {
        const isAuth = localStorage.getItem('isAuthenticated') === 'true';
        const user = localStorage.getItem('user');
        
        if (isAuth && user && !state.auth.isAuthenticated) {
            actions.login(JSON.parse(user).email, 'demo').catch(console.error);
        }
    }, [state.auth.isAuthenticated]);

    // Actualizar estado local de favorito
    useEffect(() => {
        if (state.auth.isAuthenticated) {
            setLocalIsFavorite(isFavorite(id))
        } else {
            setLocalIsFavorite(false)
        }
    }, [state.auth.isAuthenticated, isFavorite, id])

    // Placeholder SVG
    const getPlaceholderImage = () => {
        const brandInitial = brand ? brand.charAt(0).toUpperCase() : 'Z'
        return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f8f9fa'/%3E%3Ccircle cx='150' cy='80' r='40' fill='%23e9ecef' stroke='%238B4513' stroke-width='2'/%3E%3Cpath d='M110 140 L190 140 L170 170 L130 170 Z' fill='%23e9ecef' stroke='%238B4513' stroke-width='2'/%3E%3Ctext x='150' y='120' text-anchor='middle' fill='%238B4513' font-family='Arial' font-size='24' font-weight='bold'%3E${brandInitial}%3C/text%3E%3C/svg%3E`
    }

    // Traducciones mejoradas
    const traducirValor = (valor) => {
        const traducciones = {
            "high": "Alto", "medium": "Medio", "low": "Bajo",
            "maximum": "Máxima", "minimal": "Mínima", "standard": "Estándar",
            "long": "Larga", "short": "Corta", "neutral": "Neutral",
            "narrow": "Estrecho", "road_running": "Running",
            "trail_running": "Trail", "gym": "Gimnasio",
            "walking": "Caminar", "training": "Entreno",
            "marathon": "Maratón", "half_marathon": "Media",
            "light": "Ligero", "heavy": "Pesado",
            "over_pronation": "Pronador", "under_pronation": "Supinador"
        }
        return traducciones[valor] || valor
    }

    // Obtener icono para cada característica
    const getIcon = (tipo) => {
        const iconos = {
            cushioning: 'fa-feather',
            distance: 'fa-road',
            footstrike: 'fa-shoe-prints',
            width: 'fa-arrows-alt-h',
            drop: 'fa-sort',
            weight: 'fa-weight-scale'
        }
        return iconos[tipo] || 'fa-tag'
    }

    // Manejar clic en favoritos
    const handleFavoriteClick = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        const user = localStorage.getItem('user');
        
        if (!isAuthenticated || !user) {
            sessionStorage.setItem('redirectAfterLogin', window.location.pathname)
            sessionStorage.setItem('favoriteIntent', JSON.stringify({
                productId: id,
                productData: product
            }))
            navigate('/login')
            return
        }

        setIsFavoriteLoading(true)
        
        try {
            if (localIsFavorite) {
                await removeFromFavorites(id)
            } else {
                await addToFavorites(product)
            }
            setLocalIsFavorite(!localIsFavorite)
        } catch (error) {
            console.error('Error gestionando favorito:', error)
        } finally {
            setIsFavoriteLoading(false)
        }
    }

    // Manejar añadir al carrito
   const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]')
    
    // Verificar si el producto ya está en el carrito
    const existingItemIndex = currentCart.findIndex(item => item.id === id)
    
    if (existingItemIndex >= 0) {
        // Si ya existe, NO incrementamos cantidad, simplemente notificamos
        console.log('ℹ️ Este producto ya está en el carrito')
        // Opcional: mostrar un mensaje al usuario
        alert('Este producto ya está en tu carrito')
    } else {
        // Si no existe, lo añadimos
        currentCart.push({
            id, 
            brand, 
            model, 
            price, 
            image,
            quantity: 1  // Siempre 1, porque contamos productos, no unidades
        })
        
        localStorage.setItem('cart', JSON.stringify(currentCart))
        
        // Disparar evento para actualizar el navbar
        window.dispatchEvent(new Event('cartUpdated'))
        
        console.log('✅ Producto añadido al carrito')
    }
}
    const handleImageError = (e) => {
        if (!imageError) {
            setImageError(true)
            e.target.src = getPlaceholderImage()
            e.target.onerror = null
        }
    }

    const isFav = localIsFavorite
    const sizeClass = size === 'small' ? 'product-card-small' : '';

    return (
        <div className={`product-card-wrapper ${sizeClass}`}>
            <div className="product-card">
                {/* Badges superiores */}
                <div className="product-badges">
                    <span className={`category-badge category-${category}`}>
                        {category === 'running' ? '🏃' : category === 'trail' ? '⛰️' : '💪'}
                        {category?.charAt(0).toUpperCase() + category?.slice(1)}
                    </span>
                    {carbonPlate && (
                        <span className="carbon-badge">
                            ⚡ Carbono
                        </span>
                    )}
                </div>

                {/* Botón de favoritos */}
                {showFavoriteButton && (
                    <div className="favorite-container">
                        <button
                            onClick={handleFavoriteClick}
                            disabled={isFavoriteLoading}
                            className={`favorite-btn ${isFav ? 'active' : ''}`}
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                        >
                            {isFavoriteLoading ? (
                                <div className="favorite-spinner"></div>
                            ) : (
                                <i className={`${isFav ? 'fas' : 'far'} fa-heart`}></i>
                            )}
                        </button>
                        {showTooltip && !isFavoriteLoading && (
                            <div className="favorite-tooltip">
                                {isFav ? 'Eliminar' : 'Guardar'}
                            </div>
                        )}
                    </div>
                )}

                {/* Imagen */}
                <Link to={`/shoes/${id}`} className="product-image-link">
                    <div className="product-image-container">
                        <img
                            src={!imageError && image ? image : getPlaceholderImage()}
                            alt={`${brand} ${model}`}
                            className="product-image"
                            onError={handleImageError}
                            loading="lazy"
                        />
                    </div>
                </Link>

                {/* Información del producto */}
                <div className="product-info">
                    <div className="product-brand">{brand}</div>
                    <h3 className="product-title">
                        <Link to={`/shoes/${id}`}>{model}</Link>
                    </h3>

                    {/* Tags de características - MÁS ETIQUETAS */}
                    <div className="product-tags">
                        {/* Amortiguación */}
                        {cushioning && (
                            <span className="tag" title="Amortiguación">
                                <i className={`fas ${getIcon('cushioning')}`}></i>
                                {traducirValor(cushioning)}
                            </span>
                        )}
                        
                        {/* Distancia */}
                        {distance && (
                            <span className="tag" title="Distancia recomendada">
                                <i className={`fas ${getIcon('distance')}`}></i>
                                {traducirValor(distance)}
                            </span>
                        )}
                        
                        {/* Tipo de pisada */}
                        {footstrike && (
                            <span className="tag" title="Tipo de pisada">
                                <i className={`fas ${getIcon('footstrike')}`}></i>
                                {traducirValor(footstrike)}
                            </span>
                        )}
                        
                        {/* Ancho del pie */}
                        {width && (
                            <span className="tag" title="Ancho del pie">
                                <i className={`fas ${getIcon('width')}`}></i>
                                {traducirValor(width)}
                            </span>
                        )}
                        
                        {/* Actividad principal */}
                        {bestActivity && (
                            <span className="tag" title="Actividad principal">
                                <i className="fas fa-running"></i>
                                {traducirValor(bestActivity)}
                            </span>
                        )}
                    </div>

               {/* Precio y acciones */}
<div className="product-footer">
    <div className="product-price">
        <div className="price-wrapper">
            <span className="from-text">desde</span>
            <span className="current-price p-2 m-2">{price}€</span>
        </div>
        <span className="price-tax">IVA incl.</span>
    </div>
    
    {showQuickActions && (
        <div className="product-actions">
            <button 
                className="btn-cart"
                onClick={handleAddToCart}
                title="Añadir al carrito"
            >
                <i className="fas fa-shopping-cart"></i>
            </button>
            <Link 
                to={`/shoes/${id}`}
                className="btn-details"
                title="Ver detalles"
            >
                <i className="fas fa-chevron-right"></i>
            </Link>
        </div>
    )}
</div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard