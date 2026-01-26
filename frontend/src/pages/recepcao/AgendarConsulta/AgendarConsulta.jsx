import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import { getAllEspecialidades } from '../../../services/especialidadeService';
import { DoctorsService } from '../../../services/doctors.services';
import pacienteService from '../../../services/pacienteService';
import { createAgendamento } from '../../../services/agendamentoService';
import { AgendaService } from '../../../services/agenda.service';

import './AgendarConsulta.css';

export default function AgendarConsulta() {
  const navigate = useNavigate();

  // ---------------- STATES ----------------
  const [step, setStep] = useState(1);

  const [specialties, setSpecialties] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [selectedMedico, setSelectedMedico] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const [loadingSpecialties, setLoadingSpecialties] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [loadingAgendas, setLoadingAgendas] = useState(false);
  const [loadingPatient, setLoadingPatient] = useState(false);

  const [cpfStatus, setCpfStatus] = useState('idle');

  const [paciente, setPaciente] = useState({
    id: '',
    nome: '',
    data_nascimento: '',
    cpf: '',
    telefone: '',
    email: '',
    endereco: ''
  });

  const [consultaData, setConsultaData] = useState({
    id_paciente: '',
    id_medico: '',
    id_agenda: ''
  });

  // ---------------- EFFECTS ----------------

  // Buscar especialidades
  useEffect(() => {
    if (step !== 2) return;

    (async () => {
      try {
        setLoadingSpecialties(true);
        const res = await getAllEspecialidades();
        setSpecialties(res?.data ?? res ?? []);
      } finally {
        setLoadingSpecialties(false);
      }
    })();
  }, [step]);

  // Buscar médicos por especialidade
  useEffect(() => {
    if (!selectedSpeciality) {
      setMedicos([]);
      return;
    }

    (async () => {
      try {
        setLoadingDoctors(true);
        const res = await DoctorsService.getByEspecialidade(selectedSpeciality);
        const arr = res?.data ?? res ?? [];

        setMedicos(
          arr.map(m => ({
            id: m.id,
            nome: m.funcionario?.nome || 'Médico'
          }))
        );
      } finally {
        setLoadingDoctors(false);
      }
    })();
  }, [selectedSpeciality]);

  // Buscar agendas por médico + data
  useEffect(() => {
    if (step !== 3 || !selectedMedico || !selectedDate) {
      setAvailableTimes([]);
      return;
    }

    (async () => {
      try {
        setLoadingAgendas(true);
        const res = await AgendaService.getAgendasByMedicoData(
          selectedMedico,
          selectedDate
        );
        setAvailableTimes(res?.data ?? res ?? []);
      } catch (err) {
        console.error(err);
        setAvailableTimes([]);
      } finally {
        setLoadingAgendas(false);
      }
    })();
  }, [step, selectedMedico, selectedDate]);

  // ---------------- HANDLERS ----------------

  const handleCPFInput = async (e) => {
    const cpf = e.target.value;
    setPaciente(p => ({ ...p, cpf }));

    try {
      setLoadingPatient(true);
      setCpfStatus('loading');

      const res = await pacienteService.getPatientByCPF(cpf);
      const arr = res?.data ?? res ?? [];

      if (arr.length) {
        const p = arr[0];
        setPaciente({
          id: p.id,
          nome: p.nome,
          data_nascimento: p.data_nascimento,
          cpf: p.cpf,
          telefone: p.contato,
          email: p.email || '',
          endereco: p.endereco || ''
        });

        setConsultaData(prev => ({
          ...prev,
          id_paciente: p.id
        }));

        setCpfStatus('found');
      } else {
        setCpfStatus('not-found');
      }
    } catch (err) {
      console.error(err);
      setCpfStatus('error');
    } finally {
      setLoadingPatient(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Agendamento:', consultaData);

    await createAgendamento(consultaData);
    navigate('/recepcao');
  };

  // ---------------- RENDER ----------------

  return (
    <div className="page-agendar">
      <div className="content-wrapper">
        <button
          type="button"
          className="back-button"
          onClick={() => navigate('/recepcao')}
        >
          <FaArrowLeft size={16} style={{ marginRight: 8 }} />
          Voltar
        </button>

        <h1>Agendar Consulta</h1>

        <div className="steps-indicator">
          <span className={step >= 1 ? 'active' : ''}>Paciente</span>
          <span className={step >= 2 ? 'active' : ''}>Consulta</span>
          <span className={step >= 3 ? 'active' : ''}>Horário</span>
        </div>

        <form className="form-container" onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="form-section">
              <h2>Dados do Paciente</h2>

              <div className="form-field">
                <label>CPF</label>
                <input
                  className={`cpf-input ${cpfStatus}`}
                  value={paciente.cpf}
                  onChange={handleCPFInput}
                />
                {loadingPatient && <small>Buscando...</small>}
              </div>

              <div className="form-field">
                <label>Nome</label>
                <input value={paciente.nome} disabled />
              </div>

              <button type="button" onClick={() => setStep(2)}>
                Próximo
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="form-section">
              <h2>Dados da Consulta</h2>

              <div className="form-field">
                <label>Especialidade</label>
                <select
                  value={selectedSpeciality}
                  onChange={(e) => {
                    const id = Number(e.target.value);
                    setSelectedSpeciality(id);
                    setSelectedMedico('');
                    setConsultaData(prev => ({
                      ...prev,
                      id_medico: '',
                      id_agenda: ''
                    }));
                  }}
                >
                  <option value="">Selecione</option>
                  {specialties.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label>Médico</label>
                <select
                  disabled={!selectedSpeciality}
                  value={selectedMedico}
                  onChange={(e) => {
                    const medicoId = Number(e.target.value);
                    setSelectedMedico(medicoId);
                    setConsultaData(prev => ({
                      ...prev,
                      id_medico: medicoId,
                      id_agenda: ''
                    }));
                  }}
                >
                  <option value="">Selecione</option>
                  {medicos.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-nav">
                <button type="button" onClick={() => setStep(1)}>
                  Voltar
                </button>
                <button type="button" onClick={() => setStep(3)}>
                  Próximo
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-section">
              <h2>Horário</h2>

              <div className="form-field">
                <label>Data</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label>Horário</label>
                <select
                  value={consultaData.id_agenda}
                  onChange={(e) =>
                    setConsultaData(prev => ({
                      ...prev,
                      id_agenda: Number(e.target.value)
                    }))
                  }
                >
                  <option value="">Selecione</option>
                  {availableTimes.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.hora_inicio}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-nav">
                <button type="button" onClick={() => setStep(2)}>
                  Voltar
                </button>
                <button type="submit">Agendar</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
