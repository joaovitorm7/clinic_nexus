import api from "./api";

const ENDPOINT = "/agenda";

export const AgendaService = {
  getAgendas,
  getAgendasByMedico,
  createAgenda,
  updateAgenda,
  deleteAgenda,
  getAgendaIdByMedicoAndHora,
  getAgendasByMedicoData
};

async function getAgendas() {
  const res = await api.get(ENDPOINT);
  return res.data;
}

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
