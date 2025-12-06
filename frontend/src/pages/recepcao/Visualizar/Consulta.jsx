import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const consultasData = await getAgendamentos();
        setConsultas(consultasData || []);
      } catch (err) {
        console.error("Erro ao carregar consultas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCancelarConsulta = async (consultaId) => {
    if (!window.confirm("Tem certeza que deseja cancelar esta consulta?")) {
      return;
    }

    setCancelando(consultaId);
    try {
      await cancelarAgendamento(consultaId);
      setConsultas(
        consultas.map((c) =>
          c.id === consultaId ? { ...c, status: "cancelada" } : c
        )
      );
      setMensagem({
        tipo: "sucesso",
        texto: "Consulta cancelada com sucesso!",
      });
    } catch (err) {
      console.error("Erro ao cancelar consulta:", err);
      setMensagem({
        tipo: "erro",
        texto:
          err.response?.data?.message ||
          "Erro ao cancelar consulta. Tente novamente.",
      });
    } finally {
      setCancelando(null);
      setTimeout(() => setMensagem({ tipo: "", texto: "" }), 3000);
    }
  };

  if (loading) return <p>Carregando consultas...</p>;

  return (
    <div className="page-consultas">
      <h1>Consultas Agendadas</h1>

      {mensagem.texto && (
        <div className={`mensagem mensagem-${mensagem.tipo}`}>
          {mensagem.texto}
        </div>
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
            {consultas.map((c) => {
              const pacienteNome = c.paciente?.nome ?? "Não encontrado";

              const medicoNome = c.medico?.funcionario?.nome ?? "Não informado";

              const especialidadeNome =
                c.medico?.especialidade?.nome ?? "Não informado";

              const dataStr = c.data ? new Date(c.data).toLocaleString() : "-";

              return (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{pacienteNome}</td>
                  <td>{medicoNome}</td> {/* Médico = funcionário */}
                  <td>{especialidadeNome}</td> {/* Especialidade */}
                  <td>{dataStr}</td>
                  <td>{c.status ?? "-"}</td>
                  <td>{c.motivo_consulta ?? c.motivo ?? "-"}</td>
                  <td>
                    {c.status !== "cancelada" && c.status !== "realizada" ? (
                      <button
                        className="btn-cancelar"
                        onClick={() => handleCancelarConsulta(c.id)}
                        disabled={cancelando === c.id}
                      >
                        {cancelando === c.id ? "Cancelando..." : "Cancelar"}
                      </button>
                    ) : (
                      <span className="status-bloqueado">
                        {c.status === "cancelada" ? "Cancelada" : "Realizada"}
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
