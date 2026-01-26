import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { pacienteService } from '../../../services/pacienteService';
import './EditarPaciente.css';

export default function EditarPaciente() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cpf, setCpf] = useState('');
  const [patient, setPatient] = useState(null);
  const [form, setForm] = useState({
    nome: '',
    data_nascimento: '',
    contato: '',
    endereco: '',
    email: ''
  });

  const cpfRef = useRef(null);

  const normalizeCPF = (value) => (value || '').replace(/\D/g, '');

  const buscarPorCPF = async () => {
    const cpfLimpo = normalizeCPF(cpf);

    if (!cpfLimpo) {
      alert('Informe o CPF');
      return;
    }

    setLoading(true);
    try {
      const response = await pacienteService.getPatientByCPF(cpfLimpo);

      if (!Array.isArray(response) || response.length === 0) {
        alert('Paciente não encontrado');
        setPatient(null);
        return;
      }
      //selecionando o primeiro retornado
     const paciente = response[0];

      setPatient(paciente);
      setForm({
        nome: paciente.nome ?? '',
        data_nascimento: paciente.data_nascimento ?? '',
        contato: paciente.contato ?? '',
        endereco: paciente.endereco ?? '',
        email: paciente.email ?? ''
      });
    } catch (error) {
      console.error(error);
      alert('Erro ao buscar paciente');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patient?.id) {
      alert('Busque um paciente primeiro');
      return;
    }

    setLoading(true);
    try {
      await pacienteService.editarPaciente(patient.id, {
        nome: form.nome,
        data_nascimento: form.data_nascimento,
        contato: form.contato,
      });

      alert('Paciente atualizado com sucesso');
      navigate('/recepcao/pacientes');
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar paciente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-edit-paciente">
      <button
        type="button"
        className="back-button"
        onClick={() => navigate('/recepcao')}
      >
        <FaArrowLeft size={18} style={{ marginRight: 8 }} />
        Voltar
      </button>

      <h1>Editar Paciente</h1>

      <div className="search-row">
        <input
          ref={cpfRef}
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          placeholder="CPF"
        />
        <button type="button" onClick={buscarPorCPF} disabled={loading}>
          Buscar
        </button>
      </div>

      {patient && (
        <form className="edit-form" onSubmit={handleSubmit}>
          <label>
            Nome
            <input
              value={form.nome}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, nome: e.target.value }))
              }
            />
          </label>

          <label>
            Data de Nascimento
            <input
              type="date"
              value={form.data_nascimento}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  data_nascimento: e.target.value
                }))
              }
            />
          </label>

          <label>
            Contato
            <input
              value={form.contato}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, contato: e.target.value }))
              }
            />
          </label>

          <label>
            Endereço
            <input
              value={form.endereco}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, endereco: e.target.value }))
              }
            />
          </label>

          <label>
            Email
            <input
              value={form.email}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </label>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/recepcao')}>
              Cancelar
            </button>
            <button type="submit" disabled={loading}>
              Salvar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
