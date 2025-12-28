import api from "./api";

export const getAgendas = async (params = {}) => {
  const res = await api.get("/agenda", { params });
  return res.data;
};
skdajlksaj
export const getAgendasByMedico = async (medicoId, params = {}) => {
  const res = await api.get(`/agenda/medico/${medicoId}`, { params });
  return res.data;
};

export const createAgenda = async (payload) => {
  const res = await api.post("/agenda", payload);
  return res.data;
};

export const updateAgenda = async (id, payload) => {
  const res = await api.put(`/agenda/${id}`, payload);
  return res.data;
};

export const deleteAgenda = async (id) => {
  const res = await api.delete(`/agenda/${id}`);
  return res.data;
};
