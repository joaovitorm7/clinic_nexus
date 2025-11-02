import api from "./api";

export const login = async (email, senha, navigate) => {
  try {
    const response = await api.post("/auth/login", { email, senha });
    const data = response.data;

  

    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(data));

    switch (data.tipo?.toLowerCase()) {
      case "administrador":
        navigate("/funcionarios");
        break;
        criar
      case "medico":
        navigate("/medico");
        break;
      case "recepcionista":
        //criar
        navigate("/recepcionista");
        break;
      default:
        console.warn("Tipo de usuário desconhecido:", data.tipo);
        navigate("/login");
        break;
    }

    return data;
  } catch (error) {
    console.error(error.response?.data || error);
    throw error;
  }
};
