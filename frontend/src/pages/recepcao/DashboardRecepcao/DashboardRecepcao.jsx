// src/pages/Recepcao/Recepcao.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardRecepcao.css';

const Recepcao = () => {
  return (
    <div className="page-recepcao">
      <div className="content-wrapper">
        <h1>Recepção</h1>
        <div className="links-container">
          <Link to="/consultas" className="link-card">
            Visualizar Consultas
          </Link>
          <Link to="/recepcao/agendar" className="link-card">
            Agendar Consulta
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Recepcao;
