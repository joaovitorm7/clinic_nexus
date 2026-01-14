import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
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

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      buscarPacienteParaEditar(id);
    }
  }, [id]);

  const buscarPacienteParaEditar = async (pacienteId) => {
    try {
      setLoading(true);
      const res = await api.get(`/pacientes/${pacienteId}`);
      setForm(res.data);
    } catch (err) {
      alert('Erro ao carregar paciente para edição');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/pacientes/${id}`, form);
        alert('Paciente atualizado com sucesso!');
      } else {
        await criarPaciente(form);
        alert('Paciente cadastrado com sucesso!');
        setForm({ nome: '', cpf: '', dataNascimento: '', contato: '' });
      }
      navigate('/recepcao/pacientes');
    } catch (err) {
      alert('Erro ao salvar paciente.');
    }
  };

  return (
    <div className="page-cadastrar-paciente">
      <div className="cadastro-wrapper">
        <button type="button" className="back-button" onClick={() => navigate('/recepcao')} aria-label="Voltar para Recepção">
          <FaArrowLeft size={18} style={{ marginRight: 8 }} /> Voltar
        </button>
        <h1>{id ? 'Editar Paciente' : 'Novo Paciente'}</h1>

        <div className="form-container">
          {loading ? (
            <p style={{ textAlign: 'center' }}>Carregando dados...</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="fields-group">
                <div className="form-field">
                  <label>Nome completo</label>
                  <input
                    name="nome"
                    placeholder="Digite o nome completo"
                    value={form.nome}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label>CPF</label>
                  <input
                    name="cpf"
                    placeholder="Somente números"
                    value={form.cpf}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Data de nascimento</label>
                  <input
                    name="dataNascimento"
                    type="date"
                    value={form.dataNascimento}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Contato</label>
                  <input
                    name="contato"
                    placeholder="Telefone ou e-mail"
                    value={form.contato}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => navigate('/recepcao/pacientes')}
                >
                  Cancelar
                </button>

                <button type="submit">
                  {id ? 'Atualizar Paciente' : 'Cadastrar Paciente'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
