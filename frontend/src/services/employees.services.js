import api from './api'; // instância axios (baseURL = VITE_API_URL)

export const getEmployees = (params) => {
  // params: { page, perPage, sortBy, order, roleId, q }
  return api.get('/users', { params });
};

export const getEmployee = (id) => api.get(`/users/${id}`);
export const createEmployee = (payload) => api.post('/users', payload);
export const updateEmployee = (id, payload) => api.put(`/users/${id}`, payload);
export const deleteEmployee = (id) => api.delete(`/users/${id}`);
export const getRoles = () => api.get('/roles');
