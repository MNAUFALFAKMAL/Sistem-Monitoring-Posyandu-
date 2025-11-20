import axios from 'axios'
import { API_URL } from '../utils/constants'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // PERBAIKAN: Hanya redirect ke login jika error 401 terjadi pada request yang sudah memiliki token
    if (error.response?.status === 401) {
      // Periksa apakah request yang gagal sudah menyertakan token
      const requestHadToken = error.config.headers.Authorization;

      if (requestHadToken) {
        // Ini adalah error token kadaluarsa/invalid untuk user yang sudah login
        localStorage.removeItem('token')
        // Gunakan navigate dari React Router jika memungkinkan, atau redirect hard
        window.location.href = '/login'
      }
      // Jika tidak ada token, ini adalah percobaan login yang gagal.
      // Jangan redirect, biarkan komponen yang memanggil API menangani error.
    }
    return Promise.reject(error)
  }
)

export default api