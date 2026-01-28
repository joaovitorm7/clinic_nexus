import api from "./api";

const ENDPOINT = "/agenda";

export const AgendaService = {
  getAgendas,
  getAgendasByMedico,
  createAgenda,
  updateAgenda,
  deleteAgenda,
  getAgendaIdByMedicoAndHora,
  getAgendasByMedicoData,
  getMinhasAgendas,
};

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

async function getAgendas() {
  const res = await api.get(`${ENDPOINT}/all`);
  return res.data;
}

async function getMinhasAgendas() {
  try {
  const response = await api.get(`${ENDPOINT}/minhas-agendas`, {
      headers: getAuthHeader(),
    });
  return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Erro ao buscar agendas do médico:', error);
    throw error;
  }
};

async function getAgendasByMedico(medicoId,data) {
  const res = await api.get(`${ENDPOINT}/medico/${medicoId}`);
  return res.data;
}
async function getAgendasByMedicoData(medicoId,data) {
  const res = await api.get(`${ENDPOINT}/medico/${medicoId}/disponiveis?data=${data}`);
  return res.data;
}

async function createAgenda(payload) {
  const res = await api.post(ENDPOINT, payload);
  return res.data;
}

async function updateAgenda(id, payload) {
  const res = await api.patch(`${ENDPOINT}/${id}`, payload);
  return res.data;
}

async function deleteAgenda(id) {
  const res = await api.delete(`${ENDPOINT}/${id}`);
  return res.data;
}
async function getAgendaIdByMedicoAndHora(medicoId, horaInicio) {
  const res = await api.get(`${ENDPOINT}/medico/${medicoId}/hora/${horaInicio}`);
  return res.data; 
}
