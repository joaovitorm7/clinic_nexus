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
        <div className="cards-grid">
          {[
            {
              id: 'agendar',
              title: 'Agendar Consulta',
              subtitle: 'Criar novo agendamento',
              icon: <FaCalendarAlt size={40} />,
              path: '/recepcao/agendar'
            },
            {
              id: 'visualizar-consultas',
              title: 'Visualizar Consultas',
              subtitle: 'Editar / Gerenciar consultas',
              icon: <FaNotesMedical size={40} />,
              path: '/consultas'
            },
            {
              id: 'cadastrar-paciente',
              title: 'Cadastrar Paciente',
              subtitle: 'Novo paciente no sistema',
              icon: <FaUserInjured size={40} />,
              path: '/recepcao/pacientes/novo'
            },
            {
              id: 'visualizar-pacientes',
              title: 'Visualizar Pacientes',
              subtitle: 'Editar / Desativar pacientes',
              icon: <FaUserInjured size={40} />,
              path: '/recepcao/pacientes'
            }
          ].map(c => (
            <div key={c.id} className="card" onClick={() => window.location.href = c.path} role="button" tabIndex={0} style={{ cursor: 'pointer' }}>
              <div className="card-icon" aria-hidden="true">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.subtitle}</p>
              <button className="card-btn card-link" onClick={(e) => { e.stopPropagation(); window.location.href = c.path; }}>Abrir</button>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Recepcao;
