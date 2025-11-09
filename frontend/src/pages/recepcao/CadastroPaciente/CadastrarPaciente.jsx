import { useState } from 'react';
import { criarPaciente } from '../../../services/pacienteService';
import './CadastrarPaciente.css';

export default function CadastrarPaciente() {
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    dataNascimento: '',
    contato: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await criarPaciente(form);
      alert('Paciente cadastrado com sucesso!');
      setForm({ nome: '', cpf: '', dataNascimento: '', contato: '' });
    } catch (err) {
      alert('Erro ao cadastrar paciente.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="nome"
        placeholder="Nome"
        value={form.nome}
        onChange={handleChange}
      />
      <input
        name="cpf"
        placeholder="CPF"
        value={form.cpf}
        onChange={handleChange}
      />
      <input
        name="dataNascimento"
        type="date"
        value={form.dataNascimento}
        onChange={handleChange}
      />
      <input
        name="contato"
        placeholder="Contato"
        value={form.contato}
        onChange={handleChange}
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
}
