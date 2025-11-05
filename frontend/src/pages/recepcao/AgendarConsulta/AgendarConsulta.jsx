import { useState, useEffect } from 'react';
import { createAgendamento } from '../../../services/agendamentoService';
import { getPatientByCPF, criarPaciente } from '../../../services/pacienteService';
import api from '../../../services/api';
import './AgendarConsulta.css';
import { useNavigate } from "react-router-dom";

const AgendarConsulta = () => {
  const navigate = useNavigate();

  const [patientType, setPatientType] = useState('new');
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    cpf: '',
    phone: '',
    email: '',
    id: null
  });

  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loadingSpecialties, setLoadingSpecialties] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);

  const [consultaData, setConsultaData] = useState({
    cardNumber: '',
    specialtyId: '',
    doctorId: '',
    consultationType: '',
    date: '',
    period: '',
    time: '',
    observations: '',
  });

  // --- Funções para paciente ---
  const handlePatientTypeChange = (e) => {
    const type = e.target.value;
    setPatientType(type);
    if (type === 'new') {
      setFormData({ fullName: '', birthDate: '', cpf: '', phone: '', email: '', id: null });
    }
  };

const handleCPFSearch = async (cpf) => {
  try {
    const response = await getPatientByCPF(cpf);
    if (response?.data && response.data.length > 0) {
      const paciente = response.data[0]; // pegando o primeiro paciente
      setFormData({
        id: paciente.id,
        fullName: paciente.nome,
        birthDate: paciente.dataNascimento,
        cpf: paciente.cpf,
        phone: paciente.contato,
        email: paciente.contato, // se quiser separar email
      });
    }
  } catch (error) {
    console.error('Erro ao buscar paciente:', error);
  }
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'cpf' && patientType === 'existing' && value.length === 11) {
      handleCPFSearch(value);
    }
  };

  const handleConsultaChange = (e) => {
    const { name, value } = e.target;
    setConsultaData((prev) => ({ ...prev, [name]: value }));
  };

  function getTimeSlots(period) {
    if (!period) return [];
    const slots = [];
    const config = { manha: [8, 12], tarde: [13, 17], noite: [18, 21] };
    const [startHour, endHour] = config[period] || [];
    for (let h = startHour; h < endHour; h++) {
      for (let m = 0; m < 60; m += 30) {
        slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
      }
    }
    return slots;
  }

  useEffect(() => {
    const loadSpecialties = async () => {
      try {
        setLoadingSpecialties(true);
        const res = await api.get('/especialidades');
        setSpecialties(res.data);
      } catch (err) {
        console.error('Erro ao carregar especialidades:', err);
      } finally {
        setLoadingSpecialties(false);
      }
    };
    loadSpecialties();
  }, []);

  useEffect(() => {
    if (!consultaData.specialtyId) {
      setDoctors([]);
      return;
    }
    const loadDoctors = async () => {
      try {
        setLoadingDoctors(true);
        const res = await api.get(`/medicos/especialidade/${consultaData.specialtyId}`);
        setDoctors(res.data);
      } catch (err) {
        console.error('Erro ao carregar médicos:', err);
      } finally {
        setLoadingDoctors(false);
      }
    };
    loadDoctors();
  }, [consultaData.specialtyId]);


