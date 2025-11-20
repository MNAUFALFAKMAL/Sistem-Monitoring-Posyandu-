import api from './api'

export const ibuHamilService = {
  getAll: (params = {}) => api.get('/ibu-hamil', { params }),
  getById: (id) => api.get(`/ibu-hamil/${id}`),
  create: (data) => api.post('/ibu-hamil', data),
  update: (id, data) => api.put(`/ibu-hamil/${id}`, data),
  delete: (id) => api.delete(`/ibu-hamil/${id}`),
  search: (query) => api.get('/ibu-hamil/search', { params: { q: query } }),
}