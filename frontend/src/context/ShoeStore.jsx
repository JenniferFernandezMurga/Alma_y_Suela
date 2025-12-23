import React, { createContext, useContext, useReducer, useEffect } from "react";

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

    auth: {
    user: null,
    isAuthenticated: false,
    token: localStorage.getItem('token') || null,
    authLoading: false,
    authError: null
  }

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
        ...initialState
      };

    case 'LOGIN_START':
  return {
    ...state,
    auth: {
      ...state.auth,
      authLoading: true,
      authError: null
    }
  };

case 'LOGIN_SUCCESS':
  return {
    ...state,
    auth: {
      user: action.payload.user,
      token: action.payload.token,
      isAuthenticated: true,
      authLoading: false,
      authError: null
    }
  };

case 'LOGIN_ERROR':
  return {
    ...state,
    auth: {
      ...state.auth,
      user: null,
      token: null,
      isAuthenticated: false,
      authLoading: false,
      authError: action.payload
    }
  };

case 'LOGOUT':
  return {
    ...state,
    auth: {
      user: null,
      token: null,
      isAuthenticated: false,
      authLoading: false,
      authError: null
    }
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
        const response = await fetch('/api/recommend', {
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
    // Acción de login
     login: async (email, password, navigate) => {
    try {
      dispatch({ type: 'LOGIN_START' });
      
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        throw new Error('Credenciales incorrectas');
      }
      
      const data = await response.json();
      
      // Guardar token en localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: data.user,
          token: data.token
        }
      });
      
      navigate('/'); // Redirigir al home
      
    } catch (error) {
      dispatch({
        type: 'LOGIN_ERROR',
        payload: error.message
      });
    }
  },
  
  register: async (userData, navigate) => {
    try {
      dispatch({ type: 'LOGIN_START' });
      
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        throw new Error('Error en el registro');
      }
      
      const data = await response.json();
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: data.user,
          token: data.token
        }
      });
      
      navigate('/');
      
    } catch (error) {
      dispatch({
        type: 'LOGIN_ERROR',
        payload: error.message
      });
    }
  },
  
// Obtener perfil COMPLETO
getProfile : async () => {
  const response = await fetch('/api/me', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await response.json();
  // Ya tienes preferences y favorites en data.user
  return data.user;
},

// Actualizar preferencias
updatePreferences : async (preferences) => {
  await fetch('/api/me/update', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ preferences })
  });
},

// Añadir favorito
 addFavorite : async (shoeId) => {
  await fetch('/api/me/favorites', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shoe_id: shoeId })
  });
},

// Eliminar favorito
 removeFavorite : async (shoeId) => {
  await fetch(`/api/me/favorites/${shoeId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });
},

  logout: (navigate) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    if (navigate) navigate('/');
  },
  
  // Verificar token al cargar la app
  checkAuth: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: JSON.parse(user),
          token: token
        }
      });
    }
  }
  };

    useEffect(() => {
    actions.checkAuth();
  }, []);

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