import api from './api';

export const getDoctors = async () => {
  try {
    const response = await api.get('/medicos');
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message || error);
    throw error;
  }
}
export const getDoctorById = async (id) => {
  try {
    const response = await api.get(`/medicos/${id}`);
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message || error);
    throw error;
  }
}
export const createDoctor = async (doctorData) => {
  try {
    const response = await api.post('/medicos', doctorData);
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message || error);
    throw error;
  }
}
export const updateDoctor = async (id, doctorData) => {
  try {
    const response = await api.put(`/medicos/${id}`, doctorData);
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message || error);
    throw error;
  }
}