const handleSubmit = async (e) => {
  e.preventDefault();

  let pacienteId = formData.id;

  try {
    if (patientType === 'new') {
      const novoPaciente = await criarPaciente({
        nome: formData.fullName,
        cpf: formData.cpf,
        dataNascimento: formData.birthDate, 
        contato: formData.phone,
      });
      pacienteId = novoPaciente.id;
    }

    const payload = {
      id_paciente: pacienteId,
      id_medico: consultaData.doctorId ? Number(consultaData.doctorId) : undefined,
      especialidade: consultaData.specialtyId
        ? specialties.find(s => s.id == consultaData.specialtyId)?.nome
        : undefined,
      data: new Date(`${consultaData.date}T${consultaData.time}:00`).toISOString(),
      motivo_consulta: consultaData.observations || undefined,
      status: 'agendada',
    };

    await createAgendamento(payload);
    alert('Consulta agendada com sucesso!');
    navigate('/recepcao');

  } catch (error) {
    console.error('Erro no agendamento:', error.response?.data || error);
    alert('Falha ao agendar consulta.');
  }
};


  return (
    <div className="page-agendar">
      <div className="content-wrapper">
        <h1>Agendar Consulta</h1>

        <div className="form-container">
          <form onSubmit={handleSubmit}>

            {/* Dados do paciente */}
            <div className="form-section">
              <h2>Dados do Paciente</h2>
              <div className="patient-type">
                <label className="radio-label">
                  <input type="radio" name="patientType" value="new"
                    checked={patientType === 'new'}
                    onChange={handlePatientTypeChange} />
                  <span>Novo Paciente</span>
                </label>

                <label className="radio-label">
                  <input type="radio" name="patientType" value="existing"
                    checked={patientType === 'existing'}
                    onChange={handlePatientTypeChange} />
                  <span>Paciente Cadastrado</span>
                </label>
              </div>

              <div className="fields-group">
                <div className="form-field">
                  <label>Nome Completo</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    readOnly={patientType === 'existing'}
                  />
                </div>
                <div className="form-field">
                  <label>Data de Nascimento</label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    readOnly={patientType === 'existing'}
                  />
                </div>
                <div className="form-field">
                  <label>CPF</label>
                  <input type="text" name="cpf" value={formData.cpf} onChange={handleInputChange} />
                </div>
                <div className="form-field">
                  <label>Telefone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    readOnly={patientType === 'existing'}
                  />
                </div>
                <div className="form-field">
                  <label>E-mail</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    readOnly={patientType === 'existing'}
                  />
                </div>
              </div>
            </div>

            {/* Dados da consulta */}
            <div className="form-section">
              <h2>Dados da Consulta</h2>
              <div className="fields-group">
                <div className="form-field">
                  <label>Nº Carteirinha</label>
                  <input type="text" name="cardNumber"
                    value={consultaData.cardNumber}
                    onChange={handleConsultaChange} />
                </div>

                <div className="form-field">
                  <label>Especialidade</label>
                  <select
                    name="specialtyId"
                    value={consultaData.specialtyId}
                    onChange={handleConsultaChange}
                  >
                    <option value="">Selecione a especialidade</option>
                    {loadingSpecialties && <option>Carregando...</option>}
                    {specialties.map((s) => (
                      <option key={s.id} value={s.id}>{s.nome}</option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label>Médico</label>
                  <select
                    name="doctorId"
                    value={consultaData.doctorId}
                    onChange={handleConsultaChange}
                  >
                    <option value="">Selecione o médico</option>
                    {loadingDoctors && <option>Carregando...</option>}

                    {doctors.map((d) => (
                      <option key={d.id} value={d.id}>{d.nome}</option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label>Tipo de Consulta</label>
                  <select
                    name="consultationType"
                    value={consultaData.consultationType}
                    onChange={handleConsultaChange}
                  >
                    <option value="primeira">Primeira Consulta</option>
                    <option value="retorno">Retorno</option>
                    <option value="exame">Exame</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Horário */}
            <div className="form-section">
              <h2>Horário</h2>
              <div className="fields-group">
                <div className="form-field">
                  <label>Data</label>
                  <input
                    type="date"
                    name="date"
                    value={consultaData.date}
                    onChange={(e) => {
                      handleConsultaChange(e);
                      setConsultaData((prev) => ({ ...prev, time: '' }));
                    }}
                  />
                </div>

                <div className="form-field">
                  <label>Período</label>
                  <select
                    name="period"
                    value={consultaData.period}
                    onChange={(e) => {
                      handleConsultaChange(e);
                      setConsultaData((prev) => ({ ...prev, time: '' }));
                    }}
                  >
                    <option value="">Selecione</option>
                    <option value="manha">Manhã</option>
                    <option value="tarde">Tarde</option>
                    <option value="noite">Noite</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Horário</label>
                  <select
                    name="time"
                    value={consultaData.time}
                    onChange={handleConsultaChange}
                  >
                    <option value="">Selecione</option>
                    {getTimeSlots(consultaData.period).map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className="form-field" style={{ gridColumn: '1 / -1' }}>
                  <label>Observações</label>
                  <textarea
                    name="observations"
                    value={consultaData.observations}
                    onChange={handleConsultaChange}
                    rows="4"
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit">Agendar Consulta</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AgendarConsulta;
