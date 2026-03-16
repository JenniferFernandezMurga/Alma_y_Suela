import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import "../styles/RecommendationForm.css"

const RecommendationForm = () => {
    const [formData, setFormData] = useState({
        gender: "",
        foot_width: "",
        arch_type: "",
        weight: "", 
        activity_type: "",
        footstrike_type: "",
        target_distance: "",
        running_level: "",
        // NUEVOS CAMPOS
        drop_preference: "",
        waterproof: false,
        sole_type: "",
        terrain_preference: ""
    })
    const [currentStep, setCurrentStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    // Opciones de peso dinámicas
    const getWeightOptions = () => {
        if (formData.gender === 'female') {
            return [
                { value: "55", label: "Menos de 60kg", desc: "Ligera" },
                { value: "65", label: "60-70kg", desc: "Media" },
                { value: "75", label: "70-80kg", desc: "Robusta" },
                { value: "85", label: "Más de 80kg", desc: "Fuerte" }
            ]
        } else {
            return [
                { value: "65", label: "Menos de 70kg", desc: "Ligero" },
                { value: "80", label: "70-85kg", desc: "Medio" },
                { value: "90", label: "85-95kg", desc: "Robusto" },
                { value: "100", label: "Más de 95kg", desc: "Fuerte" }
            ]
        }
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))

        // Resetear peso si cambia el género
        if (name === 'gender') {
            setFormData(prev => ({
                ...prev,
                gender: value,
                weight: ""
            }))
        }
    }

    const nextStep = () => {
        console.log("Validando paso:", currentStep);

        // Validar campo requerido según el paso
        if (currentStep === 1 && !formData.gender) {
            setError("Por favor selecciona tu género")
            return
        }
        if (currentStep === 2 && !formData.weight) {
            setError("Por favor selecciona tu peso")
            return
        }
        if (currentStep === 3 && !formData.foot_width) {
            setError("Por favor selecciona el ancho de tu pie")
            return
        }
        if (currentStep === 4 && !formData.arch_type) {
            setError("Por favor selecciona tu tipo de arco")
            return
        }
        if (currentStep === 5 && !formData.activity_type) {
            setError("Por favor selecciona tu actividad principal")
            return
        }

        setError("");

        // Avanzar al siguiente paso
        if (currentStep === 5) {
            console.log("⚠️ IMPORTANTE: Voy a pasar al paso 6");
        }

        setCurrentStep(prev => {
            const next = prev + 1;
            console.log(`Avanzando del paso ${prev} al ${next}`);
            return next;
        });
    }

    const prevStep = () => {
        setCurrentStep(prev => {
            const prevStep = prev - 1;
            console.log(`Retrocediendo al paso ${prevStep}`);
            return prevStep;
        });
        setError("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        
        try {
            // Preparar datos - convertir "unknown" a null
            const dataToSend = {
                gender: formData.gender,
                foot_width: formData.foot_width === 'unknown' ? null : formData.foot_width,
                arch_type: formData.arch_type === 'unknown' ? null : formData.arch_type,
                weight: parseInt(formData.weight) || 70,
                activity_type: formData.activity_type,
                footstrike_type: formData.footstrike_type === 'unknown' ? null : formData.footstrike_type,
                target_distance: formData.target_distance || null,
                running_level: formData.running_level || null,
                // NUEVOS CAMPOS
                drop_preference: formData.drop_preference || null,
                waterproof: formData.waterproof,
                sole_type: formData.sole_type || null,
                terrain_preference: formData.terrain_preference || null
            }
            
            console.log("📤 Datos enviados:", dataToSend)
            
            const response = await fetch('http://localhost:5000/api/recommend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend)
            })
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`)
            }
            
            const data = await response.json()
            
            if (data.success) {
                navigate('/recommendation-results', { 
                    state: { 
                        recommendations: data.recommendations,
                        userData: formData
                    } 
                })
            } else {
                setError(data.error || "Error en la recomendación")
            }
        } catch (error) {
            console.error("❌ Error:", error)
            setError("Error de conexión con el servidor: " + error.message)
        } finally {
            setLoading(false)
        }
    }

    // Renderizado por pasos
    const renderStep = () => {
        switch(currentStep) {
            case 1:
                return (
                    <div className="form-step">
                        <h3 className="step-title">Paso 1: Información básica</h3>
                        <div className="form-group">
                            <label className="form-label">
                                <i className="fas fa-venus-mars"></i>
                                Género
                            </label>
                            <small className="form-hint">Para ajustar mejor las recomendaciones</small>
                            <select
                                name="gender"
                                className="form-select"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecciona tu género</option>
                                <option value="female">Mujer</option>
                                <option value="male">Hombre</option>
                            </select>
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div className="form-step">
                        <h3 className="step-title">Paso 2: Tu peso</h3>
                        <div className="form-group">
                            <label className="form-label">
                                <i className="fas fa-weight-scale"></i>
                                Peso corporal
                            </label>
                            <small className="form-hint">
                                {formData.gender === 'female'
                                    ? "Rangos ajustados para mujeres"
                                    : "Rangos ajustados para hombres"}
                            </small>
                            <select
                                name="weight"
                                className="form-select"
                                value={formData.weight}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecciona tu peso</option>
                                {getWeightOptions().map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label} • {option.desc}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )
            case 3:
                return (
                    <div className="form-step">
                        <h3 className="step-title">Paso 3: Ancho del pie</h3>
                        <div className="form-group">
                            <label className="form-label">
                                <i className="fas fa-shoe-prints"></i>
                                Ancho de tu pie
                            </label>
                            <small className="form-hint">
                                ¿No lo sabes? <Link to="/blog/como-medir-ancho-pie" className="help-link">Aprende a medirlo aquí</Link>
                            </small>
                            <select
                                name="foot_width"
                                className="form-select"
                                value={formData.foot_width}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecciona el ancho</option>
                                <option value="narrow">Estrecho</option>
                                <option value="standard">Normal</option>
                                <option value="wide">Ancho</option>
                                <option value="unknown">No lo sé / Quiero ayuda</option>
                            </select>
                        </div>
                    </div>
                )
            case 4:
                return (
                    <div className="form-step">
                        <h3 className="step-title">Paso 4: Tipo de arco</h3>
                        <div className="form-group">
                            <label className="form-label">
                                <i className="fas fa-archway"></i>
                                Arco del pie
                            </label>
                            <small className="form-hint">
                                ¿No lo sabes? <Link to="/blog/como-medir-arco-pie" className="help-link">Aprende a medirlo aquí</Link>
                            </small>
                            <select
                                name="arch_type"
                                className="form-select"
                                value={formData.arch_type}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecciona tu tipo de arco</option>
                                <option value="low">Arco bajo (pie plano)</option>
                                <option value="neutral">Arco normal</option>
                                <option value="high">Arco alto</option>
                                <option value="unknown">No lo sé / Quiero ayuda</option>
                            </select>
                        </div>
                    </div>
                )
            case 5:
                return (
                    <div className="form-step">
                        <h3 className="step-title">Paso 5: Actividad principal</h3>
                        <div className="form-group">
                            <label className="form-label">
                                <i className="fas fa-running"></i>
                                ¿Para qué usarás las zapatillas?
                            </label>
                            <select
                                name="activity_type"
                                className="form-select"
                                value={formData.activity_type}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecciona tu actividad</option>
                                <option value="road_running">🏃 Running en carretera</option>
                                <option value="trail_running">⛰️ Trail running</option>
                                <option value="gym">💪 Gimnasio / CrossTraining</option>
                                <option value="walking">🚶 Caminar</option>
                            </select>
                        </div>
                    </div>
                )
            case 6:
                return (
                    <div className="form-step">
                        <h3 className="step-title">Paso 6: Detalles adicionales</h3>
                        <p className="step-subtitle">Opcional - ayuda a afinar la recomendación</p>
                        
                        <div className="form-group">
                            <label className="form-label">
                                <i className="fas fa-shoe-prints"></i>
                                Tipo de pisada
                            </label>
                            <small className="form-hint">
                                ¿No lo sabes? <Link to="/blog/como-saber-mi-pisada" className="help-link">Guía para identificar tu pisada</Link>
                            </small>
                            <select
                                name="footstrike_type"
                                className="form-select"
                                value={formData.footstrike_type}
                                onChange={handleChange}
                            >
                                <option value="">Selecciona tu tipo de pisada</option>
                                <option value="neutral">Neutra</option>
                                <option value="over_pronation">Pronación (pie hacia dentro)</option>
                                <option value="under_pronation">Supinación (pie hacia fuera)</option>
                                <option value="unknown">No lo sé / Quiero ayuda</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                <i className="fas fa-route"></i>
                                Distancia objetivo
                            </label>
                            <select
                                name="target_distance"
                                className="form-select"
                                value={formData.target_distance}
                                onChange={handleChange}
                            >
                                <option value="training">Entrenamiento general</option>
                                <option value="5k">5K</option>
                                <option value="10k">10K</option>
                                <option value="half_marathon">Media maratón (21K)</option>
                                <option value="marathon">Maratón (42K)</option>
                                <option value="ultra">Ultramaratón (+42K)</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                <i className="fas fa-chart-line"></i>
                                Nivel de experiencia
                            </label>
                            <select
                                name="running_level"
                                className="form-select"
                                value={formData.running_level}
                                onChange={handleChange}
                            >
                                <option value="beginner">Principiante</option>
                                <option value="intermediate">Intermedio</option>
                                <option value="advanced">Avanzado</option>
                                <option value="competitive">Competitivo</option>
                            </select>
                        </div>

                        {/* NUEVOS CAMPOS AVANZADOS */}
                        <h4 className="advanced-title">Preferencias avanzadas (opcional)</h4>

                        <div className="form-group">
                            <label className="form-label">
                                <i className="fas fa-sort"></i>
                                Preferencia de drop
                            </label>
                            <small className="form-hint">El drop es la diferencia de altura entre el talón y la punta</small>
                            <select
                                name="drop_preference"
                                className="form-select"
                                value={formData.drop_preference}
                                onChange={handleChange}
                            >
                                <option value="">Sin preferencia</option>
                                <option value="low">Bajo (0-4mm) - Sensación natural</option>
                                <option value="medium">Medio (5-8mm) - Equilibrado</option>
                                <option value="high">Alto (9-12mm) - Tradicional</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                <i className="fas fa-water"></i>
                                Impermeabilidad
                            </label>
                            <div className="checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="waterproof"
                                        checked={formData.waterproof}
                                        onChange={handleChange}
                                    />
                                    Prefiero zapatillas impermeables (Gore-Tex, etc.)
                                </label>
                            </div>
                        </div>

                        {formData.activity_type === 'trail_running' && (
                            <>
                                <div className="form-group">
                                    <label className="form-label">
                                        <i className="fas fa-shoe-prints"></i>
                                        Tipo de suela
                                    </label>
                                    <small className="form-hint">Algunas marcas tienen tecnologías específicas</small>
                                    <select 
                                        name="sole_type"
                                        className="form-select"
                                        value={formData.sole_type}
                                        onChange={handleChange}
                                    >
                                        <option value="">Sin preferencia</option>
                                        <option value="vibram">Vibram</option>
                                        <option value="contagrip">Contagrip (Salomon)</option>
                                        <option value="continental">Continental</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        <i className="fas fa-mountain"></i>
                                        Tipo de terreno
                                    </label>
                                    <small className="form-hint">¿Por dónde sueles correr?</small>
                                    <select 
                                        name="terrain_preference"
                                        className="form-select"
                                        value={formData.terrain_preference}
                                        onChange={handleChange}
                                    >
                                        <option value="">Sin preferencia</option>
                                        <option value="asfalto">Asfalto / Carretera</option>
                                        <option value="mixto">Mixto (pistas forestales)</option>
                                        <option value="tecnico">Técnico (montaña, rocas)</option>
                                    </select>
                                </div>
                            </>
                        )}
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div className="recommendation-page">
            <div className="recommendation-container">
                <div className="recommendation-card">
                    <div className="card-header">
                        <h1>
                            <i className="fas fa-magic"></i>
                            Encuentra tu zapatilla perfecta
                        </h1>
                        <p>Responde estas preguntas para una recomendación 100% personalizada</p>

                        {/* Progress bar */}
                        <div className="progress-steps">
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${(currentStep / 6) * 100}%` }}
                                ></div>
                            </div>
                            <div className="step-indicators">
                                {[1,2,3,4,5,6].map(step => (
                                    <div
                                        key={step}
                                        className={`step-dot ${currentStep >= step ? 'active' : ''}`}
                                    >
                                        {step}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Indicador visual del paso (temporal) */}
                        <div style={{
                            textAlign: 'center',
                            marginTop: '10px',
                            padding: '5px',
                            background: '#f0f0f0',
                            borderRadius: '5px',
                            color: '#333'
                        }}>
                            Paso actual: {currentStep}/6
                        </div>
                    </div>

                    <div className="card-body">
                        {error && (
                            <div className="alert-error">
                                <i className="fas fa-exclamation-circle"></i>
                                {error}
                            </div>
                        )}

                        {/* FORMULARIO - solo muestra el paso actual */}
                        <form onSubmit={handleSubmit}>
                            {renderStep()}

                            {/* SOLO EL BOTÓN DE SUBMIT está dentro del form */}
                            {currentStep === 6 && (
                                <div className="form-navigation" style={{ justifyContent: 'center' }}>
                                    <button 
                                        type="submit" 
                                        className="btn-submit"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner"></span>
                                                Analizando...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-magic"></i>
                                                Obtener recomendación
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </form>

                        {/* BOTONES DE NAVEGACIÓN - fuera del form */}
                        {currentStep !== 6 && (
                            <div className="form-navigation">
                                {currentStep > 1 && (
                                    <button
                                        type="button"
                                        className="btn-prev"
                                        onClick={prevStep}
                                    >
                                        <i className="fas fa-arrow-left"></i>
                                        Anterior
                                    </button>
                                )}

                                <button
                                    type="button"
                                    className="btn-next"
                                    onClick={nextStep}
                                    style={{ marginLeft: currentStep > 1 ? 'auto' : '0' }}
                                >
                                    Siguiente
                                    <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecommendationForm