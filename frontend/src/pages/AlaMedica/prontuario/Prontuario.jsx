import React, { useEffect, useState } from "react";
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

  const [medicoBusca, setMedicoBusca] = useState("");
  const [cpfBuscando, setCpfBuscando] = useState("");

  const [paciente, setPaciente] = useState({
    id: null,
    nome: "",
    cpf: "",
    dataNascimento: "",
    contato: "",
    endereco: "",
  });
  const [pacienteEncontrado, setPacienteEncontrado] = useState(false);

  const [consultas, setConsultas] = useState([]);
  const [selectedConsulta, setSelectedConsulta] = useState(null);
  const [historico, setHistorico] = useState([]);

  // formulário de atendimento
  const [novoAtendimento, setNovoAtendimento] = useState({
    dataAtendimento: new Date().toISOString().split("T")[0],
    queixa: "",
    anamnese: "",
    examesFisicos: "",
    diagnostico: "",
    evolucao: "",
    conduta: "",
    encaminhamentos: "",
    medicacoes: "",
    observacoes: "",
  });

  const [loading, setLoading] = useState(false);

  // helpers - extrair funções das services se existirem
  const { getAgendamentos } = agendamentoService;
  const { getProntuariosByPacienteId, createProntuario, getProntuarios } = prontuarioService;
  const { getPatientByCPF, getPacienteByCPF } = pacienteService;

  // calcular idade
  const calcularIdade = (dataNascimento) => {
    if (!dataNascimento) return "-";
    const hoje = new Date();
    const nasc = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
    return idade;
  };

  // carregar agendamentos iniciais (opcional)
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        let lista = [];
        if (typeof getAgendamentos === "function") {
          const r = await getAgendamentos();
          lista = r?.data ?? r ?? [];
        } else {
          const r = await api.get("/agendamentos");
          lista = r.data ?? [];
        }
        setConsultas(Array.isArray(lista) ? lista : []);
      } catch (err) {
        console.warn("Erro ao carregar agendamentos iniciais:", err);
        setConsultas([]);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // selecionar consulta
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
        pronts = r?.data ?? r ?? [];
      } else if (typeof getProntuarios === "function") {
        const r = await getProntuarios();
        const all = r?.data ?? r ?? [];
        pronts = (all || []).filter((p) => (p?.id_paciente || p?.paciente_id || p?.pacienteId) == pacienteId);
      } else {
        const r = await api.get(`/prontuarios?pacienteId=${pacienteId}`);
        pronts = r.data ?? [];
      }
      setHistorico(Array.isArray(pronts) ? pronts : []);
    } catch (err) {
      console.warn("Erro ao buscar histórico:", err);
      setHistorico([]);
    } finally {
      setLoading(false);
    }
  };

  // buscar paciente por CPF
  const handleBuscarPaciente = async () => {
    if (!cpfBuscando.trim()) {
      alert("Digite um CPF para buscar.");
      return;
    }
    setLoading(true);
    try {
      let res;
      if (typeof getPatientByCPF === "function") {
        res = await getPatientByCPF(cpfBuscando.trim());
      } else if (typeof getPacienteByCPF === "function") {
        res = await getPacienteByCPF(cpfBuscando.trim());
      } else {
        res = await api.get(`/pacientes/cpf/${encodeURIComponent(cpfBuscando.trim())}`);
      }

      const data = res?.data ?? res ?? null;
      const pacienteData = Array.isArray(data) ? data[0] : data;

      if (!pacienteData) {
        alert("Paciente não encontrado.");
        setPacienteEncontrado(false);
        return;
      }

      setPaciente({
        id: pacienteData.id,
        nome: pacienteData.nome || pacienteData.nome_completo || "",
        cpf: pacienteData.cpf || cpfBuscando.trim(),
        dataNascimento: pacienteData.dataNascimento || pacienteData.data_nascimento || "",
        contato: pacienteData.contato || pacienteData.telefone || "",
        endereco: pacienteData.endereco || "",
      });

      setPacienteEncontrado(Boolean(pacienteData.id));

      // buscar histórico
      if (pacienteData.id) {
        try {
          let pronts = [];
          if (typeof getProntuariosByPacienteId === "function") {
            const r2 = await getProntuariosByPacienteId(pacienteData.id);
            pronts = r2?.data ?? r2 ?? [];
          } else {
            const r2 = await api.get(`/prontuarios?pacienteId=${pacienteData.id}`);
            pronts = r2.data ?? [];
          }
          setHistorico(Array.isArray(pronts) ? pronts : []);
        } catch (err) {
          console.warn("Erro ao buscar histórico do paciente:", err);
          setHistorico([]);
        }
      }
    } catch (err) {
      console.error("Erro ao buscar paciente:", err);
      const serverMsg = err?.response?.data || err?.message || err;
      alert("Erro ao buscar paciente: " + JSON.stringify(serverMsg));
    } finally {
      setLoading(false);
    }
  };

  // buscar consultas por médico
  const handleBuscarPorMedico = async (filtro) => {
    if (!filtro || !String(filtro).trim()) {
      alert("Informe o médico (ID/CRM/nome).");
      return;
    }
    setLoading(true);
    try {
      let lista = [];
      if (typeof getAgendamentos === "function") {
        const r = await getAgendamentos();
        lista = r?.data ?? r ?? [];
      } else {
        const r = await api.get("/agendamentos");
        lista = r.data ?? [];
      }

      const ff = String(filtro).toLowerCase();
      const filtradas = (lista || []).filter((c) => {
        const m = c?.medico || c?.medico_info || {};
        return (
          String(m?.id ?? c?.medico_id ?? "").includes(ff) ||
          String(m?.crm ?? "").includes(ff) ||
          String((m?.funcionario?.nome ?? m?.nome ?? "").toLowerCase()).includes(ff)
        );
      });

      setConsultas(filtradas);
      if (filtradas.length > 0) handleSelectConsulta(filtradas[0]);
      else {
        setSelectedConsulta(null);
        setPaciente({ id: null, nome: "", cpf: "", dataNascimento: "", contato: "", endereco: "" });
        setPacienteEncontrado(false);
        setHistorico([]);
        alert("Nenhuma consulta encontrada para esse médico.");
      }
    } catch (err) {
      console.error("Erro ao buscar por médico:", err);
      alert("Erro ao buscar consultas. Veja console.");
    } finally {
      setLoading(false);
    }
  };

  // enviar prontuário: exige agendamentoId numérico conforme backend
  const handleSubmitAtendimento = async (e) => {
    e.preventDefault();

    const rawAgendamentoId =
      selectedConsulta?.id ?? selectedConsulta?.agendamento_id ?? selectedConsulta?.agendamentoId ?? null;

    if (!rawAgendamentoId) {
      alert("É necessário selecionar uma consulta/agendamento antes de salvar o prontuário.");
      return;
    }

    const agendamentoId = Number(rawAgendamentoId);
    if (!agendamentoId || Number.isNaN(agendamentoId)) {
      alert("ID do agendamento inválido. Verifique a consulta selecionada.");
      return;
    }

    if (!paciente?.id) {
      alert("Selecione ou busque um paciente antes de salvar.");
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

      console.log("Payload enviado:", payload);

      let resultado;
      if (typeof createProntuario === "function") {
        resultado = await createProntuario(payload);
      } else {
        // rota fallback - ajuste se seu backend usar /prontuario em vez de /prontuarios
        resultado = await api.post("/prontuarios", payload);
      }

      const novoRegistro = resultado?.data ?? resultado;
      alert("Atendimento salvo com sucesso!");

      // atualizar histórico
      try {
        if (paciente.id) {
          let hist;
          if (typeof getProntuariosByPacienteId === "function") {
            const rh = await getProntuariosByPacienteId(paciente.id);
            hist = rh?.data ?? rh ?? [];
          } else {
            const rh = await api.get(`/prontuarios?pacienteId=${paciente.id}`);
            hist = rh.data ?? [];
          }
          setHistorico(Array.isArray(hist) ? hist : []);
        }
      } catch (err) {
        console.warn("Erro ao atualizar histórico:", err);
      }

      // limpar formulário
      setNovoAtendimento({
        dataAtendimento: new Date().toISOString().split("T")[0],
        queixa: "",
        anamnese: "",
        examesFisicos: "",
        diagnostico: "",
        evolucao: "",
        conduta: "",
        encaminhamentos: "",
        medicacoes: "",
        observacoes: "",
      });
    } catch (err) {
      console.error("Erro ao salvar prontuário:", err);
      const resp = err?.response;
      if (resp) {
        const msg = resp.data?.message || resp.data || JSON.stringify(resp.data);
        alert(`Erro do servidor ao salvar (status ${resp.status}): ${msg}`);
      } else {
        alert("Erro na requisição: " + (err.message || JSON.stringify(err)));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      {/* PAINEL DE BUSCA DE PACIENTE */}
      <div className="prontuario-search">
        <div className="search-container">
          <h3>Buscar Consultas por Médico</h3>
          <div className="search-row">
            <input
              type="text"
              placeholder="Digite o ID/CRM do médico"
              value={medicoBusca}
              onChange={(e) => setMedicoBusca(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleBuscarPorMedico(medicoBusca);
              }}
            />
            <button onClick={() => handleBuscarPorMedico(medicoBusca)} disabled={loading}>
              {loading ? 'Buscando...' : 'Buscar consultas'}
            </button>
          </div>
        </div>
      </div>

      {consultas.length > 0 && (
        <section className="consultas-list" style={{ maxWidth: 1200, margin: '12px auto', padding: 12 }}>
          <h4>Consultas encontradas</h4>
          <div className="lista-consultas">
            {consultas.map((c) => (
              <div
                key={c.id}
                className={`consulta-item ${selectedConsulta?.id === c.id ? 'selected' : ''}`}
                onClick={() => handleSelectConsulta(c)}
                style={{ cursor: 'pointer', padding: 10, borderBottom: '1px solid #eee', display: 'flex', gap: 12, alignItems: 'center' }}
              >
                <div style={{ minWidth: 160 }}>
                  {c.data ? new Date(c.data).toLocaleString('pt-BR') : '-'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{c.paciente?.nome || c.paciente_nome || '-'}</div>
                  <div style={{ color: '#666' }}>{c.motivo_consulta || c.motivo || '-'}</div>
                </div>
                <div style={{ minWidth: 100, textAlign: 'right', color: '#333' }}>
                  {c.status || '-'}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CABEÇALHO FIXO - SÓ APARECE APÓS BUSCAR */}
      {pacienteEncontrado && (
        <div className="prontuario-header">
          <div className="paciente-info">
            {selectedConsulta && (
              <div className="consulta-info" style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 12 }}>
                  <div><label>Data da Consulta:</label><div>{selectedConsulta.data ? new Date(selectedConsulta.data).toLocaleString('pt-BR') : '-'}</div></div>
                  <div><label>Motivo:</label><div>{selectedConsulta.motivo_consulta || selectedConsulta.motivo || '-'}</div></div>
                  <div><label>Status:</label><div>{selectedConsulta.status || '-'}</div></div>
                  <div><label>Médico:</label><div>{selectedConsulta.medico?.funcionario?.nome || selectedConsulta.medico?.nome || '-'}</div></div>
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
              <label>Data de Nascimento:</label>
              <span>{paciente.dataNacimiento || paciente.dataNascimento || '-'}</span>
            </div>
            <div className="info-group">
              <label>Idade:</label>
              <span>{calcularIdade(paciente.dataNascimento)} anos</span>
            </div>
            <div className="info-group">
              <label>Contato:</label>
              <span>{paciente.contato || '-'}</span>
            </div>
            <div className="info-group">
              <label>Endereço:</label>
              <span>{paciente.endereco || '-'}</span>
            </div>
          </div>
        </div>
      )}

      <main className="page-prontuario">
        {/* HISTÓRICO DE ATENDIMENTOS */}
        <section className="prontuario-historico">
          <h2>Histórico Médico</h2>

          {historico.length === 0 ? (
            <p className="sem-historico">Nenhum atendimento anterior registrado.</p>
          ) : (
            <div className="lista-historico">
              {historico.map((atendimento) => (
                <div key={atendimento.id} className="historico-item">
                  <div className="historico-header">
                    <span className="data">
                      {atendimento.data ? new Date(atendimento.data).toLocaleDateString('pt-BR') : '-'}
                    </span>
                    <span className="medico">
                      {atendimento.medico?.funcionario?.nome || 'Médico não informado'}
                    </span>
                    <span className="especialidade">
                      {atendimento.medico?.especialidade?.nome || '-'}
                    </span>
                  </div>
                  <div className="historico-conteudo">
                    <p><strong>Diagnóstico:</strong> {atendimento.diagnostico || '-'}</p>
                    <p><strong>Conduta:</strong> {atendimento.conduta || '-'}</p>
                    <p><strong>Observações:</strong> {atendimento.motivo_consulta || atendimento.observacoes || '-'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* FORMULÁRIO DE NOVO ATENDIMENTO */}
        <section className="prontuario-formulario">
          <h2>Novo Atendimento</h2>

          <form onSubmit={handleSubmitAtendimento}>

            {/* Linha 1: Data e Queixa */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dataAtendimento">Data do Atendimento:</label>
                <input
                  id="dataAtendimento"
                  type="date"
                  value={novoAtendimento.dataAtendimento}
                  onChange={(e) => setNovoAtendimento({
                    ...novoAtendimento,
                    dataAtendimento: e.target.value
                  })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="queixa">Queixa Principal:</label>
                <input
                  id="queixa"
                  type="text"
                  placeholder="Ex: Dor de cabeça, febre..."
                  value={novoAtendimento.queixa}
                  onChange={(e) => setNovoAtendimento({
                    ...novoAtendimento,
                    queixa: e.target.value
                  })}
                />
              </div>
            </div>

            {/* Campo médio: Anamnese */}
            <div className="form-group">
              <label htmlFor="anamnese">Anamnese (História do Paciente):</label>
              <textarea
                id="anamnese"
                rows="4"
                placeholder="Descreva a história clínica, fatores relevantes..."
                value={novoAtendimento.anamnese}
                onChange={(e) => setNovoAtendimento({
                  ...novoAtendimento,
                  anamnese: e.target.value
                })}
              />
            </div>

            {/* Campo médio: Exames Físicos */}
            <div className="form-group">
              <label htmlFor="examesFisicos">Exames Físicos / Vitais:</label>
              <textarea
                id="examesFisicos"
                rows="4"
                placeholder="Resultados dos exames, sinais vitais, PA, FC, etc..."
                value={novoAtendimento.examesFisicos}
                onChange={(e) => setNovoAtendimento({
                  ...novoAtendimento,
                  examesFisicos: e.target.value
                })}
              />
            </div>

            {/* Campo médio: Diagnóstico */}
            <div className="form-group">
              <label htmlFor="diagnostico">Diagnóstico:</label>
              <textarea
                id="diagnostico"
                rows="4"
                placeholder="Diagnóstico clínico baseado na avaliação..."
                value={novoAtendimento.diagnostico}
                onChange={(e) => setNovoAtendimento({
                  ...novoAtendimento,
                  diagnostico: e.target.value
                })}
              />
            </div>

            {/* CAMPO GRANDE: EVOLUÇÃO */}
            <div className="form-group form-group-grande">
              <label htmlFor="evolucao">Evolução do Paciente:</label>
              <textarea
                id="evolucao"
                rows="8"
                placeholder="Descreva detalhadamente a evolução clínica, como o paciente responde ao tratamento..."
                value={novoAtendimento.evolucao}
                onChange={(e) => setNovoAtendimento({
                  ...novoAtendimento,
                  evolucao: e.target.value
                })}
              />
            </div>

            {/* CAMPO GRANDE: CONDUTA */}
            <div className="form-group form-group-grande">
              <label htmlFor="conduta">Conduta / Tratamento:</label>
              <textarea
                id="conduta"
                rows="8"
                placeholder="Descreva o plano de tratamento, medicações, procedimentos recomendados..."
                value={novoAtendimento.conduta}
                onChange={(e) => setNovoAtendimento({
                  ...novoAtendimento,
                  conduta: e.target.value
                })}
              />
            </div>

            {/* CAMPO GRANDE: ENCAMINHAMENTOS */}
            <div className="form-group form-group-grande">
              <label htmlFor="encaminhamentos">Encaminhamentos:</label>
              <textarea
                id="encaminhamentos"
                rows="8"
                placeholder="Para quais especialistas encaminhar o paciente, se necessário..."
                value={novoAtendimento.encaminhamentos}
                onChange={(e) => setNovoAtendimento({
                  ...novoAtendimento,
                  encaminhamentos: e.target.value
                })}
              />
            </div>

            {/* Campo médio: Medicações */}
            <div className="form-group">
              <label htmlFor="medicacoes">Medicações Prescritas:</label>
              <textarea
                id="medicacoes"
                rows="4"
                placeholder="Medicamento - Dosagem - Frequência"
                value={novoAtendimento.medicacoes}
                onChange={(e) => setNovoAtendimento({
                  ...novoAtendimento,
                  medicacoes: e.target.value
                })}
              />
            </div>

            {/* Campo pequeno: Observações */}
            <div className="form-group">
              <label htmlFor="observacoes">Observações Gerais:</label>
              <textarea
                id="observacoes"
                rows="3"
                placeholder="Outras observações importantes..."
                value={novoAtendimento.observacoes}
                onChange={(e) => setNovoAtendimento({
                  ...novoAtendimento,
                  observacoes: e.target.value
                })}
              />
            </div>

            {/* Botões de ação */}
            <div className="form-actions">
              <button type="submit" className="btn-salvar" disabled={loading}>{loading ? 'Salvando...' : 'Salvar Atendimento'}</button>
              <button type="reset" className="btn-limpar" onClick={() => {
                setNovoAtendimento({
                  dataAtendimento: new Date().toISOString().split("T")[0],
                  queixa: "",
                  anamnese: "",
                  examesFisicos: "",
                  diagnostico: "",
                  evolucao: "",
                  conduta: "",
                  encaminhamentos: "",
                  medicacoes: "",
                  observacoes: "",
                });
              }}>Limpar Formulário</button>
            </div>
          </form>
        </section>
      </main>

      {!pacienteEncontrado && !loading && (
        <main className="page-prontuario">
          <div className="mensagem-vazia">
            <p>Digite o CPF do paciente acima e clique em "Buscar" para começar o atendimento</p>
          </div>
        </main>
      )}
    </>
  );
}
