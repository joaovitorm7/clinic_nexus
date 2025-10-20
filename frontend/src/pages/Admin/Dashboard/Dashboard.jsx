import React from "react";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="text-section">
          <h1>Bem-vindo à Clínica Nexus</h1>
          <p>Gerencie funcionários, consultas e pacientes de forma moderna e eficiente.</p>
        </div>

        <div className="image-section">
          <img src="/images/dashboard-illustration.png" alt="Saúde e Tecnologia" />
        </div>
      </div>
    </div>
  );
}
