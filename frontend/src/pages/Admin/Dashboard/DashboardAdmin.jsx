import React from "react";
import "./DashboardAdmin.css";
import { Link } from "react-router-dom";
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
            <Link to="/medicos" className="card-btn card-link">Ver médicos</Link>
          </div>

          <div className="card">
            <div className="card-icon" aria-hidden="true"><FaUserMd size={90} /></div>
            <h3>Funcionários</h3>
            <p>Cadastre novos funcionarios no sistema, gerencie e visualize dados.</p>
            <Link to="/funcionarios" className="card-btn card-link">Ver funcionários</Link>
          </div>

          <div className="card">
            <div className="card-icon" aria-hidden="true"><FaCalendarCheck size={90} /></div>
            <h3>Consultas</h3>
            <p>Veja as consultas agendadas na clínica e os detalhes das consultas.</p>
            <Link to="/consultas" className="card-btn card-link">Ver Consultas</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
