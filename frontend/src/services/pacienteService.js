import api from "./api";


export const getPatientByCPF = (cpf) => api.get(`/patients/${cpf}`);

export const criarPaciente = async (pacienteData) => {
  try {
    const response = await api.post("/pacientes", pacienteData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar paciente:", error);
    throw error;
  }
};
