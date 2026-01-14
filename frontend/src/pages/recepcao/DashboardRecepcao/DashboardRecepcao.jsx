import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardRecepcao.css';
import '../../Admin/Dashboard/DashboardAdmin.css';
import { FaCalendarAlt, FaUserInjured, FaNotesMedical, FaUserPlus, FaUserEdit, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import Navbar from '../../../components/Navbar/Navbar';

const Recepcao = () => {
  return (
    <>
      <Navbar />
    <div className="page-recepcao">
      <div className="content-wrapper">
        <h1>Recepção</h1>
        <div className="cards">
            <div className="card">
              <div className="card-icon" aria-hidden="true"><FaUserPlus size={90} /></div>
              <h3>Cadastrar Paciente</h3>
              <p>Registrar um novo paciente no sistema.</p>
              <Link to="/recepcao/cadastrar-paciente" className="card-btn card-link">Cadastrar</Link>
            </div>

            <div className="card">
              <div className="card-icon" aria-hidden="true"><FaUserEdit size={90} /></div>
              <h3>Editar Paciente</h3>
              <p>Alterar dados de um paciente existente.</p>
              <Link to="/recepcao/editar-paciente" className="card-btn card-link">Editar</Link>
            </div>

            <div className="card">
              <div className="card-icon" aria-hidden="true"><FaUsers size={90} /></div>
              <h3>Visualizar Pacientes</h3>
              <p>Ver lista de pacientes cadastrados.</p>
              <Link to="/recepcao/pacientes" className="card-btn card-link">Ver Pacientes</Link>
            </div>

            <div className="card">
              <div className="card-icon" aria-hidden="true"><FaUserInjured size={90} /></div>
              <h3>Agendar Consultas</h3>
              <p>Agendar uma nova consulta.</p>
              <Link to="/recepcao/agendar" className="card-btn card-link">Agendar</Link>
            </div>

          <div className="card">
            <div className="card-icon" aria-hidden="true"><FaCalendarAlt size={90} /></div>
            <h3>Visualizar Consultas</h3>
            <p>Visualizar consultas agendadas.</p>
            <Link to="/consultas" className="card-btn card-link">Ver Consultas</Link>
          </div>

          <div className="card">
            <div className="card-icon" aria-hidden="true"><FaNotesMedical size={90} /></div>
            <h3>Agenda</h3>
            <p>Visualizar ou editar a agenda mensal.</p>
            <Link to="/recepcao/VisualizarAgenda" className="card-btn card-link">Visualizar agenda</Link>
          </div>

          <div className="card">
            <div className="card-icon" aria-hidden="true"><FaCalendarAlt size={90} /></div>
            <h3>Editar Agenda</h3>
            <p>Edição mensal da agenda.</p>
            <Link to="/recepcao/EditarAgenda" className="card-btn card-link">Editar agenda mensal</Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Recepcao;
