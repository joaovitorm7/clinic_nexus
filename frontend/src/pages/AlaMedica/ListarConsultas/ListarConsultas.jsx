import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Navbar from '../../../components/Navbar/Navbar';
import agendamentoService from '../../../services/agendamentoService';
import './ListarConsultas.css';

export default function ListarConsultas() {
  const navigate = useNavigate();
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtro, setFiltro] = useState('todas'); // 'todas', 'agendada', 'concluida', 'cancelada'
  const [medico, setMedico] = useState(null);

  useEffect(() => {
    carregarConsultas();
  }, [filtro]);

  const carregarConsultas = async () => {
    setLoading(true);
    try {
      // Pegar informações do médico logado
      const usuarioLogado = JSON.parse(localStorage.getItem('usuario') || '{}');
      if (!usuarioLogado || !usuarioLogado.id) {
        alert('Médico não identificado. Faça login novamente.');
        navigate('/');
        return;
      }
      setMedico(usuarioLogado);

      let lista = await agendamentoService.getMinhasConsultas();

      lista = Array.isArray(lista) ? lista : [];

      // Aplicar filtro de status
      if (filtro !== 'todas') {
        lista = lista.filter((c) => (c.status || 'Agendada') === filtro);
      }

      setConsultas(lista);
    } catch (err) {
      console.error('Erro ao carregar consultas:', err);
      setConsultas([]);
      alert('Erro ao carregar consultas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const deletarConsulta = async (consultaId) => {
    if (!window.confirm('Tem certeza que deseja deletar esta consulta?')) return;

    try {
      await agendamentoService.deleteAgendamento(consultaId);
      alert('Consulta deletada com sucesso');
      carregarConsultas();
    } catch (err) {
      alert('Erro ao deletar: ' + (err.response?.data?.message || 'Tente novamente'));
    }
  };

  const formatarData = (dataISO) => {
    if (!dataISO) return '-';
    const date = new Date(dataISO);
    return (
      date.toLocaleDateString('pt-BR') +
      ' ' +
      date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    );
  };

  return (
    <>
      <Navbar />
      <div className="page-listar-consultas">
        <button
          type="button"
          className="back-button"
          onClick={() => navigate('/alamedica')}
          aria-label="Voltar para Dashboard"
        >
          <FaArrowLeft size={18} style={{ marginRight: 8 }} /> Voltar
        </button>

        <h1>Minhas Consultas</h1>
        {medico && <p className="medico-info">Médico: <strong>{medico.nome || 'N/A'}</strong></p>}

        {/* Filtros */}
        <div className="filtros">
          <button className={filtro === 'todas' ? 'ativo' : ''} onClick={() => setFiltro('todas')}>
            Todas ({consultas.length})
          </button>
          <button className={filtro === 'agendada' ? 'ativo' : ''} onClick={() => setFiltro('agendada')}>
            Agendadas
          </button>
          <button className={filtro === 'concluida' ? 'ativo' : ''} onClick={() => setFiltro('concluida')}>
            Concluídas
          </button>
          <button className={filtro === 'cancelada' ? 'ativo' : ''} onClick={() => setFiltro('cancelada')}>
            Canceladas
          </button>
        </div>

        {/* Lista de Consultas */}
        {loading ? (
          <p className="loading">Carregando...</p>
        ) : consultas.length === 0 ? (
          <p className="sem-dados">Nenhuma consulta encontrada</p>
        ) : (
          <div className="tabela-container">
            <table className="consultas-table">
              <thead>
                <tr>
                  <th>Paciente</th>
                  <th>Data/Hora</th>
                  <th>Status</th>
                  <th>Motivo</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {consultas.map((consulta) => (
                  <tr key={consulta.id} className={`status-${consulta.status || 'Agendada'}`}>
                    <td>{consulta.paciente?.nome || 'N/A'}</td>
                    <td>{formatarData(consulta.data)}</td>
                    <td>
                      <span className={`status-badge status-${consulta.status || 'Agendada'}`}>
                        {consulta.status || 'Agendada'}
                      </span>
                    </td>
                    <td>{consulta.motivo_consulta || '-'}</td>
                    <td className="acoes">
                      <button
                        title="Visualizar"
                        onClick={() =>
                          navigate(`/medico/consulta/${consulta.id}`, { state: { consulta } })
                        }
                      >
                        <FaEye />
                      </button>
                      <button
                        title="Editar"
                        onClick={() => navigate(`/medico/editar-consulta/${consulta.id}`)}
                      >
                        <FaEdit />
                      </button>
                      <button title="Deletar" onClick={() => deletarConsulta(consulta.id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
