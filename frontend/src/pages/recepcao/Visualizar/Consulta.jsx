import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import {
  getAgendamentos,
  cancelarAgendamento,
  updateAgendamento,
} from "../../../services/agendamentoService";
import { DoctorsService } from "../../../services/doctors.services";
import "./Consulta.css";


const Consultas = () => {
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelando, setCancelando] = useState(null);
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });
  const [consultasFiltradas, setConsultasFiltradas] = useState([]);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");


  const [consultaEditando, setConsultaEditando] = useState(null);
  const [dadosEdicao, setDadosEdicao] = useState({
    paciente_nome: "",
    medico_nome: "",
    medico_id: null,
    especialidade_nome: "",
    data: "",
    motivo_consulta: "",
    status: ""
  });

  const [medicos, setMedicos] = useState([]);
  const [medicosFiltrados, setMedicosFiltrados] = useState([]);
  const [buscaMedico, setBuscaMedico] = useState("");
  const [showMedicosList, setShowMedicosList] = useState(false);


  const navigate = useNavigate();


  useEffect(() => {
    let mounted = true;


    const fetchData = async () => {
      setLoading(true);
      try {
        const consultasData = await getAgendamentos();
        if (mounted) {
          setConsultas(consultasData || []);
          setConsultasFiltradas(consultasData || []);
        }
      } catch (err) {
        setMensagem({
          tipo: "erro",
          texto: "Erro ao carregar consultas."
        });
      } finally {
        if (mounted) setLoading(false);
      }
    };


    fetchData();
    return () => (mounted = false);
  }, []);


  const handleCancelarConsulta = async (consultaId) => {
    const confirm = window.confirm("Cancelar esta consulta?");
    if (!confirm) return;


    setCancelando(consultaId);
    try {
      await cancelarAgendamento(consultaId);
      setConsultas(prev =>
        prev.map(c => c.id === consultaId ? { ...c, status: "cancelada" } : c)
      );
      setConsultasFiltradas(prev =>
        prev.map(c => c.id === consultaId ? { ...c, status: "cancelada" } : c)
      );
      setMensagem({ tipo: "sucesso", texto: "Consulta cancelada!" });
    } catch {
      setMensagem({ tipo: "erro", texto: "Erro ao cancelar consulta." });
    } finally {
      setCancelando(null);
      setTimeout(() => setMensagem({ tipo: "", texto: "" }), 3000);
    }
  };


  const handleVoltar = () => navigate(-1);


  const filtrarPorPeriodo = () => {
    if (!dataInicio || !dataFim) {
      setConsultasFiltradas(consultas);
      return;
    }


    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);
    fim.setHours(23, 59, 59, 999);


    const filtradas = consultas.filter(c => {
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


  //popup
  const abrirEdicao = async (consulta) => {
    setConsultaEditando(consulta);
    setDadosEdicao({
      paciente_nome: consulta.paciente?.nome || "",
      medico_nome: consulta.medico?.funcionario?.nome || "",
      medico_id: consulta.medico?.id || null,
      especialidade_nome: consulta.medico?.especialidade?.nome || "",
      data: consulta.data ? consulta.data.slice(0, 16) : "",
      motivo_consulta: consulta.motivo_consulta || "",
      status: consulta.status || ""
    });
    setBuscaMedico("");
    setShowMedicosList(false);
    
    try {
      const medicosData = await DoctorsService.getAll();
      setMedicos(medicosData);
      setMedicosFiltrados(medicosData);
    } catch (err) {
      console.error("Erro ao carregar médicos:", err);
    }
  };

  const handleBuscaMedicoChange = async (e) => {
    const valor = e.target.value;
    setBuscaMedico(valor);
    setDadosEdicao(prev => ({ ...prev, medico_nome: valor, medico_id: null }));
    
    if (valor.length > 0) {
      try {
        const resultados = await DoctorsService.getByNome(valor);
        setMedicosFiltrados(resultados);
        setShowMedicosList(true);
      } catch (err) {
        console.error("Erro ao buscar médicos:", err);
      }
    } else {
      setMedicosFiltrados(medicos);
      setShowMedicosList(false);
    }
  };

  const selecionarMedico = (medico) => {
    setDadosEdicao(prev => ({
      ...prev,
      medico_nome: medico.funcionario?.nome || "",
      medico_id: medico.id,
      especialidade_nome: medico.especialidade?.nome || ""
    }));
    setBuscaMedico(medico.funcionario?.nome || "");
    setShowMedicosList(false);
  };

  const fecharEdicao = () => {
    setConsultaEditando(null);
    setShowMedicosList(false);
  };


  //não está com o back
const salvarEdicao = async () => {
  try {
    await updateAgendamento(consultaEditando.id, {
      status: dadosEdicao.status,
      motivo_consulta: dadosEdicao.motivo_consulta,
    });
    
    setConsultas(prev =>
      prev.map(c =>
        c.id === consultaEditando.id
          ? {
              ...c,
              data: dadosEdicao.data,
              status: dadosEdicao.status,
              motivo_consulta: dadosEdicao.motivo_consulta,
              paciente: { ...c.paciente, nome: dadosEdicao.paciente_nome },
              medico: {
                ...c.medico,
                funcionario: { ...c.medico?.funcionario, nome: dadosEdicao.medico_nome },
                especialidade: {
                  ...c.medico?.especialidade,
                  nome: dadosEdicao.especialidade_nome
                }
              }
            }
          : c
      )
    );


    setConsultasFiltradas(prev =>
      prev.map(c =>
        c.id === consultaEditando.id
          ? {
              ...c,
              data: dadosEdicao.data,
              status: dadosEdicao.status,
              motivo_consulta: dadosEdicao.motivo_consulta,
              paciente: { ...c.paciente, nome: dadosEdicao.paciente_nome },
              medico: {
                ...c.medico,
                funcionario: { ...c.medico?.funcionario, nome: dadosEdicao.medico_nome },
                especialidade: {
                  ...c.medico?.especialidade,
                  nome: dadosEdicao.especialidade_nome
                }
              }
            }
          : c
      )
    );

    setMensagem({ tipo: "sucesso", texto: "Consulta atualizada!" });
    fecharEdicao();
  } catch (error) {
    console.error("Erro ao atualizar consulta:", error);
    setMensagem({ tipo: "erro", texto: "Erro ao atualizar consulta." });
  }
};


  // consulta fake para teste
  const adicionarConsultaFake = () => {
    const nova = {
      id: Date.now(),
      paciente: { nome: "Paciente Teste" },
      medico: {
        nome: "Dr. João",
        especialidade: { nome: "Clínico Geral" }
      },
      data: new Date().toISOString(),
      status: "agendada",
      motivo_consulta: "Criada manualmente"
    };


    setConsultas(prev => [nova, ...prev]);
    setConsultasFiltradas(prev => [nova, ...prev]);
  };


  if (loading) return <p>Carregando consultas...</p>;


  return (
    <div className="page-consultas">
      <button className="btn-voltar" onClick={handleVoltar}>
        <FaArrowLeft size={18} />
      </button>


      <h1>Consultas Agendadas</h1>


      <button onClick={adicionarConsultaFake}>
        Adicionar consulta teste
      </button>


      <div className="filtro-consultas">
        <div>
          <label>Data inicial</label>
          <input type="date" value={dataInicio} onChange={e => setDataInicio(e.target.value)} />
        </div>


        <div>
          <label>Data final</label>
          <input type="date" value={dataFim} onChange={e => setDataFim(e.target.value)} />
        </div>


        <button className="btn-filtrar" onClick={filtrarPorPeriodo}>
          Filtrar
        </button>


        <button className="btn-limpar" onClick={limparFiltro}>
          Limpar
        </button>
      </div>


      {mensagem.texto && (
        <div className={`mensagem mensagem-${mensagem.tipo}`}>
          {mensagem.texto}
        </div>
      )}


      <table className="consultas-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Paciente</th>
            <th>Médico</th>
            <th>Especialidade</th>
            <th>Data</th>
            <th>Status</th>
            <th>Observações</th>
            <th>Ações</th>
          </tr>
        </thead>


        <tbody>
          {consultasFiltradas.map(c => {
            const status = c.status ?? "-";
            return (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.paciente?.nome}</td>
                <td>{c.medico?.funcionario?.nome || c.medico?.nome}</td>
                <td>{c.medico?.especialidade?.nome}</td>
                <td>{new Date(c.data).toLocaleString()}</td>
                <td>{status}</td>
                <td>{c.motivo_consulta}</td>
                <td>
                  {status !== "cancelada" && status !== "realizada" ? (
                    <>
                      <button className="btn-editar" onClick={() => abrirEdicao(c)}>
                        Editar
                      </button>


                      <button
                        className="btn-cancelar"
                        onClick={() => handleCancelarConsulta(c.id)}
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <span className="status-bloqueado">{status}</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>






      {consultaEditando && (
        <div className="modal-overlay">
          <div className="modal-edicao">
            <h2>Editar Consulta</h2>


            <label>Paciente</label>
            <input
              value={dadosEdicao.paciente_nome}
              onChange={e =>
                setDadosEdicao({ ...dadosEdicao, paciente_nome: e.target.value })
              }
            />


            <label>Médico</label>
            <div className="medico-search-container">
              <input
                type="text"
                value={buscaMedico}
                onChange={handleBuscaMedicoChange}
                onFocus={() => setShowMedicosList(true)}
                placeholder="Buscar médico..."
                autoComplete="off"
              />
              {showMedicosList && medicosFiltrados.length > 0 && (
                <ul className="medicos-suggestions">
                  {medicosFiltrados.map(medico => (
                    <li 
                      key={medico.id} 
                      onClick={() => selecionarMedico(medico)}
                    >
                      {medico.funcionario?.nome} - {medico.especialidade?.nome}
                    </li>
                  ))}
                </ul>
              )}
            </div>


            <label>Data</label>
            <input
              type="datetime-local"
              value={dadosEdicao.data}
              onChange={e =>
                setDadosEdicao({ ...dadosEdicao, data: e.target.value })
              }
            />


            <label>Motivo</label>
            <input
              value={dadosEdicao.motivo_consulta}
              onChange={e =>
                setDadosEdicao({ ...dadosEdicao, motivo_consulta: e.target.value })
              }
            />


            <label>Status</label>
            <select
              value={dadosEdicao.status}
              onChange={e =>
                setDadosEdicao({ ...dadosEdicao, status: e.target.value })
              }
            >
              <option value="agendada">Agendada</option>
              <option value="realizada">Realizada</option>
              <option value="cancelada">Cancelada</option>
            </select>


            <div className="modal-acoes">
              <button onClick={salvarEdicao}>Salvar</button>
              <button onClick={fecharEdicao}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default Consultas;