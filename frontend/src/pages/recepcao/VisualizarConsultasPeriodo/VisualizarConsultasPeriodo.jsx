    import React, { useState } from "react";
    import { FaArrowLeft } from "react-icons/fa";
    import { useNavigate } from "react-router-dom";
    import api from "../../../services/api";
    import "./VisualizarConsultasPeriodo.css";

    export default function VisualizarConsultasPeriodo() {
    const navigate = useNavigate();

    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [consultas, setConsultas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");

    const buscarConsultas = async () => {
        if (!dataInicio || !dataFim) {
        setErro("Informe a data inicial e a data final.");
        return;
        }

        setErro("");
        setLoading(true);

        try {
        const response = await api.get("/agendamentos", {
            params: {
            dataInicio,
            dataFim,
            status: "agendada",
            },
        });

        setConsultas(response.data || []);
        } catch (err) {
        console.error(err);
        setErro(
            err?.response?.data?.message ||
            "Erro ao buscar consultas no período."
        );
        setConsultas([]);
        } finally {
        setLoading(false);
        }
    };

    const formatarData = (dataISO) => {
        if (!dataISO) return "-";
        return new Date(dataISO).toLocaleString("pt-BR");
    };

    return (
        
        <div className="page-consultas-periodo">
        <button className="btn-voltar" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Voltar
        </button>

        <h1>Consultas Agendadas por Período</h1>

        <div className="filtro-periodo">
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

            <button onClick={buscarConsultas}>Buscar</button>
        </div>

        {erro && <p className="erro">{erro}</p>}
        {loading && <p>Carregando...</p>}

        {!loading && consultas.length === 0 && (
            <p>Nenhuma consulta encontrada.</p>
        )}

        {consultas.length > 0 && (
            <table className="tabela-consultas">
            <thead>
                <tr>
                <th>ID</th>
                <th>Paciente</th>
                <th>Médico</th>
                <th>Especialidade</th>
                <th>Data / Hora</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {consultas.map((c) => (
                <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.paciente?.nome || "N/A"}</td>
                    <td>
                    {c.medico?.funcionario?.nome ||
                        c.medico?.nome ||
                        "N/A"}
                    </td>
                    <td>
                    {c.medico?.especialidade?.nome || "N/A"}
                    </td>
                    <td>{formatarData(c.data)}</td>
                    <td>{c.status}</td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        </div>
    );
}