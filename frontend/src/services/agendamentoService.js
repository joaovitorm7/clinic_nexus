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
export const getMinhasConsultas = async (medicoId) => {
  try {
    const response = await api.get(`/agendamentos/minhas-consultas?medicoId=${medicoId}`, {
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

export const updateAgendamento = async (id, data) => {
  const response = await api.patch(`/agendamentos/${id}`, data, { headers: getAuthHeader() });
  return response.data;
};

export const cancelarAgendamento = async (id) => {
  const response = await api.patch(`/agendamentos/${id}/cancelar`, {}, { headers: getAuthHeader() });
  return response.data;
};

export const getEspecialidades = async () => {
  const response = await api.get(especialidadeEndpoint, { headers: getAuthHeader() });
  return response.data;
};

export const exportarExcel = async (dataInicio, dataFim) => {
  const response = await api.get("/agendamentos/exportar/excel", {
    headers: getAuthHeader(),
    params: { dataInicial: dataInicio, dataFinal: dataFim },
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "consultas.xlsx");
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const exportarPDF = async (dataInicio, dataFim) => {
  const response = await api.get("/agendamentos/exportar/pdf", {
    headers: getAuthHeader(),
    params: { dataInicial: dataInicio, dataFinal: dataFim },
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "consultas.pdf");
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export default {
  createAgendamento,
  getAgendamentos,
  getAgendamentoById,
  deleteAgendamento,
  updateAgendamento,
  cancelarAgendamento,
  getEspecialidades,
  getMinhasConsultas,
  exportarExcel,
  exportarPDF,
};
