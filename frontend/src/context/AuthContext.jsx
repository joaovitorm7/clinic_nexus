import React, { createContext, useContext, useEffect, useState } from "react";
import { login as loginService } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  // Carrega usuário do localStorage ao iniciar
  useEffect(() => {
    const storage = localStorage.getItem("usuario");
    if (storage) setUser(JSON.parse(storage));
    setInitializing(false);
  }, []);

  async function login(email, senha) {
    setLoading(true);
    try {
      const data = await loginService(email, senha);
      if (!data || !data.usuario || !data.access_token) {
        throw new Error("Resposta inválida do servidor");
      }

      const usuarioApi = data.usuario;
      const token = data.access_token;

      const usuario = {
        id: usuarioApi.id,
        email: usuarioApi.email,
        nome: usuarioApi.funcionario?.nome || usuarioApi.nome || "Usuário",
        cargo: usuarioApi.cargo,
      };

      localStorage.setItem("usuario", JSON.stringify(usuario));
      localStorage.setItem("token", token);

      setUser(usuario);
      return usuario;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        initializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
