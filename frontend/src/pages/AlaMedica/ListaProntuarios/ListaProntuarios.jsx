import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaFileMedical, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import * as prontuarioService from '../../../services/prontuarioService';
import './ListaProntuarios.css';

const normalize = (m) => m?.default ?? m;
const prontuarioServ = normalize(prontuarioService);

export default function ListaProntuarios() {
  const [prontuarios, setProntuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProntuarios = async () => {
      setLoading(true);
      try {
        const data = await prontuarioServ.getProntuariosDoMedico();
        setProntuarios(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Erro ao carregar prontuários:', err);
        setError('Erro ao carregar prontuários.');
      } finally {
        setLoading(false);
      }
    };

    fetchProntuarios();
  }, []);

  const formatarData = (dataISO) => {
    if (!dataISO) return '-';
    const date = new Date(dataISO);
    return date.toLocaleDateString('pt-BR');
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="page-lista-prontuarios">
      <button
        type="button"
        className="back-button"
        onClick={() => navigate('/alamedica')}
        aria-label="Voltar para Ala Médica"
      >
        <FaArrowLeft size={18} style={{ marginRight: 8 }} /> Voltar
      </button>

      <h1>Meus Prontuários</h1>

      {loading ? (
        <p className="loading">Carregando...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : prontuarios.length === 0 ? (
        <p className="sem-dados">Nenhum prontuário encontrado.</p>
      ) : (
        <div className="prontuarios-grid">
          {prontuarios.map((prontuario) => (
            <div 
              key={prontuario.id} 
              className={`prontuario-card ${expandedId === prontuario.id ? 'expanded' : ''}`}
            >
              <div className="card-clickable" onClick={() => toggleExpand(prontuario.id)}>
                <div className="prontuario-header">
                  <FaFileMedical className="icon" />
                  <span className="data">
                    {formatarData(prontuario.data_atendimento)}
                  </span>
                  {expandedId === prontuario.id ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                <div className="prontuario-body">
                  <div className="info-row">
                    <strong>Paciente:</strong>
                    <span>{prontuario.agendamento?.paciente?.nome || '-'}</span>
                  </div>
                  <div className="info-row">
                    <strong>Médico:</strong>
                    <span>{prontuario.agendamento?.medico?.funcionario?.nome || '-'}</span>
                  </div>
                </div>
              </div>

              {expandedId === prontuario.id && (
                <div className="prontuario-expanded">
                  <div className="expanded-section">
                    <h4>Dados da Consulta</h4>
                    <div className="info-row">
                      <strong>Data:</strong>
                      <span>{formatarData(prontuario.agendamento?.data)}</span>
                    </div>
                    <div className="info-row">
                      <strong>Hora:</strong>
                      <span>{prontuario.agendamento?.hora || '-'}</span>
                    </div>
                    <div className="info-row">
                      <strong>Status:</strong>
                      <span>{prontuario.agendamento?.status || '-'}</span>
                    </div>
                    <div className="info-row">
                      <strong>Motivo:</strong>
                      <span>{prontuario.agendamento?.motivo_consulta || '-'}</span>
                    </div>
                  </div>

                  <div className="expanded-section">
                    <h4>Dados do Paciente</h4>
                    <div className="info-row">
                      <strong>Nome:</strong>
                      <span>{prontuario.agendamento?.paciente?.nome || '-'}</span>
                    </div>
                    <div className="info-row">
                      <strong>CPF:</strong>
                      <span>{prontuario.agendamento?.paciente?.cpf || '-'}</span>
                    </div>
                    <div className="info-row">
                      <strong>Data de Nascimento:</strong>
                      <span>{prontuario.agendamento?.paciente?.data_nascimento || '-'}</span>
                    </div>
                    <div className="info-row">
                      <strong>Contato:</strong>
                      <span>{prontuario.agendamento?.paciente?.contato || '-'}</span>
                    </div>
                  </div>

                  <div className="expanded-section">
                    <h4>Dados do Médico</h4>
                    <div className="info-row">
                      <strong>Nome:</strong>
                      <span>{prontuario.agendamento?.medico?.funcionario?.nome || '-'}</span>
                    </div>
                    <div className="info-row">
                      <strong>CRM:</strong>
                      <span>{prontuario.agendamento?.medico?.crm || '-'}</span>
                    </div>
                    <div className="info-row">
                      <strong>Especialidade:</strong>
                      <span>{prontuario.agendamento?.medico?.especialidade?.nome || '-'}</span>
                    </div>
                  </div>

                  <div className="expanded-section">
                    <h4>Prontuário</h4>
                    <div className="info-row">
                      <strong>Data do Atendimento:</strong>
                      <span>{formatarData(prontuario.data_atendimento)}</span>
                    </div>
                    <div className="info-row">
                      <strong>Queixa Principal:</strong>
                      <span>{prontuario.queixa_principal || '-'}</span>
                    </div>
                    <div className="info-row">
                      <strong>Anamnese:</strong>
                      <span>{prontuario.anamnese || '-'}</span>
                    </div>
                    <div className="info-row">
                      <strong>Exames Vitais:</strong>
                      <span>{prontuario.exames_vitais || '-'}</span>
                    </div>
                    <div className="info-row">
                      <strong>Diagnóstico:</strong>
                      <span>{prontuario.diagnostico || '-'}</span>
                    </div>
                    <div className="info-row">
                      <strong>Evolução Clínica:</strong>
                      <span>{prontuario.evolucao_clinica || '-'}</span>
                    </div>
                    <div className="info-row">
                      <strong>Conduta:</strong>
                      <span>{prontuario.conduta || '-'}</span>
                    </div>
                    <div className="info-row">
                      <strong>Encaminhamento:</strong>
                      <span>{prontuario.encaminhamento || '-'}</span>
                    </div>
                    <div className="info-row">
                      <strong>Medicações Prescritas:</strong>
                      <span>{prontuario.medicacoes_prescritas || '-'}</span>
                    </div>
                    <div className="info-row">
                      <strong>Observações:</strong>
                      <span>{prontuario.observacoes || '-'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}