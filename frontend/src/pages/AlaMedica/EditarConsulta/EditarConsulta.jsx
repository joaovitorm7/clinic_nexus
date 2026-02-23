import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import Navbar from '../../../components/Navbar/Navbar';
import api from '../../../services/api';
import './EditarConsulta.css';

const statusOptions = [
  { value: 'agendada', label: 'Agendada' },
  { value: 'concluida', label: 'Concluída' },
  { value: 'cancelada', label: 'Cancelada' },
];

export default function EditarConsulta() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [consulta, setConsulta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    status: '',
    motivo_consulta: '',
  });

  useEffect(() => {
    const buscarConsulta = async () => {
      try {
        const res = await api.get(`/agendamentos/${id}`);
        setConsulta(res.data);
        setFormData({
          status: res.data.status || 'agendada',
          motivo_consulta: res.data.motivo_consulta || '',
        });
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar consulta');
      } finally {
        setLoading(false);
      }
    };

    buscarConsulta();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await api.patch(`/agendamentos/${id}`, formData);
      alert('Consulta atualizada com sucesso!');
      navigate('/medico/consultas');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Erro ao atualizar consulta');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="editar-container">
          <p>Carregando consulta...</p>
        </div>
      </>
    );
  }

  if (!consulta) {
    return (
      <>
        <Navbar />
        <div className="editar-container">
          <p>Consulta não encontrada.</p>
          <button onClick={() => navigate('/medico/consultas')}>
            Voltar
          </button>
        </div>
      </>
    );
  }

  const formatarData = (dataISO) => {
    if (!dataISO) return '-';
    const date = new Date(dataISO);
    return (
      date.toLocaleDateString('pt-BR') +
      ' ' +
      date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      })
    );
  };

  return (
    <>
      <Navbar />
      <div className="editar-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Voltar
        </button>

        <h1>Editar Consulta</h1>

        {error && <div className="error-message">{error}</div>}

        <div className="card-detalhes">
          <div className="item">
            <span>Paciente</span>
            <strong>{consulta.paciente?.nome || 'N/A'}</strong>
          </div>

          <div className="item">
            <span>Médico</span>
            <strong>{consulta.medico?.funcionario?.nome || 'N/A'}</strong>
          </div>

          <div className="item">
            <span>Data e Horário</span>
            <strong>{formatarData(consulta.data)}</strong>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="form-editar">
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="motivo_consulta">Motivo da Consulta</label>
            <textarea
              id="motivo_consulta"
              name="motivo_consulta"
              value={formData.motivo_consulta}
              onChange={handleChange}
              rows={4}
              placeholder="Descreva o motivo da consulta..."
            />
          </div>

          <button type="submit" className="btn-salvar" disabled={saving}>
            <FaSave /> {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </form>
      </div>
    </>
  );
}
