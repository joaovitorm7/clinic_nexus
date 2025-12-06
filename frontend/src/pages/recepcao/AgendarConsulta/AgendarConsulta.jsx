import { useState, useEffect, useRef } from 'react';
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

  // Modal de cadastro rápido de paciente
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPatientForm, setNewPatientForm] = useState({
    fullName: '',
    cpf: '',
    birthDate: '',
    address: '',
    phone: '',
    email: ''
  });

  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loadingSpecialties, setLoadingSpecialties] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [cpfStatus, setCpfStatus] = useState('idle'); 
  const [loadingPatient, setLoadingPatient] = useState(false);
  const cpfDebounceRef = useRef(null);

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
      const paciente = response.data[0]; 
      setFormData({
        id: paciente.id,
        fullName: paciente.nome,
        birthDate: paciente.data_nascimento,
        cpf: paciente.cpf,
        phone: paciente.contato,
        email: paciente.contato, 
        endereco: paciente.endereco
      });
    }
  } catch (error) {
    console.error('Erro ao buscar paciente:', error);
  }
};

  const normalizeCPF = (cpf) => (cpf || '').replace(/\D/g, '');

  const searchPatientByCPF = async (rawCpf) => {
    setLoadingPatient(true);
    setCpfStatus('loading');
    try {
      const response = await getPatientByCPF(rawCpf);
      if (response?.data && response.data.length > 0) {
        const paciente = response.data[0];
        setFormData({
          id: paciente.id,
          fullName: paciente.nome,
          birthDate: paciente.data_nascimento,
          cpf: paciente.cpf,
          phone: paciente.contato,
          email: paciente.email || paciente.contato || ''
        });
        setPatientType('existing');
        setCpfStatus('found');
      } else {
        // não encontrado
        setPatientType('new');
        setCpfStatus('not_found');
        // opcional: limpar campos exceto cpf
        setFormData((prev) => ({ ...prev, id: null, fullName: '', birthDate: '', phone: '', email: '' }));
      }
    } catch (err) {
      console.error('Erro ao buscar paciente por CPF:', err.response?.data || err);
      setCpfStatus('idle');
    } finally {
      setLoadingPatient(false);
    }
  };


  const handleCPFInput = (e) => {
    const { value } = e.target;
    // atualiza o formData com o valor "formatado" visualmente (se quiser manter máscara, preserve aqui)
    setFormData((prev) => ({ ...prev, cpf: value }));

    // limpa debounce anterior
    if (cpfDebounceRef.current) {
      clearTimeout(cpfDebounceRef.current);
    }

    // inicia novo debounce
    cpfDebounceRef.current = setTimeout(() => {
      const raw = normalizeCPF(value);
      // só pesquisa quando tiver 11 dígitos (ajuste se seu backend aceita menos ou máscara)
      if (raw.length === 11) {
        searchPatientByCPF(raw);
      } else {
        // se digitar menos de 11, voltar ao estado inicial
        setCpfStatus('idle');
        setPatientType('new');
      }
    }, 400); // debounce 400ms
  };

  useEffect(() => {
    return () => {
      if (cpfDebounceRef.current) clearTimeout(cpfDebounceRef.current);
    };
  }, []);

    // Abrir/fechar modal de cadastro
    const openCreateModal = () => {
      // popular cpf do modal com o cpf atual, se houver
      setNewPatientForm((prev) => ({ ...prev, cpf: formData.cpf || '' }));
      setShowCreateModal(true);
    };
    const closeCreateModal = () => setShowCreateModal(false);

  const normalizeOnlyDigits = (s) => (s || '').replace(/\D/g, '');
  const normalizePhone = (s) => (s || '').replace(/[^\d+]/g, '');

  const isValidCPF = (cpf) => {
    const raw = normalizeOnlyDigits(cpf);
    return raw.length === 11;
  };

  const isValidPhone = (phone) => {
    if (!phone) return false;
    const p = normalizePhone(phone);
    const regex = /^\+?\d{7,15}$/;
    return regex.test(p);
  };

  const isValidEmail = (email) => {
    if (!email) return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const isValidDateString = (s) => {
    if (!s) return false;
    const d = new Date(s);
    if (Number.isNaN(d.getTime())) return false;
    const today = new Date();
    return d <= today;
  };

  const isValidFullName = (name) => !!name && name.trim().length >= 3;

  const handleNewPatientChange = (e) => {
    const { name, value: rawValue } = e.target;
    let value = rawValue;

    // normalizações por campo
    if (name === 'cpf') {
      // aceita apenas dígitos e limita 11
      value = normalizeOnlyDigits(value).slice(0, 11);
    }
    if (name === 'phone') {
      // permite + e dígitos, limitação total (excluindo +) até 15 dígitos
      value = value.replace(/[^\d+]/g, '');
      // opcional: limite de caracteres gerais
      if (value.startsWith('+')) {
        value = '+' + value.slice(1).slice(0, 15);
      } else {
        value = value.slice(0, 15);
      }
    }
    if (name === 'email') {
      value = value.trim();
    }
    if (name === 'fullName') {
      value = value; // você pode aplicar .replace(/\s+/g,' ') se quiser normalizar espaços
    }

    setNewPatientForm(prev => ({ ...prev, [name]: value }));

    // validação imediata (feedback rápido)
    setNewPatientErrors(prev => {
      const next = { ...prev };
      switch (name) {
        case 'cpf':
          next.cpf = value ? (isValidCPF(value) ? '' : 'CPF deve ter 11 dígitos numéricos') : 'CPF obrigatório';
          break;
        case 'phone':
          next.phone = value ? (isValidPhone(value) ? '' : 'Telefone inválido (ex: +5511999999999 ou 11999999999)') : '';
          break;
        case 'email':
          next.email = value ? (isValidEmail(value) ? '' : 'E-mail inválido') : '';
          break;
        case 'birthDate':
          next.birthDate = value ? (isValidDateString(value) ? '' : 'Data inválida') : 'Data de nascimento obrigatória';
          break;
        case 'fullName':
          next.fullName = value ? (isValidFullName(value) ? '' : 'Nome muito curto') : 'Nome obrigatório';
          break;
        default:
          next[name] = '';
      }
      return next;
    });
  };

  const validateNewPatientForm = () => {
    const errors = {
      fullName: '',
      cpf: '',
      birthDate: '',
      address: '',
      phone: '',
      email: ''
    };

    if (!isValidFullName(newPatientForm.fullName)) errors.fullName = 'Nome obrigatório (min 3 caracteres)';
    if (!isValidCPF(newPatientForm.cpf)) errors.cpf = 'CPF deve conter 11 dígitos';
    if (!isValidDateString(newPatientForm.birthDate)) errors.birthDate = 'Data de nascimento inválida';
    // contato obrigatório: phone ou email (já usamos isso antes), então validamos ao menos um:
    const contato = newPatientForm.phone || newPatientForm.email || '';
    if (!contato) {
      errors.phone = 'Telefone ou e-mail é obrigatório';
      errors.email = 'Telefone ou e-mail é obrigatório';
    } else {
      if (newPatientForm.phone && !isValidPhone(newPatientForm.phone)) errors.phone = 'Telefone inválido';
      if (newPatientForm.email && !isValidEmail(newPatientForm.email)) errors.email = 'E-mail inválido';
    }

    setNewPatientErrors(errors);
    // retorna verdadeiro se não houver mensagens
    return Object.values(errors).every(v => !v);
  };

    const handleCreatePatientSave = async () => {
      if (!newPatientForm.fullName || !newPatientForm.cpf) {
        alert('Preencha nome e CPF para cadastrar o paciente.');
        return;
      }
      if (!newPatientForm.birthDate) {
        alert('Preencha a data de nascimento (obrigatória).');
        return;
      }
      const contato = newPatientForm.phone || newPatientForm.email;
      if (!contato) {
        alert('Preencha telefone ou e-mail (contato obrigatório).');
        return;
      }

      try {
    const contato = newPatientForm.phone || newPatientForm.email;

    const payload = {
    nome: newPatientForm.fullName,
    cpf: newPatientForm.cpf.replace(/\D/g, ''),
    data_nascimento: newPatientForm.birthDate,
    contato: contato,
    endereco: newPatientForm.address || ""
    };


        const criado = await criarPaciente(payload);

        // Atualiza o formulário principal com os dados do paciente criado
        setFormData({
          id: criado.id,
          fullName: criado.nome,
          birthDate: criado.data_nascimento,
          cpf: criado.cpf,
          phone: criado.contato,
          email: criado.email,
          endereco: criado.endereco || ''
        });
        setCpfStatus('found');
        setPatientType('existing');
        setShowCreateModal(false);
        alert('Paciente cadastrado com sucesso.');
      } catch (err) {
        console.error('Erro ao criar paciente:', err.response?.data || err);
        const serverMsg = err.response?.data?.message || JSON.stringify(err.response?.data) || err.message;
        alert('Falha ao cadastrar paciente. ' + serverMsg);
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
        data_nascimento: formData.birthDate, 
        contato: formData.phone,
        endereco: formData.endereco
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

              <div className="fields-group">
                <div className="form-field" style={{ gridColumn: '1 / -1' }}>
                  <label>CPF</label>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input
                      type="text"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleCPFInput}
                      placeholder="Digite o CPF (somente números)"
                    />
                    
                    {loadingPatient && <span style={{ marginLeft: 8 }}>Buscando...</span>}

                    {cpfStatus === 'not_found' && (
                      <button
                        type="button"
                        onClick={() => {
                          // pré-preenche o modal com o CPF atual e abre modal
                          setNewPatientForm(prev => ({ ...prev, cpf: normalizeCPF(formData.cpf) }));
                          setShowCreateModal(true);
                        }}
                        style={{ padding: '6px 10px', borderRadius: 6, background: '#1A3B6C', color: '#fff', border: 'none', cursor: 'pointer' }}
                      >
                        Cadastrar
                      </button>
                    )}
                  </div>
                </div>

                {/* Exibe os campos do paciente somente quando encontrado (leitura) ou quando desejar editar */}
                {cpfStatus === 'found' && (
                  <>
                    <div className="form-field">
                      <label>Nome Completo</label>
                      <input type="text" name="fullName" value={formData.fullName} readOnly />
                    </div>

                    <div className="form-field">
                      <label>Data de Nascimento</label>
                      <input type="date" name="birthDate" value={formData.birthDate || ''} readOnly />
                    </div>

                    <div className="form-field">
                      <label>Telefone</label>
                      <input type="tel" name="phone" value={formData.phone || ''} readOnly />
                    </div>

                    <div className="form-field">
                      <label>E-mail</label>
                      <input type="email" name="email" value={formData.email || ''} readOnly />
                    </div>
                  </>
                )}
              </div>
            </div>

            {showCreateModal && (
              <div className="modal-overlay">
                <div className="modal-window">
                  <h3>Cadastrar Paciente</h3>

                  <div className="fields-group">
                    <div className="form-field">
                      <label>Nome Completo</label>
                      <input type="text" name="fullName" value={newPatientForm.fullName} onChange={handleNewPatientChange} />
                    </div>

                    <div className="form-field">
                      <label>CPF</label>
          <input type="text" name="cpf" value={newPatientForm.cpf} onChange={handleNewPatientChange} />
        </div>

        <div className="form-field">
          <label>Data de Nascimento</label>
          <input type="date" name="birthDate" value={newPatientForm.birthDate} onChange={handleNewPatientChange} />
        </div>

        <div className="form-field">
          <label>Endereço</label>
          <input type="text" name="address" value={newPatientForm.address} onChange={handleNewPatientChange} />
        </div>

        <div className="form-field">
          <label>E-mail</label>
          <input type="email" name="email" value={newPatientForm.email} onChange={handleNewPatientChange} />
        </div>

        <div className="form-field">
          <label>Telefone</label>
          <input type="tel" name="phone" value={newPatientForm.phone} onChange={handleNewPatientChange} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
        <button type="button" onClick={closeCreateModal} style={{ padding: '8px 12px', borderRadius: 8 }}>Cancelar</button>
        <button type="button" onClick={handleCreatePatientSave} style={{ padding: '8px 12px', borderRadius: 8, background: '#1A3B6C', color: '#fff', border: 'none' }}>Salvar</button>
      </div>
    </div>
  </div>
)}

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

            <button onClick={() => navigate(`/consultas/${c.id}/editar`)}>Editar</button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AgendarConsulta;
