    import React, { useEffect, useState } from 'react';
    import { useLocation, useNavigate, useParams } from 'react-router-dom';
    import { FaArrowLeft } from 'react-icons/fa';
    import Navbar from '../../../components/Navbar/Navbar';
    import api from '../../../services/api';
    import './DetalhesConsulta.css';

    const statusLabel = {
    agendada: 'Agendada',
    concluida: 'Concluída',
    cancelada: 'Cancelada',
    };

    export default function DetalhesConsulta() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { id } = useParams();

    const [consulta, setConsulta] = useState(state?.consulta || null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (consulta) return;
        const buscarConsulta = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/agendamentos/${id}`);
            setConsulta(res.data);
        } catch (err) {
            console.error(err);
            setConsulta(null);
        } finally {
            setLoading(false);
        }
        };

        buscarConsulta();
    }, [id, consulta]);

    if (loading) {
        return (
        <>
            <Navbar />
            <div className="detalhes-container">
            <p>Carregando consulta...</p>
            </div>
        </>
        );
    }

    if (!consulta) {
        return (
        <>
            <Navbar />
            <div className="detalhes-container">
            <p>Consulta não encontrada.</p>
            <button onClick={() => navigate('/alamedica')}>
                Voltar
            </button>
            </div>
        </>
        );
    }

    const formatarData = (dataISO) => {
        if (!dataISO) return '-';
        const date = new Date(dataISO);
        return (
        date.toLocaleDateString('pt-BR') +
        ' ' +
        date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
        })
        );
    };

    return (
        <>
        <Navbar />
        <div className="detalhes-container">
            <button className="back-button" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Voltar
            </button>

            <h1>Detalhes da Consulta</h1>

            <div className="card-detalhes">
            <div className="item">
                <span>Paciente</span>
                <strong>{consulta.paciente?.nome || 'N/A'}</strong>
            </div>

            <div className="item">
                <span>Tipo</span>
                <strong>{consulta.tipo || consulta.motivo_consulta || '-'}</strong>
            </div>

            <div className="item">
                <span>Data e Horário</span>
                <strong>{formatarData(consulta.data)}</strong>
            </div>

            <div className="item">
                <span>Status</span>
                <strong className={`status ${consulta.status}`}>
                {statusLabel[consulta.status] || 'Agendada'}
                </strong>
            </div>
            </div>
        </div>
        </>
    );
    }