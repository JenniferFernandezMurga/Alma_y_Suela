import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useShoe } from '../context/ShoeStore';
import { useFavorites } from '../context/FavoritesContext';
import UserAvatar from './UserAvatar';
import '../styles/Navbar.css';

const Navbar = () => {
    const { state, actions } = useShoe();
    const { favorites } = useFavorites();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Estados para el buscador y filtros
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedActivity, setSelectedActivity] = useState('');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000, label: 'Cualquier precio' });

    // Estado para el contador del carrito
    const [cartCount, setCartCount] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();

    // Opciones para los filtros
    const brandOptions = [
        { value: "", label: "Todas las marcas" },
        { value: "nike", label: "Nike" },
        { value: "adidas", label: "Adidas" },
        { value: "asics", label: "Asics" },
        { value: "salomon", label: "Salomon" },
        { value: "hoka", label: "Hoka" },
        { value: "newbalance", label: "New Balance" },
        { value: "brooks", label: "Brooks" }
    ];

    const activityOptions = [
        { value: "", label: "Todas las actividades" },
        { value: "road_running", label: "Running asfalto" },
        { value: "trail_running", label: "Trail running" },
        { value: "gym", label: "Gimnasio" },
        { value: "walking", label: "Caminar" }
    ];

    const priceRanges = [
        { min: 0, max: 1000, label: "Cualquier precio" },
        { min: 0, max: 100, label: "Menos de 100€" },
        { min: 100, max: 150, label: "100€ - 150€" },
        { min: 150, max: 200, label: "150€ - 200€" },
        { min: 200, max: 1000, label: "Más de 200€" }
    ];

    // Actualizar contador del carrito
    useEffect(() => {
        const updateCartCount = () => {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const count = cart.length;
            setCartCount(count);
        };

        updateCartCount();

        window.addEventListener('storage', updateCartCount);
        window.addEventListener('cartUpdated', updateCartCount);

        return () => {
            window.removeEventListener('storage', updateCartCount);
            window.removeEventListener('cartUpdated', updateCartCount);
        };
    }, []);

    const getActiveFiltersCount = () => {
        let count = 0;
        if (selectedBrand) count++;
        if (selectedActivity) count++;
        if (priceRange.min > 0 || priceRange.max < 1000) count++;
        return count;
    };

    const getFilterButtonLabel = () => {
        const count = getActiveFiltersCount();
        if (count === 0) return 'Filtros';
        if (count === 1) {
            if (selectedBrand) {
                const brand = brandOptions.find(b => b.value === selectedBrand);
                return brand ? brand.label : '1 filtro';
            }
            if (selectedActivity) {
                const activity = activityOptions.find(a => a.value === selectedActivity);
                return activity ? activity.label : '1 filtro';
            }
            if (priceRange.min > 0 || priceRange.max < 1000) return priceRange.label;
        }
        return `${count} filtros`;
    };

    const getFilterButtonIcon = () => {
        const count = getActiveFiltersCount();
        if (count === 0) return '🔍';
        if (selectedBrand) return '🏷️';
        if (selectedActivity) return '⚡';
        if (priceRange.min > 0 || priceRange.max < 1000) return '💰';
        return '🔍';
    };

    const hasActiveFilter = getActiveFiltersCount() > 0;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsUserMenuOpen(false);
        setIsFilterOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.category-selector') && !e.target.closest('.category-dropdown')) {
                setIsFilterOpen(false);
            }
            if (!e.target.closest('.user-menu') && !e.target.closest('.user-dropdown')) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();

        const params = new URLSearchParams();

        if (searchTerm && searchTerm.trim() !== '') {
            params.append('q', searchTerm.trim());
        }

        if (selectedBrand) {
            params.append('marca', selectedBrand);
        }

        if (selectedActivity) {
            params.append('activity', selectedActivity);
        }

        if (priceRange.min > 0 || priceRange.max < 1000) {
            params.append('precio_min', priceRange.min);
            params.append('precio_max', priceRange.max);
        }

        navigate(`/search?${params.toString()}`);
        setIsFilterOpen(false);
    };

    const clearAllFilters = () => {
        setSelectedBrand('');
        setSelectedActivity('');
        setPriceRange(priceRanges[0]);
    };

    const handleLogout = () => {
        actions.logout();
        navigate('/');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
                <div className="container">
                    <div className="navbar-content">

                        {/* SECCIÓN IZQUIERDA: LOGO + NAVEGACIÓN PRINCIPAL */}
                        <div className="navbar-left">
                            <Link to="/" className="navbar-logo">
                                <img src="/images/runwise.png" alt="runwise" />
                            </Link>

                            {/* Enlaces de navegación - SOLO DESKTOP */}
                            <div className="nav-links desktop-only">
                                <Link
                                    to="/"
                                    className={`nav-link ${isActive('/') ? 'active' : ''}`}
                                >
                                    <i className="fas fa-home"></i>
                                    <span>Inicio</span>
                                </Link>

                                <Link
                                    to="/catalogo"
                                    className={`nav-link ${isActive('/catalogo') ? 'active' : ''}`}
                                >
                                    <i className="fas fa-shoe-prints"></i>
                                    <span>Catálogo</span>
                                </Link>
                                
                                <Link
                                    to="/blog"
                                    className={`nav-link ${isActive('/blog') ? 'active' : ''}`}
                                >
                                    <i className="fas fa-newspaper"></i>
                                    <span>Blog</span>
                                </Link>
                            </div>
                        </div>

                        {/* SECCIÓN CENTRO: BUSCADOR CON FILTROS */}
                        <div className="navbar-center">
                            <form onSubmit={handleSearch} className="search-form">
                                <div className="search-group">
                                    <div className="category-selector">
                                        <button
                                            type="button"
                                            className={`category-btn ${hasActiveFilter ? 'has-active-filter' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsFilterOpen(!isFilterOpen);
                                            }}
                                        >
                                            <span className="category-icon">{getFilterButtonIcon()}</span>
                                            <span className="category-label d-none d-sm-inline">{getFilterButtonLabel()}</span>
                                            {hasActiveFilter && (
                                                <span className="filter-count">{getActiveFiltersCount()}</span>
                                            )}
                                            <i className="fas fa-chevron-down"></i>
                                        </button>
                                    </div>

                                    <input
                                        type="search"
                                        className="search-input"
                                        placeholder="Buscar zapatillas..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />

                                    <button className="search-btn" type="submit">
                                        <i className="fas fa-search"></i>
                                    </button>
                                </div>
                            </form>

                            {isFilterOpen && (
                                <div className="category-dropdown">
                                    <div className="dropdown-header-filters">
                                        <span className="filters-title">Filtros</span>
                                        {hasActiveFilter && (
                                            <button
                                                className="clear-filters-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    clearAllFilters();
                                                }}
                                            >
                                                Limpiar todo
                                            </button>
                                        )}
                                    </div>

                                    <div className="category-option with-submenu">
                                        <span className="option-icon">🏷️</span>
                                        <span className="filter-label">Marca</span>
                                        <select
                                            className="filter-select"
                                            value={selectedBrand}
                                            onChange={(e) => setSelectedBrand(e.target.value)}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {brandOptions.map(opt => (
                                                <option key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                        {selectedBrand && (
                                            <button
                                                className="remove-filter"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedBrand('');
                                                }}
                                            >
                                                <i className="fas fa-times-circle"></i>
                                            </button>
                                        )}
                                    </div>

                                    <div className="category-option with-submenu">
                                        <span className="option-icon">⚡</span>
                                        <span className="filter-label">Actividad</span>
                                        <select
                                            className="filter-select"
                                            value={selectedActivity}
                                            onChange={(e) => setSelectedActivity(e.target.value)}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {activityOptions.map(opt => (
                                                <option key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                        {selectedActivity && (
                                            <button
                                                className="remove-filter"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedActivity('');
                                                }}
                                            >
                                                <i className="fas fa-times-circle"></i>
                                            </button>
                                        )}
                                    </div>

                                    <div className="category-option with-submenu">
                                        <span className="option-icon">💰</span>
                                        <span className="filter-label">Precio</span>
                                        <select
                                            className="filter-select"
                                            value={priceRanges.findIndex(r =>
                                                r.min === priceRange.min && r.max === priceRange.max
                                            )}
                                            onChange={(e) => {
                                                const index = parseInt(e.target.value);
                                                setPriceRange(priceRanges[index]);
                                            }}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {priceRanges.map((range, index) => (
                                                <option key={index} value={index}>
                                                    {range.label}
                                                </option>
                                            ))}
                                        </select>
                                        {(priceRange.min > 0 || priceRange.max < 1000) && (
                                            <button
                                                className="remove-filter"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setPriceRange(priceRanges[0]);
                                                }}
                                            >
                                                <i className="fas fa-times-circle"></i>
                                            </button>
                                        )}
                                    </div>

                                    <div className="dropdown-footer">
                                        <button
                                            className="apply-filters-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSearch(new Event('submit'));
                                                setIsFilterOpen(false);
                                            }}
                                        >
                                            Aplicar filtros
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* SECCIÓN DERECHA: ENCUENTRA + ICONOS + USUARIO + HAMBURGUESA */}
                        <div className="navbar-right">
                            {/* "Encuentra" - SOLO DESKTOP */}
                            <Link
                                to="/recommend"
                                className={`nav-link desktop-only ${isActive('/recommend') ? 'active' : ''}`}
                            >
                                <i className="fas fa-compass"></i>
                                <span>Encuentra</span>
                            </Link>

                            {/* ICONOS - VISIBLES SIEMPRE */}
                            <Link to="/wishlist" className="action-icon">
                                <i className="far fa-heart"></i>
                                {favorites.length > 0 && (
                                    <span className="favorite-badge">{favorites.length}</span>
                                )}
                            </Link>

                            <Link to="/cart" className="action-icon cart-icon">
                                <i className="fas fa-shopping-bag"></i>
                                {cartCount > 0 && (
                                    <span className="cart-badge">{cartCount}</span>
                                )}
                            </Link>

                            {/* MENÚ DE USUARIO EN DESKTOP (CON FOTO Y DROPDOWN) */}
                            {state.auth.isAuthenticated ? (
                                <div className="user-menu desktop-only">
                                    <button
                                        className="user-menu-button"
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    >
                                        <UserAvatar size="small" isClickable={false} />
                                        <span className="user-name">{state.auth.user?.name?.split(' ')[0]}</span>
                                        <i className={`fas fa-chevron-${isUserMenuOpen ? 'up' : 'down'}`}></i>
                                    </button>

                                    {isUserMenuOpen && (
                                        <div className="user-dropdown">
                                            <div className="dropdown-header">
                                                <UserAvatar size="medium" isClickable={false} />
                                                <div>
                                                    <div className="dropdown-user-name">{state.auth.user?.name}</div>
                                                    <div className="dropdown-user-email">{state.auth.user?.email}</div>
                                                </div>
                                            </div>

                                            <div className="dropdown-divider"></div>

                                            <Link to="/profile" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                                                <i className="fas fa-user-circle"></i>
                                                <span>Mi Perfil</span>
                                            </Link>

                                            <Link to="/wishlist" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                                                <i className="far fa-heart"></i>
                                                <span>Favoritos</span>
                                                {favorites.length > 0 && (
                                                    <span className="favorite-count">{favorites.length}</span>
                                                )}
                                            </Link>

                                            <Link to="/recommendations" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                                                <i className="fas fa-history"></i>
                                                <span>Mi historial</span>
                                            </Link>

                                            <Link to="/cart" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                                                <i className="fas fa-shopping-bag"></i>
                                                <span>Carrito</span>
                                                {cartCount > 0 && (
                                                    <span className="cart-count">{cartCount}</span>
                                                )}
                                            </Link>

                                            <div className="dropdown-divider"></div>

                                            <button onClick={handleLogout} className="dropdown-item logout-btn">
                                                <i className="fas fa-sign-out-alt"></i>
                                                <span>Cerrar sesión</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link to="/login" className="login-btn desktop-only">
                                    <i className="fas fa-user"></i>
                                    <span>Acceder</span>
                                </Link>
                            )}

                            {/* MENÚ HAMBURGUESA - SOLO MÓVIL */}
                            <button
                                className={`mobile-menu-button mobile-only ${isMobileMenuOpen ? 'open' : ''}`}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label="Menú"
                            >
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>


           {/* MENÚ MÓVIL - CON FOTO DE USUARIO */}
           {/* MENÚ MÓVIL - CON FOTO DE USUARIO */}
{isMobileMenuOpen && (
    <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
        <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header align-items-center justify-content-between">
                <img src="/images/runwise.png" alt="runwise" />
                <button onClick={() => setIsMobileMenuOpen(false)}>
                    <i className="fas fa-times"></i>
                </button>
            </div>

            <div className="mobile-menu-content">
                {/* PERFIL DEL USUARIO - CON FOTO */}
                {state.auth.isAuthenticated ? (
                    <div className="mobile-user-profile">
                        <div className="mobile-user-avatar-large">
                            <UserAvatar size="large" isClickable={false} />
                        </div>
                        <div className="mobile-user-info">
                            <div className="mobile-user-name">{state.auth.user?.name}</div>
                            <div className="mobile-user-email">{state.auth.user?.email}</div>
                        </div>
                    </div>
                ) : (
                    <div className="mobile-auth-options">
                        <Link to="/login" className="mobile-login-btn" onClick={() => setIsMobileMenuOpen(false)}>
                            <i className="fas fa-sign-in-alt"></i>
                            Iniciar sesión
                        </Link>
                        <Link to="/register" className="mobile-register-btn" onClick={() => setIsMobileMenuOpen(false)}>
                            Registrarse
                        </Link>
                    </div>
                )}

                {/* BÚSQUEDA MÓVIL */}
                <form onSubmit={handleSearch} className="mobile-search">
                    <input
                        type="text"
                        placeholder="Buscar zapatillas..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit" onClick={() => setIsMobileMenuOpen(false)}>
                        <i className="fas fa-search"></i>
                    </button>
                </form>

                {/* ENLACES DE NAVEGACIÓN MÓVIL */}
                <div className="mobile-nav-links">
                   <Link to="/" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                        <i className="fas fa-home"></i> Inicio
                    </Link>
                    <Link to="/catalogo" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                        <i className="fas fa-shoe-prints"></i> Catálogo
                    </Link>
                    <Link to="/blog" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                        <i className="fas fa-newspaper"></i> Blog
                    </Link>
                    <Link to="/recommend" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                        <i className="fas fa-compass"></i> Encuentra
                    </Link>
                    <Link to="/wishlist" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                        <i className="far fa-heart"></i> Favoritos
                        {favorites.length > 0 && (
                            <span className="mobile-favorite-count">{favorites.length}</span>
                        )}
                    </Link>
                    <Link to="/cart" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                        <i className="fas fa-shopping-bag"></i> Carrito
                        {cartCount > 0 && (
                            <span className="mobile-cart-count">{cartCount}</span>
                        )}
                    </Link>

                     {state.auth.isAuthenticated && (
                        <button
                            onClick={() => {
                                handleLogout();
                                setIsMobileMenuOpen(false);
                            }}
                            className="mobile-logout-button"
                        >
                            <i className="fas fa-sign-out-alt"></i>
                            Cerrar sesión
                        </button>
                    )}
                </div>
            </div>
        </div>
    </div>
)}



        </>
    );
};

export default Navbar;