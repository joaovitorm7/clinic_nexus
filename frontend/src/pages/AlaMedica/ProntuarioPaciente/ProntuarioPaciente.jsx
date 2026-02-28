import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import * as prontuarioServiceModule from "../../../services/prontuarioService";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./ProntuarioPaciente.css";

const normalize = (m) => m?.default ?? m ?? {};
const prontuarioService = normalize(prontuarioServiceModule);

export default function ProntuarioPaciente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [pacienteNome, setPacienteNome] = useState(location.state?.pacienteNome || '');

  const { getProntuariosByPacienteId } = prontuarioService;

  useEffect(() => {
    loadProntuarios();
  }, [id]);

  const loadProntuarios = async () => {
    setLoading(true);
    try {
      const pronts = await getProntuariosByPacienteId(id);
      const prontuariosArray = Array.isArray(pronts) ? pronts : [];
      setHistorico(prontuariosArray);
      
      if (prontuariosArray.length > 0 && !pacienteNome) {
        setPacienteNome(prontuariosArray[0]?.agendamento?.paciente?.nome || '');
      }
    } catch (err) {
      console.error('Erro ao carregar prontuários:', err);
      setHistorico([]);
    } finally {
      setLoading(false);
    }
  };

  const formatarData = (dataISO) => {
    if (!dataISO) return '-';
    const date = new Date(dataISO);
    return date.toLocaleDateString('pt-BR');
  };

  const toggleExpand = (prontuarioId) => {
    setExpandedId(expandedId === prontuarioId ? null : prontuarioId);
  };

  if (loading) {
    return (
      <>

        <div className="page-prontuario-paciente">
          <div className="mensagem-vazia">
            <p>Carregando prontuários...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      
      
      <div className="page-prontuarios-lista">
        <div className="page-header">
          <h1>Prontuarios do paciente - {pacienteNome}</h1>
        </div>

        {historico.length === 0 ? (
          <div className="sem-prontuarios">
            <p>Nenhum prontuário encontrado para este paciente.</p>
          </div>
        ) : (
          <div className="prontuarios-grid">
            {historico.map((prontuario) => (
              <div 
                key={prontuario.id} 
                className={`prontuario-card ${expandedId === prontuario.id ? 'expanded' : ''}`}
              >
                <div className="card-clickable" onClick={() => toggleExpand(prontuario.id)}>
                  <div className="prontuario-card-header">
                    <span className="data">
                      {formatarData(prontuario.data_atendimento)}
                    </span>
                    {expandedId === prontuario.id ? <FaChevronUp /> : <FaChevronDown />}
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

        <div className="footer-actions">
          <button 
            className="btn-voltar-grande"
            onClick={() => navigate('/medico/pacientes')}
          >
            Voltar para Pacientes
          </button>
        </div>
      </div>
    </>
  );
}