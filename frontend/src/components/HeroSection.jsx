import React from 'react'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          {/* Texto principal */}
          <h1 className="hero-title">
            Encuentra la zapatilla 
            <span className="highlight"> perfecta </span> 
            para tus pies
          </h1>
          
          <p className="hero-subtitle">
            Nuestro sistema inteligente analiza tus características únicas 
            para recomendarte las zapatillas ideales para tu tipo de pie, 
            pisada y actividad deportiva.
          </p>
          
          {/* Estadísticas de confianza */}
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">95%</span>
              <span className="stat-label">de precisión</span>
            </div>
            <div className="stat">
              <span className="stat-number">2min</span>
              <span className="stat-label">test rápido</span>
            </div>
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">zapatillas analizadas</span>
            </div>
          </div>
          
          {/* Botones de acción */}
          <div className="hero-actions">
            <Link to="/recommend" className="btn btn-primary">
              Comenzar test gratuito
            </Link>
            <Link to="/about" className="btn btn-secondary">
              Ver cómo funciona
            </Link>
          </div>
        </div>
        
        {/* Imagen ilustrativa */}
        <div className="hero-image">
          <div className="shoe-showcase">
            <img 
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
              alt="Zapatillas deportivas" 
              className="shoe-image"
            />
            <div className="floating-card card-1">
              <span>🏃‍♂️ Para running</span>
            </div>
            <div className="floating-card card-2">
              <span>🥾 Para trail</span>
            </div>
            <div className="floating-card card-3">
              <span>💪 Para gym</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection