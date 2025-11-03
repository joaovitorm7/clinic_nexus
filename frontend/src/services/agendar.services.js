import axios from "axios";

const API_URL = "http://localhost:3000/agendamentos";

const agendarService = {
    criarAgendamento: async (dados) => {
        try {
            const response = await axios.post(API_URL, dados);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar agendamento:", error);
            throw error;
        }
    },

    listarAgendamentos: async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar agendamentos:", error);
            throw error;
        }
    },

    buscarAgendamento: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar agendamento:", error);
            throw error;
        }
    },

    deletarAgendamento: async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
        } catch (error) {
            console.error("Erro ao deletar agendamento:", error);
            throw error;
        }
    },
};

export default agendarService;


//  return data;
//   } catch (error) {
//     console.error(error.response?.data || error);
//     throw error;
//   }
//peguei referencia