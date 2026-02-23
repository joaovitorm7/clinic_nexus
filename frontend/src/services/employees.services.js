import api from './api';

const ENDPOINT = '/funcionarios';
const ROLES = ['Recepcionista', 'Administrador', 'Médico'];

export const employeeService = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  getRoles,
  FindByName,
  FindByCpf,
  desativarFuncionario,
  ativarFuncionario
};

async function desativarFuncionario(id) {
  const response = await api.patch(`${ENDPOINT}/${id}/desativar`);
  return response.data;
}

async function ativarFuncionario(id) {
  const response = await api.patch(`${ENDPOINT}/${id}/ativar`);
  return response.data;
}
async function FindByName(name){
  const response = await api.get(`${ENDPOINT}/nome/${encodeURIComponent(name)}`);
  return response.data;
}
async function FindByCpf(cpf){
  const response = await api.get(`${ENDPOINT}/cpf/${cpf}`);
  return response.data;
}
async function getEmployees() {
  const response = await api.get(ENDPOINT);
  return response.data;
}

async function getEmployeeById(id) {
  const response = await api.get(`${ENDPOINT}/${id}`);
  return response.data;
}

async function createEmployee(employeeData) {
  const response = await api.post(ENDPOINT, employeeData);
  return response.data;
}

async function updateEmployee(id, employeeData) {
  const response = await api.patch(`${ENDPOINT}/${id}`, employeeData);
  return response.data;
}

function getRoles() {
  return ROLES;
}
