import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { getAllEspecialidades } from '../../../services/especialidadeService';
import { DoctorsService } from '../../../services/doctors.services';
import { getPatientByCPF, criarPaciente } from '../../../services/pacienteService';
import { createAgendamento } from '../../../services/agendamentoService';
import { AgendaService } from '../../../services/agenda.service.js';
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
    specialtyId: '',
    doctorId: '',
    date: '',
    time: '',
    agendaId: null,
    observations: ''
  });

  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loadingSpecialties, setLoadingSpecialties] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [loadingTimes, setLoadingTimes] = useState(false);
  const [cpfStatus, setCpfStatus] = useState('idle');
  const [loadingPatient, setLoadingPatient] = useState(false);
  const cpfDebounceRef = useRef(null);

  const normalizeCPF = (cpf) => (cpf || '').replace(/\D/g, '');





  // Busca especialidades
  useEffect(() => {
    (async () => {
      setLoadingSpecialties(true);
      const res = await getAllEspecialidades();
      setSpecialties(res?.data ?? res ?? []);
      setLoadingSpecialties(false);
    })();
  }, []);

  // Busca médicos ao selecionar especialidade
  useEffect(() => {
    const id = consultaData.specialtyId;
    setDoctors([]);
    setConsultaData(p => ({ ...p, doctorId: '', time: '' }));
    setAvailableTimes([]);
    if (!id) return;

    (async () => {
      setLoadingDoctors(true);
      const res = await DoctorsService.getByEspecialidade(id);
      const arr = res?.data ?? res ?? [];
      setDoctors(arr.map((m) => ({ id: m.id, nome: m.funcionario?.nome || 'Médico' })));
      setLoadingDoctors(false);
    })();
  }, [consultaData.specialtyId]);

  // Busca horários disponíveis do médico na data selecionada
  useEffect(() => {
    const { doctorId, date } = consultaData;
    setAvailableTimes([]);
    if (!doctorId || !date) return;

    (async () => {
      try {
        setLoadingTimes(true);
        const key = date.split('-').reverse().join('-'); 
        const agendas = await AgendaService.getAgendasByMedico(doctorId);
        const dayAgendas = agendas.filter(a => a.data === date); 
        // horários ocupados
        const occupied = dayAgendas.map(a => a.hora_inicio);
        // horários disponíveis (exemplo: backend retorna horários livres)
        const times = dayAgendas.map(a => a.hora_inicio); // adapte conforme API
        setAvailableTimes(times);
      } catch (err) {
        console.error('Erro ao buscar horários:', err);
      } finally {
        setLoadingTimes(false);
      }
    })();
  }, [consultaData.doctorId, consultaData.date]);

const fetchAgendaId = async (doctorId, time) => {
  if (!doctorId || !time) return;

  try {
    const res = await AgendaService.getAgendaIdByMedicoAndHora(
      Number(doctorId),
      time
    );

    setConsultaData(p => ({
      ...p,
      agendaId: res.id
    }));
  } catch (err) {
    console.error('Erro ao buscar id da agenda', err);
    setConsultaData(p => ({
      ...p,
      agendaId: null
    }));
  }
};


useEffect(() => {
  if (consultaData.doctorId && consultaData.time) {
    fetchAgendaId(consultaData.doctorId, consultaData.time);
  }
}, [consultaData.doctorId, consultaData.time]);
  

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
    setFormData(p => ({ ...p, cpf: value }));
    if (cpfDebounceRef.current) clearTimeout(cpfDebounceRef.current);
    cpfDebounceRef.current = setTimeout(() => {
      const raw = normalizeCPF(value);
      if (raw.length === 11) searchPatient(raw);
      else setCpfStatus('idle');
    }, 400);
  };

  
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!consultaData.date || !consultaData.time) {
    alert('Selecione data e horário válidos');
    return;
  }

  if (!consultaData.doctorId) {
    alert('Selecione um médico');
    return;
  }

  // Cria paciente se necessário
  const pacienteId = formData.id || (await criarPaciente({
    nome: formData.fullName,
    cpf: normalizeCPF(formData.cpf),
    data_nascimento: formData.birthDate,
    contato: formData.phone,
    endereco: formData.endereco
  })).data.id;

  // monta payload com horário direto do select
  const [hour, minute] = consultaData.time.split(':').map(Number);
  const dateParts = consultaData.date.split('-'); // YYYY-MM-DD esperado
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1; // JS meses 0-11
  const day = parseInt(dateParts[2]);

  const dateObj = new Date(year, month, day, hour, minute);

  if (isNaN(dateObj.getTime())) {
    alert('Data ou horário inválido');
    return;
  }

;

await createAgendamento({
  id_paciente: pacienteId,
  id_medico: Number(consultaData.doctorId), 
  id_agenda: consultaData.agendaId ? Number(consultaData.agendaId) : undefined,
  data: dateObj.toISOString(),
  motivo_consulta: consultaData.observations,
  status: 'agendada'
});

  alert('Consulta agendada com sucesso!');
  navigate('/recepcao');
};

  return (
    <div className="page-agendar">
      <div className="content-wrapper">
        <button type="button" className="back-button" onClick={() => navigate('/recepcao')}>
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
                <input className={`cpf-input ${cpfStatus}`} value={formData.cpf} onChange={handleCPFInput} />
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
                <label>Horário</label>
                <select value={consultaData.time} onChange={(e) => setConsultaData(p => ({ ...p, time: e.target.value }))}>
                  <option value="">Selecione</option>
                  {loadingTimes && <option>Carregando...</option>}
                  {!loadingTimes && availableTimes.map(t => <option key={t}>{t}</option>)}
                  {!loadingTimes && availableTimes.length === 0 && <option>Nenhum horário disponível</option>}
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
