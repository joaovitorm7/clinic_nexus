import api from './api';

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
export const getDoctorByEspecialidadeId = async (especialidade_id)=>{
    const response = await api.get(`/medico/especialidade/${especialidade_id}`)
    return response.data;
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