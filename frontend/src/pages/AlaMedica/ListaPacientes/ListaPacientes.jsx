import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import agendamentoService from '../../../services/agendamentoService';
import { FaArrowLeft } from 'react-icons/fa';
import './ListaPacientes.css';

export default function ListaPacientes() {
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPacientes = async () => {
            setLoading(true);
            try {
                const consultas = await agendamentoService.getMinhasConsultas();
                
                const uniquePatientsMap = new Map();
                consultas.forEach(consulta => {
                    if (consulta.paciente && !uniquePatientsMap.has(consulta.paciente.id)) {
                        uniquePatientsMap.set(consulta.paciente.id, consulta.paciente);
                    }
                });
                
                const uniquePatients = Array.from(uniquePatientsMap.values());

                setPacientes(uniquePatients);
            } catch (err) {
                setError('Erro ao carregar pacientes.');
                console.error("Erro ao carregar pacientes:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPacientes();
    }, []);

    const handleNavigateToPaciente = (pacienteId) => {
        navigate(`/medico/pacientes/${pacienteId}`);
    };

    if (loading) return <div className="loading">Carregando...</div>;

    return (
        <div className="page-pacientes">
            <div className="page-header">
                <button
                    type="button"
                    className="back-button"
                    onClick={() => navigate('/alamedica')}
                    aria-label="Voltar para Ala Médica"
                >
                    <FaArrowLeft size={18} style={{ marginRight: 8 }} /> Voltar
                </button>

                <h1>Pacientes Atendidos</h1>
            </div>
            
            {error && <p className="error-message">{error}</p>}
            
            <div className="patients-grid">
                {pacientes.length === 0 ? (
                    <p className="no-patients">Nenhum paciente encontrado.</p>
                ) : (
                    pacientes.map(paciente => (
                        <div 
                            key={paciente.id} 
                            className="patient-card"
                            onClick={() => handleNavigateToPaciente(paciente.id)}
                        >
                            <div className="patient-info">
                                <h3>{paciente.nome}</h3>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}