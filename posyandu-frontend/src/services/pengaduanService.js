import api from './api'

export const pengaduanService = {
  getAll: (params = {}) => api.get('/pengaduan', { params }),
  getById: (id) => api.get(`/pengaduan/${id}`),
  create: (data) => api.post('/pengaduan', data),
  update: (id, data) => api.put(`/pengaduan/${id}`, data),
  delete: (id) => api.delete(`/pengaduan/${id}`),
  respond: (id, response) => api.post(`/pengaduan/${id}/respond`, { response }),
}