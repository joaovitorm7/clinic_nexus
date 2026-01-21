import api from "./api";

const ENDPOINT = "/medico";

export const DoctorsService = {
  getAll,
  getById,
  getByNome,
  getByEspecialidade,
};

async function getAll() {
  const res = await api.get(ENDPOINT);
  return res.data;
}

async function getById(id) {
  const res = await api.get(`${ENDPOINT}/${id}`);
  return res.data;
}

async function getByNome(nome) {
  const res = await api.get(ENDPOINT, {
    params: { nome },
  });
  return res.data;
}

async function getByEspecialidade(especialidadeId) {
  const res = await api.get(`${ENDPOINT}/especialidade/${especialidadeId}`);
  return res.data;
}

