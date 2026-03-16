import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useShoe } from '../context/ShoeStore';
import ProductCard from '../components/ProductCard';
import '../styles/Wishlist.css';

const Wishlist = () => {
    const { state } = useShoe();
    const { favorites, loading, removeFromFavorites, clearFavorites } = useFavorites();
    const navigate = useNavigate();

    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectionMode, setSelectionMode] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    // Redirigir si no está autenticado
    useEffect(() => {
        if (!state.auth.isAuthenticated) {
            navigate('/login');
        }
    }, [state.auth.isAuthenticated, navigate]);

    // Agrupar por marca para estadísticas
    const brandStats = favorites.reduce((acc, product) => {
        acc[product.brand] = (acc[product.brand] || 0) + 1;
        return acc;
    }, {});

    const topBrand = Object.keys(brandStats).length > 0
        ? Object.keys(brandStats).reduce((a, b) => brandStats[a] > brandStats[b] ? a : b)
        : null;

    const handleRemove = async (productId) => {
        const result = await removeFromFavorites(productId);
        if (result.success) {
            showNotification('Producto eliminado de favoritos', 'success');
            setSelectedProducts(prev => prev.filter(id => id !== productId));
        }
    };

    const handleRemoveSelected = async () => {
        if (selectedProducts.length === 0) return;

        if (window.confirm(`¿Eliminar ${selectedProducts.length} producto(s) de favoritos?`)) {
            for (const id of selectedProducts) {
                await removeFromFavorites(id);
            }
            setSelectedProducts([]);
            setSelectionMode(false);
            showNotification(`${selectedProducts.length} producto(s) eliminados`, 'success');
        }
    };

    const handleClearAll = async () => {
        if (favorites.length === 0) return;

        if (window.confirm('¿Estás seguro de que quieres eliminar TODOS tus favoritos?')) {
            await clearFavorites();
            setSelectedProducts([]);
            setSelectionMode(false);
            showNotification('Todos los favoritos han sido eliminados', 'info');
        }
    };

    const toggleProductSelection = (productId) => {
        setSelectedProducts(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const toggleSelectionMode = () => {
        setSelectionMode(!selectionMode);
        setSelectedProducts([]);
    };

    const selectAll = () => {
        if (selectedProducts.length === favorites.length) {
            setSelectedProducts([]);
        } else {
            setSelectedProducts(favorites.map(p => p.id));
        }
    };

    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
    };

    const getRecommendationFromFavorites = () => {
        // Analizar favoritos para sugerir productos similares
        const brands = Object.keys(brandStats);
        const activities = favorites.map(p => p.best_for_activity).filter(Boolean);
        const mostCommonActivity = activities.length > 0
            ? activities.sort((a,b) =>
                activities.filter(v => v === a).length -
                activities.filter(v => v === b).length
            ).pop()
            : null;

        // Construir URL de búsqueda basada en favoritos
        let searchUrl = '/search?';
        if (mostCommonActivity) searchUrl += `activity=${mostCommonActivity}&`;
        if (topBrand) searchUrl += `marca=${topBrand.toLowerCase()}&`;

        return searchUrl;
    };

    if (loading) {
        return (
            <div className="wishlist-loading">
                <div className="container text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando favoritos...</span>
                    </div>
                    <p className="mt-3 text-muted">Cargando tus zapatillas favoritas...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="wishlist-page">
            {/* Hero de favoritos - Estilo montaña */}
            <div className="wishlist-hero">
                <div className="container">
                    <div className="wishlist-hero-content">
                        <div className="wishlist-icon-wrapper">
                            <div className="wishlist-icon-large">
                                <i className="fas fa-heart"></i>
                            </div>
                        </div>
                        <div className="wishlist-header-info">
                            <h1 className="wishlist-title">Mis favoritos</h1>
                            <p className="wishlist-subtitle">
                                {favorites.length === 0
                                    ? 'Tus zapatillas favoritas aparecerán aquí'
                                    : `Tienes ${favorites.length} ${favorites.length === 1 ? 'zapatilla guardada' : 'zapatillas guardadas'}`
                                }
                            </p>

                            {favorites.length > 0 && (
                                <div className="wishlist-stats">
                                    <div className="wishlist-stat">
                                        <span className="stat-highlight">{favorites.length}</span>
                                        <span className="stat-label">total</span>
                                    </div>
                                    {topBrand && (
                                        <div className="wishlist-stat">
                                            <span className="stat-highlight">{topBrand}</span>
                                            <span className="stat-label">marca fav</span>
                                        </div>
                                    )}
                                    <div className="wishlist-stat">
                                        <span className="stat-highlight">
                                            {favorites.reduce((sum, p) => sum + (p.price || 0), 0).toFixed(0)}€
                                        </span>
                                        <span className="stat-label">valor</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="wishlist-wave">
                    <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
                        <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
                    </svg>
                </div>
            </div>

            <div className="container wishlist-container">
                {/* Notificación */}
                {notification.show && (
                    <div className={`notification ${notification.type}`}>
                        <i className={`fas fa-${
                            notification.type === 'success' ? 'check-circle' : 'info-circle'
                        }`}></i>
                        <span>{notification.message}</span>
                    </div>
                )}

                {favorites.length === 0 ? (
                    <div className="empty-wishlist">
                        <div className="empty-state">
                            <div className="empty-icon">
                                <i className="fas fa-heart-broken"></i>
                            </div>
                            <h2>Tu colección está vacía</h2>
                            <p className="empty-description">
                                Guarda tus zapatillas favoritas haciendo clic en el corazón ❤️
                                de cualquier producto. Te ayudaremos a encontrar las mejores ofertas
                                y te avisaremos cuando bajen de precio.
                            </p>

                            <div className="empty-suggestions">
                                <h3>¿Por dónde empezar?</h3>
                                <div className="suggestion-cards">
                                    <Link to="/recommend" className="suggestion-card">
                                        <div className="suggestion-icon">
                                            <i className="fas fa-magic"></i>
                                        </div>
                                        <div className="suggestion-content">
                                            <h4>Recomendación personalizada</h4>
                                            <p>Descubre zapatillas hechas para ti</p>
                                            <span className="suggestion-link">
                                                Comenzar test
                                                <i className="fas fa-arrow-right"></i>
                                            </span>
                                        </div>
                                    </Link>

                                    <Link to="/search" className="suggestion-card">
                                        <div className="suggestion-icon">
                                            <i className="fas fa-search"></i>
                                        </div>
                                        <div className="suggestion-content">
                                            <h4>Explorar catálogo</h4>
                                            <p>+500 modelos de todas las marcas</p>
                                            <span className="suggestion-link">
                                                Ver todo
                                                <i className="fas fa-arrow-right"></i>
                                            </span>
                                        </div>
                                    </Link>

                                    <Link to="/search?activity=trail_running" className="suggestion-card">
                                        <div className="suggestion-icon">
                                            <i className="fas fa-mountain"></i>
                                        </div>
                                        <div className="suggestion-content">
                                            <h4>Trail running</h4>
                                            <p>Las mejores zapatillas para montaña</p>
                                            <span className="suggestion-link">
                                                Explorar
                                                <i className="fas fa-arrow-right"></i>
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Barra de acciones */}
                        <div className="wishlist-actions-bar">
                            <div className="actions-left">
                                <button
                                    className={`selection-mode-btn ${selectionMode ? 'active' : ''}`}
                                    onClick={toggleSelectionMode}
                                >
                                    <i className={`fas fa-${selectionMode ? 'times' : 'check-square'}`}></i>
                                    {selectionMode ? 'Cancelar selección' : 'Seleccionar varios'}
                                </button>

                                {selectionMode && (
                                    <>
                                        <button
                                            className="select-all-btn"
                                            onClick={selectAll}
                                        >
                                            <i className={`fas fa-${selectedProducts.length === favorites.length ? 'check-square' : 'square'}`}></i>
                                            {selectedProducts.length === favorites.length ? 'Deseleccionar todo' : 'Seleccionar todo'}
                                        </button>

                                        {selectedProducts.length > 0 && (
                                            <button
                                                className="remove-selected-btn"
                                                onClick={handleRemoveSelected}
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                                Eliminar {selectedProducts.length}
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>

                            <div className="actions-right">
                                <button
                                    className="clear-all-btn"
                                    onClick={handleClearAll}
                                >
                                    <i className="fas fa-trash"></i>
                                    Vaciar favoritos
                                </button>
                            </div>
                        </div>

                        {/* Grid de favoritos */}
                        <div className="wishlist-grid">
                            {favorites.map((product) => (
                                <div
                                    key={product.id}
                                    className={`wishlist-item ${selectionMode ? 'selection-mode' : ''} ${
                                        selectedProducts.includes(product.id) ? 'selected' : ''
                                    }`}
                                >
                                    {selectionMode && (
                                        <div
                                            className="selection-checkbox"
                                            onClick={() => toggleProductSelection(product.id)}
                                        >
                                            <div className={`checkbox ${selectedProducts.includes(product.id) ? 'checked' : ''}`}>
                                                {selectedProducts.includes(product.id) && (
                                                    <i className="fas fa-check"></i>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    <div className="wishlist-product">
                                        <ProductCard
                                            product={product}
                                            showFavoriteButton={false}
                                        />

                                        <div className="wishlist-product-footer">
                                            <div className="price-tracker">
                                                <span className="price-label">
                                                    <i className="fas fa-tag"></i>
                                                    Precio actual
                                                </span>
                                                <span className="current-price">{product.price}€</span>
                                            </div>

                                            <button
                                                className="remove-btn"
                                                onClick={() => handleRemove(product.id)}
                                                title="Eliminar de favoritos"
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Sección de recomendaciones basadas en favoritos */}
                        {favorites.length >= 2 && (
                            <div className="recommendations-from-wishlist">
                                <div className="section-header">
                                    <h3>
                                        <i className="fas fa-magic"></i>
                                        Inspirado en tus favoritos
                                    </h3>
                                    <p>Productos similares a los que guardaste</p>
                                </div>

                                <div className="similar-products-preview">
                                    <div className="similar-card">
                                        <div className="similar-content">
                                            <span className="badge">Basado en tu marca favorita</span>
                                            <h4>Más {topBrand} que te pueden gustar</h4>
                                            <Link to={`/search?marca=${topBrand.toLowerCase()}`} className="similar-link">
                                                Ver colección {topBrand}
                                                <i className="fas fa-arrow-right"></i>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="similar-card">
                                        <div className="similar-content">
                                            <span className="badge">Nuevas llegadas</span>
                                            <h4>Modelos 2024 recién estrenados</h4>
                                            <Link to="/search?category=novedades" className="similar-link">
                                                Ver novedades
                                                <i className="fas fa-arrow-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Wishlist;