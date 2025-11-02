import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as loginService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);


  // checkbox lembrar usuário
  // Ao iniciar ele tenta carregar usuário do localStorage ou sessionStorage
  useEffect(() => {
    const usuarioStorage = localStorage.getItem('usuario') || sessionStorage.getItem('usuario');
    if (usuarioStorage) {
      setUser(JSON.parse(usuarioStorage));
    }
  }, []);

  const login = async (email, senha, lembrar = false) => {
    setLoading(true);
    try {
      const usuario = await loginService(email, senha);

      if (lembrar) {
        localStorage.setItem('usuario', JSON.stringify(usuario));
        sessionStorage.removeItem('usuario');
      } else {
        sessionStorage.setItem('usuario', JSON.stringify(usuario));
        localStorage.removeItem('usuario');
      }

      setUser(usuario);
      return usuario;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Erro ao conectar com a API.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('usuario');
    sessionStorage.removeItem('usuario');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
