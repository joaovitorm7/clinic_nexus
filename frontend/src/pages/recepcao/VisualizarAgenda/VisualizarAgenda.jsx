import React, { useEffect, useState } from "react";
import "./VisualizarAgenda.css";

export default function VisualizarAgenda() {
    const [medicos, setMedicos] = useState([]);
    const [agendas, setAgendas] = useState([]);
    const [medicoSelecionado, setMedicoSelecionado] = useState(null);

    useEffect(() => {
        const medicosLS = JSON.parse(localStorage.getItem("medicos")) || [];
        const agendasLS = JSON.parse(localStorage.getItem("agendas")) || [];

        setMedicos(medicosLS);
        setAgendas(agendasLS);
    }, []);

    const handleSelecionarMedico = (id) => {
        setMedicoSelecionado(id);
    };

    const agendasFiltradas = medicoSelecionado
        ? agendas.filter((a) => a.id_medico === medicoSelecionado)
        : [];

    return (
        <div className="agenda-container">
        <h1 className="titulo-agenda">Agenda dos Médicos</h1>

        <div className="select-container">
            <label>Selecione o médico:</label>
            <select
            value={medicoSelecionado || ""}
            onChange={(e) => handleSelecionarMedico(Number(e.target.value))}
            >
            <option value="">-- Selecione --</option>
            {medicos.map((m) => (
                <option key={m.id} value={m.id}>
                {m.nome} — {m.especialidade}
                </option>
            ))}
            </select>
        </div>

        {medicoSelecionado && (
            <div className="lista-agenda">
            <h2>Horários cadastrados</h2>

            {agendasFiltradas.length === 0 ? (
                <p className="nenhuma-agenda">Nenhuma agenda encontrada.</p>
            ) : (
                agendasFiltradas.map((ag) => (
                <div className="card-agenda" key={ag.id}>
                    <p><strong>Data:</strong> {ag.data}</p>
                    <p><strong>Início:</strong> {ag.hora_inicio}</p>
                    <p><strong>Fim:</strong> {ag.hora_fim}</p>

                    <p className={`status ${ag.status}`}>
                    {ag.status === "disponivel" ? "Disponível" : "Ocupado"}
                    </p>
                </div>
                ))
            )}
            </div>
        )}
    </div>
    );
}