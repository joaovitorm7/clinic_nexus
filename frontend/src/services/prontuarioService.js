import api from './api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

export const getMinhasConsultas = async () => {
  try {
    const response = await api.get('/prontuario/minhas-consultas', {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message || error);
    throw error;
  }
};

export const getProntuarios = async () => {
  try {
    const response = await api.get('/prontuario');
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message || error);
    throw error;
  }
};

export const getProntuarioById = async (id) => {
  try {
    const response = await api.get(`/prontuario/${id}`);
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message || error);
    throw error;
  }
};

export const getProntuarioByAgendamentoId = async (agendamentoId) => {
  try {
    const response = await api.get(`/prontuario/agendamento/${agendamentoId}`);
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message || error);
    throw error;
  }
};

export const getProntuariosByPacienteId = async (pacienteId) => {
  try {
    const response = await api.get(`/prontuario/paciente/${pacienteId}`);
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message || error);
    throw error;
  }
};

export const createProntuario = async (data) => {
  try {
    const response = await api.post('/prontuario', data);
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message || error);
    throw error;
  }
};

export const updateProntuario = async (id, data) => {
  try {
    const response = await api.put(`/prontuario/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message || error);
    throw error;
  }
};

export const deleteProntuario = async (id) => {
  try {
    const response = await api.delete(`/prontuario/${id}`);
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message || error);
    throw error;
  }
};
