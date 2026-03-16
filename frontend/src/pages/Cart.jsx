import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShoe } from '../context/ShoeStore';
import '../styles/Cart.css';

const Cart = () => {
    const { state } = useShoe();
    const navigate = useNavigate();
    
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectionMode, setSelectionMode] = useState(false);
    const [comparisonMode, setComparisonMode] = useState(false);

    // Redirigir si no está autenticado
    useEffect(() => {
        if (!state.auth.isAuthenticated) {
            navigate('/login');
        }
    }, [state.auth.isAuthenticated, navigate]);

    // Cargar carrito
    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = () => {
        setLoading(true);
        try {
            // Cargar desde localStorage
            const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
            
            // Enriquecer con datos de productos
            const enrichedCart = storedCart.map(item => ({
                ...item,
                image: item.image || 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
                brand: item.brand || 'Nike',
                name: item.name || 'Zapatilla Running',
                price: item.price || 129.99,
                originalPrice: item.originalPrice || 159.99,
                retailer: item.retailer || 'Running Store',
                retailerLogo: item.retailerLogo || 'https://via.placeholder.com/50',
                affiliateUrl: item.affiliateUrl || '#',
                rating: item.rating || 4.5,
                reviews: item.reviews || 128,
                delivery: item.delivery || 'Envío gratis',
                inStock: item.inStock !== undefined ? item.inStock : true
            }));
            
            setCartItems(enrichedCart);
        } catch (error) {
            console.error('Error cargando carrito:', error);
            showNotification('Error al cargar el carrito', 'error');
        } finally {
            setLoading(false);
        }
    };

    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
    };

    const removeItem = async (itemId) => {
        if (!window.confirm('¿Eliminar este producto de tu lista?')) return;
        
        setUpdating(true);
        try {
            const updatedItems = cartItems.filter(item => item.id !== itemId);
            setCartItems(updatedItems);
            localStorage.setItem('cart', JSON.stringify(updatedItems));
            setSelectedItems(prev => prev.filter(id => id !== itemId));
            
            showNotification('Producto eliminado de tu lista', 'success');
        } catch (error) {
            console.error('Error eliminando producto:', error);
            showNotification('Error al eliminar', 'error');
        } finally {
            setUpdating(false);
        }
    };

    const clearCart = () => {
        if (cartItems.length === 0) return;
        
        if (window.confirm('¿Vaciar toda tu lista?')) {
            setCartItems([]);
            localStorage.setItem('cart', JSON.stringify([]));
            setSelectedItems([]);
            setSelectionMode(false);
            showNotification('Lista vaciada', 'info');
        }
    };

    const toggleSelectionMode = () => {
        setSelectionMode(!selectionMode);
        if (!selectionMode) {
            setSelectedItems([]);
        }
    };

    const toggleItemSelection = (itemId) => {
        setSelectedItems(prev => 
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    const selectAll = () => {
        if (selectedItems.length === cartItems.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(cartItems.map(item => item.id));
        }
    };

    const handleCompare = () => {
        if (selectedItems.length < 2) {
            showNotification('Selecciona al menos 2 productos para comparar', 'warning');
            return;
        }
        setComparisonMode(true);
        // Aquí podrías navegar a una página de comparación
        // navigate('/compare', { state: { products: selectedItems } });
    };

    const handleVisitStore = (affiliateUrl) => {
        // Abrir enlace de afiliado en nueva pestaña
        window.open(affiliateUrl, '_blank', 'noopener,noreferrer');
        
        // Registrar clic para analytics
        console.log('Redirigiendo a tienda:', affiliateUrl);
        
        // Mostrar notificación
        showNotification('¡Gracias por confiar en nosotros! Serás redirigido a la tienda', 'success');
    };

    const itemCount = cartItems.length;
    const totalValue = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
    const averagePrice = itemCount > 0 ? (totalValue / itemCount).toFixed(2) : 0;

    // Productos recomendados
    const recommendedProducts = [
        {
            id: 'rec1',
            name: 'Nike Pegasus 40',
            price: 139.99,
            image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200',
            brand: 'Nike',
            retailer: 'Sport Zone'
        },
        {
            id: 'rec2',
            name: 'Hoka Speedgoat 5',
            price: 159.99,
            image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200',
            brand: 'Hoka',
            retailer: 'Running Warehouse'
        },
        {
            id: 'rec3',
            name: 'Salomon Ultra Glide',
            price: 149.99,
            image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200',
            brand: 'Salomon',
            retailer: 'Trail Shop'
        }
    ];

    if (loading) {
        return (
            <div className="cart-loading">
                <div className="container text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando lista...</span>
                    </div>
                    <p className="mt-3 text-muted">Cargando tu lista de productos...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            {/* Hero de la lista */}
            <div className="cart-hero">
                <div className="container">
                    <div className="cart-hero-content">
                        <div className="cart-icon-wrapper">
                            <div className="cart-icon-large">
                                <i className="fas fa-clipboard-list"></i>
                            </div>
                        </div>
                        <div className="cart-header-info">
                            <h1 className="cart-title">Mi lista de productos</h1>
                            <p className="cart-subtitle">
                                {cartItems.length === 0 
                                    ? 'Tu lista está vacía' 
                                    : `${itemCount} ${itemCount === 1 ? 'producto' : 'productos'} guardados`
                                }
                            </p>
                            
                            {cartItems.length > 0 && (
                                <div className="cart-stats">
                                    <div className="cart-stat">
                                        <span className="stat-highlight">{itemCount}</span>
                                        <span className="stat-label">productos</span>
                                    </div>
                                    <div className="cart-stat">
                                        <span className="stat-highlight">{averagePrice}€</span>
                                        <span className="stat-label">precio medio</span>
                                    </div>
                                    <div className="cart-stat">
                                        <span className="stat-highlight">
                                            {cartItems.filter(p => p.inStock).length}
                                        </span>
                                        <span className="stat-label">en stock</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                <div className="cart-wave">
                    <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
                        <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
                    </svg>
                </div>
            </div>

            <div className="container cart-container">
                {/* Notificación */}
                {notification.show && (
                    <div className={`cart-notification ${notification.type}`}>
                        <i className={`fas fa-${
                            notification.type === 'success' ? 'check-circle' : 
                            notification.type === 'error' ? 'exclamation-circle' : 'info-circle'
                        }`}></i>
                        <span>{notification.message}</span>
                    </div>
                )}

                {cartItems.length === 0 ? (
                    <div className="empty-cart">
                        <div className="empty-state">
                            <div className="empty-icon">
                                <i className="fas fa-clipboard-list"></i>
                            </div>
                            <h2>Tu lista está vacía</h2>
                            <p className="empty-description">
                                Guarda productos aquí para compararlos después. 
                                No vendemos directamente, te ayudamos a encontrar la mejor opción
                                y te redirigimos a las tiendas oficiales.
                            </p>
                            
                            <div className="empty-actions">
                                <Link to="/recommend" className="btn-primary">
                                    <i className="fas fa-magic"></i>
                                    Encontrar zapatillas
                                </Link>
                                <Link to="/search" className="btn-secondary">
                                    <i className="fas fa-search"></i>
                                    Explorar catálogo
                                </Link>
                            </div>

                            <div className="empty-benefits">
                                <div className="benefit-item">
                                    <i className="fas fa-store"></i>
                                    <span>Múltiples tiendas</span>
                                </div>
                                <div className="benefit-item">
                                    <i className="fas fa-chart-line"></i>
                                    <span>Compara precios</span>
                                </div>
                                <div className="benefit-item">
                                    <i className="fas fa-hand-holding-heart"></i>
                                    <span>Sin compromiso</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="cart-content">
                        {/* Columna izquierda - Productos */}
                        <div className="cart-items-section">
                            {/* Barra de acciones */}
                            <div className="cart-actions-bar">
                                <div className="actions-left">
                                    <button 
                                        className={`selection-mode-btn ${selectionMode ? 'active' : ''}`}
                                        onClick={toggleSelectionMode}
                                        disabled={updating}
                                    >
                                        <i className={`fas fa-${selectionMode ? 'times' : 'check-square'}`}></i>
                                        {selectionMode ? 'Cancelar' : 'Seleccionar'}
                                    </button>
                                    
                                    {selectionMode && (
                                        <>
                                            <button 
                                                className="select-all-btn"
                                                onClick={selectAll}
                                                disabled={updating}
                                            >
                                                <i className={`fas fa-${selectedItems.length === cartItems.length ? 'check-square' : 'square'}`}></i>
                                                {selectedItems.length === cartItems.length ? 'Deseleccionar' : 'Seleccionar todo'}
                                            </button>
                                            
                                            {selectedItems.length >= 2 && (
                                                <button 
                                                    className="compare-btn"
                                                    onClick={handleCompare}
                                                    disabled={updating}
                                                >
                                                    <i className="fas fa-balance-scale"></i>
                                                    Comparar ({selectedItems.length})
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>
                                
                                <div className="actions-right">
                                    <button 
                                        className="clear-cart-btn"
                                        onClick={clearCart}
                                        disabled={updating}
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                        Vaciar lista
                                    </button>
                                </div>
                            </div>

                            {/* Lista de productos */}
                            <div className="cart-items-list">
                                {cartItems.map((item, index) => (
                                    <div 
                                        key={item.id || index} 
                                        className={`cart-item ${selectionMode ? 'selection-mode' : ''} ${
                                            selectedItems.includes(item.id) ? 'selected' : ''
                                        }`}
                                    >
                                        {selectionMode && (
                                            <div 
                                                className="selection-checkbox"
                                                onClick={() => toggleItemSelection(item.id)}
                                            >
                                                <div className={`checkbox ${selectedItems.includes(item.id) ? 'checked' : ''}`}>
                                                    {selectedItems.includes(item.id) && (
                                                        <i className="fas fa-check"></i>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        
                                        <div className="item-image">
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                        
                                        <div className="item-details">
                                            <div className="item-header">
                                                <div>
                                                    <span className="item-brand">{item.brand}</span>
                                                    <h3 className="item-name">{item.name}</h3>
                                                </div>
                                                <button 
                                                    className="item-remove"
                                                    onClick={() => removeItem(item.id)}
                                                    disabled={updating}
                                                >
                                                    <i className="fas fa-times"></i>
                                                </button>
                                            </div>
                                            
                                            <div className="item-specs">
                                                <span className="item-spec">
                                                    <i className="fas fa-store"></i>
                                                    {item.retailer}
                                                </span>
                                                <span className="item-spec">
                                                    <i className="fas fa-star text-warning"></i>
                                                    {item.rating} ({item.reviews} valoraciones)
                                                </span>
                                            </div>
                                            
                                            <div className="item-footer">
                                                <div className="item-prices">
                                                    {item.originalPrice > item.price && (
                                                        <span className="original-price">
                                                            {item.originalPrice}€
                                                        </span>
                                                    )}
                                                    <span className="current-price">
                                                        {item.price}€
                                                    </span>
                                                </div>
                                                
                                                <div className="item-actions">
                                                    {item.delivery && (
                                                        <span className="delivery-badge">
                                                            <i className="fas fa-truck"></i>
                                                            {item.delivery}
                                                        </span>
                                                    )}
                                                    
                                                    <button 
                                                        className={`visit-store-btn ${!item.inStock ? 'out-of-stock' : ''}`}
                                                        onClick={() => handleVisitStore(item.affiliateUrl)}
                                                        disabled={!item.inStock || updating}
                                                    >
                                                        {item.inStock ? (
                                                            <>
                                                                <i className="fas fa-external-link-alt"></i>
                                                                Ver en tienda
                                                            </>
                                                        ) : (
                                                            <>
                                                                <i className="fas fa-times-circle"></i>
                                                                Sin stock
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            {!item.inStock && (
                                                <div className="stock-warning">
                                                    <i className="fas fa-exclamation-triangle"></i>
                                                    Producto agotado temporalmente
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Información adicional */}
                            <div className="cart-info-boxes">
                                <div className="info-box">
                                    <i className="fas fa-store-alt"></i>
                                    <div>
                                        <h4>Múltiples tiendas</h4>
                                        <p>Comparamos precios en las mejores tiendas de running</p>
                                    </div>
                                </div>
                                <div className="info-box">
                                    <i className="fas fa-hand-holding-usd"></i>
                                    <div>
                                        <h4>Sin costo adicional</h4>
                                        <p>El precio es el mismo que en la tienda oficial</p>
                                    </div>
                                </div>
                                <div className="info-box">
                                    <i className="fas fa-chart-bar"></i>
                                    <div>
                                        <h4>Mejor precio garantizado</h4>
                                        <p>Te mostramos la mejor oferta disponible</p>
                                    </div>
                                </div>
                            </div>

                            {/* Productos recomendados */}
                            <div className="cart-recommendations">
                                <h3>
                                    <i className="fas fa-lightbulb"></i>
                                    Productos similares que te pueden interesar
                                </h3>
                                <div className="recommended-grid">
                                    {recommendedProducts.map(product => (
                                        <div key={product.id} className="recommended-card">
                                            <img src={product.image} alt={product.name} />
                                            <div className="recommended-info">
                                                <span className="recommended-brand">{product.brand}</span>
                                                <h4>{product.name}</h4>
                                                <div className="recommended-footer">
                                                    <div>
                                                        <span className="recommended-price">{product.price}€</span>
                                                        <span className="recommended-retailer">{product.retailer}</span>
                                                    </div>
                                                    <button className="add-recommended-btn">
                                                        <i className="fas fa-plus"></i>
                                                        Guardar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Columna derecha - Resumen y comparativa */}
                        <div className="cart-summary-section">
                            <div className="summary-card">
                                <h2>Resumen de tu lista</h2>
                                
                                <div className="summary-stats">
                                    <div className="summary-stat">
                                        <span className="stat-label">Total productos</span>
                                        <span className="stat-value">{itemCount}</span>
                                    </div>
                                    <div className="summary-stat">
                                        <span className="stat-label">Valor total</span>
                                        <span className="stat-value">{totalValue.toFixed(2)}€</span>
                                    </div>
                                    <div className="summary-stat">
                                        <span className="stat-label">Precio medio</span>
                                        <span className="stat-value">{averagePrice}€</span>
                                    </div>
                                    <div className="summary-stat">
                                        <span className="stat-label">Disponibles</span>
                                        <span className="stat-value success">
                                            {cartItems.filter(p => p.inStock).length}
                                        </span>
                                    </div>
                                </div>

                                {/* Comparativa rápida */}
                                {cartItems.length >= 2 && (
                                    <div className="quick-comparison">
                                        <h3>
                                            <i className="fas fa-balance-scale"></i>
                                            Comparativa rápida
                                        </h3>
                                        
                                        <div className="comparison-table">
                                            <div className="comparison-row header">
                                                <span>Modelo</span>
                                                <span>Precio</span>
                                                <span>Tienda</span>
                                                <span>Valoración</span>
                                            </div>
                                            
                                            {cartItems.slice(0, 3).map(item => (
                                                <div key={item.id} className="comparison-row">
                                                    <span className="model">{item.brand} {item.name}</span>
                                                    <span className="price">{item.price}€</span>
                                                    <span className="retailer">{item.retailer}</span>
                                                    <span className="rating">
                                                        <i className="fas fa-star text-warning"></i>
                                                        {item.rating}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        
                                        {cartItems.length > 3 && (
                                            <p className="more-items">
                                                +{cartItems.length - 3} productos más en tu lista
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Acciones principales */}
                                <div className="summary-actions">
                                    <button 
                                        className="compare-all-btn"
                                        onClick={() => {
                                            setSelectedItems(cartItems.map(i => i.id));
                                            setSelectionMode(true);
                                        }}
                                        disabled={cartItems.length < 2}
                                    >
                                        <i className="fas fa-balance-scale"></i>
                                        Comparar todos
                                    </button>
                                    
                                    <button 
                                        className="share-list-btn"
                                        onClick={() => {
                                            navigator.clipboard?.writeText(window.location.href);
                                            showNotification('¡Enlace copiado! Comparte tu lista', 'success');
                                        }}
                                    >
                                        <i className="fas fa-share-alt"></i>
                                        Compartir lista
                                    </button>
                                </div>

                                {/* Consejos */}
                                <div className="shopping-tips">
                                    <h4>
                                        <i className="fas fa-lightbulb"></i>
                                        Consejos de compra
                                    </h4>
                                    <ul>
                                        <li>
                                            <i className="fas fa-check-circle text-success"></i>
                                            Compara precios en diferentes tiendas
                                        </li>
                                        <li>
                                            <i className="fas fa-check-circle text-success"></i>
                                            Lee las valoraciones de otros compradores
                                        </li>
                                        <li>
                                            <i className="fas fa-check-circle text-success"></i>
                                            Verifica la política de devoluciones
                                        </li>
                                        <li>
                                            <i className="fas fa-check-circle text-success"></i>
                                            Busca cupones de descuento adicionales
                                        </li>
                                    </ul>
                                </div>

                                {/* Marcas populares */}
                                <div className="popular-brands">
                                    <h4>Marcas en tu lista</h4>
                                    <div className="brand-tags">
                                        {[...new Set(cartItems.map(i => i.brand))].map(brand => (
                                            <span key={brand} className="brand-tag">
                                                {brand}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;