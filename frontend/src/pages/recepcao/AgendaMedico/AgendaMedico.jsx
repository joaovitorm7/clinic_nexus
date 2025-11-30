import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import agendamentoService from "../../../services/agendamentoService";
export default function AgendaMedico() {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);

  async function fetchAgendamentos(startStr, endStr) {
    try {
      const start = startStr.slice(0, 10);
      const end = endStr.slice(0, 10);

      const res = await fetch(
      );
      const data = await res.json();

      const formatted = data.map((a) => ({
        id: a.id,
        title: a.titulo ?? "Agendamento",
        date: a.data 
      }));

      setEvents(formatted);
    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error);
    }
  }

  function handleDatesSet(info) {
    console.log("=== DatesSet disparado ===");
    console.log("info.startStr:", info.startStr);
    console.log("info.endStr:", info.endStr);
    fetchAgendamentos(info.startStr, info.endStr);
  }

  return (
    <div style={{ padding: 20 }}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        datesSet={handleDatesSet} 
        height="90vh"
      />
    </div>
  );
}
