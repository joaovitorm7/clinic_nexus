import api from './api';

export const getProntuarioByPacienteId = async (pacienteId) => {
  const response = await api.get(`/prontuarios/paciente/${pacienteId}`);
  return response.data;
};

export const createProntuario = async (prontuarioData) => {
  const response = await api.post('/prontuarios', prontuarioData);
  return response.data;
};

export const updateProntuario = async (prontuarioId, prontuarioData) => {
  const response = await api.put(`/prontuarios/${prontuarioId}`, prontuarioData);
  return response.data;
};

export const deleteProntuario = async (prontuarioId) => {
  const response = await api.delete(`/prontuarios/${prontuarioId}`);
  return response.data;
};