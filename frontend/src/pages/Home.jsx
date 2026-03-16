// src/pages/Home.jsx - VERSIÓN FINAL COMPLETA
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ProductCarousel from "../components/ProductCarousel"

const Home = () => {
    const [featuredSections, setFeaturedSections] = useState({
        novedades: [],
        ofertas: [],
        asfalto: [],
        trail: []
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                setLoading(true)
                
                const response = await fetch('http://localhost:5000/api/shoes')
                const data = await response.json()
                
                if (data.success) {
                    const allShoes = data.shoes
                    
                    const novedades = [...allShoes]
                        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                        .slice(0, 8)
                    
                    const ofertas = allShoes
                        .filter(shoe => shoe.price < 120)
                        .slice(0, 8)
                    
                    const asfalto = allShoes
                        .filter(shoe => shoe.best_for_activity === 'road_running')
                        .slice(0, 8)
                    
                    const trail = allShoes
                        .filter(shoe => shoe.best_for_activity === 'trail_running')
                        .slice(0, 8)
                    
                    setFeaturedSections({
                        novedades,
                        ofertas,
                        asfalto,
                        trail
                    })
                }
            } catch (error) {
                console.error("Error cargando productos destacados:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchFeaturedProducts()
    }, [])

    if (loading) {
        return (
            <div className="container mt-4">
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p className="mt-2">Cargando productos destacados...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="home-page" style={{
            background: 'linear-gradient(180deg, #f8f7f4 0%, #eae8e1 30%, #d8d5cc 100%)'
        }}>
            {/* Hero Section - Con fondo más claro y zapatilla mejorada */}
            <section
                className="hero-section text-white py-5 position-relative"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.7)),
                        url('https://images.unsplash.com/photo-1568178312525-3b7c6e6c7c18?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 40%',
                    minHeight: '90vh',
                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'hidden'
                }}
            >
                {/* Overlay más claro */}
                <div className="position-absolute top-0 left-0 w-100 h-100"
                     style={{
                        background: 'linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.1) 100%)'
                     }}
                ></div>

                <div className="container position-relative z-2 py-4">
                    <div className="row align-items-center">
                        {/* Columna de texto - Izquierda */}
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <div className="mb-5">
                                {/* <span className="badge bg-warning text-dark px-3 py-2 mb-3">
                                    <i className="fas fa-crown me-2"></i>
                                    TOP RATED 2024
                                </span> */}

                                <h1 className="display-3 fw-bold mb-4" style={{ lineHeight: '1.1' }}>
                                    Cada paso cuenta,
                                    <span className="text-warning"> elige el correcto</span>
                                </h1>

                                <p className="lead fs-4 mb-4">
                                    Descubre las zapatillas ideales para tu aventura,
                                    ya sea en asfalto, montaña o gimnasio.
                                </p>
                            </div>

                            {/* Estadísticas destacadas */}
                            <div className="row mb-5 g-3">
                                <div className="col-md-4">
                                    <div className="bg-dark bg-opacity-50 rounded-3 p-3 text-center border border-light border-opacity-25">
                                        <div className="fs-2 fw-bold text-warning">95%</div>
                                        <small className="text-light">Precisión en recomendaciones</small>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="bg-dark bg-opacity-50 rounded-3 p-3 text-center border border-light border-opacity-25">
                                        <div className="fs-2 fw-bold text-warning">2 min</div>
                                        <small className="text-light">Test rápido y personalizado</small>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="bg-dark bg-opacity-50 rounded-3 p-3 text-center border border-light border-opacity-25">
                                        <div className="fs-2 fw-bold text-warning">500+</div>
                                        <small className="text-light">Zapatillas analizadas</small>
                                    </div>
                                </div>
                            </div>

                            {/* Botones de acción */}
                            <div className="d-flex flex-wrap gap-3 mb-5">
                                <Link
                                    to="/recommend"
                                    className="btn btn-warning btn-lg px-5 py-3 fw-bold shadow-lg hover-lift"
                                    style={{ fontSize: '1.1rem' }}
                                >
                                    🎯 Encontrar mi zapatilla ideal
                                </Link>
                                <Link
                                    to="/search"
                                    className="btn btn-outline-light btn-lg px-4 py-3"
                                >
                                    👟 Explorar catálogo
                                </Link>
                            </div>

                            {/* CTA pequeño */}
                            <div className="mt-4">
                                <small className="text-light opacity-75">
                                    <i className="fas fa-check-circle text-success me-2"></i>
                                    Test gratuito • Sin registro • Resultados inmediatos
                                </small>
                            </div>
                        </div>

                        {/* Columna de zapatilla - Derecha (VERSIÓN MEJORADA) */}
                        <div className="col-lg-6">
                            <div className="position-relative">
                                {/* Contenedor principal con efecto vidrio */}
                                <div className="glass-container p-4 p-md-5 rounded-4 position-relative"
                                     style={{
                                        background: 'rgba(255, 255, 255, 0.12)',
                                        backdropFilter: 'blur(12px)',
                                        border: '1px solid rgba(255, 255, 255, 0.25)',
                                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                                        maxWidth: '500px',
                                        margin: '0 auto'
                                     }}>

                                    {/* Badge destacado */}
                                    <div className="text-center mb-3">
                                        <span className="badge bg-warning bg-opacity-90 text-dark px-4 py-2 fw-bold">
                                            <i className="fas fa-bolt me-1"></i>
                                            TRAIL RUNNING PRO
                                        </span>
                                    </div>

                                    {/* Zapatilla centrada */}
                                    <div className="text-center mb-4">
                                        <img
                                            src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&auto=format&fit=crop"
                                            alt="Zapatilla técnica para trail running"
                                            className="img-fluid floating-shoe"
                                            style={{
                                                maxHeight: "220px",
                                                filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.6))',
                                                transform: 'rotate(-8deg)'
                                            }}
                                        />
                                    </div>

                                    {/* Especificaciones técnicas */}
                                    <div className="row g-3 mb-3">
                                        <div className="col-6 col-md-3">
                                            <div className="spec-item p-2 rounded-3 text-center bg-dark bg-opacity-50">
                                                <div className="small text-light opacity-75">DROP</div>
                                                <div className="fw-bold text-warning">4mm</div>
                                            </div>
                                        </div>
                                        <div className="col-6 col-md-3">
                                            <div className="spec-item p-2 rounded-3 text-center bg-dark bg-opacity-50">
                                                <div className="small text-light opacity-75">PESO</div>
                                                <div className="fw-bold text-warning">285g</div>
                                            </div>
                                        </div>
                                        <div className="col-6 col-md-3">
                                            <div className="spec-item p-2 rounded-3 text-center bg-dark bg-opacity-50">
                                                <div className="small text-light opacity-75">AGARRE</div>
                                                <div className="fw-bold text-warning">Alto</div>
                                            </div>
                                        </div>
                                        <div className="col-6 col-md-3">
                                            <div className="spec-item p-2 rounded-3 text-center bg-dark bg-opacity-50">
                                                <div className="small text-light opacity-75">WATERPROOF</div>
                                                <div className="fw-bold text-warning">Sí</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Enlace a recomendación */}
                                    <div className="text-center">
                                        <Link
                                            to="/recommend"
                                            className="btn btn-sm btn-outline-light w-100"
                                        >
                                            <i className="fas fa-shoe-prints me-2"></i>
                                            ¿Es esta tu zapatilla ideal?
                                        </Link>
                                    </div>
                                </div>

                                {/* Texto descriptivo */}
                                <div className="text-center mt-4">
                                    <div className="d-inline-block bg-dark bg-opacity-60 rounded-3 px-4 py-3">
                                        <p className="mb-1">
                                            <i className="fas fa-award text-warning me-2"></i>
                                            <strong className="text-light">Zapatilla Trail 2024</strong>
                                        </p>
                                        <small className="text-light opacity-75">
                                            Amortiguación reactiva • Suela Vibram® • Drop 4mm
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Secciones de Carrusel */}
            <div className="container mt-5">
                {/* 🔥 NOVEDADES - Fondo de estreno/tienda moderna */}
