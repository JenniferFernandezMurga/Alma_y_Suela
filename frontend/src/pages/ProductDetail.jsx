// import React, { useState, useEffect } from "react"
// import { useParams, Link } from "react-router-dom"
// import PriceComparison from '../components/PriceComparison';

// const ProductDetail = () => {
//     const { id } = useParams()
//     const [shoe, setShoe] = useState(null)
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState(null)

//     useEffect(() => {
//         const fetchShoe = async () => {
//             try {
//                 setLoading(true)
//                 setError(null)
                
//                 console.log("🔄 Buscando producto ID:", id)
                
//                 const response = await fetch(`http://localhost:5000/api/shoes/${id}`)
                
//                 console.log("📡 Response status:", response.status)
                
//                 if (!response.ok) {
//                     throw new Error(`Error HTTP: ${response.status}`)
//                 }
                
//                 const data = await response.json()
//                 console.log("📦 Datos recibidos:", data)
                
//                 if (data.success) {
//                     setShoe(data.shoe)
//                 } else {
//                     throw new Error(data.error || 'Producto no encontrado')
//                 }
                
//             } catch (error) {
//                 console.error("❌ Error cargando producto:", error)
//                 setError(`No se pudo cargar el producto: ${error.message}`)
//             } finally {
//                 setLoading(false)
//             }
//         }

//         if (id) {
//             fetchShoe()
//         }
//     }, [id])

//     if (loading) {
//         return (
//             <div className="container mt-4">
//                 <div className="text-center py-5">
//                     <div className="spinner-border" role="status">
//                         <span className="visually-hidden">Cargando...</span>
//                     </div>
//                     <p className="mt-2">Cargando producto...</p>
//                 </div>
//             </div>
//         )
//     }

//     if (error || !shoe) {
//         return (
//             <div className="container mt-4">
//                 <div className="alert alert-danger">
//                     <h4>Error</h4>
//                     <p>{error || "El producto que buscas no existe."}</p>
//                     <p className="small text-muted">ID: {id}</p>
//                     <Link to="/" className="btn btn-primary">Volver al inicio</Link>
//                 </div>
//             </div>
//         )
//     }

//     // Función para traducir valores
//     const traducirValor = (valor) => {
//         const traducciones = {
//             "high": "alto", "medium": "medio", "low": "bajo",
//             "maximum": "máxima", "minimal": "mínima", "standard": "estándar",
//             "long": "larga", "short": "corta", "neutral": "neutral",
//             "narrow": "estrecho", "road_running": "running en carretera",
//             "trail_running": "trail running", "gym": "gimnasio", 
//             "walking": "caminar", "training": "entrenamiento", 
//             "marathon": "maratón", "half_marathon": "media maratón",
//             "light": "ligero", "heavy": "pesado",
//             "over_pronation": "pronador", "under_pronation": "supinador"
//         }
//         return traducciones[valor] || valor
//     }

//     return (
//         <div className="container mt-4">
//             {/* Migas de pan */}
//             <nav aria-label="breadcrumb">
//                 <ol className="breadcrumb">
//                     <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
//                     <li className="breadcrumb-item"><Link to="/search">Productos</Link></li>
//                     <li className="breadcrumb-item active">{shoe.brand} {shoe.model}</li>
//                 </ol>
//             </nav>

//             <div className="row">
//                 {/* Imagen */}
//                 <div className="col-md-6">
//                     <img 
//                         src={shoe.image_url} 
//                         alt={`${shoe.brand} ${shoe.model}`}
//                         className="img-fluid rounded shadow"
//                         style={{ maxHeight: "500px", objectFit: "contain", width: "100%" }}
//                     />
//                 </div>

//                 {/* Información */}
//                 <div className="col-md-6">
//                     <h1 className="h2">{shoe.brand} {shoe.model}</h1>
//                     <span className="badge bg-secondary">{shoe.category}</span>
                    
//                     <div className="my-4">
//                         <h3 className="text-primary">{shoe.price}€</h3>
//                         {shoe.affiliate_link && shoe.affiliate_link !== "#" && (
//                             <a 
//                                 href={shoe.affiliate_link} 
//                                 target="_blank" 
//                                 rel="noopener noreferrer"
//                                 className="btn btn-success btn-lg mt-2"
//                             >
//                                 🛒 Comprar ahora
//                             </a>
//                         )}
//                     </div>

