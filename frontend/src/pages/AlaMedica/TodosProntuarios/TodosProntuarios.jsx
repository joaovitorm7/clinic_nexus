import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import * as prontuarioServiceModule from "../../../services/prontuarioService";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./TodosProntuarios.css";

const normalize = (m) => m?.default ?? m ?? {};
const prontuarioService = normalize(prontuarioServiceModule);

export default function TodosProntuarios() {
  const navigate = useNavigate();

  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const { getProntuariosDoMedico } = prontuarioService;

  useEffect(() => {
    loadProntuarios();
  }, []);

  const loadProntuarios = async () => {
    setLoading(true);
    try {
      const pronts = await getProntuariosDoMedico();
      setHistorico(Array.isArray(pronts) ? pronts : []);
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
  
        <div className="page-todos-prontuarios">
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
          <h1>Meus Prontuários</h1>
        </div>

        {historico.length === 0 ? (
          <div className="sem-prontuarios">
            <p>Nenhum prontuário encontrado.</p>
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
                  <div className="prontuario-card-body">
                    <div className="info-row">
                      <strong>Paciente:</strong>
                      <span>{prontuario.agendamento?.paciente?.nome || '-'}</span>
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
                    </div>

                    <div className="expanded-section">
                      <h4>Prontuário</h4>
                      <div className="info-row">
                        <strong>Queixa Principal:</strong>
                        <span>{prontuario.queixa_principal || '-'}</span>
                      </div>
                      <div className="info-row">
                        <strong>Anamnese:</strong>
                        <span>{prontuario.anamnese || '-'}</span>
                      </div>
                      <div className="info-row">
                        <strong>Diagnóstico:</strong>
                        <span>{prontuario.diagnostico || '-'}</span>
                      </div>
                      <div className="info-row">
                        <strong>Conduta:</strong>
                        <span>{prontuario.conduta || '-'}</span>
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
            className="btn-novo-prontuario"
            onClick={() => navigate('/medico/consultas')}
          >
            Cadastrar Novo Prontuário
          </button>
        </div>
      </div>
    </>
  );
}