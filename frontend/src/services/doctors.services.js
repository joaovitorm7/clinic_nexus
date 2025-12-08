import api from './api';

/**
 * Busca médicos pelo ID da especialidade usando a rota correta:
 * GET /medico/especialidade/:especialidade_id
 *
 * Retorna um array de médicos (normalizado) ou lança erro.
 *
 * @param {string|number} especialidadeId
 * @returns {Promise<Array>}
 */

export const getDoctors = async () => {
  try {
    const response = await api.get('/medico');
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message || error);
    throw error;
  }
}
export const getDoctorById = async (id) => {
  try {
    const response = await api.get(`/medico/${id}`);
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message || error);
    throw error;
  }
}
export async function getDoctorByEspecialidadeId(especialidadeId) {
  if (especialidadeId === undefined || especialidadeId === null || especialidadeId === '') {
    throw new Error('especialidadeId é obrigatório');
  }

  const id = String(especialidadeId);

  const normalize = (res) => {
    const payload = res?.data ?? res;
    if (Array.isArray(payload)) return payload;
    if (payload && Array.isArray(payload.data)) return payload.data;
    if (payload && Array.isArray(payload.items)) return payload.items;
    return [];
  };

  try {
    const url = `/medico/especialidade/${encodeURIComponent(id)}`;
    const resp = await api.get(url);
    return normalize(resp);
  } catch (err) {
    // extrai mensagem amigável
    const status = err?.response?.status;
    const serverMsg = err?.response?.data?.message ?? err?.response?.data ?? err?.message ?? 'Erro ao buscar médicos';
    // se 404, retornamos array vazio para UX amigável (sem quebrar)
    if (status === 404 || status === 204) return [];
    // para outros códigos, repassamos o erro com informação
    const e = new Error(typeof serverMsg === 'string' ? serverMsg : JSON.stringify(serverMsg));
    e.cause = err;
    e.status = status;
    throw e;
  }
}



export const createDoctor = async (doctorData) => {
  try {
    const response = await api.post('/medico', doctorData);
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message || error);
    throw error;
  }
}
export const updateDoctor = async (id, doctorData) => {
  try {
    const response = await api.put(`/medico/${id}`, doctorData);
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message || error);
    throw error;
  }
}