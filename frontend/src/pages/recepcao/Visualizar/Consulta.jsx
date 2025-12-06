import React, { useState, useEffect } from 'react';
import { getAgendamentos } from '../../../services/agendamentoService';
import './Consulta.css';
import { FaTrash, FaPencilAlt, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';

const Consultas = () => {
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Função para cancelar consulta
  const handleCancelarConsulta = async (consultaId) => {
    const confirmacao = window.confirm(
      'Tem certeza que deseja cancelar esta consulta? Esta ação não pode ser desfeita.'
    );

    if (!confirmacao) {
      return;
    }

    try {
      // Fazer DELETE na API
      await api.delete(`/agendamentos/${consultaId}`);

      // Remover da lista local (atualizar UI)
      setConsultas(prev => prev.filter(c => c.id !== consultaId));

      alert('Consulta cancelada com sucesso!');
    } catch (err) {
      console.error('Erro ao cancelar consulta:', err);
      alert('Erro ao cancelar consulta. Tente novamente.');
    }
  };

  // Função para editar consulta
  const handleEditarConsulta = (consultaId) => {
    navigate(`/consultas/${consultaId}/editar`);
  };

  const handleVoltar = () => {
    navigate(-1);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const consultasData = await getAgendamentos();
        setConsultas(consultasData || []);
      } catch (err) {
        console.error('Erro ao carregar consultas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Carregando consultas...</p>;

  return (
    <div className="page-consultas">

      <button
        className="btn-voltar"
        onClick={handleVoltar}
        title="Voltar ao dashboard"
      >
        <FaArrowLeft size={20} />
      </button>

      <h1>Consultas Agendadas</h1>

      {consultas.length === 0 ? (
        <p>Nenhuma consulta encontrada.</p>
      ) : (
        <table className="consultas-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Paciente</th>
              <th>Médico</th>
              <th>Especialidade</th>
              <th>Data / Hora</th>
              <th>Status</th>
              <th>Observações</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {consultas.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.paciente ? c.paciente.nome : 'Não encontrado'}</td>
                <td>{c.id_medico ?? '-'}</td>
                <td>{c.especialidade ?? '-'}</td>
                <td>{new Date(c.data).toLocaleString()}</td>
                <td>{c.status}</td>
                <td>{c.motivo_consulta ?? '-'}</td>
                <td>
                  <button
                    className="btn-editar"
                    onClick={() => handleEditarConsulta(c.id)}
                    title="Editar consulta"
                  >
                    <FaPencilAlt size={16} />
                  </button>
                  <button
                    className="btn-cancelar"
                    onClick={() => handleCancelarConsulta(c.id)}
                    title="Cancelar consulta"
                  >
                    <FaTrash size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Consultas;
