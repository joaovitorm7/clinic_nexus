// Importando axios para realizar requisições HTTP
import axios from 'axios';
// Definindo a URL base da API
const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Criando uma instância do axios com a URL base definida
const api = axios.create({ baseURL: API });

// Interceptor para adicionar o token JWT em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;