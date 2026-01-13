// src/pages/AgendarConsulta/AgendarConsulta.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { getAllEspecialidades } from '../../../services/especialidadeService';
import { getDoctorByEspecialidadeId } from '../../../services/doctors.services';
import { getPatientByCPF, criarPaciente, editarPaciente } from '../../../services/pacienteService';
import { createAgendamento } from '../../../services/agendamentoService';
import './AgendarConsulta.css';

export default function AgendarConsulta() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    id: null,
    fullName: '',
    birthDate: '',
    cpf: '',
    phone: '',
    email: '',
    endereco: ''
  });

  const [consultaData, setConsultaData] = useState({
    cardNumber: '',
    specialtyId: '',
    doctorId: '',
    consultationType: 'primeira',
    date: '',
    period: '',
    time: '',
    observations: ''
  });

  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loadingSpecialties, setLoadingSpecialties] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [cpfStatus, setCpfStatus] = useState('idle');
  const [loadingPatient, setLoadingPatient] = useState(false);
  const cpfDebounceRef = useRef(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [newPatientForm, setNewPatientForm] = useState({
    fullName: '',
    cpf: '',
    birthDate: '',
    address: '',
    phone: '',
    email: ''
  });

  const [editPatientForm, setEditPatientForm] = useState({
    fullName: '',
    cpf: '',
    birthDate: '',
    address: '',
    phone: '',
    email: ''
  });

  const [editingPatientId, setEditingPatientId] = useState(null);

  const normalizeCPF = (cpf) => (cpf || '').replace(/\D/g, '');

  useEffect(() => {
    (async () => {
      setLoadingSpecialties(true);
      const res = await getAllEspecialidades();
      setSpecialties(res?.data ?? res ?? []);
      setLoadingSpecialties(false);
    })();
  }, []);

  useEffect(() => {
    const id = consultaData.specialtyId;
    setDoctors([]);
    setConsultaData((p) => ({ ...p, doctorId: '' }));
    if (!id) return;

    (async () => {
      setLoadingDoctors(true);
      const res = await getDoctorByEspecialidadeId(id);
      const arr = res?.data ?? res ?? [];
      setDoctors(arr.map((m) => ({ id: m.id, nome: m.nome || 'Médico' })));
      setLoadingDoctors(false);
    })();
  }, [consultaData.specialtyId]);

  const searchPatient = async (cpf) => {
    setLoadingPatient(true);
    const res = await getPatientByCPF(cpf);
    const arr = res?.data ?? res ?? [];
    if (arr.length) {
      const p = arr[0];
      setFormData({
        id: p.id,
        fullName: p.nome,
        birthDate: p.data_nascimento,
        cpf: p.cpf,
        phone: p.contato,
        email: p.email || '',
        endereco: p.endereco || ''
      });
      setCpfStatus('found');
    } else {
      setCpfStatus('not_found');
    }
    setLoadingPatient(false);
  };

  const handleCPFInput = (e) => {
    const value = e.target.value;
    setFormData((p) => ({ ...p, cpf: value }));
    if (cpfDebounceRef.current) clearTimeout(cpfDebounceRef.current);
    cpfDebounceRef.current = setTimeout(() => {
      const raw = normalizeCPF(value);
      if (raw.length === 11) searchPatient(raw);
      else setCpfStatus('idle');
    }, 400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pacienteId = formData.id || (await criarPaciente({
      nome: formData.fullName,
      cpf: normalizeCPF(formData.cpf),
      data_nascimento: formData.birthDate,
      contato: formData.phone,
      endereco: formData.endereco
    })).data.id;

    await createAgendamento({
      id_paciente: pacienteId,
      id_medico: consultaData.doctorId,
      data: new Date(`${consultaData.date}T${consultaData.time}:00`).toISOString(),
      motivo_consulta: consultaData.observations,
      status: 'agendada'
    });

    alert('Consulta agendada com sucesso!');
    navigate('/recepcao');
  };

  const getTimeSlots = (period) => {
    const cfg = { manha: [8, 12], tarde: [13, 17], noite: [18, 21] };
    if (!cfg[period]) return [];
    const [s, e] = cfg[period];
    const r = [];
    for (let h = s; h < e; h++) for (let m = 0; m < 60; m += 30)
      r.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    return r;
  };

  return (
    <div className="page-agendar">
      <div className="content-wrapper">
        <button type="button" className="back-button" onClick={() => navigate('/recepcao')} aria-label="Voltar para Recepção">
          <FaArrowLeft size={16} style={{ marginRight: 8 }} /> Voltar
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
                  value={formData.cpf}
                  onChange={handleCPFInput}
                />
                {loadingPatient && <small>Buscando...</small>}
              </div>

              <div className="form-field">
                <label>Nome</label>
                <input value={formData.fullName} onChange={(e) => setFormData(p => ({ ...p, fullName: e.target.value }))} />
              </div>

              <button type="button" onClick={() => setStep(2)}>Próximo</button>
            </div>
          )}

          {step === 2 && (
            <div className="form-section">
              <h2>Dados da Consulta</h2>

              <div className="form-field">
                <label>Especialidade</label>
                <select value={consultaData.specialtyId} onChange={(e) => setConsultaData(p => ({ ...p, specialtyId: e.target.value }))}>
                  <option value="">Selecione</option>
                  {specialties.map(s => <option key={s.id} value={s.id}>{s.nome}</option>)}
                </select>
              </div>

              <div className="form-field">
                <label>Médico</label>
                <select disabled={!consultaData.specialtyId} value={consultaData.doctorId} onChange={(e) => setConsultaData(p => ({ ...p, doctorId: e.target.value }))}>
                  <option value="">Selecione</option>
                  {doctors.map(d => <option key={d.id} value={d.id}>{d.nome}</option>)}
                </select>
              </div>

              <div className="form-nav">
                <button type="button" onClick={() => setStep(1)}>Voltar</button>
                <button type="button" onClick={() => setStep(3)}>Próximo</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-section">
              <h2>Horário</h2>

              <div className="form-field">
                <label>Data</label>
                <input type="date" value={consultaData.date} onChange={(e) => setConsultaData(p => ({ ...p, date: e.target.value }))} />
              </div>

              <div className="form-field">
                <label>Período</label>
                <select value={consultaData.period} onChange={(e) => setConsultaData(p => ({ ...p, period: e.target.value }))}>
                  <option value="">Selecione</option>
                  <option value="manha">Manhã</option>
                  <option value="tarde">Tarde</option>
                  <option value="noite">Noite</option>
                </select>
              </div>

              <div className="form-field">
                <label>Horário</label>
                <select value={consultaData.time} onChange={(e) => setConsultaData(p => ({ ...p, time: e.target.value }))}>
                  <option value="">Selecione</option>
                  {getTimeSlots(consultaData.period).map(t => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div className="form-nav">
                <button type="button" onClick={() => setStep(2)}>Voltar</button>
                <button type="submit">Agendar</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
