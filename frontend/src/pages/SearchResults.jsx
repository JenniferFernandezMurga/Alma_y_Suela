import React, { useState, useEffect } from "react"
import { useLocation, Link } from "react-router-dom"
import ProductGrid from "../components/ProductGrid"
import { shoesService } from "../services/api"
import "../styles/search-results.css"

const SearchResults = () => {
    const [shoes, setShoes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const location = useLocation()

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const query = searchParams.get('q')
        const category = searchParams.get('category')
        const activity = searchParams.get('activity')
        const marca = searchParams.get('marca')
        const tipo = searchParams.get('tipo')
        const sexo = searchParams.get('sexo')
        // NUEVO: Obtener filtros de precio
        const precio_min = searchParams.get('precio_min')
        const precio_max = searchParams.get('precio_max')

        performSearch(query, category, activity, marca, tipo, sexo, precio_min, precio_max)
    }, [location])

    const performSearch = async (query, category, activity, marca, tipo, sexo, precio_min, precio_max) => {
        setLoading(true)
        setError(null)
        
        try {
            console.log("🔄 Searching:", { query, category, activity, marca, tipo, sexo, precio_min, precio_max })
            
            // Construir filtros para el servicio
            const filters = {}
            
            // Añadir filtros de precio (NUEVO)
            if (precio_min !== null && precio_min !== undefined) {
                filters.precio_min = parseInt(precio_min)
            }
            if (precio_max !== null && precio_max !== undefined) {
                filters.precio_max = parseInt(precio_max)
            }
            
            // Añadir filtro por marca (NUEVO)
            if (marca) {
                filters.marca = marca
            }

            // Añadir filtro por actividad
            if (activity) {
                filters.activity = activity
            }

            // Mantener compatibilidad con filtros antiguos
            if (category && category !== 'todo') {
                filters.category = category
            }

            if (tipo) {
                filters.type = tipo
            }

            if (sexo) {
                // Mapear términos de sexo (ya lo tienes en tu código)
                const term = sexo.toLowerCase().trim();
                if (term === 'mujer' || term === 'mujeres' || term === 'femenino' || term === 'femenina') {
                    filters.gender = 'female';
                } else if (term === 'hombre' || term === 'hombres' || term === 'masculino') {
                    filters.gender = 'male';
                } else if (term === 'unisex') {
                    filters.gender = 'unisex';
                } else {
                    filters.gender = term;
                }
            }
            
            console.log("🔍 Filters construidos:", filters)

            // Llamar al servicio con query y filtros
            const data = await shoesService.search(query || '', filters)

            console.log("📦 Results received:", data)
            setShoes(data.shoes || [])
        } catch (error) {
            console.error("❌ Search error:", error)
            setError("Could not load results. Check your connection.")
            setShoes([])
        } finally {
            setLoading(false)
        }
    }

    const searchParams = new URLSearchParams(location.search)
    const query = searchParams.get('q')
    const category = searchParams.get('category')
    const activity = searchParams.get('activity')
    const marca = searchParams.get('marca')
    const tipo = searchParams.get('tipo')
    const sexo = searchParams.get('sexo')
    const precio_min = searchParams.get('precio_min')
    const precio_max = searchParams.get('precio_max')

    // Función para obtener la configuración del header según el tipo de búsqueda
    const getHeaderConfig = () => {
        // Priorizar filtros específicos para el header
        if (marca) {
            const marcas = {
                nike: { nombre: 'Nike', icon: 'fa-check' },
                adidas: { nombre: 'Adidas', icon: 'fa-check' },
                asics: { nombre: 'Asics', icon: 'fa-check' },
                newbalance: { nombre: 'New Balance', icon: 'fa-check' },
                hoka: { nombre: 'Hoka', icon: 'fa-check' },
                salomon: { nombre: 'Salomon', icon: 'fa-check' }
            }

            const marcaInfo = marcas[marca] || { nombre: marca, icon: 'fa-trademark' }

            return {
                className: marca,
                icon: marcaInfo.icon,
                title: marcaInfo.nombre,
                subtitle: `Colección completa de ${marcaInfo.nombre}`,
                description: `Explora todas las zapatillas ${marcaInfo.nombre} para running`,
                badge: 'MARCA OFICIAL',
                features: ['Garantía original', 'Modelos 2024', 'Todos los tipos']
            }
        }

        if (activity === 'trail_running') {
            return {
                className: 'trail',
                icon: 'fa-mountain',
                title: 'Trail Running',
                subtitle: 'Zapatillas diseñadas para montaña y terrenos irregulares',
                description: 'Máximo agarre, protección y estabilidad en cualquier superficie',
                badge: 'TERRENO TÉCNICO',
                features: ['Suela Vibram®', 'Drop 4-8mm', 'Protección rocas']
            }
        }

        if (activity === 'road_running') {
            return {
                className: 'asfalto',
                icon: 'fa-road',
                title: 'Running en Asfalto',
                subtitle: 'Zapatillas para correr en ciudad y carretera',
                description: 'Máxima reactividad, ligereza y amortiguación',
                badge: 'ALTO RENDIMIENTO',
                features: ['Reactividad', 'Drop 8-12mm', 'Amortiguación']
            }
        }

        if (category === 'novedades') {
            return {
                className: 'novedades',
                icon: 'fa-star',
                title: 'Últimas Novedades',
                subtitle: 'Lo último en tecnología y diseño',
                description: 'Descubre las zapatillas más recientes de nuestras marcas',
                badge: 'COLECCIÓN 2024',
                features: ['Nuevos lanzamientos', 'Tecnología avanzada', 'Edición limitada']
            }
        }

        if (category === 'ofertas') {
            return {
                className: 'ofertas',
                icon: 'fa-tag',
                title: 'Ofertas Especiales',
                subtitle: 'Los mejores precios en zapatillas seleccionadas',
                description: 'Aprovecha descuentos exclusivos por tiempo limitado',
                badge: 'HASTA -40%',
                features: ['Envío gratis', 'Stock limitado', 'Mejor precio']
            }
        }

        if (sexo === 'hombre' || sexo === 'men') {
            return {
                className: 'hombre',
                icon: 'fa-mars',
                title: 'Hombre',
                subtitle: 'Zapatillas para hombre',
                description: 'Diseñadas para el pie masculino, máximo rendimiento',
                badge: 'COLECCIÓN HOMBRE',
                features: ['Tallas 39-46', 'Anchura estándar', 'Diseño deportivo']
            }
        }

        if (sexo === 'mujer' || sexo === 'women') {
            return {
                className: 'mujer',
                icon: 'fa-venus',
                title: 'Mujer',
                subtitle: 'Zapatillas para mujer',
                description: 'Específicas para la pisada y anatomía femenina',
                badge: 'COLECCIÓN MUJER',
                features: ['Tallas 36-42', 'Anchura específica', 'Diseño elegante']
            }
        }

        if (tipo === 'estabilidad') {
            return {
                className: 'estabilidad',
                icon: 'fa-shield-alt',
                title: 'Estabilidad',
                subtitle: 'Zapatillas para control de pisada',
                description: 'Ideales para pronadores y pies planos',
                badge: 'CONTROL DE MOVIMIENTO',
                features: ['Soporte medial', 'Dual density', 'Máxima estabilidad']
            }
        }

        if (tipo === 'neutro') {
            return {
                className: 'neutro',
                icon: 'fa-balance-scale',
                title: 'Neutras',
                subtitle: 'Zapatillas para pisada universal',
                description: 'Para corredores sin necesidad de corrección',
                badge: 'VERSÁTIL',
                features: ['Amortiguación pura', 'Flexibilidad', 'Ligeras']
            }
        }

        if (tipo === 'minimalista') {
            return {
                className: 'minimalista',
                icon: 'fa-feather',
                title: 'Minimalistas',
                subtitle: 'Sensación natural al correr',
                description: 'Drop mínimo y máxima conexión con el terreno',
                badge: 'SENSACIÓN NATURAL',
                features: ['Drop 0-4mm', 'Muy ligeras', 'Flexibles']
            }
        }

        if (query) {
            return {
                className: 'busqueda',
                icon: 'fa-search',
                title: `"${query}"`,
                subtitle: 'Resultados de tu búsqueda',
                description: `Encontramos estos resultados para "${query}"`,
                badge: 'BÚSQUEDA',
                features: []
            }
        }

        return {
            className: 'default',
            icon: 'fa-shoe-prints',
            title: 'Catálogo Completo',
            subtitle: 'Explora nuestra colección completa de zapatillas',
            description: 'Todos los modelos, marcas y categorías disponibles',
            badge: 'CATÁLOGO',
            features: ['+500 modelos', 'Todas las marcas', 'Envío gratis']
        }
    }

    const headerConfig = getHeaderConfig()

    if (loading) {
        return (
            <div className="container mt-4">
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Buscando zapatillas...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger text-center">
                    <h5>Error</h5>
                    <p>{error}</p>
                    <button 
                        className="btn btn-primary" 
                        onClick={() => performSearch(query, category, activity, marca, tipo, sexo, precio_min, precio_max)}
                    >
                        Intentar de nuevo
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="search-results-page">
            {/* HEADER CON FONDO TEMÁTICO */}
            <div className={`search-header ${headerConfig.className}`}>
                <div className="container">
                    <div className="search-header-content">
                        <div className="search-icon">
                            <i className={`fas ${headerConfig.icon}`}></i>
                        </div>

                        <h1 className="search-title">
                            {headerConfig.title}
                            <span className="category-tag">{headerConfig.badge}</span>
                        </h1>

                        <p className="search-subtitle">{headerConfig.subtitle}</p>
                        <p className="search-description">{headerConfig.description}</p>

                        {headerConfig.features && headerConfig.features.length > 0 && (
                            <div className="category-features">
                                {headerConfig.features.map((feature, index) => (
                                    <span key={index} className="feature-badge">
                                        <i className="fas fa-check-circle"></i>
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="search-stats">
                            <span className="stat-badge">
                                <i className="fas fa-shoe-prints"></i>
                                {shoes.length} {shoes.length === 1 ? 'zapatilla' : 'zapatillas'}
                            </span>
                            {query && (
                                <span className="stat-badge">
                                    <i className="fas fa-search"></i>
                                    Búsqueda: <strong>"{query}"</strong>
                                </span>
                            )}
                            {/* Mostrar filtros de precio si están activos */}
                            {precio_min && precio_max && (
                                <span className="stat-badge">
                                    <i className="fas fa-euro-sign"></i>
                                    Precio: {precio_min === '0' ? 'Menos de' : 'Entre'} {precio_min}€ - {precio_max}€
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                {/* FILTROS ACTIVOS */}
                {(query || category || activity || marca || tipo || sexo || precio_min) && (
                    <div className="active-filters">
                        <div className="filters-title">
                            <i className="fas fa-filter"></i>
                            Filtros activos
                        </div>
                        <div className="filter-tags">
                            {activity === 'trail_running' && (
                                <span className="filter-tag">
                                    <i className="fas fa-mountain"></i>
                                    Actividad: Trail Running
                                    <Link to="/search" className="clear-filters ms-2">
                                        <i className="fas fa-times"></i>
                                    </Link>
                                </span>
                            )}
                            {activity === 'road_running' && (
                                <span className="filter-tag">
                                    <i className="fas fa-road"></i>
                                    Actividad: Running Asfalto
                                    <Link to="/search" className="clear-filters ms-2">
                                        <i className="fas fa-times"></i>
                                    </Link>
                                </span>
                            )}
                            {category && category !== 'todo' && (
                                <span className="filter-tag">
                                    <i className="fas fa-tag"></i>
                                    Categoría: {category}
                                    <Link to="/search" className="clear-filters ms-2">
                                        <i className="fas fa-times"></i>
                                    </Link>
                                </span>
                            )}
                            {marca && (
                                <span className="filter-tag">
                                    <i className="fas fa-trademark"></i>
                                    Marca: {marca}
                                    <Link to="/search" className="clear-filters ms-2">
                                        <i className="fas fa-times"></i>
                                    </Link>
                                </span>
                            )}
                            {sexo && (
                                <span className="filter-tag">
                                    <i className={`fas fa-${sexo === 'hombre' || sexo === 'men' ? 'mars' : 'venus'}`}></i>
                                    Género: {sexo}
                                    <Link to="/search" className="clear-filters ms-2">
                                        <i className="fas fa-times"></i>
                                    </Link>
                                </span>
                            )}
                            {tipo && (
                                <span className="filter-tag">
                                    <i className="fas fa-shoe-prints"></i>
                                    Tipo: {tipo}
                                    <Link to="/search" className="clear-filters ms-2">
                                        <i className="fas fa-times"></i>
                                    </Link>
                                </span>
                            )}
                            {query && (
                                <span className="filter-tag">
                                    <i className="fas fa-search"></i>
                                    Búsqueda: "{query}"
                                    <Link to="/search" className="clear-filters ms-2">
                                        <i className="fas fa-times"></i>
                                    </Link>
                                </span>
                            )}
                            {/* NUEVO: Mostrar filtro de precio activo */}
                            {precio_min && precio_max && (
                                <span className="filter-tag">
                                    <i className="fas fa-euro-sign"></i>
                                    Precio: {precio_min === '0' ? 'Menos de' : 'Entre'} {precio_min}€ - {precio_max}€
                                    <Link to="/search" className="clear-filters ms-2">
                                        <i className="fas fa-times"></i>
                                    </Link>
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* GRID DE PRODUCTOS */}
                {shoes.length > 0 ? (
                    <ProductGrid products={shoes} />
                ) : (
                    <div className="no-results">
                        <div className="no-results-icon">
                            <i className="fas fa-hiking"></i>
                        </div>
                        <h3>No encontramos resultados</h3>
                        <p>
                            No hay zapatillas que coincidan con tu búsqueda.
                            ¡Prueba con otros términos o explora nuestras categorías!
                        </p>
                        <div className="suggestions">
                            <Link to="/" className="suggestion-link">
                                <i className="fas fa-home"></i>
                                Ir al inicio
                            </Link>
                            <Link to="/catalogo" className="suggestion-link">
                                <i className="fas fa-shoe-prints"></i>
                                Ver catálogo
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchResults