import api from './api'

export const authService = {
  login: (credentials) => api.post('/login', credentials),
  checkAuth: (token) => api.get('/user', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }),
  logout: () => api.post('/logout'),
}