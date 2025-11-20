import api from './api'

export const jadwalService = {
  getAll: (params = {}) => api.get('/jadwal', { params }),
  getById: (id) => api.get(`/jadwal/${id}`),
  create: (data) => api.post('/jadwal', data),
  update: (id, data) => api.put(`/jadwal/${id}`, data),
  delete: (id) => api.delete(`/jadwal/${id}`),
  getUpcoming: () => api.get('/jadwal/upcoming'),
}