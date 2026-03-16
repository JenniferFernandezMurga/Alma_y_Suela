import React, { createContext, useContext, useState, useEffect } from 'react';
import { useShoe } from './ShoeStore';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const { state } = useShoe();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

    // Cargar favoritos cuando el usuario se autentica
    useEffect(() => {
        if (state.auth.isAuthenticated && state.auth.user) {
            loadFavorites();
        } else {
            setFavorites([]);
        }
    }, [state.auth.isAuthenticated, state.auth.user]);

    const loadFavorites = async () => {
        setLoading(true);
        try {
            // Aquí conectarías con tu API real
            const stored = localStorage.getItem(`favorites_${state.auth.user?.id}`);
            if (stored) {
                setFavorites(JSON.parse(stored));
            } else {
                // Simulación de carga desde API
                await new Promise(resolve => setTimeout(resolve, 500));
                const mockFavorites = [];
                setFavorites(mockFavorites);
                localStorage.setItem(`favorites_${state.auth.user?.id}`, JSON.stringify(mockFavorites));
            }
        } catch (error) {
            console.error('Error cargando favoritos:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToFavorites = async (product) => {
        if (!state.auth.isAuthenticated) {
            return { success: false, error: 'auth_required' };
        }

        try {
            const updatedFavorites = [...favorites, { ...product, added_at: new Date().toISOString() }];
            setFavorites(updatedFavorites);

            // Guardar en localStorage (temporal hasta conectar con API)
            localStorage.setItem(`favorites_${state.auth.user?.id}`, JSON.stringify(updatedFavorites));

            // Aquí iría tu llamada a la API
            // await api.post('/favorites', { product_id: product.id });

            return { success: true };
        } catch (error) {
            console.error('Error añadiendo a favoritos:', error);
            return { success: false, error: error.message };
        }
    };

    const removeFromFavorites = async (productId) => {
        if (!state.auth.isAuthenticated) return { success: false };

        try {
            const updatedFavorites = favorites.filter(item => item.id !== productId);
            setFavorites(updatedFavorites);

            localStorage.setItem(`favorites_${state.auth.user?.id}`, JSON.stringify(updatedFavorites));

            // await api.delete(`/favorites/${productId}`);

            return { success: true };
        } catch (error) {
            console.error('Error eliminando de favoritos:', error);
            return { success: false, error: error.message };
        }
    };

    const isFavorite = (productId) => {
        return favorites.some(item => item.id === productId);
    };

    const clearFavorites = async () => {
        if (!state.auth.isAuthenticated) return;

        try {
            setFavorites([]);
            localStorage.removeItem(`favorites_${state.auth.user?.id}`);
            // await api.delete('/favorites/all');
        } catch (error) {
            console.error('Error limpiando favoritos:', error);
        }
    };

    return (
        <FavoritesContext.Provider value={{
            favorites,
            loading,
            addToFavorites,
            removeFromFavorites,
            isFavorite,
            clearFavorites,
            refreshFavorites: loadFavorites
        }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites debe usarse dentro de FavoritesProvider');
    }
    return context;
};