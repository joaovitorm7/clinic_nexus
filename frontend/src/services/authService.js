import api from "./api";

export const login = async (email, senha) => {
  try {
    const response = await api.post("/auth/login", { email, senha });
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error);
    throw error;
  }
};