<section className="section-container section-novedades mb-5">
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <h2 className="section-title">
            <i className="fas fa-star text-warning"></i>
            Últimas Novedades
        </h2>
        <Link to="/search?category=novedades" className="btn btn-outline-light section-btn">
            Ver todas las novedades
            <i className="fas fa-arrow-right ms-2"></i>
        </Link>
    </div>
    <ProductCarousel
        products={featuredSections.novedades}
        section="novedades"
    />
    <div className="mt-3 text-end">
        <small className="text-light opacity-75">
            <i className="fas fa-tag me-1"></i>
            Recién llegados - Colección 2024
        </small>
    </div>
</section>

{/* 🔥 OFERTAS - Fondo de etiquetas de descuento */}
<section className="section-container section-ofertas mb-5">
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <h2 className="section-title">
            <i className="fas fa-tag text-warning"></i>
            Ofertas Especiales
        </h2>
        <Link to="/search?category=ofertas" className="btn btn-outline-warning section-btn">
            Ver todas las ofertas
            <i className="fas fa-arrow-right ms-2"></i>
        </Link>
    </div>
    <ProductCarousel
        products={featuredSections.ofertas}
        section="ofertas"
    />
    <div className="mt-3 text-end">
        <small className="text-light opacity-75">
            <i className="fas fa-percent me-1"></i>
            Hasta 40% de descuento - Tiempo limitado
        </small>
    </div>
