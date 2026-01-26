// src/services/pacienteService.js

import api from './api';

const ENDPOINT = '/pacientes';

export const pacienteService = {
  getPatientByCPF,
  getPatientById,
  criarPaciente,
  editarPaciente,
  getAll
};

async function getAll() {
  const res = await api.get("/pacientes")
  return res.data;
  
}

async function getPatientByCPF(cpf) {
  const res = await api.get(`${ENDPOINT}/cpf/${cpf}`);
  return res.data;
}

async function getPatientById(id) {
  const res = await api.get(`${ENDPOINT}/id/${id}`);
  return res.data;
}

async function criarPaciente(pacienteData) {
  const res = await api.post(ENDPOINT, pacienteData);
  return res.data;
}

async function editarPaciente(id, pacienteData) {
  const res = await api.patch(`${ENDPOINT}/${id}`, pacienteData);
  return res.data;
}
export default pacienteService;
