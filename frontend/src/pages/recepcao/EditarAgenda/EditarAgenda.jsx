import React, { useEffect, useState } from "react";
import "./EditarAgenda.css";

export default function AgendaMensalMedicos() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedKey, setSelectedKey] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [agendamentos, setAgendamentos] = useState({});

    const [form, setForm] = useState({
        medico: "",
        especialidade: "",
        horarioInicio: "",
        horarioFim: "",
    });

    const [editingIndex, setEditingIndex] = useState(null);

    useEffect(() => {
        try {
        const raw = localStorage.getItem("agendaMedicos_v1");
        if (raw) setAgendamentos(JSON.parse(raw));
        } catch (e) {
        console.error("Erro ao carregar agenda:", e);
        }
    }, []);

    useEffect(() => {
        try {
        localStorage.setItem("agendaMedicos_v1", JSON.stringify(agendamentos));
        } catch (e) {
        console.error("Erro ao salvar agenda:", e);
        }
    }, [agendamentos]);

    function keyFromDay(day) {
        const y = currentDate.getFullYear();
        const m = String(currentDate.getMonth() + 1).padStart(2, "0");
        const d = String(day).padStart(2, "0");
        return `${d}-${m}-${y}`;
    }

    function getMonthDays(date) {
        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDayOfMonth = new Date(year, month, 1);
        const firstWeekday = firstDayOfMonth.getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const cells = [];
        for (let i = 0; i < firstWeekday; i++) cells.push(null);
        for (let d = 1; d <= daysInMonth; d++) cells.push(d);
        return cells;
    }

    function prevMonth() {
        setCurrentDate((cd) => new Date(cd.getFullYear(), cd.getMonth() - 1, 1));
    }
    function nextMonth() {
        setCurrentDate((cd) => new Date(cd.getFullYear(), cd.getMonth() + 1, 1));
    }

    // para um intervalo de 30 min a cada horario
    function gerarIntervalos(inicio, fim) {
        if (!inicio) return [];
        if (!fim) return [inicio];
        const [h1, m1] = inicio.split(":").map(Number);
        const [h2, m2] = fim.split(":").map(Number);
        const start = new Date(0, 0, 0, h1, m1);
        const end = new Date(0, 0, 0, h2, m2);
        const slots = [];
        let cur = new Date(start);

        while (cur <= end) {
        const hh = String(cur.getHours()).padStart(2, "0");
        const mm = String(cur.getMinutes()).padStart(2, "0");
        slots.push(`${hh}:${mm}`);
        cur = new Date(cur.getTime() + 30 * 60 * 1000);
        if (slots.length > 1000) break;
        }
        return slots;
    }

    function openModal(day) {
        if (!day) return;
        const key = keyFromDay(day);
        setSelectedKey(key);
        setShowModal(true);
        setEditingIndex(null);
        setForm({
        medico: "",
        especialidade: "",
        horarioInicio: "",
        horarioFim: "",
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!selectedKey) return;

        const horarios =
        form.horarioFim && form.horarioFim.length > 0
            ? gerarIntervalos(form.horarioInicio, form.horarioFim)
            : form.horarioInicio
            ? [form.horarioInicio]
            : [];

        const novoRegistro = {
        medico: form.medico.trim(),
        especialidade: form.especialidade.trim(),
        horarios,
        };

        setAgendamentos((prev) => {
        const dayList = [...(prev[selectedKey] || [])];

        if (editingIndex !== null && editingIndex >= 0 && editingIndex < dayList.length) {
            dayList[editingIndex] = novoRegistro;
        } else {
            dayList.push(novoRegistro);
        }
        return { ...prev, [selectedKey]: dayList };
        });

        setForm({
        medico: "",
        especialidade: "",
        horarioInicio: "",
        horarioFim: "",
        });
        setEditingIndex(null);
    }

    function startEdit(index) {
        if (!selectedKey) return;
        const list = agendamentos[selectedKey] || [];
        const item = list[index];
        if (!item) return;
        setForm({
        medico: item.medico,
        especialidade: item.especialidade,
        horarioInicio: item.horarios && item.horarios.length > 0 ? item.horarios[0] : "",
        horarioFim: "",
        });
        setEditingIndex(index);
    }

    function deleteEntry(index) {
        if (!selectedKey) return;
        setAgendamentos((prev) => {
        const list = [...(prev[selectedKey] || [])];
        list.splice(index, 1);
        const copy = { ...prev };
        if (list.length === 0) {
            delete copy[selectedKey];
        } else {
            copy[selectedKey] = list;
        }
        return copy;
        });
    }

    function deleteAllForDay() {
        if (!selectedKey) return;
        setAgendamentos((prev) => {
        const copy = { ...prev };
        delete copy[selectedKey];
        return copy;
        });
        setShowModal(false);
    }

    const cells = getMonthDays(currentDate);
    const monthLabel = currentDate.toLocaleString("pt-BR", { month: "long", year: "numeric" });

    return (
        <div className="agenda-root">
        <h1 className="agenda-title">Agenda Mensal dos Médicos</h1>
        <div className="agenda-controls">
            <button className="btn" onClick={prevMonth}>◀</button>
            <div className="month-label">{monthLabel}</div>
            <button className="btn" onClick={nextMonth}>▶</button>
        </div>

        <div className="weekdays">
            {["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"].map((w) => (
            <div key={w} className="weekday">{w}</div>
            ))}
        </div>

        <div className="calendar-grid">
            {cells.map((day, idx) => {
            if (!day) return <div key={idx} className="cell empty" />;
            const key = keyFromDay(day);
            const has = !!(agendamentos[key] && agendamentos[key].length > 0);
            return (
                <div key={idx} className="cell day" onClick={() => openModal(day)}>
                <div className="cell-daynum">{day}</div>
                {has && <div className="cell-dot" />}
                </div>
            );
            })}
        </div>

        {showModal && selectedKey && (
            <div className="modal-overlay" onClick={() => { setShowModal(false); setEditingIndex(null); }}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <h2>Dia {selectedKey}</h2>
                <div className="existing-list">
                <h3>Disponibilidades</h3>
                {agendamentos[selectedKey] && agendamentos[selectedKey].length > 0 ? (
                    agendamentos[selectedKey].map((it, i) => (
                    <div key={i} className="entry">
                        <div className="entry-main">
                        <div><strong>{it.medico}</strong> — {it.especialidade}</div>
                        <div className="entry-times">{it.horarios.join(", ")}</div>
                        </div>
                        <div className="entry-actions">
                        <button className="small" onClick={() => { startEdit(i); }}>Editar</button>
                        <button className="small danger" onClick={() => deleteEntry(i)}>Excluir</button>
                        </div>
                    </div>
                    ))
                ) : (
                    <p className="muted">Nenhuma disponibilidade cadastrada.</p>
                )}
                </div>

                <form className="form" onSubmit={handleSubmit}>
                <h3>{editingIndex !== null ? "Editar disponibilidade" : "Adicionar disponibilidade"}</h3>

                <label>Nome do médico</label>
                <input
                    required
                    value={form.medico}
                    onChange={(e) => setForm({ ...form, medico: e.target.value })}
                />

                <label>Especialidade</label>
                <input
                    required
                    value={form.especialidade}
                    onChange={(e) => setForm({ ...form, especialidade: e.target.value })}
                />
                <div className="time-row">
                    <div>
                    <label>Horário início</label>
                    <input
                        type="time"
                        value={form.horarioInicio}
                        onChange={(e) => setForm({ ...form, horarioInicio: e.target.value })}
                        required
                    />
                    </div>

                    <div>
                    <label>Horário fim (opcional)</label>
                    <input
                        type="time"
                        value={form.horarioFim}
                        onChange={(e) => setForm({ ...form, horarioFim: e.target.value })}
                    />
                    </div>
                </div>

                <div className="modal-actions">
                    <button type="submit" className="btn primary">
                    {editingIndex !== null ? "Salvar alteração" : "Adicionar"}
                    </button>

                    {agendamentos[selectedKey] && agendamentos[selectedKey].length > 0 && (
                    <button type="button" className="btn danger" onClick={deleteAllForDay}>
                        Excluir todos do dia
                    </button>
                    )}
                    <button type="button" className="btn" onClick={() => { setShowModal(false); setEditingIndex(null); }}>
                    Fechar
                    </button>
                </div>
                </form>
            </div>
            </div>
        )}

        </div>
    );
}