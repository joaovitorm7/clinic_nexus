import { useEffect, useState } from "react";
import "./VisualizarAgenda.css";
import {DoctorsService} from "../../../services/doctors.services.js"
// Services (paths 100% compatíveis com o tree)
import { AgendaService } from "../../../services/agenda.service";

export default function VisualizarAgenda() {
  const [medicos, setMedicos] = useState([]);
  const [medicoSelecionado, setMedicoSelecionado] = useState("");
  const [agendas, setAgendas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  // 🔹 Carregar médicos
  useEffect(() => {
    async function carregarMedicos() {
      try {
        const data = await DoctorsService.getAll();
        setMedicos(data);
      } catch (err) {
        console.error(err);
        setErro("Erro ao carregar médicos.");
      }
    }

    carregarMedicos();
  }, []);

  // 🔹 Carregar agenda do médico selecionado
  useEffect(() => {
    if (!medicoSelecionado) {
      setAgendas([]);
      return;
    }

    async function carregarAgenda() {
      setLoading(true);
      setErro("");

      try {
        const data = await AgendaService.getAgendasByMedico(medicoSelecionado);
        setAgendas(data);
      } catch (err) {
        console.error(err);
        setErro("Erro ao carregar agenda.");
      } finally {
        setLoading(false);
      }
    }

    carregarAgenda();
  }, [medicoSelecionado]);

  return (
    <div className="agenda-container">
      <h1 className="titulo-agenda">Visualizar Agenda</h1>

      {/* Seleção do médico */}
      <div className="select-container">
        <label htmlFor="medico">Selecione o médico</label>
        <select
          id="medico"
          value={medicoSelecionado}
          onChange={(e) => setMedicoSelecionado(e.target.value)}
        >
          <option value="">-- Selecione --</option>
          {medicos.map((medico) => (
            <option key={medico.id} value={medico.id}>
              {medico.funcionario.nome}
            </option>
          ))}
        </select>
      </div>

      {/* Estados */}
      {loading && <p className="loading">Carregando agenda...</p>}
      {erro && <p className="erro">{erro}</p>}

      {/* Lista de agendas */}
      {!loading && medicoSelecionado && (
        <div className="lista-agenda">
          <h2>Horários cadastrados</h2>

          {agendas.length === 0 ? (
            <p className="nenhuma-agenda">
              Nenhuma agenda encontrada para este médico.
            </p>
          ) : (
            agendas.map((agenda) => (
              <div className="card-agenda" key={agenda.id}>
                <p>
                  <strong>Data:</strong> {" "}
                  {new Date(agenda.data).toLocaleDateString("pt-BR")}
                </p>
                <p>
                  <strong>Início:</strong> {agenda.hora_inicio}
                </p>
                <p>
                  <strong>Fim:</strong> {agenda.hora_fim}
                </p>

                <span className={`status ${agenda.status}`}>
                  {agenda.status === "disponivel"
                    ? "Disponível"
                    : "Ocupado"}
                </span>
              </div>
            ))
          )}
        </div> 
      )}
    </div>
  );
}
