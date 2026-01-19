// import React from 'react'
// import HeroSection from '../components/HeroSection'
// // import ProductGrid from '../components/ProductGrid'
// // import ProductCarousel from '../components/ProductCarousel'
// // import BrandShowcase from '../components/BrandShowcase'
// // import HowItWorks from '../components/HowItWorks'

// const Home = () => {
//   return (
//     <div className="home-page">
//       {/* Sección Hero - Llamada a acción */}
//       <HeroSection />

//       {/* Sección Top Trail Running
//       <section className="section">
//         <ProductGrid
//           title="Top Trail Running"
//           category="trail_running"
//           limit={6}
//         />
//       </section>

//       {/* Sección Más Vendidos */}
//       {/* <section className="section bg-light">
//         <ProductCarousel
//           title="Los Más Vendidos"
//         />
//       </section>

//       {/* Sección Marcas */}
//       {/* <section className="section">
//         <BrandShowcase />
//       </section>

//       {/* Sección Cómo funciona */}
//       {/* <section className="section bg-light">
//         <HowItWorks />
//       </section> */}
//     </div>
//   )
// }

// export default Home

// src/pages/Home.jsx
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ProductCarousel from "../components/ProductCarousel"
import { shoesService } from "../services/api"

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
                
                // En un entorno real, estas serían llamadas a endpoints específicos
                // Por ahora, simulamos obteniendo todos y filtrando
                const response = await fetch('http://localhost:5000/api/shoes')
                const data = await response.json()
                
                if (data.success) {
                    const allShoes = data.shoes
                    
                    // 🔥 NOVEDADES: Últimas 8 zapatillas (por fecha)
                    const novedades = [...allShoes]
                        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                        .slice(0, 8)
                    
                    // 🔥 OFERTAS: Zapatillas con mejor precio (simulado)
                    const ofertas = allShoes
                        .filter(shoe => shoe.price < 120) // Precios bajos como "ofertas"
                        .slice(0, 8)
                    
                    // 🔥 ASFALTO: Mejores para road running
                    const asfalto = allShoes
                        .filter(shoe => shoe.best_for_activity === 'road_running')
                        .slice(0, 8)
                    
                    // 🔥 TRAIL: Mejores para trail running
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
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section bg-primary text-white py-5 mb-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h1 className="display-4 fw-bold mb-3">Encuentra tu zapatilla perfecta</h1>
                            <p className="lead mb-4">
                                Descubre las mejores zapatillas para running, trail y gimnasio. 
                                Tecnología, confort y rendimiento en un solo lugar.
                            </p>
                            <div className="d-flex gap-3">
                                <Link to="/recommend" className="btn btn-light btn-lg">
                                    🎯 Encuentra la tuya
                                </Link>
                                <Link to="/search" className="btn btn-outline-light btn-lg">
                                    🔍 Explorar catálogo
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-6 text-center">
                            <img 
                                src="/images/hero-shoes.png" 
                                alt="Zapatillas deportivas"
                                className="img-fluid"
                                style={{ maxHeight: "300px" }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Secciones de Carrusel */}
            <div className="container">
                {/* 🔥 NOVEDADES */}
                <section className="mb-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="h3 mb-0">🆕 Últimas Novedades</h2>
                        <Link to="/search?category=novedades" className="btn btn-outline-primary">
                            Ver todas
                        </Link>
                    </div>
                    <ProductCarousel 
                        products={featuredSections.novedades}
                        section="novedades"
                    />
                </section>

                {/* 🔥 OFERTAS ESPECIALES */}
                <section className="mb-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="h3 mb-0">💰 Ofertas Especiales</h2>
                        <Link to="/search?category=ofertas" className="btn btn-outline-success">
                            Ver ofertas
                        </Link>
                    </div>
                    <ProductCarousel 
                        products={featuredSections.ofertas}
                        section="ofertas"
                    />
                </section>

                {/* 🔥 MEJOR ASFALTO */}
                <section className="mb-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="h3 mb-0">🏃‍♂️ Lo Mejor para Asfalto</h2>
                        <Link to="/search?activity=road_running" className="btn btn-outline-info">
                            Ver running
                        </Link>
                    </div>
                    <ProductCarousel 
                        products={featuredSections.asfalto}
                        section="asfalto"
                    />
                </section>

                {/* 🔥 MEJOR TRAIL */}
                <section className="mb-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="h3 mb-0">🥾 Lo Mejor para Trail</h2>
                        <Link to="/search?activity=trail_running" className="btn btn-outline-warning">
                            Ver trail
                        </Link>
                    </div>
                    <ProductCarousel 
                        products={featuredSections.trail}
                        section="trail"
                    />
                </section>

                {/* CTA Final */}
                <section className="text-center py-5">
                    <div className="bg-light rounded p-5">
                        <h3 className="h2 mb-3">¿No encuentras lo que buscas?</h3>
                        <p className="lead mb-4">
                            Nuestro sistema de recomendación te ayudará a encontrar la zapatilla perfecta 
                            según tus características y necesidades.
                        </p>
                        <Link to="/recommend" className="btn btn-primary btn-lg">
                            🎯 Descubre tu zapatilla ideal
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Home