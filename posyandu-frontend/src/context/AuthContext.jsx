import { createContext, useContext, useReducer, useEffect } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext()

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        error: null,
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
        error: action.payload,
      }
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
        error: null,
      }
    case 'AUTH_CHECK_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        error: null,
      }
    case 'AUTH_CHECK_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
        error: null,
      }
    default:
      return state
  }
}

const initialState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem('token'),
  isLoading: true,
  error: null,
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const checkAuth = async () => {
      if (state.token) {
        try {
          const response = await authService.checkAuth(state.token)
          const user = response.data?.data?.user;
          const token = state.token;
          
          if (user) {
            dispatch({
              type: 'AUTH_CHECK_SUCCESS',
              payload: { user, token },
            })
          } else {
            dispatch({ type: 'AUTH_CHECK_FAILURE' })
            localStorage.removeItem('token')
          }
        } catch (error) {
          dispatch({ type: 'AUTH_CHECK_FAILURE' })
          localStorage.removeItem('token')
        }
      } else {
        dispatch({ type: 'AUTH_CHECK_FAILURE' })
      }
    }

    checkAuth()
  }, [])

  const login = async (credentials) => {
    dispatch({ type: 'LOGIN_START' })
    try {
      const response = await authService.login(credentials)
      const { user, token } = response.data.data || {};
      
      if (!user || !token) {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: 'Data login tidak valid. Silakan coba lagi.',
        })
        return { 
          success: false, 
          error: 'Data login tidak valid. Silakan coba lagi.' 
        }
      }
      
      localStorage.setItem('token', token)
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token },
      })
      
      return { success: true, user }
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.response?.data?.message || error.message || 'Login gagal',
      })
      return { 
        success: false, 
        error: error.response?.data?.message || error.message || 'Login gagal' 
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    dispatch({ type: 'LOGOUT' })
  }

  const value = {
    ...state,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export { AuthContext }