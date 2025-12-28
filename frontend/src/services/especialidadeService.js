//====[vibecoded as fck]====
import api from './api';

// Buscar especialidade por ID 
export const getEspecialidadeById = (id) => api.get(`/especialidades/id/${id}`);

export const getEspecialidadeByMedicoId = async (medicoId) => {
  const res = await api.get(`/especialidades/medico/${medicoId}`);
  return res.data;
};


// Buscar todas as especialidades
export const getAllEspecialidades = () => api.get('/especialidades');

// Criar especialidade
export const criarEspecialidade = async (especialidadeData) => {
  try {
    const response = await api.post("/especialidades", especialidadeData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar especialidade:", error);
    throw error;
  }
}