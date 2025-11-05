import api from "./api";

const ENDPOINT = "/usuarios";

const ROLES = [
  { id: "recepcionista", name: "Recepcionista" },
  { id: "medico", name: "Médico" },
  { id: "administrador", name: "Administrador" },
];

export const employeeService = {
  getRoles,
  getEmployees,
  createEmployee,
};

async function getRoles() {
  return ROLES;
}

async function getEmployees() {
  const response = await api.get(ENDPOINT);
  return response.data;
}

async function createEmployee(data) {
  const response = await api.post(ENDPOINT, data);
  return response.data;
}
