import React, { createContext, useContext, useReducer, useEffect, useRef } from "react";

const ShoeStore = createContext();

// Estado inicial
const initialState = {
  auth: {
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,
    profileImage: localStorage.getItem('profileImage') || null 
  },
  userData: {
    foot_width: '',
    arch_type: '',
    weight: '',
    activity_type: '',
    footstrike_type: '',
    target_distance: '',
    running_level: ''
  },
  recommendations: [],
  loading: false,
  error: null,
  currentStep: 1
};

// REDUCER
function shoeReducer(state, action) {
  console.log('🔧 Action:', action.type, 'Payload:', action.payload);
  
  switch (action.type) {
    case 'UPDATE_USER_DATA':
      return {
        ...state,
        userData: {
          ...state.userData,
          ...action.payload
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
          loading: true,
          error: null
        }
      };

    case 'LOGIN_SUCCESS':
      const savedImage = localStorage.getItem('profileImage')
      return {
        ...state,
        auth: {
          ...state.auth,
          user: action.payload.user,
          token: action.payload.token,
          isAuthenticated: true,
          loading: false,
          error: null,
          profileImage: savedImage || null
        }
      };

    case 'UPDATE_PROFILE_IMAGE':
    return {
        ...state,
        auth: {
            ...state.auth,
            profileImage: action.payload
        }
    };
      
    case 'LOGIN_FAILURE':
      return {
        ...state,
        auth: {
          ...state.auth,
          user: null,
          token: null,
          isAuthenticated: false,
          loading: false,
          error: action.payload
        }
      };
      
    case 'LOGOUT':
      return {
        ...state,
        auth: {
          user: null,
          token: null,
          isAuthenticated: false,
          loading: false,
          error: null
        }
      };
      
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        auth: {
          ...state.auth,
          user: action.payload.user,
          token: action.payload.token,
          isAuthenticated: true,
          loading: false,
          error: null
        }
      };
      
    default:
      return state;
  }
}

// PROVIDER
export function ShoeProvider({ children }) {
  const [state, dispatch] = useReducer(shoeReducer, initialState);
  const hasRestoredSession = useRef(false); // Para evitar múltiples restauraciones
  
  // ✅ useEffect para restaurar sesión (con protección)
  useEffect(() => {
    // Evitar múltiples ejecuciones en StrictMode
    if (hasRestoredSession.current) return;
    
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const isAuth = localStorage.getItem('isAuthenticated');
    
    console.log('🔄 Restaurando sesión:', { token: !!token, user: !!user, isAuth });
    
    if (token && user && isAuth === 'true' && !state.auth.isAuthenticated) {
      try {
        const userData = JSON.parse(user);
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: userData,
            token: token
          }
        });
        console.log('✅ Sesión restaurada:', userData);
        hasRestoredSession.current = true;
      } catch (error) {
        console.error('❌ Error restaurando sesión:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
      }
    }
  }, []); // Solo se ejecuta una vez

  // ACCIONES
  const actions = {
    updateUserData: (newData) => {
      dispatch({
        type: 'UPDATE_USER_DATA',
        payload: newData
      });
    },
    
    fetchRecommendations: async (userData) => {
      try {
        dispatch({ type: 'FETCH_RECOMMENDATIONS_START' });
        
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
        
        dispatch({
          type: 'FETCH_RECOMMENDATIONS_SUCCESS', 
          payload: data.recommendations
        });
        
      } catch (error) {
        dispatch({
          type: 'FETCH_RECOMMENDATIONS_ERROR',
          payload: error.message
        });
      }
    },
    
    login: async (email, password) => {
      try {
        dispatch({ type: 'LOGIN_START' });
        
        console.log('📝 Intentando login con:', email);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUser = {
          id: Date.now(),
          name: email.split('@')[0] || 'Usuario',
          email: email
        };
        
        const mockToken = 'mock-jwt-token-' + Date.now();
        
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('isAuthenticated', 'true');
        
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: mockUser,
            token: mockToken
          }
        });
        
        console.log('✅ Login exitoso, usuario:', mockUser);
        
        return { success: true };
        
      } catch (error) {
        console.error('❌ Error en login:', error);
        
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: 'Credenciales inválidas'
        });
        
        return { success: false, error: error.message };
      }
    },
//     updateProfileImage: (imageData) => {
//     localStorage.setItem('profileImage', imageData)
//     dispatch({
//         type: 'UPDATE_PROFILE_IMAGE',
//         payload: imageData
//     })
// },
    register: async (name, email, password) => {
      try {
        dispatch({ type: 'LOGIN_START' });
        
        console.log('📝 Registrando:', name, email);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUser = {
          id: Date.now(),
          name: name,
          email: email
        };
        
        const mockToken = 'mock-jwt-token-register-' + Date.now();
        
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('isAuthenticated', 'true');
        
        dispatch({
          type: 'REGISTER_SUCCESS',
          payload: {
            user: mockUser,
            token: mockToken
          }
        });
        
        return { success: true };
        
      } catch (error) {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: 'Error en el registro'
        });
        return { success: false, error: error.message };
      }
    },
    
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      
      dispatch({ type: 'LOGOUT' });
      
      console.log('👋 Sesión cerrada');
    },

    updateProfileImage: (imageData) => {
    // Guardar en localStorage
    if (imageData) {
        localStorage.setItem('profileImage', imageData)
    } else {
        localStorage.removeItem('profileImage')
    }
    
    // Actualizar estado
    dispatch({
        type: 'UPDATE_PROFILE_IMAGE',
        payload: imageData
    })
},

    clearRecommendations: () => {
      dispatch({ type: 'CLEAR_RECOMMENDATIONS' });
    },
    
    setStep: (step) => {
      dispatch({
        type: 'SET_STEP',
        payload: step
      });
    },
    
    resetForm: () => {
      dispatch({ type: 'RESET_FORM' });
    }
  };

  const value = {
    state,
    actions
  };

  return (
    <ShoeStore.Provider value={value}>
      {children}
    </ShoeStore.Provider>
  );
}

// HOOK personalizado
export function useShoe() {
  const context = useContext(ShoeStore);
  if (!context) {
    throw new Error('useShoe debe usarse dentro de ShoeProvider');
  }
  return context;
}