import React, { useEffect, useState } from "react";
import "./EditarAgenda.css";
import { AgendaService } from "../../../services/agenda.service.js";
import { DoctorsService } from "../../../services/doctors.services.js";

export default function AgendaMensalMedicos() {
  /* ===== STATE ===== */
  const [agendaAtual, setAgendaAtual] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedKey, setSelectedKey] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [agendamentos, setAgendamentos] = useState({});
  const [medicos, setMedicos] = useState([]);
  const [medicoSelecionado, setMedicoSelecionado] = useState(null);

  const [form, setForm] = useState({
    medico: "",
    especialidade: "",
    horarioInicio: "",
    horarioFim: "",
  });

  const [editingIndex, setEditingIndex] = useState(null);
  const [medicoBusca, setMedicoBusca] = useState("");
  const [mostrarMedicos, setMostrarMedicos] = useState(false);
  const [mostrarEspecialidades, setMostrarEspecialidades] = useState(false);

  /* ===== CALENDÁRIO ===== */
  function keyFromDay(day) {
    const y = currentDate.getFullYear();
    const m = String(currentDate.getMonth() + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${d}-${m}-${y}`;
  }

  function getMonthDays(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstWeekday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells = [];
    for (let i = 0; i < firstWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    return cells;
  }

  function gerarIntervalos(inicio, fim) {
    if (!inicio) return [];
    const [h1, m1] = inicio.split(":").map(Number);
    const [h2, m2] = fim.split(":").map(Number);

    const start = new Date(0, 0, 0, h1, m1);
    const end = fim ? new Date(0, 0, 0, h2, m2) : start;

    const slots = [];
    let cur = new Date(start);

    while (cur <= end) {
      slots.push(
        `${String(cur.getHours()).padStart(2, "0")}:${String(
          cur.getMinutes()
        ).padStart(2, "0")}`
      );
      cur.setMinutes(cur.getMinutes() + 30);
    }
    return slots;
  }

  /* ===== MODAL ===== */
  function openModal(day) {
    setSelectedKey(keyFromDay(day));
    setShowModal(true);
    resetForm();
  }

  function resetForm() {
    setForm({ medico: "", especialidade: "", horarioInicio: "", horarioFim: "" });
    setMedicoBusca("");
    setEditingIndex(null);
  }

  async function reloadAgendas() {
    const data = await AgendaService.getAgendas();

    const grouped = {};
    data.forEach((item) => {
      if (!item || !item.medico) return;

      const date = new Date(item.data);
      const key = `${String(date.getDate()).padStart(2, "0")}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${date.getFullYear()}`;

      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(item);
    });

    setAgendamentos(grouped);
  }

  useEffect(() => {
    reloadAgendas();
    DoctorsService.getAll().then(setMedicos);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

const [dia, mes, ano] = selectedKey.split("-");
const dataISO = `${ano}-${mes}-${dia}`; // "2026-01-07"

const payload = {
  id_medico: medicoSelecionado,
  data: dataISO,
  hora_inicio: form.horarioInicio,
  hora_fim: form.horarioFim || form.horarioInicio,
};
    try {
      if (editingIndex !== null) {
        const agendaId = agendamentos[selectedKey][editingIndex].id;
        await AgendaService.updateAgenda(agendaId, payload);
      } else {
        await AgendaService.createAgenda(payload);
      }

      await reloadAgendas();
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error("Erro agenda", error);
      alert("Erro ao salvar agenda");
    }
  }

  function startEdit(index) {
    const item = agendamentos[selectedKey][index];

    setForm({
      medico: item.medico?.funcionario?.nome || "",
      especialidade: item.medico?.especialidade?.nome || "",
      horarioInicio: item.hora_inicio || "",
      horarioFim: item.hora_fim || "",
    });

    setMedicoBusca(item.medico?.funcionario?.nome || "");
    setMedicoSelecionado(item.medico?.id || null);
    setEditingIndex(index);
  }

  function deleteEntry(index) {
    const item = agendamentos[selectedKey][index];
    if (!item) return;

    AgendaService.deleteAgenda(item.id).then(() => reloadAgendas());
    resetForm();
  }

  /* ===== RENDER ===== */
  const cells = getMonthDays(currentDate);
  const monthLabel = currentDate.toLocaleString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="agenda-root">
      <h1 className="agenda-title">Agenda Mensal dos Médicos</h1>

      <div className="agenda-controls">
        <button
          className="btn"
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
            )
          }
        >
          ◀
        </button>

        <div className="month-label">{monthLabel}</div>

        <button
          className="btn"
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
            )
          }
        >
          ▶
        </button>
      </div>

      <div className="weekdays">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((w) => (
          <div key={w} className="weekday">
            {w}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {cells.map((day, idx) => {
          if (!day) return <div key={idx} className="cell empty" />;
          const key = keyFromDay(day);
          const hasAgenda = agendamentos[key]?.length > 0;

          return (
            <div key={idx} className="cell day" onClick={() => openModal(day)}>
              <div className="cell-daynum">{day}</div>
              {hasAgenda && <div className="cell-dot" />}
            </div>
          );
        })}
      </div>

      {/* ===== MODAL ===== */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2>Dia {selectedKey}</h2>

            {/* ===== LISTA DE AGENDAS ===== */}
            <div className="existing-list">
              <h3>Agendas do dia</h3>

              {agendamentos[selectedKey]?.length ? (
                agendamentos[selectedKey]
                  .filter((it) => it?.medico)
                  .map((it, i) => (
                    <div key={i} className="entry">
                      <div className="entry-main">
                        <div>
                          <strong>
                            {it.medico?.funcionario?.nome || "Médico não informado"}
                          </strong>{" "}
                          — {it.medico?.especialidade?.nome || "Sem especialidade"}
                        </div>
                        <div className="entry-times">
                          {it.hora_inicio} às {it.hora_fim}
                        </div>
                      </div>
                      <div className="entry-actions">
                        <button className="btn small" onClick={() => startEdit(i)}>
                          Editar
                        </button>
                        <button className="btn small danger" onClick={() => deleteEntry(i)}>
                          Excluir
                        </button>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="muted">Nenhuma agenda cadastrada.</p>
              )}
            </div>

            {/* ===== FORM ===== */}
            <form className="form" onSubmit={handleSubmit}>
              <h3>{editingIndex !== null ? "Editar agenda" : "Adicionar agenda"}</h3>

              <label>Médico</label>
              <input
                type="text"
                value={medicoBusca}
                onChange={(e) => {
                  setMedicoBusca(e.target.value);
                  setMostrarMedicos(true);
                }}
                onFocus={() => setMostrarMedicos(true)}
                required
              />

              {mostrarMedicos && medicoBusca && (
                <div className="dropdown">
                  {medicos
                    .filter((medico) =>
                      medico.funcionario?.nome
                        .toLowerCase()
                        .includes(medicoBusca.toLowerCase())
                    )
                    .map((medico) => (
                      <div
                        key={medico.id}
                        className="dropdown-item"
                        onClick={() => {
                          setMedicoSelecionado(medico.id);
                          setMedicoBusca(medico.funcionario.nome);
                          setMostrarMedicos(false);
                        }}
                      >
                        <strong>{medico.funcionario.nome}</strong> —{" "}
                        {medico.especialidade?.nome || "Sem especialidade"}
                      </div>
                    ))}
                </div>
              )}

              <div className="time-row">
                <div>
                  <label>Horário início</label>
                  <input
                    type="time"
                    value={form.horarioInicio}
                    onChange={(e) =>
                      setForm({ ...form, horarioInicio: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label>Horário fim</label>
                  <input
                    type="time"
                    value={form.horarioFim}
                    onChange={(e) =>
                      setForm({ ...form, horarioFim: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn primary">
                  {editingIndex !== null ? "Salvar alteração" : "Adicionar"}
                </button>
                <button type="button" className="btn" onClick={resetForm}>
                  Limpar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
