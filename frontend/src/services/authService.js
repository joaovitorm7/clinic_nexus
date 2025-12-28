import api from './api';

export async function login(email, senha) {
  const response = await api.post('/auth/login', { email, senha });
  const { usuario } = response.data;

  localStorage.setItem('usuario', JSON.stringify(usuario));

  return usuario;
}

export function logout() {
  localStorage.removeItem('usuario');
}

export function getUsuarioLogado() {
  const usuario = localStorage.getItem('usuario');
  return usuario ? JSON.parse(usuario) : null;
}
