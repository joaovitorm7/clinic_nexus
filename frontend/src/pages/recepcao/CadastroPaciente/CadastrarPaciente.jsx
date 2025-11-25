import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { criarPaciente } from '../../../services/pacienteService';
import './CadastrarPaciente.css';
import api from '../../../services/api';

export default function CadastrarPaciente() {

  const { id } = useParams(); 
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    dataNascimento: '',
    contato: ''
  });

  useEffect(() => {
    if (id) {
      // MODO EDIÇÃO
      buscarPacienteParaEditar(id);
    } else {
      // MODO NOVO PACIENTE - formulário vazio
      console.log('Novo paciente');
    }
  }, [id]);

  const buscarPacienteParaEditar = async (pacienteId) => {
    try {
      const res = await api.get(`/pacientes/${pacienteId}`);
      setForm(res.data);
      console.log('Dados do paciente carregados:', res.data);
    } catch (err) {
      console.error('Erro ao buscar paciente:', err);
      alert('Erro ao carregar paciente para edição');
    }
  };


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const dataToSave = {
      nome: form.nome,
      cpf: form.cpf,
      dataNascimento: form.dataNascimento,  
      contato: form.contato
    };
    if (id) {
      // MODO EDIÇÃO - fazer PUT para atualizar
      await api.put(`/pacientes/${id}`, form);
      alert('Paciente atualizado com sucesso!');
    } else {
      // MODO NOVO - fazer POST para criar
      await criarPaciente(form);
      alert('Paciente cadastrado com sucesso!');
      setForm({ nome: '', cpf: '', dataNascimento: '', contato: '' });
    }
    navigate('/recepcao/pacientes'); // Volta para lista
  } catch (err) {
    alert('Erro ao salvar paciente.');
  }
};

  return (
    <div className="cadastrar-paciente-page">
      <h1>{id ? 'Editar Paciente' : 'Novo Paciente'}</h1>
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
        <button type="submit">
          {id ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}
