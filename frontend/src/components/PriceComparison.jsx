import React, { useState, useEffect } from 'react';
import '../styles/PriceComparison.css';

const PriceComparison = ({ shoeId, shoeName }) => {
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (shoeId) {
            fetchPrices();
        }
    }, [shoeId]);

    const fetchPrices = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5000/api/shoe/${shoeId}/prices`);
            const data = await response.json();

            if (data.success) {
                setPrices(data.links);
            } else {
                setError('Error al cargar precios');
            }
        } catch (error) {
            console.error('Error fetching prices:', error);
            setError('Error de conexión');
        } finally {
            setLoading(false);
        }
    };

    const getPartnerLogo = (partnerName) => {
        const logos = {
            'amazon': 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg',
            'decathlon': 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Decathlon_Logo.svg',
            'zalando': 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Zalando_logo.svg',
            'sportzone': 'https://via.placeholder.com/100x30?text=SportZone',
            'forum': 'https://via.placeholder.com/100x30?text=ForumSport',
            'elcorteingles': 'https://via.placeholder.com/100x30?text=El+Corte+Inglés',
            'nike': 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
            'adidas': 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg'
        };
        return logos[partnerName] || `https://via.placeholder.com/100x30?text=${partnerName}`;
    };

    const getPartnerName = (partnerName) => {
        const names = {
            'amazon': 'Amazon',
            'decathlon': 'Decathlon',
            'zalando': 'Zalando',
            'sportzone': 'Sport Zone',
            'forum': 'Forum Sport',
            'elcorteingles': 'El Corte Inglés',
            'nike': 'Nike',
            'adidas': 'Adidas'
        };
        return names[partnerName] || partnerName;
    };

    const formatPrice = (price) => {
        return price.toFixed(2).replace('.', ',');
    };

    if (loading) {
        return (
            <div className="price-comparison-loading">
                <div className="spinner-small"></div>
                <span>Cargando precios...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="price-comparison-error">
                <i className="fas fa-exclamation-triangle"></i>
                {error}
            </div>
        );
    }

    if (prices.length === 0) {
        return (
            <div className="price-comparison-empty">
                <i className="fas fa-store-slash"></i>
                <span>No hay tiendas disponibles</span>
            </div>
        );
    }

    const bestPrice = prices[0];
    const displayedPrices = showAll ? prices : prices.slice(0, 4);

    return (
        <div className="price-comparison">
            <div className="comparison-header" onClick={() => setExpanded(!expanded)}>
                <h3>
                    <i className="fas fa-tags"></i>
                    Comparar precios
                </h3>
                <span className="best-price-summary">
                    desde <strong>{formatPrice(bestPrice.price)}€</strong> en {getPartnerName(bestPrice.partner_name)}
                </span>
                <i className={`fas fa-chevron-${expanded ? 'up' : 'down'}`}></i>
            </div>

            {expanded && (
                <div className="comparison-content">
                    {/* Mejor precio destacado */}
                    <div className="best-price-card">
                        <div className="best-price-badge">MEJOR PRECIO</div>
                        <div className="partner-info">
                            <img
                                src={getPartnerLogo(bestPrice.partner_name)}
                                alt={bestPrice.partner_name}
                                className="partner-logo"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/100x30?text=Tienda';
                                }}
                            />
                            <div className="partner-details">
                                <span className="partner-name">{getPartnerName(bestPrice.partner_name)}</span>
                                {bestPrice.shipping_info && (
                                    <span className="shipping-info">
                                        <i className="fas fa-truck"></i>
                                        {bestPrice.shipping_info}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="price-info">
                            {bestPrice.original_price && (
                                <span className="original-price">
                                    {formatPrice(bestPrice.original_price)}€
                                </span>
                            )}
                            <div className="price-wrapper-large">
                                <span className="from-text-large">desde</span>
                                <span className="current-price-large">
                                    {formatPrice(bestPrice.price)}€
                                </span>
                            </div>
                        </div>
                        <a
                            href={bestPrice.affiliate_url}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="buy-button"
                        >
                            Comprar ahora
                            <i className="fas fa-external-link-alt"></i>
                        </a>
                    </div>

                    {/* Otras opciones */}
                    <div className="other-prices">
                        <h4>Otras tiendas</h4>
                        {displayedPrices.slice(1).map((price, index) => (
                            <div key={price.id} className="price-row">
                                <div className="partner-info">
                                    <img
                                        src={getPartnerLogo(price.partner_name)}
                                        alt={price.partner_name}
                                        className="partner-logo-small"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/30x30?text=Store';
                                        }}
                                    />
                                    <span className="partner-name-small">
                                        {getPartnerName(price.partner_name)}
                                    </span>
                                </div>
                                <div className="price-details">
                                    {price.original_price && (
                                        <span className="original-price-small">
                                            {formatPrice(price.original_price)}€
                                        </span>
                                    )}
                                    <span className="price-value">
                                        {formatPrice(price.price)}€
                                    </span>
                                </div>
                                <a
                                    href={price.affiliate_url}
                                    target="_blank"
                                    rel="noopener noreferrer sponsored"
                                    className="small-buy-link"
                                    title={`Comprar en ${getPartnerName(price.partner_name)}`}
                                >
                                    <i className="fas fa-shopping-cart"></i>
                                </a>
                            </div>
                        ))}
                    </div>

                    {prices.length > 4 && !showAll && (
                        <button
                            className="show-more-btn"
                            onClick={() => setShowAll(true)}
                        >
                            Ver {prices.length - 4} tiendas más
                            <i className="fas fa-chevron-down"></i>
                        </button>
                    )}

                    {showAll && prices.length > 4 && (
                        <button
                            className="show-less-btn"
                            onClick={() => setShowAll(false)}
                        >
                            Ver menos
                            <i className="fas fa-chevron-up"></i>
                        </button>
                    )}

                    <div className="affiliate-disclaimer">
                        <i className="fas fa-info-circle"></i>
                        Los precios pueden variar según la tienda. Al comprar a través de estos enlaces,
                        podemos recibir una comisión sin coste adicional para ti.
                    </div>
                </div>
            )}
        </div>
    );
};

export default PriceComparison;