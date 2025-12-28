import React, { useEffect, useState } from "react";
import "./EditarAgenda.css";
import "../CadastroPaciente/CadastrarPaciente.jsx"
/* ===== MOCK (migrations) ===== */

const ESPECIALIDADES = [
  { id: 1, nome: "Cardiologia" },
  { id: 2, nome: "Dermatologia" },
  { id: 3, nome: "Pediatria" },
  { id: 4, nome: "Ortopedia" },
];

const MEDICOS = [
  { id: 1, nome: "Dr. House", crm: "CRM-1001", especialidadeId: 1 },
  { id: 2, nome: "Dr. Who", crm: "CRM-1002", especialidadeId: 2 },
  { id: 3, nome: "Dra. Meredith Gey", crm: "CRM-1003", especialidadeId: 3 },
  { id: 4, nome: "Dr. Shaum Murphy", crm: "CRM-1004", especialidadeId: 4 },
];

export default function AgendaMensalMedicos() {
  /* ===== STATE ===== */

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedKey, setSelectedKey] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [agendamentos, setAgendamentos] = useState(() => {
    try {
      const raw = localStorage.getItem("agendaMedicos_v1");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

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

  /* ===== SALVAR SEMPRE ===== */

  useEffect(() => {
    localStorage.setItem(
      "agendaMedicos_v1",
      JSON.stringify(agendamentos)
    );
  }, [agendamentos]);

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

  function handleSubmit(e) {
    e.preventDefault();

    const novo = {
      medico: form.medico,
      especialidade: form.especialidade,
      horarios: gerarIntervalos(form.horarioInicio, form.horarioFim),
    };

    setAgendamentos((prev) => {
      const list = [...(prev[selectedKey] || [])];

      if (editingIndex !== null) {
        list[editingIndex] = novo; // ✏️ EDITAR
      } else {
        list.push(novo); // ➕ ADICIONAR
      }

      return { ...prev, [selectedKey]: list };
    });

    resetForm();
  }

  function startEdit(index) {
    const item = agendamentos[selectedKey][index];

    setForm({
      medico: item.medico,
      especialidade: item.especialidade,
      horarioInicio: item.horarios[0] || "",
      horarioFim: "",
    });

    setMedicoBusca(item.medico);
    setEditingIndex(index);
  }

  function deleteEntry(index) {
    setAgendamentos((prev) => {
      const list = [...(prev[selectedKey] || [])];
      list.splice(index, 1);

      const copy = { ...prev };
      if (list.length === 0) delete copy[selectedKey];
      else copy[selectedKey] = list;

      return copy;
    });

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
        <button className="btn" onClick={() =>
          setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
        }>◀</button>

        <div className="month-label">{monthLabel}</div>

        <button className="btn" onClick={() =>
          setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
        }>▶</button>
      </div>

      <div className="weekdays">
        {["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"].map(w => (
          <div key={w} className="weekday">{w}</div>
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
                agendamentos[selectedKey].map((it, i) => (
                  <div key={i} className="entry">
                    <div className="entry-main">
                      <div><strong>{it.medico}</strong> — {it.especialidade}</div>
                      <div className="entry-times">{it.horarios.join(", ")}</div>
                    </div>
                    <div className="entry-actions">
                      <button className="btn small" onClick={() => startEdit(i)}>Editar</button>
                      <button className="btn small danger" onClick={() => deleteEntry(i)}>Excluir</button>
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
                  {MEDICOS.filter(m =>
                    m.nome.toLowerCase().includes(medicoBusca.toLowerCase())
                  ).map(m => {
                    const esp = ESPECIALIDADES.find(e => e.id === m.especialidadeId);
                    return (
                      <div
                        key={m.id}
                        className="dropdown-item"
                        onClick={() => {
                          setForm({ ...form, medico: m.nome, especialidade: esp.nome });
                          setMedicoBusca(m.nome);
                          setMostrarMedicos(false);
                        }}
                      >
                        <strong>{m.nome}</strong> — {esp.nome}
                      </div>
                    );
                  })}
                </div>
              )}

              <label>Especialidade</label>
              <div
                className="drawer-select"
                onClick={() => setMostrarEspecialidades(!mostrarEspecialidades)}
              >
                {form.especialidade || "Selecionar especialidade"}
              </div>

              {mostrarEspecialidades && (
                <div className="drawer">
                  {ESPECIALIDADES.map(e => (
                    <div
                      key={e.id}
                      className="drawer-item"
                      onClick={() => {
                        setForm({ ...form, especialidade: e.nome });
                        setMostrarEspecialidades(false);
                      }}
                    >
                      {e.nome}
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
