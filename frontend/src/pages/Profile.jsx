import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShoe } from '../context/ShoeStore';
import { useFavorites } from '../context/FavoritesContext';
import '../styles/Profile.css';
import UserAvatar from '../components/UserAvatar';

const Profile = () => {
    const { state, actions } = useShoe();
    const { favorites, loading: favoritesLoading } = useFavorites();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [userStats, setUserStats] = useState({
        totalRecommendations: 0,
        favoriteBrands: [],
        averageMatch: 0,
        lastActivity: null
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        birth_date: '',
        gender: '',
        weight: '',
        height: '',
        foot_size: '',
        foot_width: '',
        arch_type: '',
        city: '',
        bio: '',
        running_level: '',
        preferred_activity: '',
        target_distance: '',
        notification_email: true,
        notification_recommendations: true,
        notification_offers: false
    });

    const [loading, setLoading] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [error, setError] = useState('');

    // Redirigir si no está autenticado
    useEffect(() => {
        if (!state.auth.isAuthenticated) {
            navigate('/login');
        }
    }, [state.auth.isAuthenticated, navigate]);

    // Cargar datos del usuario
    useEffect(() => {
        if (state.auth.user) {
            // Cargar desde localStorage o estado
            const userData = JSON.parse(localStorage.getItem('user_profile') || '{}');

            // Combinar datos de autenticación con perfil guardado
            setFormData(prev => ({
                ...prev,
                name: state.auth.user.name || '',
                email: state.auth.user.email || '',
                ...userData
            }));

            // Generar estadísticas
            generateUserStats();
        }
    }, [state.auth.user]);

    // Generar estadísticas del usuario
    const generateUserStats = () => {
        // Aquí calcularías estadísticas reales desde tu API
        const mockStats = {
            totalRecommendations: 12,
            favoriteBrands: ['Nike', 'Hoka', 'Salomon'],
            averageMatch: 94,
            lastActivity: '2024-01-15'
        };
        setUserStats(mockStats);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        setSaveSuccess(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Simular guardado en API
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Guardar en localStorage
            localStorage.setItem('user_profile', JSON.stringify(formData));

            setSaveSuccess(true);
            setIsEditing(false);

            // Ocultar mensaje de éxito después de 3 segundos
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (error) {
            setError('Error al guardar los cambios');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        actions.logout();
        navigate('/');
    };

    const handleDeleteAccount = () => {
        if (window.confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
            // Lógica para eliminar cuenta
            console.log('Eliminar cuenta');
        }
    };

    if (!state.auth.isAuthenticated) {
        return null; // o un loader
    }

    return (
        <div className="profile-page">
            {/* Hero del perfil - Estilo montaña */}
            <div className="profile-hero">
                <div className="container">
                    <div className="profile-header-content">
                       <div className="profile-avatar-wrapper">
    <UserAvatar size="xlarge" showUpload={true} />
</div>

                        <div className="profile-header-info">
                            <h1 className="profile-name">{formData.name || 'Runner'}</h1>
                            <p className="profile-email">{formData.email}</p>

                            {formData.city && (
                                <p className="profile-location">
                                    <i className="fas fa-map-marker-alt"></i>
                                    {formData.city}
                                </p>
                            )}

                            <div className="profile-badges">
                                {formData.running_level && (
                                    <span className="profile-badge">
                                        <i className="fas fa-flag-checkered"></i>
                                        {formData.running_level === 'beginner' && 'Principiante'}
                                        {formData.running_level === 'intermediate' && 'Intermedio'}
                                        {formData.running_level === 'advanced' && 'Avanzado'}
                                        {formData.running_level === 'competitive' && 'Competitivo'}
                                    </span>
                                )}
                                {formData.preferred_activity && (
                                    <span className="profile-badge">
                                        <i className={`fas fa-${
                                            formData.preferred_activity === 'trail_running' ? 'mountain' :
                                            formData.preferred_activity === 'road_running' ? 'road' :
                                            formData.preferred_activity === 'gym' ? 'dumbbell' : 'walking'
                                        }`}></i>
                                        {formData.preferred_activity === 'trail_running' && 'Trail'}
                                        {formData.preferred_activity === 'road_running' && 'Asfalto'}
                                        {formData.preferred_activity === 'gym' && 'Gimnasio'}
                                        {formData.preferred_activity === 'walking' && 'Caminata'}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="profile-header-actions">
                            <button
                                className={`profile-edit-btn ${isEditing ? 'editing' : ''}`}
                                onClick={() => setIsEditing(!isEditing)}
                            >
                                <i className={`fas fa-${isEditing ? 'times' : 'pencil-alt'}`}></i>
                                {isEditing ? 'Cancelar' : 'Editar perfil'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Ondas decorativas */}
                <div className="profile-wave">
                    <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
                        <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
                    </svg>
                </div>
            </div>

            <div className="container profile-container">
                {/* Stats Cards */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-magic"></i>
                        </div>
                        <div className="stat-content">
                            <div className="stat-value">{userStats.totalRecommendations}</div>
                            <div className="stat-label">Recomendaciones</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-heart"></i>
                        </div>
                        <div className="stat-content">
                            <div className="stat-value">{favorites.length}</div>
                            <div className="stat-label">Favoritos</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-chart-line"></i>
                        </div>
                        <div className="stat-content">
                            <div className="stat-value">{userStats.averageMatch}%</div>
                            <div className="stat-label">Compatibilidad</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-trophy"></i>
                        </div>
                        <div className="stat-content">
                            <div className="stat-value">{userStats.favoriteBrands.length}</div>
                            <div className="stat-label">Marcas favoritas</div>
                        </div>
                    </div>
                </div>

                {/* Tabs de navegación */}
                <div className="profile-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        <i className="fas fa-user-circle"></i>
                        Información personal
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'preferences' ? 'active' : ''}`}
                        onClick={() => setActiveTab('preferences')}
                    >
                        <i className="fas fa-sliders-h"></i>
                        Preferencias running
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
                        onClick={() => setActiveTab('security')}
                    >
                        <i className="fas fa-shield-alt"></i>
                        Seguridad
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                        onClick={() => setActiveTab('history')}
                    >
                        <i className="fas fa-history"></i>
                        Historial
                    </button>
                </div>

                {/* Contenido de las pestañas */}
                <div className="tab-content">
                    {activeTab === 'profile' && (
                        <div className="profile-section">
                            <div className="section-header">
                                <h2>
                                    <i className="fas fa-id-card"></i>
                                    {isEditing ? 'Editar información personal' : 'Mi perfil'}
                                </h2>
                                {!isEditing && (
                                    <p className="section-description">
                                        Tus datos personales y de contacto
                                    </p>
                                )}
                            </div>

                            {saveSuccess && (
                                <div className="alert-success">
                                    <i className="fas fa-check-circle"></i>
                                    ¡Perfil actualizado correctamente!
                                </div>
                            )}

                            {error && (
                                <div className="alert-error">
                                    <i className="fas fa-exclamation-triangle"></i>
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="profile-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>
                                            <i className="fas fa-user"></i>
                                            Nombre completo
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            placeholder="Tu nombre"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>
                                            <i className="fas fa-envelope"></i>
                                            Correo electrónico
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            placeholder="tu@email.com"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>
                                            <i className="fas fa-calendar-alt"></i>
                                            Fecha de nacimiento
                                        </label>
                                        <input
                                            type="date"
                                            name="birth_date"
                                            value={formData.birth_date}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>
                                            <i className="fas fa-venus-mars"></i>
                                            Género
                                        </label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                        >
                                            <option value="">Seleccionar</option>
                                            <option value="male">Hombre</option>
                                            <option value="female">Mujer</option>
                                            <option value="other">Otro</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>
                                            <i className="fas fa-map-marker-alt"></i>
                                            Ciudad
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            placeholder="Tu ciudad"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>
                                            <i className="fas fa-edit"></i>
                                            Biografía
                                        </label>
                                        <textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            placeholder="Cuéntanos sobre ti como runner..."
                                            rows="3"
                                        />
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className="form-actions">
                                        <button
                                            type="button"
                                            className="btn-cancel"
                                            onClick={() => setIsEditing(false)}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn-save"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="spinner-small"></span>
                                                    Guardando...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fas fa-save"></i>
                                                    Guardar cambios
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    )}

                    {activeTab === 'preferences' && (
                        <div className="profile-section">
                            <div className="section-header">
                                <h2>
                                    <i className="fas fa-sliders-h"></i>
                                    {isEditing ? 'Editar preferencias' : 'Preferencias de running'}
                                </h2>
                                {!isEditing && (
                                    <button
                                        className="btn-edit-section"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        <i className="fas fa-pencil-alt"></i>
                                        Editar
                                    </button>
                                )}
                            </div>

                            <form onSubmit={handleSubmit} className="profile-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>
                                            <i className="fas fa-weight"></i>
                                            Peso (kg)
                                        </label>
                                        <input
                                            type="number"
                                            name="weight"
                                            value={formData.weight}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            placeholder="Ej: 70"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>
                                            <i className="fas fa-arrows-alt-v"></i>
                                            Altura (cm)
                                        </label>
                                        <input
                                            type="number"
                                            name="height"
                                            value={formData.height}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            placeholder="Ej: 175"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>
                                            <i className="fas fa-shoe-prints"></i>
                                            Talla de pie (EU)
                                        </label>
                                        <select
                                            name="foot_size"
                                            value={formData.foot_size}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                        >
                                            <option value="">Seleccionar talla</option>
                                            {[...Array(14)].map((_, i) => {
                                                const size = 36 + i;
                                                return (
                                                    <option key={size} value={size}>{size}</option>
                                                );
                                            })}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>
                                            <i className="fas fa-arrows-alt-h"></i>
                                            Ancho del pie
                                        </label>
                                        <select
                                            name="foot_width"
                                            value={formData.foot_width}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                        >
                                            <option value="">Seleccionar</option>
                                            <option value="narrow">Estrecho</option>
                                            <option value="standard">Normal</option>
                                            <option value="wide">Ancho</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>
                                            <i className="fas fa-archway"></i>
                                            Tipo de arco
                                        </label>
                                        <select
                                            name="arch_type"
                                            value={formData.arch_type}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                        >
                                            <option value="">Seleccionar</option>
                                            <option value="low">Plano (bajo)</option>
                                            <option value="neutral">Normal</option>
                                            <option value="high">Alto</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>
                                            <i className="fas fa-tachometer-alt"></i>
                                            Nivel de experiencia
                                        </label>
                                        <select
                                            name="running_level"
                                            value={formData.running_level}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                        >
                                            <option value="">Seleccionar</option>
                                            <option value="beginner">Principiante</option>
                                            <option value="intermediate">Intermedio</option>
                                            <option value="advanced">Avanzado</option>
                                            <option value="competitive">Competitivo</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>
                                            <i className="fas fa-running"></i>
                                            Actividad principal
                                        </label>
                                        <select
                                            name="preferred_activity"
                                            value={formData.preferred_activity}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                        >
                                            <option value="">Seleccionar</option>
                                            <option value="road_running">Running en asfalto</option>
                                            <option value="trail_running">Trail running</option>
                                            <option value="gym">Gimnasio</option>
                                            <option value="walking">Caminata</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>
                                            <i className="fas fa-route"></i>
                                            Distancia objetivo
                                        </label>
                                        <select
                                            name="target_distance"
                                            value={formData.target_distance}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                        >
                                            <option value="">Seleccionar</option>
                                            <option value="5k">5K</option>
                                            <option value="10k">10K</option>
                                            <option value="half_marathon">Media maratón</option>
                                            <option value="marathon">Maratón</option>
                                            <option value="ultra">Ultra</option>
                                        </select>
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className="form-actions">
                                        <button
                                            type="button"
                                            className="btn-cancel"
                                            onClick={() => setIsEditing(false)}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn-save"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="spinner-small"></span>
                                                    Guardando...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fas fa-save"></i>
                                                    Guardar preferencias
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="profile-section">
                            <h2>
                                <i className="fas fa-shield-alt"></i>
                                Seguridad de la cuenta
                            </h2>

                            <div className="security-options">
                                <div className="security-item">
                                    <div className="security-icon">
                                        <i className="fas fa-lock"></i>
                                    </div>
                                    <div className="security-info">
                                        <h3>Contraseña</h3>
                                        <p>Última actualización: hace 3 meses</p>
                                    </div>
                                    <button className="security-btn">
                                        Cambiar contraseña
                                    </button>
                                </div>

                                <div className="security-item">
                                    <div className="security-icon">
                                        <i className="fas fa-bell"></i>
                                    </div>
                                    <div className="security-info">
                                        <h3>Notificaciones</h3>
                                        <p>Configura qué notificaciones deseas recibir</p>
                                    </div>
                                    <button className="security-btn">
                                        Configurar
                                    </button>
                                </div>

                                <div className="security-item">
                                    <div className="security-icon">
                                        <i className="fas fa-mobile-alt"></i>
                                    </div>
                                    <div className="security-info">
                                        <h3>Verificación en dos pasos</h3>
                                        <p>Añade una capa extra de seguridad</p>
                                    </div>
                                    <button className="security-btn">
                                        Activar
                                    </button>
                                </div>

                                <div className="security-item danger">
                                    <div className="security-icon">
                                        <i className="fas fa-trash-alt"></i>
                                    </div>
                                    <div className="security-info">
                                        <h3>Eliminar cuenta</h3>
                                        <p>Esta acción es permanente y no se puede deshacer</p>
                                    </div>
                                    <button
                                        className="security-btn danger"
                                        onClick={handleDeleteAccount}
                                    >
                                        Eliminar cuenta
                                    </button>
                                </div>
                            </div>

                            <div className="notification-settings">
                                <h3>Preferencias de notificaciones</h3>

                                <div className="notification-item">
                                    <div className="notification-checkbox">
                                        <input
                                            type="checkbox"
                                            name="notification_email"
                                            id="notification_email"
                                            checked={formData.notification_email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="notification-info">
                                        <label htmlFor="notification_email">
                                            <strong>Notificaciones por email</strong>
                                            <p>Recibe actualizaciones importantes sobre tu cuenta</p>
                                        </label>
                                    </div>
                                </div>

                                <div className="notification-item">
                                    <div className="notification-checkbox">
                                        <input
                                            type="checkbox"
                                            name="notification_recommendations"
                                            id="notification_recommendations"
                                            checked={formData.notification_recommendations}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="notification-info">
                                        <label htmlFor="notification_recommendations">
                                            <strong>Nuevas recomendaciones</strong>
                                            <p>Te avisamos cuando tengamos nuevas zapatillas que te puedan interesar</p>
                                        </label>
                                    </div>
                                </div>

                                <div className="notification-item">
                                    <div className="notification-checkbox">
                                        <input
                                            type="checkbox"
                                            name="notification_offers"
                                            id="notification_offers"
                                            checked={formData.notification_offers}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="notification-info">
                                        <label htmlFor="notification_offers">
                                            <strong>Ofertas y promociones</strong>
                                            <p>Descuentos exclusivos en tus marcas favoritas</p>
                                        </label>
                                    </div>
                                </div>

                                <button className="btn-save-notifications">
                                    <i className="fas fa-save"></i>
                                    Guardar preferencias
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div className="profile-section">
                            <h2>
                                <i className="fas fa-history"></i>
                                Historial de actividad
                            </h2>

                            <div className="history-timeline">
                                <div className="timeline-item">
                                    <div className="timeline-icon">
                                        <i className="fas fa-magic"></i>
                                    </div>
                                    <div className="timeline-content">
                                        <h4>Nueva recomendación generada</h4>
                                        <p>Encontraste 3 zapatillas para trail running</p>
                                        <span className="timeline-date">Hace 2 días</span>
                                    </div>
                                </div>

                                <div className="timeline-item">
                                    <div className="timeline-icon">
                                        <i className="fas fa-heart"></i>
                                    </div>
                                    <div className="timeline-content">
                                        <h4>Añadiste a favoritos</h4>
                                        <p>Hoka Speedgoat 5 - Trail running</p>
                                        <span className="timeline-date">Hace 5 días</span>
                                    </div>
                                </div>

                                <div className="timeline-item">
                                    <div className="timeline-icon">
                                        <i className="fas fa-user-edit"></i>
                                    </div>
                                    <div className="timeline-content">
                                        <h4>Perfil actualizado</h4>
                                        <p>Actualizaste tus preferencias de running</p>
                                        <span className="timeline-date">Hace 1 semana</span>
                                    </div>
                                </div>

                                <div className="timeline-item">
                                    <div className="timeline-icon">
                                        <i className="fas fa-search"></i>
                                    </div>
                                    <div className="timeline-content">
                                        <h4>Búsqueda realizada</h4>
                                        <p>Buscaste "zapatillas trail mujer"</p>
                                        <span className="timeline-date">Hace 2 semanas</span>
                                    </div>
                                </div>
                            </div>

                            <div className="recommendations-summary">
                                <h3>Tus últimas recomendaciones</h3>
                                <div className="mini-recommendations">
                                    {/* Aquí irían las últimas recomendaciones */}
                                    <div className="mini-recommendation">
                                        <img src="/images/shoe-placeholder.jpg" alt="Zapatilla" />
                                        <div className="mini-info">
                                            <h4>Nike Pegasus 40</h4>
                                            <p>Running asfalto • 92% match</p>
                                        </div>
                                    </div>
                                    <div className="mini-recommendation">
                                        <img src="/images/shoe-placeholder.jpg" alt="Zapatilla" />
                                        <div className="mini-info">
                                            <h4>Salomon Speedcross 6</h4>
                                            <p>Trail running • 88% match</p>
                                        </div>
                                    </div>
                                </div>
                                <Link to="/recommendations" className="view-all-link">
                                    Ver todas mis recomendaciones
                                    <i className="fas fa-arrow-right"></i>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Cerrar sesión móvil */}
                <div className="mobile-logout-section">
                    <button className="logout-btn" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;