// Importando axios para realizar requisições HTTP
import axios from 'axios';
// Definindo a URL base da API
const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';
// Criando uma instância do axios com a URL base definida
export default axios.create({ baseURL: API});