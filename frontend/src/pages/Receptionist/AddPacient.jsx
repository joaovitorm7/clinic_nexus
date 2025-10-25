import React, { useState } from "react";
import api from "../../services/api"; 

const AddPacient = () => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [contato, setContato] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/pacientes", {
        nome,
        cpf,
        contato,
        dataNascimento, 
      });

      setMensagem("Paciente criado com sucesso!");
      setNome("");
      setCpf("");
      setContato("");
      setDataNascimento("");
    } catch (error) {
      console.error(error.response?.data || error);
      setMensagem("Erro ao criar paciente. Verifique os dados.");
    }
  };

}
