import React from "react";
import "./DashboardAdmin.css";
import { FaUserAlt, FaUserMd, FaCalendarCheck } from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="text-section">
          <h1>Painel Administrativo</h1>
          <p>Gerencie funcionários, consultas e pacientes de forma moderna e eficiente.</p>
        </div>

        <div className="cards">
          <div className="card">
            <div className="card-icon" aria-hidden="true"><FaUserAlt size={90} /></div>
            <h3>Médicos</h3>
            <p>Gerencie os médicos cadastrados na clínica.</p>
            <button className="card-btn">Ver médicos</button>
          </div>

          <div className="card">
            <div className="card-icon" aria-hidden="true"><FaUserMd size={90} /></div>
            <h3>Funcionários</h3>
            <p>Cadastre novos funcionarios no sistema, gerencie e visualize dados.</p>
            <button className="card-btn">Ver funcionários</button>
          </div>

          <div className="card">
            <div className="card-icon" aria-hidden="true"><FaCalendarCheck size={90} /></div>
            <h3>Consultas</h3>
            <p>Veja as consultas agendadas na clínica e os detalhes das consultas.</p>
            <button className="card-btn">Ver consultas</button>
          </div>
        </div>
      </div>
    </div>
  );
}
