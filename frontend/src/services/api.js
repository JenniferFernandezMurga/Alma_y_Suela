// frontend/src/services/api.js
import { API_ENDPOINTS } from '../config/api'

export const shoesService = {
    search: async (query, filters = {}) => {
        // Construir URL con parámetros
        const params = new URLSearchParams();
        
        // Añadir query si existe
        if (query) {
            params.append('q', query);
        }
        
        // AÑADIR FILTROS DE PRECIO (nuevo)
        if (filters.precio_min !== undefined) {
            params.append('precio_min', filters.precio_min);
        }
        
        if (filters.precio_max !== undefined) {
            params.append('precio_max', filters.precio_max);
        }
        
        // Añadir filtro por marca
        if (filters.marca) {
            params.append('marca', filters.marca);
        }
        
        // Añadir filtro por actividad
        if (filters.activity) {
            params.append('activity', filters.activity);
        }
        
        // Mantener compatibilidad con filtros antiguos
        if (filters.category && filters.category !== 'todo') {
            params.append('category', filters.category);
        }
        
        if (filters.brand) {
            params.append('marca', filters.brand);
        }
        
        if (filters.type) {
            params.append('tipo', filters.type);
        }
        
        if (filters.gender) {
            params.append('sexo', filters.gender);
        }
        
        const url = `${API_ENDPOINTS.SEARCH}?${params.toString()}`;
        console.log('🔍 Searching at:', url);
        
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.error || 'Search error');
            }
            
            return data;
        } catch (error) {
            console.error('❌ Error en búsqueda:', error);
            throw error;
        }
    },

    getAll: async () => {
        try {
            const response = await fetch(API_ENDPOINTS.SHOES);
            
            if (!response.ok) {
                throw new Error('Error loading shoes');
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('❌ Error obteniendo zapatillas:', error);
            throw error;
        }
    }
};