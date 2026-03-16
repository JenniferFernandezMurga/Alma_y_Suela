// frontend/src/config/api.js
export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
}

export const API_ENDPOINTS = {
    SEARCH: `${API_CONFIG.BASE_URL}/api/shoes/search`,
    SHOES: `${API_CONFIG.BASE_URL}/api/shoes`
}