import React, { createContext, useContext, useEffect, useState } from "react";
import { login as loginService } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const storage =
      localStorage.getItem("usuario") ||
      sessionStorage.getItem("usuario");

    if (storage) {
      setUser(JSON.parse(storage));
    }

    setInitializing(false);
  }, []);

  async function login(email, senha, lembrar = false) {
    setLoading(true);

    try {
      const data = await loginService(email, senha);

      if (!data || !data.usuario) {
        throw new Error("Resposta inválida do servidor");
      }

      const usuarioApi = data.usuario;

      const usuario = {
        id: usuarioApi.id,
        email: usuarioApi.email,
        nome: usuarioApi.funcionario?.nome || "Usuário",
        cargo: usuarioApi.funcionario?.cargo
          ? usuarioApi.funcionario.cargo.toLowerCase()
          : null,
      };

      if (lembrar) {
        localStorage.setItem("usuario", JSON.stringify(usuario));
        sessionStorage.removeItem("usuario");
      } else {
        sessionStorage.setItem("usuario", JSON.stringify(usuario));
        localStorage.removeItem("usuario");
      }

      setUser(usuario);
      return usuario; 
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Erro ao autenticar"
      );
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("usuario");
    sessionStorage.removeItem("usuario");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        initializing,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}
