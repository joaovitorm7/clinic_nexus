import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardRecepcao.css';
import { FaCalendarAlt, FaUserInjured, FaNotesMedical } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import Navbar from '../../../components/Navbar/Navbar';

const Recepcao = () => {
  return (
    <>
      <Navbar />
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
          <Link to="#" className="link-card">
            Visualizar agenda
          </Link>
          <Link to="/recepcao/EditarAgenda" className="link-card">
            Editar agenda mensal
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default Recepcao;
