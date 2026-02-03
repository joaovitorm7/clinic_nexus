import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import {
  getAgendamentos,
  cancelarAgendamento,
} from "../../../services/agendamentoService";
import "./Consulta.css";

const Consultas = () => {
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelando, setCancelando] = useState(null);
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });
  const [consultasFiltradas, setConsultasFiltradas] = useState([]);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const consultasData = await getAgendamentos();
        if (mounted) setConsultas(consultasData || []);
        if (mounted) setConsultasFiltradas(consultasData || []);
      } catch (err) {
        console.error("Erro ao carregar consultas:", err);
        if (mounted)
          setMensagem({
            tipo: "erro",
            texto:
              err?.response?.data?.message ||
              "Erro ao carregar consultas. Verifique a conexão com a API.",
          });
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  const handleCancelarConsulta = async (consultaId) => {
    const confirm = window.confirm("Tem certeza que deseja cancelar esta consulta?");
    if (!confirm) return;

    setCancelando(consultaId);
    try {
      await cancelarAgendamento(consultaId);
      setConsultas((prev) =>
        prev.map((c) => (c.id === consultaId ? { ...c, status: "cancelada" } : c))
      );
      setMensagem({ tipo: "sucesso", texto: "Consulta cancelada com sucesso!" });
    } catch (err) {
      console.error("Erro ao cancelar consulta:", err);
      setMensagem({
        tipo: "erro",
        texto:
          err?.response?.data?.message ||
          "Erro ao cancelar consulta. Tente novamente mais tarde.",
      });
    } finally {
      setCancelando(null);
      setTimeout(() => setMensagem({ tipo: "", texto: "" }), 3500);
    }
  };

  const handleVoltar = () => {
    navigate(-1);
  };

  const filtrarPorPeriodo = () => {
  if (!dataInicio || !dataFim) {
    setConsultasFiltradas(consultas);
    return;
  }

  const inicio = new Date(dataInicio);
  const fim = new Date(dataFim);
  fim.setHours(23, 59, 59, 999);

  const filtradas = consultas.filter((c) => {
    if (!c.data) return false;
    const dataConsulta = new Date(c.data);
    return dataConsulta >= inicio && dataConsulta <= fim;
  });

  setConsultasFiltradas(filtradas);
};

const limparFiltro = () => {
  setDataInicio("");
  setDataFim("");
  setConsultasFiltradas(consultas);
};

  if (loading) return <p>Carregando consultas...</p>;

  return (
    <div className="page-consultas">
      <button
        className="btn-voltar"
        onClick={handleVoltar}
        title="Voltar ao dashboard"
        style={{ marginBottom: 12 }}
      >
        <FaArrowLeft size={18} />
      </button>

      <h1>Consultas Agendadas</h1>
    <div className="filtro-consultas">
      <div>
        <label>Data inicial</label>
        <input
          type="date"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
        />
      </div>

      <div>
        <label>Data final</label>
        <input
          type="date"
          value={dataFim}
          onChange={(e) => setDataFim(e.target.value)}
        />
      </div>

      <button className="btn-filtrar" onClick={filtrarPorPeriodo}>
        Filtrar
      </button>

      <button className="btn-limpar" onClick={limparFiltro}>
        Limpar
      </button>
    </div>

      {mensagem.texto && (
        <div className={`mensagem mensagem-${mensagem.tipo}`}>{mensagem.texto}</div>
      )}

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
            {consultasFiltradas.map((c) => {
              const pacienteNome = c.paciente?.nome ?? "Não encontrado";
              const medicoNome = c.medico?.funcionario?.nome ?? c.medico?.nome ?? "Não informado";
              const especialidadeNome = c.medico?.especialidade?.nome ?? c.especialidade ?? "Não informado";
              const dataStr = c.data ? new Date(c.data).toLocaleString() : "-";
              const status = c.status ?? "-";

              return (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{pacienteNome}</td>
                  <td>{medicoNome}</td>
                  <td>{especialidadeNome}</td>
                  <td>{dataStr}</td>
                  <td>{status}</td>
                  <td>{c.motivo_consulta ?? c.motivo ?? "-"}</td>
                  <td>
                    {status !== "cancelada" && status !== "realizada" ? (
                      <button
                        className="btn-cancelar"
                        onClick={() => handleCancelarConsulta(c.id)}
                        disabled={cancelando === c.id}
                      >
                        {cancelando === c.id ? "Cancelando..." : "Cancelar"}
                      </button>
                    ) : (
                      <span className="status-bloqueado">
                        {status === "cancelada" ? "Cancelada" : "Realizada"}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Consultas;
