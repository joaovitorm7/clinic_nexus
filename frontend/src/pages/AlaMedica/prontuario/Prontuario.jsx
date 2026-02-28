import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import * as pacienteServiceModule from "../../../services/pacienteService";
import * as agendamentoServiceModule from "../../../services/agendamentoService";
import * as prontuarioServiceModule from "../../../services/prontuarioService";
import api from "../../../services/api";
import "./Prontuario.css";

const normalize = (m) => m?.default ?? m ?? {};

const pacienteService = normalize(pacienteServiceModule);
const agendamentoService = normalize(agendamentoServiceModule);
const prontuarioService = normalize(prontuarioServiceModule);

export default function Prontuario() {
  const location = useLocation();
  const navigate = useNavigate();
  const consultaFromState = location.state?.consulta;

  const [paciente, setPaciente] = useState({
    id: null,
    nome: "",
    cpf: "",
    dataNascimento: "",
    contato: "",
    endereco: "",
  });
  const [pacienteEncontrado, setPacienteEncontrado] = useState(false);

  const [selectedConsulta, setSelectedConsulta] = useState(null);
  const [historico, setHistorico] = useState([]);

  const [novoAtendimento, setNovoAtendimento] = useState({
    dataAtendimento: new Date().toISOString().split("T")[0],
    queixa: "",
    anamnese: "",
    diagnostico: "",
    conduta: "",
    observacoes: "",
  });

  const [loading, setLoading] = useState(false);

  const { getProntuariosByPacienteId, createProntuario } = prontuarioService;

  const calcularIdade = (dataNascimento) => {
    if (!dataNascimento) return "-";
    const hoje = new Date();
    const nasc = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
    return idade;
  };

  useEffect(() => {
    if (consultaFromState) {
      handleSelectConsulta(consultaFromState);
    }
  }, [consultaFromState]);

  const handleSelectConsulta = async (consulta) => {
    setSelectedConsulta(consulta);

    const pacienteObj = consulta?.paciente || {};
    const pacienteId = pacienteObj?.id || consulta?.id_paciente || consulta?.paciente_id || null;

    setPaciente({
      id: pacienteId,
      nome: pacienteObj?.nome || pacienteObj?.nome_completo || consulta?.paciente_nome || "",
      cpf: pacienteObj?.cpf || "",
      dataNascimento: pacienteObj?.dataNascimento || pacienteObj?.data_nascimento || "",
      contato: pacienteObj?.contato || "",
      endereco: pacienteObj?.endereco || "",
    });

    setPacienteEncontrado(Boolean(pacienteId));

    if (!pacienteId) {
      setHistorico([]);
      return;
    }

    setLoading(true);
    try {
      let pronts = [];
      if (typeof getProntuariosByPacienteId === "function") {
        const r = await getProntuariosByPacienteId(pacienteId);
        pronts = Array.isArray(r) ? r : [];
      } else {
        const r = await api.get(`/prontuario/paciente/${pacienteId}`);
        pronts = Array.isArray(r.data) ? r.data : [];
      }
      setHistorico(pronts);
    } catch (err) {
      console.warn("Erro ao buscar histórico:", err);
      setHistorico([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAtendimento = async (e) => {
    e.preventDefault();

    const rawAgendamentoId =
      selectedConsulta?.id ?? selectedConsulta?.agendamento_id ?? selectedConsulta?.agendamentoId ?? null;

    if (!rawAgendamentoId) {
      alert("Selecione uma consulta para salvar o prontuário.");
      return;
    }

    const agendamentoId = Number(rawAgendamentoId);
    if (!agendamentoId || Number.isNaN(agendamentoId)) {
      alert("ID do agendamento inválido.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        agendamentoId,
        queixa_principal: novoAtendimento.queixa || undefined,
        anamnese: novoAtendimento.anamnese || undefined,
        diagnostico: novoAtendimento.diagnostico || undefined,
        conduta: novoAtendimento.conduta || undefined,
        observacoes: novoAtendimento.observacoes || undefined,
      };

      Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);

      await createProntuario(payload);

      alert("Prontuário salvo com sucesso!");

      if (paciente.id) {
        const r = await getProntuariosByPacienteId(paciente.id);
        setHistorico(Array.isArray(r) ? r : []);
      }

      setNovoAtendimento({
        dataAtendimento: new Date().toISOString().split("T")[0],
        queixa: "",
        anamnese: "",
        diagnostico: "",
        conduta: "",
        observacoes: "",
      });
    } catch (err) {
      console.error("Erro ao salvar prontuário:", err);
      alert("Erro ao salvar prontuário.");
    } finally {
      setLoading(false);
    }
  };

  if (!consultaFromState && !selectedConsulta) {
    return (
      <>
      
        <div className="page-prontuario">
          <div className="mensagem-vazia">
            <p>Selecione uma consulta em "Minhas Consultas" para fazer o prontuário.</p>
            <button 
              className="btn-voltar"
              onClick={() => navigate('/medico/consultas')}
            >
              Ir para Minhas Consultas
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
     
      {pacienteEncontrado && (
        <div className="prontuario-header">
          <div className="paciente-info">
            {selectedConsulta && (
              <div className="consulta-info">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 12 }}>
                  <div><label>Data:</label><div>{selectedConsulta.data ? new Date(selectedConsulta.data).toLocaleString('pt-BR') : '-'}</div></div>
                  <div><label>Status:</label><div>{selectedConsulta.status || '-'}</div></div>
                </div>
              </div>
            )}
            <div className="info-group">
              <label>Nome:</label>
              <span>{paciente.nome || '-'}</span>
            </div>
            <div className="info-group">
              <label>CPF:</label>
              <span>{paciente.cpf || '-'}</span>
            </div>
            <div className="info-group">
              <label>Nascimento:</label>
              <span>{paciente.dataNascimento || '-'}</span>
            </div>
            <div className="info-group">
              <label>Idade:</label>
              <span>{calcularIdade(paciente.dataNascimento)} anos</span>
            </div>
          </div>
        </div>
      )}

      <main className="page-prontuario">
        <section className="prontuario-historico">
          <h2>Histórico Médico</h2>

          {historico.length === 0 ? (
            <p className="sem-historico">Nenhum atendimento anterior.</p>
          ) : (
            <div className="lista-historico">
              {historico.map((atendimento) => (
                <div key={atendimento.id} className="historico-item">
                  <div className="historico-header">
                    <span className="data">
                      {atendimento.data_atendimento ? new Date(atendimento.data_atendimento).toLocaleDateString('pt-BR') : '-'}
                    </span>
                  </div>
                  <div className="historico-conteudo">
                    <p><strong>Queixa:</strong> {atendimento.queixa_principal || '-'}</p>
                    <p><strong>Diagnóstico:</strong> {atendimento.diagnostico || '-'}</p>
                    <p><strong>Conduta:</strong> {atendimento.conduta || '-'}</p>
                    <p><strong>Observações:</strong> {atendimento.observacoes || '-'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="prontuario-formulario">
          <h2>Novo Prontuário</h2>

          <form onSubmit={handleSubmitAtendimento}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dataAtendimento">Data:</label>
                <input
                  id="dataAtendimento"
                  type="date"
                  value={novoAtendimento.dataAtendimento}
                  onChange={(e) => setNovoAtendimento({ ...novoAtendimento, dataAtendimento: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="queixa">Queixa Principal:</label>
                <input
                  id="queixa"
                  type="text"
                  value={novoAtendimento.queixa}
                  onChange={(e) => setNovoAtendimento({ ...novoAtendimento, queixa: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="anamnese">Anamnese:</label>
              <textarea
                id="anamnese"
                rows="4"
                value={novoAtendimento.anamnese}
                onChange={(e) => setNovoAtendimento({ ...novoAtendimento, anamnese: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="diagnostico">Diagnóstico:</label>
              <textarea
                id="diagnostico"
                rows="4"
                value={novoAtendimento.diagnostico}
                onChange={(e) => setNovoAtendimento({ ...novoAtendimento, diagnostico: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="conduta">Conduta:</label>
              <textarea
                id="conduta"
                rows="4"
                value={novoAtendimento.conduta}
                onChange={(e) => setNovoAtendimento({ ...novoAtendimento, conduta: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="observacoes">Observações:</label>
              <textarea
                id="observacoes"
                rows="3"
                value={novoAtendimento.observacoes}
                onChange={(e) => setNovoAtendimento({ ...novoAtendimento, observacoes: e.target.value })}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-salvar" disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar Prontuário'}
              </button>
              <button type="reset" className="btn-limpar" onClick={() => {
                setNovoAtendimento({
                  dataAtendimento: new Date().toISOString().split("T")[0],
                  queixa: "",
                  anamnese: "",
                  diagnostico: "",
                  conduta: "",
                  observacoes: "",
                });
              }}>Limpar</button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}