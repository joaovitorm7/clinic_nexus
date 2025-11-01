import api from "./api"; 

export const login = async (email, senha) => {
  try {
    const response = await api.post("/auth/login", { email, senha });
    const data = response.data;

    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(data.usuario));

    return data.usuario; 
  } catch (error) {
    console.error(error.response?.data || error.message || error);
    throw error;
  }
};