</section>

{/* 🔥 MEJOR ASFALTO - Fondo de carretera */}
<section className="section-container section-asfalto mb-5">
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <h2 className="section-title">
            <i className="fas fa-road text-info"></i>
            Lo Mejor para Asfalto
        </h2>
        <Link to="/search?activity=road_running" className="btn btn-outline-info section-btn">
            Ver running urbano
            <i className="fas fa-arrow-right ms-2"></i>
        </Link>
    </div>
    <ProductCarousel
        products={featuredSections.asfalto}
        section="asfalto"
    />
    <div className="mt-3 text-end">
        <small className="text-light opacity-75">
            <i className="fas fa-bolt me-1"></i>
            Máxima reactividad para ritmos rápidos
        </small>
    </div>
</section>

{/* 🔥 MEJOR TRAIL - Fondo de montaña */}
<section className="section-container section-trail mb-5">
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <h2 className="section-title">
            <i className="fas fa-mountain text-warning"></i>
            Lo Mejor para Trail
        </h2>
        <Link to="/search?activity=trail_running" className="btn btn-outline-warning section-btn">
            Ver trail running
            <i className="fas fa-arrow-right ms-2"></i>
        </Link>
    </div>
    <ProductCarousel
        products={featuredSections.trail}
        section="trail"
    />
    <div className="mt-3 text-end">
        <small className="text-light opacity-75">
            <i className="fas fa-tree me-1"></i>
            Agarre superior en terrenos técnicos
        </small>
    </div>
</section>
                {/* CTA Final */}
                <section className="text-center py-5">
                    <div className="bg-white rounded-4 p-5 shadow-lg" style={{
                        border: '1px solid rgba(0,0,0,0.1)',
                        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
                    }}>
                        <h3 className="h2 mb-3 text-dark">¿No encuentras lo que buscas?</h3>
                        <p className="lead mb-4 text-muted">
                            Nuestro sistema de recomendación te ayudará a encontrar la zapatilla perfecta 
                            según tus características y necesidades.
                        </p>
                        <Link to="/recommend" className="btn btn-primary btn-lg px-5 py-3 fw-bold">
                            <i className="fas fa-magic me-2"></i>
                            🎯 Descubre tu zapatilla ideal
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Home