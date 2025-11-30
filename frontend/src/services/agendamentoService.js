import api from './api';

const especialidadeEndpoint = '/especialidades';

export const createAgendamento = async (data) => {
  const response = await api.post('/agendamentos', data);
  return response.data;
};

export const getAgendamentos = async () => {
  const response = await api.get('/agendamentos');
  return response.data;
};

export const getAgendamentoById = async (id) => {
  const response = await api.get(`/agendamentos/${id}`);
  return response.data;
};

export const deleteAgendamento = async (id) => {
  await api.delete(`/agendamentos/${id}`);
  return true;
};
export const getEspecialidades = async () => {
  const response = await api.get(especialidadeEndpoint);
  return response.data;
}

export default {
  createAgendamento,
  getAgendamentos,
  getAgendamentoById,
  deleteAgendamento,
  getEspecialidades
};
