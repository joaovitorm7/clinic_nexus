import api from "./api";

const especialidadeEndpoint = "/especialidades";

export const createAgendamento = async (data) => {
  const response = await api.post("/agendamentos", data);
  return response.data;
};

export const getAgendamentos = async () => {
  const response = await api.get("/agendamentos/all");
  return response.data;
};
//TODO
const getAuthHeader = () => {
  const token = localStorage.getItem('token'); 
  return { Authorization: `Bearer ${token}` };
};

// Função para buscar consultas do médico logado
// TODO
export const getMinhasConsultas = async (token) => {
  try {
    const response = await api.get('/agendamentos/minhas-consultas', {
      headers: {
        Authorization: `Bearer ${token}`, // envia o JWT
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar consultas do médico:', error);
    throw error;
  }
};
export const getAgendamentoById = async (id) => {
  const response = await api.get(`/agendamentos/${id}`);
  return response.data;
};

export const deleteAgendamento = async (id) => {
  await api.delete(`/agendamentos/${id}`);
  return true;
};

export const cancelarAgendamento = async (id) => {
  const response = await api.patch(`/agendamentos/${id}/cancelar`);
  return response.data;
};

export const getEspecialidades = async () => {
  const response = await api.get(especialidadeEndpoint);
  return response.data;
};

export default {
  createAgendamento,
  getAgendamentos,
  getAgendamentoById,
  deleteAgendamento,
  cancelarAgendamento,
  getEspecialidades,
};
