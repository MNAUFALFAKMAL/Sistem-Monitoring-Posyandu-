import api from './api'

export const balitaService = {
  getAll: (params = {}) => api.get('/balita', { params }),
  getById: (id) => api.get(`/balita/${id}`),
  create: (data) => api.post('/balita', data),
  update: (id, data) => api.put(`/balita/${id}`, data),
  delete: (id) => api.delete(`/balita/${id}`),
  search: (query) => api.get('/balita/search', { params: { q: query } }),
}