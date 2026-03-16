import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useShoe } from "../context/ShoeStore"
import ProductCard from "../components/ProductCard"
import "../styles/RecommendationsHistory.css"

const RecommendationsHistory = () => {
    const { state } = useShoe()
    const [recommendations, setRecommendations] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        loadRecommendations()
    }, [])

    const loadRecommendations = async () => {
        setLoading(true)
        try {
            // Intentar cargar del localStorage
            const saved = localStorage.getItem('recommendations_history')
            if (saved) {
                setRecommendations(JSON.parse(saved))
            } else {
                // Datos de ejemplo
                const mockData = [
                    {
                        id: 1,
                        date: '2024-02-18',
                        userData: { 
                            activity_type: 'trail_running', 
                            weight: 70,
                            foot_width: 'standard',
                            arch_type: 'neutral'
                        },
                        products: [
                            { 
                                id: 101, 
                                brand: 'Salomon', 
                                model: 'Speedcross 6', 
                                price: 149.99,
                                image_url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa',
                                category: 'trail'
                            },
                            { 
                                id: 102, 
                                brand: 'Hoka', 
                                model: 'Speedgoat 5', 
                                price: 159.99,
                                image_url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa',
                                category: 'trail'
                            }
                        ]
                    },
                    {
                        id: 2,
                        date: '2024-02-17',
                        userData: { 
                            activity_type: 'road_running', 
                            weight: 65,
                            foot_width: 'narrow',
                            arch_type: 'high'
                        },
                        products: [
                            { 
                                id: 103, 
                                brand: 'Nike', 
                                model: 'Pegasus 40', 
                                price: 129.99,
                                image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
                                category: 'running'
                            },
                            { 
                                id: 104, 
                                brand: 'Asics', 
                                model: 'Novablast 3', 
                                price: 139.99,
                                image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
                                category: 'running'
                            }
                        ]
                    }
                ]
                setRecommendations(mockData)
                // Guardar en localStorage para futuras cargas
                localStorage.setItem('recommendations_history', JSON.stringify(mockData))
            }
        } catch (error) {
            console.error('Error cargando recomendaciones:', error)
        } finally {
            setLoading(false)
        }
    }

    const getActivityIcon = (activity) => {
        const icons = {
            'trail_running': '🏔️',
            'road_running': '🏃',
            'gym': '💪',
            'walking': '🚶'
        }
        return icons[activity] || '👟'
    }

    const getActivityName = (activity) => {
        const names = {
            'trail_running': 'Trail',
            'road_running': 'Asfalto',
            'gym': 'Gimnasio',
            'walking': 'Caminata'
        }
        return names[activity] || activity
    }

    const filterRecommendations = () => {
        if (filter === 'all') return recommendations
        if (filter === 'recent') {
            return [...recommendations].sort((a, b) => 
                new Date(b.date) - new Date(a.date)
            ).slice(0, 3)
        }
        return recommendations
    }

    if (loading) {
        return (
            <div className="container text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-3 text-muted">Cargando tu historial...</p>
            </div>
        )
    }

    const filteredRecs = filterRecommendations()

    return (
        <div className="recommendations-history-page">
            {/* Hero */}
            <div className="history-hero">
                <div className="container">
                    <h1>
                        <i className="fas fa-history"></i>
                        Mis recomendaciones
                    </h1>
                    <p>Historial de todas tus búsquedas personalizadas</p>
                </div>
            </div>

            <div className="container py-4">
                {/* Filtros */}
                <div className="history-filters">
                    <button 
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        Todas
                    </button>
                    <button 
                        className={`filter-btn ${filter === 'recent' ? 'active' : ''}`}
                        onClick={() => setFilter('recent')}
                    >
                        Recientes
                    </button>
                </div>

                {/* Lista de recomendaciones */}
                {filteredRecs.length === 0 ? (
                    <div className="empty-history">
                        <i className="fas fa-search"></i>
                        <h3>No tienes recomendaciones guardadas</h3>
                        <p>Realiza tu primer test de recomendación para empezar</p>
                        <Link to="/recommend" className="btn btn-primary btn-lg">
                            <i className="fas fa-magic me-2"></i>
                            Hacer test ahora
                        </Link>
                    </div>
                ) : (
                    <div className="recommendations-timeline">
                        {filteredRecs.map((rec, index) => (
                            <div key={rec.id} className="timeline-item">
                                <div className="timeline-marker">
                                    <span className="marker-number">{index + 1}</span>
                                </div>
                                
                                <div className="timeline-content">
                                    <div className="recommendation-header">
                                        <div className="header-left">
                                            <span className="recommendation-date">
                                                <i className="far fa-calendar"></i>
                                                {new Date(rec.date).toLocaleDateString('es-ES', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                            <span className="recommendation-badge">
                                                {getActivityIcon(rec.userData.activity_type)}
                                                {getActivityName(rec.userData.activity_type)}
                                            </span>
                                            {rec.userData.weight && (
                                                <span className="recommendation-badge">
                                                    <i className="fas fa-weight"></i>
                                                    {rec.userData.weight}kg
                                                </span>
                                            )}
                                        </div>
                                        <button className="btn-save-recommendation">
                                            <i className="far fa-bookmark"></i>
                                        </button>
                                    </div>

                                    <div className="recommendation-products">
                                        {rec.products.map(product => (
                                            <div key={product.id} className="product-mini-card">
                                                <ProductCard product={product} />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="recommendation-footer">
                                        <Link to="/recommend" className="btn-again">
                                            <i className="fas fa-redo-alt"></i>
                                            Repetir esta búsqueda
                                        </Link>
                                        <button className="btn-compare">
                                            <i className="fas fa-balance-scale"></i>
                                            Comparar modelos
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default RecommendationsHistory