import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VisualizarAgenda.css";
import {DoctorsService} from "../../../services/doctors.services.js"
import { AgendaService } from "../../../services/agenda.service";
import { FaArrowLeft } from 'react-icons/fa';

export default function VisualizarAgenda() {
  const navigate = useNavigate();
  const [medicos, setMedicos] = useState([]);
  const [medicoSelecionado, setMedicoSelecionado] = useState("");
  const [agendas, setAgendas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  // Carregar médicos
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

  //  Carregar agenda do médico selecionado
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

      <button
        type="button"
        className="back-button"
        onClick={() => navigate('/recepcao')}
        aria-label="Voltar para Recepção"
      >
        <FaArrowLeft size={18} style={{ marginRight: 8 }} /> Voltar
      </button>

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
                      {(() => {
                        const [ano, mes, dia] = agenda.data.split("-");
                      return `${dia}/${mes}/${ano}`;
                                })()}
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
