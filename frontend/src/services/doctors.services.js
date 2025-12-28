import api from './api';

export const getDoctors = async () => {
  const res = await api.get('/medico');
  return res.data;
};

export const getDoctorByName = async (nome) => {
  const res = await api.get(`/medico`, {
    params: { nome },
  });
  return res.data;
};

export const getDoctorById = async (id) => {
  const res = await api.get(`/medico/${id}`);
  return res.data;
};

export const getDoctorByEspecialidadeId = async (especialidadeId) => {
  const res = await api.get(`/medico/especialidade/${especialidadeId}`);
  return res.data;
};