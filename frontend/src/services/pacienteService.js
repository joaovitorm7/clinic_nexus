// src/services/pacienteService.js
import api from './api';

// Buscar paciente por CPF
export const getPatientByCPF = (cpf) => api.get(`/pacientes/${cpf}`);

// Buscar paciente por ID
export const getPatientById = (id) => api.get(`/pacientes/id/${id}`);

// Criar paciente
export const criarPaciente = async (pacienteData) => {
  try {
    const response = await api.post("/pacientes", pacienteData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar paciente:", error);
    throw error;
  }
};
//Editar Paciente
export const editarPaciente = async (id, pacienteData) => {
  try {
    const response = await api.patch(`/pacientes/${id}`, pacienteData);
    return response.data;
  } catch (error) {
    console.error("Erro ao editar paciente", error);
    throw error;
  }
};

export default {
  getPatientByCPF,
  getPatientById,
  criarPaciente,
  editarPaciente
};
