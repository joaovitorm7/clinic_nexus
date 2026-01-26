import React, { useEffect, useState } from 'react';
import api from '../../../services/api'; // ou use pacienteService
import './VisualizarPacientes.css';
import { useNavigate } from 'react-router-dom';
import  pacienteService  from '../../../services/pacienteService';
import { FaPencilAlt, FaArrowLeft } from 'react-icons/fa';

export default function VisualizarPacientes() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const patientsList = await pacienteService.getAll();
        setPatients(patientsList);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleEdit = (id) => navigate(`/recepcao/editar-paciente?id=${id}`);
  const handleDeactivate = async (id) => {
    if (!confirm('Deseja desativar esse paciente?')) return;
    try {
      await api.patch(`/pacientes/${id}/deactivate`); // ou endpoint que você tiver
      setPatients(prev => prev.filter(p => p.id !== id)); // ou recarregar
    } catch (err) {
      console.error(err);
      alert('Falha ao desativar paciente.');
    }
  };

  if (loading) return <div className="loading">Carregando...</div>;

  return (
    <div className="page-pacientes">
      <div className="page-header">

        <button
          type="button"
          className="back-button"
          onClick={() => navigate('/recepcao')}
          aria-label="Voltar para Recepção"
        >
          <FaArrowLeft size={18} style={{ marginRight: 8 }} /> Voltar
        </button>

        <h1>Pacientes</h1>
      </div>
      <div className="patients-grid">
        {patients.length === 0 ? (
          <p className="no-patients">Nenhum paciente cadastrado.</p>
        ) : (
          patients.map(p => (
            <div key={p.id} className="patient-card">
              <button
                className="edit-icon-btn"
                onClick={() => handleEdit(p.id)}
                title="Editar paciente"
              >
                <FaPencilAlt size={18} />
              </button>

              {/* Informações do paciente */}
              <div className="patient-info">
                <h3>{p.nome}</h3>
                <p><strong>CPF:</strong> {p.cpf}</p>
                <p><strong>Contato:</strong> {p.contato}</p>
                <p><strong>Data de Nascimento:</strong> {p.dataNascimento || 'N/A'}</p>
              </div>

              {/* Botão de desativar (ou remover) */}
              <button
                className="deactivate-btn"
                onClick={() => handleDeactivate(p.id)}
              >
                Desativar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}