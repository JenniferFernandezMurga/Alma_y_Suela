import React, { useState, useRef } from 'react'
import { useShoe } from '../context/ShoeStore'
import UserAvatar from './UserAvatar'

const ProfileImageUpload = ({ isOpen, onClose }) => {
    const { state, actions } = useShoe()
    const [selectedFile, setSelectedFile] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef(null)

    if (!isOpen) return null

    const handleFileSelect = (e) => {
        const file = e.target.files[0]
        if (!file) return

        // Validaciones
        if (!file.type.startsWith('image/')) {
            alert('Por favor, selecciona una imagen')
            return
        }

        if (file.size > 2 * 1024 * 1024) {
            alert('La imagen no puede superar los 2MB')
            return
        }

        setSelectedFile(file)
        
        // Crear preview
        const reader = new FileReader()
        reader.onload = () => {
            setPreviewUrl(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const handleUpload = async () => {
        if (!selectedFile) return

        setUploading(true)
        
        try {
            const reader = new FileReader()
            reader.onload = async () => {
                await actions.updateProfileImage(reader.result)
                setUploading(false)
                onClose()
            }
            reader.readAsDataURL(selectedFile)
        } catch (error) {
            console.error('Error:', error)
            alert('Error al subir la imagen')
            setUploading(false)
        }
    }

    const handleRemove = () => {
        if (window.confirm('¿Eliminar foto de perfil?')) {
            actions.updateProfileImage(null)
            onClose()
        }
    }

    return (
        <div className="modal-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div className="modal-content" style={{
                background: 'white',
                borderRadius: '16px',
                padding: '30px',
                maxWidth: '400px',
                width: '90%'
            }}>
                <h3 style={{ marginBottom: '20px' }}>
                    <i className="fas fa-camera me-2"></i>
                    Foto de perfil
                </h3>

                {/* Preview */}
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <UserAvatar size="xlarge" showUpload={false} />
                </div>

                {/* Preview de nueva imagen */}
                {previewUrl && (
                    <div style={{ 
                        textAlign: 'center', 
                        marginBottom: '20px',
                        padding: '10px',
                        background: '#f8f9fa',
                        borderRadius: '8px'
                    }}>
                        <p>Vista previa:</p>
                        <img 
                            src={previewUrl} 
                            alt="Preview"
                            style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                )}

                {/* Input oculto */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*"
                    style={{ display: 'none' }}
                />

                {/* Botones */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="btn btn-outline-primary"
                        disabled={uploading}
                    >
                        <i className="fas fa-search me-2"></i>
                        Seleccionar imagen
                    </button>

                    {selectedFile && (
                        <button
                            onClick={handleUpload}
                            className="btn btn-primary"
                            disabled={uploading}
                        >
                            {uploading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                    Subiendo...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-upload me-2"></i>
                                    Subir imagen
                                </>
                            )}
                        </button>
                    )}

                    {state.auth.profileImage && (
                        <button
                            onClick={handleRemove}
                            className="btn btn-danger"
                            disabled={uploading}
                        >
                            <i className="fas fa-trash me-2"></i>
                            Eliminar foto actual
                        </button>
                    )}

                    <button
                        onClick={onClose}
                        className="btn btn-secondary"
                        disabled={uploading}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfileImageUpload