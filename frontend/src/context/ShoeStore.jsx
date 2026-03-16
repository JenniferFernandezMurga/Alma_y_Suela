import React, { createContext, useContext, useReducer } from "react";
import { API_ENDPOINTS } from '../config/api';

const ShoeStore = createContext();

//iniar estados 

const initialState = {
  userData: {
    foot_width: '',
    arch_type: '',
    weight: '',
    activity_type: '',
    footstrike_type: '',
    target_distance: '',
    running_level: ''
  },

  recommendations : [],
  loading: false,
  error: null,
  currentStep: 1,
  user: null,
  isAuthenticated: false

};

//REDUCER - La "máquina de estado" que actualiza el estado
function shoeReducer(state, action) {
  console.log('🔧 Action:', action.type, 'Payload:', action.payload);
  
  switch (action.type) {
    case 'UPDATE_USER_DATA':
      return {
        ...state, // Copia el estado actual
        userData: {
          ...state.userData,  // Copia los datos actuales del usuario
          ...action.payload  // Fusiona los nuevos datos con los existentes
        }
      };
      
    case 'FETCH_RECOMMENDATIONS_START':
      return {
        ...state,
        loading: true,
        error: null
      };
      
    case 'FETCH_RECOMMENDATIONS_SUCCESS':
      return {
        ...state,
        loading: false,
        recommendations: action.payload,
        error: null
      };
      
    case 'FETCH_RECOMMENDATIONS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
        recommendations: []
      };
      
    case 'CLEAR_RECOMMENDATIONS':
      return {
        ...state,
        recommendations: [],
        error: null
      };
      
    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.payload
      };
      
    case 'RESET_FORM':
      return {
        ...initialState,
        user: state.user,
        isAuthenticated: state.isAuthenticated
      };

    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null
      };

    case 'AUTH_ERROR':
      return {
        ...state,
        error: action.payload
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false
      };

    default:
      return state;
  }
}

// 4. PROVIDER - El componente que envuelve la app y provee el estado
export function ShoeProvider({ children }) {
  // useReducer conecta el estado inicial con la función reductora
  const [state, dispatch] = useReducer(shoeReducer, initialState);
  
  // 5. ACCIONES - Funciones que "despachan" acciones al reducer
  const actions = {
    // Actualiza los datos del usuario en el formulario
    updateUserData: (newData) => {
      dispatch({
        type: 'UPDATE_USER_DATA',
        payload: newData
      });
    },
    
    // Obtiene recomendaciones de la API
    fetchRecommendations: async (userData) => {
      try {
        // Primero: indicar que empezó la carga
        dispatch({ type: 'FETCH_RECOMMENDATIONS_START' });
        
        // Llamar a la API
        const response = await fetch(API_ENDPOINTS.RECOMMEND, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
          throw new Error('Error en la API');
        }
        
        const data = await response.json();
        
        // Éxito: guardar recomendaciones
        dispatch({
          type: 'FETCH_RECOMMENDATIONS_SUCCESS', 
          payload: data.recommendations
        });
        
      } catch (error) {
        // Error: guardar mensaje de error
        dispatch({
          type: 'FETCH_RECOMMENDATIONS_ERROR',
          payload: error.message
        });
      }
    },
    
    // Limpiar resultados
    clearRecommendations: () => {
      dispatch({ type: 'CLEAR_RECOMMENDATIONS' });
    },
    
    // Cambiar paso del formulario
    setStep: (step) => {
      dispatch({
        type: 'SET_STEP',
        payload: step
      });
    },
    
    // Reiniciar todo el formulario
    resetForm: () => {
      dispatch({ type: 'RESET_FORM' });
    },

    login: async (email, password) => {
      try {
        dispatch({ type: 'FETCH_RECOMMENDATIONS_START' }); // Reuse loading
        const response = await fetch(API_ENDPOINTS.LOGIN, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (data.success) {
          dispatch({ type: 'AUTH_SUCCESS', payload: data.user });
          return { success: true };
        } else {
          dispatch({ type: 'AUTH_ERROR', payload: data.error });
          return { success: false, error: data.error };
        }
      } catch (error) {
        dispatch({ type: 'AUTH_ERROR', payload: error.message });
        return { success: false, error: error.message };
      }
    },

    register: async (name, email, password) => {
      try {
        dispatch({ type: 'FETCH_RECOMMENDATIONS_START' });
        const response = await fetch(API_ENDPOINTS.REGISTER, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        });
        const data = await response.json();
        if (data.success) {
          dispatch({ type: 'AUTH_SUCCESS', payload: data.user });
          return { success: true };
        } else {
          dispatch({ type: 'AUTH_ERROR', payload: data.error });
          return { success: false, error: data.error };
        }
      } catch (error) {
        dispatch({ type: 'AUTH_ERROR', payload: error.message });
        return { success: false, error: error.message };
      }
    },

    logout: () => {
      dispatch({ type: 'LOGOUT' });
    }
  };

  // 6. VALOR que se provee a todos los componentes
  const value = {
    state,    // { userData, recommendations, loading, error }
    actions   // { updateUserData, fetchRecommendations, clearRecommendations, etc. }
  };

  return (
    <ShoeStore.Provider value={value}>
      {children}
    </ShoeStore.Provider>
  );
}

// 7. HOOK personalizado para usar el Store fácilmente
export function useShoe() {
  const context = useContext(ShoeStore);
  if (!context) {
    throw new Error('useShoe debe usarse dentro de ShoeProvider');
  }
  return context;
}