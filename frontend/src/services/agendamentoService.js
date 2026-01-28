import api from "./api";

const especialidadeEndpoint = "/especialidades";

// Header com token
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

export const createAgendamento = async (data) => {
  const response = await api.post("/agendamentos", data, { headers: getAuthHeader() });
  return response.data;
};

export const getAgendamentos = async () => {
  const response = await api.get("/agendamentos/all", { headers: getAuthHeader() });
  return response.data;
};

// Consultas do médico logado
export const getMinhasConsultas = async () => {
  try {
    const response = await api.get('/agendamentos/minhas-consultas', {
      headers: getAuthHeader(),
    });
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Erro ao buscar consultas do médico:', error);
    throw error;
  }
};

export const getAgendamentoById = async (id) => {
  const response = await api.get(`/agendamentos/${id}`, { headers: getAuthHeader() });
  return response.data;
};

export const deleteAgendamento = async (id) => {
  await api.delete(`/agendamentos/${id}`, { headers: getAuthHeader() });
  return true;
};

export const cancelarAgendamento = async (id) => {
  const response = await api.patch(`/agendamentos/${id}/cancelar`, {}, { headers: getAuthHeader() });
  return response.data;
};

export const getEspecialidades = async () => {
  const response = await api.get(especialidadeEndpoint, { headers: getAuthHeader() });
  return response.data;
};

export default {
  createAgendamento,
  getAgendamentos,
  getAgendamentoById,
  deleteAgendamento,
  cancelarAgendamento,
  getEspecialidades,
  getMinhasConsultas,
};
