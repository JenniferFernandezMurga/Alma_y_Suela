import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer" style={{
            background: 'linear-gradient(135deg, #2C3E50 0%, #1a252f 100%)',
            color: 'white',
            padding: '40px 0 20px',
            marginTop: '60px'
        }}>
            <div className="container">
                <div className="row">
                    {/* Columna 1: Logo y descripción */}
                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="footer-logo" style={{ marginBottom: '20px' }}>
                            <img 
                                src="/images/Logo runwise2.png" 
                                alt="runwise" 
                                style={{ height: '40px', filter: 'brightness(0) invert(1)' }}
                            />
                        </div>
                        <p style={{ color: '#bdc3c7', fontSize: '0.9rem', lineHeight: '1.6' }}>
                            Encuentra las zapatillas perfectas para tu aventura, 
                            ya sea en asfalto, montaña o gimnasio. Test personalizado 
                            y recomendaciones basadas en tus características.
                        </p>
                    </div>

                    {/* Columna 2: Enlaces útiles */}
                    <div className="col-lg-2 col-md-6 mb-4 offset-lg-1">
                        <h5 style={{ color: '#2E8B57', marginBottom: '20px', fontWeight: '600' }}>Enlaces</h5>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '10px' }}>
                                <Link to="/" style={{ color: '#bdc3c7', textDecoration: 'none', transition: 'color 0.3s' }}
                                      onMouseEnter={(e) => e.target.style.color = '#2E8B57'}
                                      onMouseLeave={(e) => e.target.style.color = '#bdc3c7'}>
                                    Inicio
                                </Link>
                            </li>
                            <li style={{ marginBottom: '10px' }}>
                                <Link to="/recommend" style={{ color: '#bdc3c7', textDecoration: 'none', transition: 'color 0.3s' }}
                                      onMouseEnter={(e) => e.target.style.color = '#2E8B57'}
                                      onMouseLeave={(e) => e.target.style.color = '#bdc3c7'}>
                                    Recomendación
                                </Link>
                            </li>
                            <li style={{ marginBottom: '10px' }}>
                                <Link to="/search" style={{ color: '#bdc3c7', textDecoration: 'none', transition: 'color 0.3s' }}
                                      onMouseEnter={(e) => e.target.style.color = '#2E8B57'}
                                      onMouseLeave={(e) => e.target.style.color = '#bdc3c7'}>
                                    Catálogo
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Columna 3: Legal */}
                    <div className="col-lg-2 col-md-6 mb-4">
                        <h5 style={{ color: '#2E8B57', marginBottom: '20px', fontWeight: '600' }}>Legal</h5>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '10px' }}>
                                <Link to="/privacidad" style={{ color: '#bdc3c7', textDecoration: 'none', transition: 'color 0.3s' }}
                                      onMouseEnter={(e) => e.target.style.color = '#2E8B57'}
                                      onMouseLeave={(e) => e.target.style.color = '#bdc3c7'}>
                                    Política de Privacidad
                                </Link>
                            </li>
                            <li style={{ marginBottom: '10px' }}>
                                <Link to="/cookies" style={{ color: '#bdc3c7', textDecoration: 'none', transition: 'color 0.3s' }}
                                      onMouseEnter={(e) => e.target.style.color = '#2E8B57'}
                                      onMouseLeave={(e) => e.target.style.color = '#bdc3c7'}>
                                    Política de Cookies
                                </Link>
                            </li>
                            <li style={{ marginBottom: '10px' }}>
                                <Link to="/aviso-legal" style={{ color: '#bdc3c7', textDecoration: 'none', transition: 'color 0.3s' }}
                                      onMouseEnter={(e) => e.target.style.color = '#2E8B57'}
                                      onMouseLeave={(e) => e.target.style.color = '#bdc3c7'}>
                                    Aviso Legal
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Columna 4: Contacto y redes */}
                    <div className="col-lg-3 col-md-6 mb-4">
                        <h5 style={{ color: '#2E8B57', marginBottom: '20px', fontWeight: '600' }}>Contacto</h5>
                        <p style={{ color: '#bdc3c7', fontSize: '0.9rem', marginBottom: '15px' }}>
                            <i className="fas fa-envelope me-2" style={{ color: '#2E8B57' }}></i>
                            runwise.web@gmail.com
                        </p>
                        
                        {/* Disclaimer de afiliados */}
                        <div style={{
                            background: 'rgba(46, 139, 86, 0.1)',
                            padding: '15px',
                            borderRadius: '8px',
                            border: '1px solid rgba(46, 139, 86, 0.3)',
                            fontSize: '0.8rem',
                            color: '#bdc3c7',
                            marginTop: '20px'
                        }}>
                            <i className="fas fa-info-circle me-2" style={{ color: '#2E8B57' }}></i>
                            runwise participa en programas de afiliados de Decathlon, TradeDoubler y AWIN. 
                            Si compras a través de nuestros enlaces, podemos recibir una comisión sin coste adicional para ti.
                        </div>
                    </div>
                </div>

                {/* Línea divisoria */}
                <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '30px 0 20px' }} />

                {/* Copyright */}
                <div className="row">
                    <div className="col-12 text-center">
                        <p style={{ color: '#95a5a6', fontSize: '0.85rem', margin: 0 }}>
                            © {currentYear} runwise. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;