//                     {/* Especificaciones técnicas */}
//                     <div className="card mb-4">
//                         <div className="card-header bg-light">
//                             <h5 className="mb-0">📋 Especificaciones técnicas</h5>
//                         </div>
//                         <div className="card-body">
//                             <div className="row">
//                                 <div className="col-md-6 mb-3">
//                                     <strong>🏃 Actividad:</strong><br/>
//                                     <span className="text-muted">{traducirValor(shoe.best_for_activity)}</span>
//                                 </div>
//                                 <div className="col-md-6 mb-3">
//                                     <strong>📏 Distancia:</strong><br/>
//                                     <span className="text-muted">{traducirValor(shoe.distance_capacity)}</span>
//                                 </div>
//                                 <div className="col-md-6 mb-3">
//                                     <strong>🦶 Amortiguación:</strong><br/>
//                                     <span className="text-muted">{traducirValor(shoe.cushioning)}</span>
//                                 </div>
//                                 <div className="col-md-6 mb-3">
//                                     <strong>👣 Tipo de pisada:</strong><br/>
//                                     <span className="text-muted">{traducirValor(shoe.footstrike_support)}</span>
//                                 </div>
//                                 <div className="col-md-6 mb-3">
//                                     <strong>📐 Ancho:</strong><br/>
//                                     <span className="text-muted">{traducirValor(shoe.width_fit)}</span>
//                                 </div>
//                                 <div className="col-md-6 mb-3">
//                                     <strong>⚡ Placa de carbono:</strong><br/>
//                                     <span className="text-muted">{shoe.carbon_plate ? "✅ Sí" : "❌ No"}</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* COMPARADOR DE PRECIOS - AQUÍ VA */}
//             <div className="row mt-4">
//                 <div className="col-12">
//                     <PriceComparison shoeId={shoe.id} shoeName={`${shoe.brand} ${shoe.model}`} />
//                 </div>
//             </div>

//             {/* Productos relacionados (opcional) */}
//             <div className="row mt-5">
//                 <div className="col-12">
//                     <h3 className="h4 mb-4">Productos similares</h3>
//                     <p className="text-muted">Próximamente: sugerencias personalizadas</p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ProductDetail



import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PriceComparison from "../components/PriceComparison";
import ProductCard from "../components/ProductCard";
import { shoesService } from "../services/api";
import "../styles/ProductDetail.css";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [shoe, setShoe] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [showShareMenu, setShowShareMenu] = useState(false);

    // Tallas disponibles (simuladas - después vendrán de la BD)
    const sizes = ['39', '40', '41', '42', '43', '44', '45'];

    useEffect(() => {
        if (id) {
            fetchProductDetails();
        }
    }, [id]);

    const fetchProductDetails = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5000/api/shoes/${id}`);
            const data = await response.json();
            
            if (data.success) {
                setShoe(data.shoe);
                // Cargar productos relacionados de la misma marca/actividad
                fetchRelatedProducts(data.shoe);
            } else {
                setError('Producto no encontrado');
            }
        } catch (error) {
            console.error('Error fetching product:', error);
            setError('Error al cargar el producto');
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatedProducts = async (currentShoe) => {
        try {
            // Buscar productos de la misma marca o actividad
            const params = new URLSearchParams();
            if (currentShoe.brand) {
                params.append('marca', currentShoe.brand);
            }
            if (currentShoe.best_for_activity) {
                params.append('activity', currentShoe.best_for_activity);
            }
            
            const response = await fetch(`http://localhost:5000/api/shoes/search?${params.toString()}`);
            const data = await response.json();
            
            if (data.success) {
                // Filtrar el producto actual y limitar a 4
                const related = data.shoes
                    .filter(p => p.id !== currentShoe.id)
                    .slice(0, 4);
                setRelatedProducts(related);
            }
        } catch (error) {
            console.error('Error fetching related products:', error);
        }
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Por favor selecciona una talla');
            return;
        }

        const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        // Verificar si ya existe el producto con la misma talla
        const existingItem = currentCart.find(item => 
            item.id === shoe.id && item.size === selectedSize
        );
        
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + quantity;
        } else {
            currentCart.push({
                id: shoe.id,
                brand: shoe.brand,
                model: shoe.model,
                price: shoe.price,
                image: shoe.image_url,
                size: selectedSize,
                quantity: quantity
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(currentCart));
        window.dispatchEvent(new Event('cartUpdated'));
        
        // Mostrar notificación (mejorar después con un componente)
        alert('✅ Producto añadido al carrito');
    };

    const handleShare = (platform) => {
        const url = window.location.href;
        const text = `Mira estas zapatillas ${shoe.brand} ${shoe.model} en Runwise`;
        
        const shareUrls = {
            whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
            telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
        };
        
        window.open(shareUrls[platform], '_blank', 'noopener,noreferrer');
        setShowShareMenu(false);
    };

    const traducirValor = (valor) => {
        const traducciones = {
            "high": "Alto", "medium": "Medio", "low": "Bajo",
            "maximum": "Máxima", "minimal": "Mínima", "standard": "Estándar",
            "long": "Larga", "short": "Corta", "neutral": "Neutral",
            "narrow": "Estrecho", "road_running": "Running asfalto",
            "trail_running": "Trail running", "gym": "Gimnasio",
            "walking": "Caminar", "training": "Entrenamiento",
            "marathon": "Maratón", "half_marathon": "Media maratón",
            "light": "Ligero", "heavy": "Pesado",
            "over_pronation": "Pronador", "under_pronation": "Supinador"
        };
        return traducciones[valor] || valor;
    };

    const getIcon = (tipo) => {
        const iconos = {
            'brand': 'fas fa-tag',
            'category': 'fas fa-running',
            'gender': 'fas fa-venus-mars',
            'drop': 'fas fa-sort',
            'weight': 'fas fa-weight-scale',
            'sole': 'fas fa-shoe-prints',
            'lug': 'fas fa-mountain',
            'waterproof': 'fas fa-water',
            'terrain': 'fas fa-road',
            'cushioning': 'fas fa-feather',
            'distance': 'fas fa-route',
            'arch': 'fas fa-archway',
            'width': 'fas fa-arrows-alt-h',
            'carbon': 'fas fa-bolt'
        };
        return iconos[tipo] || 'fas fa-info-circle';
    };

    if (loading) {
        return (
            <div className="product-detail-loading">
                <div className="spinner"></div>
                <p>Cargando producto...</p>
            </div>
        );
    }

    if (error || !shoe) {
        return (
            <div className="product-detail-error">
                <i className="fas fa-exclamation-triangle"></i>
                <h2>{error || 'Producto no encontrado'}</h2>
                <button onClick={() => navigate('/catalogo')} className="btn-primary">
                    Volver al catálogo
                </button>
            </div>
        );
    }

    // Galería de imágenes (simulada)
    const images = [shoe.image_url, shoe.image_url, shoe.image_url];

    return (
        <div className="product-detail-page">
            {/* Breadcrumb */}
            <div className="container">
                <nav className="breadcrumb-nav">
                    <Link to="/">Inicio</Link>
                    <span>/</span>
                    <Link to="/catalogo">Catálogo</Link>
                    <span>/</span>
                    <Link to={`/catalogo?marca=${shoe.brand}`}>{shoe.brand}</Link>
                    <span>/</span>
                    <span className="current">{shoe.model}</span>
                </nav>
            </div>
{/* Hero con imagen de fondo */}
<div className="product-detail-hero">
    <div className="hero-overlay"></div>
    <div className="hero-content">
        <h1>{shoe.brand} {shoe.model}</h1>
        <p>Descubre todos los detalles de esta zapatilla</p>
    </div>
</div>
            <div className="product-detail-container">
                {/* Columna izquierda: Imagen y galería */}
                <div className="product-gallery">
                    <div className="main-image">
                        <img 
                            src={images[activeImage]} 
                            alt={`${shoe.brand} ${shoe.model}`}
                            className="main-product-image"
                        />
                    </div>
                    
                    {/* Miniaturas */}
                    {images.length > 1 && (
                        <div className="thumbnail-list">
                            {images.map((img, index) => (
                                <div 
                                    key={index}
                                    className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                                    onClick={() => setActiveImage(index)}
                                >
                                    <img src={img} alt={`Vista ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Columna derecha: Información principal */}
                <div className="product-info-main">
                    <div className="product-header">
                        <h1 className="product-title">{shoe.brand} {shoe.model}</h1>
                        
                        <div className="product-meta">
                            <span className="product-category">
                                <i className="fas fa-tag"></i>
                                {shoe.category?.charAt(0).toUpperCase() + shoe.category?.slice(1)}
                            </span>
                            
                            {shoe.gender && (
                                <span className="product-gender">
                                    <i className="fas fa-venus-mars"></i>
                                    {shoe.gender === 'male' ? 'Hombre' : 
                                     shoe.gender === 'female' ? 'Mujer' : 'Unisex'}
                                </span>
                            )}
                            
                            {shoe.carbon_plate && (
                                <span className="carbon-badge">
                                    <i className="fas fa-bolt"></i>
                                    Placa de carbono
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Precio */}
                    <div className="product-price-section">
                        <div className="price-container">
                            <span className="current-price-large">{shoe.price}€</span>
                            <span className="price-tax">IVA incluido</span>
                        </div>
                        
                        {/* Botón de compartir */}
                        <div className="share-container">
                            <button 
                                className="share-button"
                                onClick={() => setShowShareMenu(!showShareMenu)}
                            >
                                <i className="fas fa-share-alt"></i>
                                Compartir
                            </button>
                            
                            {showShareMenu && (
                                <div className="share-menu">
                                    <button onClick={() => handleShare('whatsapp')}>
                                        <i className="fab fa-whatsapp"></i> WhatsApp
                                    </button>
                                    <button onClick={() => handleShare('facebook')}>
                                        <i className="fab fa-facebook"></i> Facebook
                                    </button>
                                    <button onClick={() => handleShare('twitter')}>
                                        <i className="fab fa-twitter"></i> Twitter
                                    </button>
                                    <button onClick={() => handleShare('telegram')}>
                                        <i className="fab fa-telegram"></i> Telegram
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Selector de talla */}
                    <div className="size-selector">
                        <h3>Selecciona tu talla (EU)</h3>
                        <div className="size-grid">
                            {sizes.map(size => (
                                <button
                                    key={size}
                                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Selector de cantidad */}
                    <div className="quantity-selector">
                        <h3>Cantidad</h3>
                        <div className="quantity-controls">
                            <button 
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="quantity-btn"
                                disabled={quantity <= 1}
                            >
                                <i className="fas fa-minus"></i>
                            </button>
                            <span className="quantity-value">{quantity}</span>
                            <button 
                                onClick={() => setQuantity(quantity + 1)}
                                className="quantity-btn"
                            >
                                <i className="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="product-actions">
                        <button 
                            className="btn-add-to-cart"
                            onClick={handleAddToCart}
                        >
                            <i className="fas fa-shopping-cart"></i>
                            Añadir al carrito
                        </button>
                        <button className="btn-buy-now">
                            <i className="fas fa-bolt"></i>
                            Comprar ahora
                        </button>
                    </div>
                </div>
            </div>

            {/* COMPARADOR DE PRECIOS */}
            <div className="price-comparison-section">
                <PriceComparison shoeId={shoe.id} shoeName={`${shoe.brand} ${shoe.model}`} />
            </div>

            {/* Especificaciones técnicas */}
            <div className="specs-section">
                <h2 className="section-title">
                    <i className="fas fa-clipboard-list"></i>
                    Especificaciones técnicas
                </h2>
                
                <div className="specs-grid">
                    {/* Marca */}
                    <div className="spec-card">
                        <i className={getIcon('brand')}></i>
                        <div className="spec-content">
                            <span className="spec-label">Marca</span>
                            <span className="spec-value">{shoe.brand}</span>
                        </div>
                    </div>

                    {/* Actividad principal */}
                    {shoe.best_for_activity && (
                        <div className="spec-card">
                            <i className={getIcon('category')}></i>
                            <div className="spec-content">
                                <span className="spec-label">Actividad</span>
                                <span className="spec-value">{traducirValor(shoe.best_for_activity)}</span>
                            </div>
                        </div>
                    )}

                    {/* Drop */}
                    {shoe.drop_mm && (
                        <div className="spec-card">
                            <i className={getIcon('drop')}></i>
                            <div className="spec-content">
                                <span className="spec-label">Drop</span>
                                <span className="spec-value">{shoe.drop_mm}mm</span>
                            </div>
                        </div>
                    )}

                    {/* Peso */}
                    {shoe.weight_grams && (
                        <div className="spec-card">
                            <i className={getIcon('weight')}></i>
                            <div className="spec-content">
                                <span className="spec-label">Peso</span>
                                <span className="spec-value">{shoe.weight_grams}g</span>
                            </div>
                        </div>
                    )}

                    {/* Tipo de suela */}
                    {shoe.sole_type && (
                        <div className="spec-card">
                            <i className={getIcon('sole')}></i>
                            <div className="spec-content">
                                <span className="spec-label">Suela</span>
                                <span className="spec-value">{shoe.sole_type}</span>
                            </div>
                        </div>
                    )}

                    {/* Profundidad de taco */}
                    {shoe.lug_depth && (
                        <div className="spec-card">
                            <i className={getIcon('lug')}></i>
                            <div className="spec-content">
                                <span className="spec-label">Taco</span>
                                <span className="spec-value">{shoe.lug_depth}</span>
                            </div>
                        </div>
                    )}

                    {/* Impermeable */}
                    {shoe.waterproof !== undefined && (
                        <div className="spec-card">
                            <i className={getIcon('waterproof')}></i>
                            <div className="spec-content">
                                <span className="spec-label">Impermeable</span>
                                <span className="spec-value">{shoe.waterproof ? 'Sí' : 'No'}</span>
                            </div>
                        </div>
                    )}

                    {/* Terreno recomendado */}
                    {shoe.terrain && (
                        <div className="spec-card">
                            <i className={getIcon('terrain')}></i>
                            <div className="spec-content">
                                <span className="spec-label">Terreno</span>
                                <span className="spec-value">{shoe.terrain}</span>
                            </div>
                        </div>
                    )}

                    {/* Amortiguación */}
                    {shoe.cushioning && (
                        <div className="spec-card">
                            <i className={getIcon('cushioning')}></i>
                            <div className="spec-content">
                                <span className="spec-label">Amortiguación</span>
                                <span className="spec-value">{traducirValor(shoe.cushioning)}</span>
                            </div>
                        </div>
                    )}

                    {/* Tipo de arco */}
                    {shoe.arch_support && (
                        <div className="spec-card">
                            <i className={getIcon('arch')}></i>
                            <div className="spec-content">
                                <span className="spec-label">Soporte arco</span>
                                <span className="spec-value">{traducirValor(shoe.arch_support)}</span>
                            </div>
                        </div>
                    )}

                    {/* Ancho */}
                    {shoe.width_fit && (
                        <div className="spec-card">
                            <i className={getIcon('width')}></i>
                            <div className="spec-content">
                                <span className="spec-label">Ancho</span>
                                <span className="spec-value">{traducirValor(shoe.width_fit)}</span>
                            </div>
                        </div>
                    )}

                    {/* Distancia recomendada */}
                    {shoe.distance_capacity && (
                        <div className="spec-card">
                            <i className={getIcon('distance')}></i>
                            <div className="spec-content">
                                <span className="spec-label">Distancia</span>
                                <span className="spec-value">{traducirValor(shoe.distance_capacity)}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Productos relacionados */}
            {relatedProducts.length > 0 && (
                <div className="related-products-section">
                    <h2 className="section-title">
                        <i className="fas fa-link"></i>
                        Productos relacionados
                    </h2>
                    <div className="related-products-grid">
                        {relatedProducts.map(product => (
                            <ProductCard key={product.id} product={product} size="small" />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
