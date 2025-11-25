import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import Card from '../../../components/EmployeeCard/EmployeeCard';
import FloatingButton from '../../../components/FloatingButton/FloatingButton';
import './DashboardAlaMedica.css';
import { FaCalendarAlt, FaUserInjured, FaNotesMedical, FaPrescriptionBottleAlt } from 'react-icons/fa';

export default function DashboardMedico() {
  const navigate = useNavigate();

  const cards = [
    { id: 'agenda', title: 'Minha Agenda', subtitle: 'Ver/gerenciar horários', icon: <FaCalendarAlt />, path: '/medico/agenda' },
    { id: 'pacientes', title: 'Pacientes', subtitle: 'Buscar e abrir prontuário', icon: <FaUserInjured />, path: '/medico/pacientes' },
    { id: 'prontuario', title: 'Prontuários', subtitle: 'Registrar atendimentos', icon: <FaNotesMedical />, path: '/alamedica/prontuario' },
    { id: 'receitas', title: 'Receitas', subtitle: 'Gerar e enviar prescrições', icon: <FaPrescriptionBottleAlt />, path: '/medico/receitas' },
  ];

  return (
    <>
      <Navbar />
      <main className="med-dashboard">
        <section className="hero">
          <div className="hero-left">
            <h1>Área do Médico</h1>
            <p>Seu painel rápido para acessar agenda, pacientes e prontuários.</p>
          </div>
          <div className="hero-image" aria-hidden />
        </section>

        <section className="cards-grid">
          {cards.map(c => (
            <div key={c.id} className="card" onClick={() => navigate(c.path)} role="button" tabIndex={0} onKeyDown={() => navigate(c.path)}>
              <div className="card-icon" aria-hidden="true">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.subtitle}</p>
              <button className="card-btn card-link" onClick={(e) => { e.stopPropagation(); navigate(c.path); }}>Abrir</button>
            </div>
          ))}
        </section>

        <FloatingButton to="/medico/novo-registro" aria-label="Novo" />
      </main>
    </>
  );
}
