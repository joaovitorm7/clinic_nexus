import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllEspecialidades } from '../../../services/especialidadeService';
import { getDoctorByEspecialidadeId } from '../../../services/doctors.services';
import { getPatientByCPF, criarPaciente, editarPaciente } from '../../../services/pacienteService';
import { createAgendamento } from '../../../services/agendamentoService';
import './AgendarConsulta.css';


export default function AgendarConsulta() {
  const navigate = useNavigate();

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
  const [doctorsError, setDoctorsError] = useState(null);

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
      try {
        const res = await getAllEspecialidades();
        setSpecialties(res?.data ?? res ?? []);
      } catch (err) {
        setSpecialties([]);
      } finally {
        setLoadingSpecialties(false);
      }
    })();
  }, []);

  useEffect(() => {
    const id = consultaData.specialtyId;
    setDoctors([]);
    setDoctorsError(null);
    setConsultaData((prev) => ({ ...prev, doctorId: '' }));
    if (!id) return;
    (async () => {
      try {
        setLoadingDoctors(true);
        const res = await getDoctorByEspecialidadeId(id);
        const arr = Array.isArray(res) ? res : (res?.data ?? []);
        const mapped = (arr || []).map((m) => ({
          id: m.id,
          nome: m.nome || m.funcionario?.nome || 'Médico',
          crm: m.crm
        }));
        setDoctors(mapped);
      } catch (err) {
        setDoctors([]);
        setDoctorsError('Erro ao buscar médicos');
      } finally {
        setLoadingDoctors(false);
      }
    })();
  }, [consultaData.specialtyId]);

  // Função que efetivamente busca paciente no backend por CPF
  const searchPatient = async (cpf) => {
    try {
      setLoadingPatient(true);
      setCpfStatus('loading');
      const res = await getPatientByCPF(cpf);
      const arr = res?.data ?? res ?? [];
      if (Array.isArray(arr) && arr.length > 0) {
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
        // limpa dados parcialmente (mantém cpf digitado)
        setFormData((prev) => ({ ...prev, id: null, fullName: '', birthDate: '', phone: '', email: '', endereco: '' }));
      }
    } catch (err) {
      setCpfStatus('idle');
    } finally {
      setLoadingPatient(false);
    }
  };

  // Nova função pública interna pedida: recebe um CPF (com ou sem formatação),
  // normaliza e dispara a busca. Pode ser reutilizada por outros handlers.
  const handleCPFsearch = async (cpfInput) => {
    const raw = normalizeCPF(cpfInput);
    if (raw.length === 11) {
      await searchPatient(raw);
    } else {
      // se CPF inválido, resetar estado relacionado
      setCpfStatus('idle');
      setFormData((p) => ({ ...p, id: null, fullName: '', birthDate: '', phone: '', email: '', endereco: '' }));
    }
  };

  // handler de input com debounce que usa handleCPFsearch
  const handleCPFInput = (e) => {
    const value = e.target.value;
    setFormData((p) => ({ ...p, cpf: value }));
    if (cpfDebounceRef.current) clearTimeout(cpfDebounceRef.current);
    cpfDebounceRef.current = setTimeout(() => {
      handleCPFsearch(value);
    }, 400);
  };

  const handleConsultaChange = (e) => {
    const { name, value } = e.target;
    setConsultaData((p) => ({ ...p, [name]: value }));
  };

  const handleNewPatientChange = (e) => {
    const { name, value } = e.target;
    setNewPatientForm((p) => ({ ...p, [name]: value }));
  };

  const handleEditPatientChange = (e) => {
    const { name, value } = e.target;
    setEditPatientForm((p) => ({ ...p, [name]: value }));
  };

  const closeCreateModal = () => setShowCreateModal(false);

  const handleCreatePatientSave = async () => {
    const data = {
      nome: newPatientForm.fullName,
      cpf: normalizeCPF(newPatientForm.cpf),
      data_nascimento: newPatientForm.birthDate,
      contato: newPatientForm.phone || newPatientForm.email,
      endereco: newPatientForm.address
    };
    const res = await criarPaciente(data);
    const novo = res?.data ?? res;
    setFormData({
      id: novo.id,
      fullName: novo.nome,
      birthDate: novo.data_nascimento,
      cpf: novo.cpf,
      phone: novo.contato,
      email: novo.email || '',
      endereco: novo.endereco || ''
    });
    setShowCreateModal(false);
    setCpfStatus('found');
  };

  const handleEditPatientSave = async () => {
    const payload = {
      nome: editPatientForm.fullName,
      cpf: normalizeCPF(editPatientForm.cpf),
      data_nascimento: editPatientForm.birthDate,
      contato: editPatientForm.phone || editPatientForm.email,
      endereco: editPatientForm.address
    };
    await editarPaciente(editingPatientId, payload);
    setShowEditModal(false);
    setFormData({
      id: editingPatientId,
      fullName: payload.nome,
      birthDate: payload.data_nascimento,
      cpf: payload.cpf,
      phone: payload.contato,
      email: editPatientForm.email,
      endereco: payload.endereco
    });
  };

  const createPatientIfNeeded = async () => {
    if (formData.id) return formData.id;
    const payload = {
      nome: formData.fullName,
      cpf: normalizeCPF(formData.cpf),
      data_nascimento: formData.birthDate,
      contato: formData.phone || formData.email,
      endereco: formData.endereco
    };
    const res = await criarPaciente(payload);
    const novo = res?.data ?? res;
    return novo.id;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pacienteId = await createPatientIfNeeded();
    const payload = {
      id_paciente: pacienteId,
      ...(consultaData.doctorId ? { id_medico: Number(consultaData.doctorId) } : {}),
      ...(consultaData.specialtyId ? { especialidade: specialties.find((s) => String(s.id) === String(consultaData.specialtyId))?.nome } : {}),
      data: new Date(`${consultaData.date}T${consultaData.time}:00`).toISOString(),
      motivo_consulta: consultaData.observations,
      status: 'agendada'
    };
    await createAgendamento(payload);
    alert('Consulta agendada com sucesso!');
    navigate('/recepcao');
  };

  const getTimeSlots = (period) => {
    const cfg = { manha: [8, 12], tarde: [13, 17], noite: [18, 21] };
    if (!cfg[period]) return [];
    const [start, end] = cfg[period];
    const r = [];
    for (let h = start; h < end; h++) {
      for (let m = 0; m < 60; m += 30) r.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
    return r;
  };

  return (
    <div className="page-agendar">
      <div className="content-wrapper">
        <h1>Agendar Consulta</h1>

        <div className="form-container">
          <form onSubmit={handleSubmit}>
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
                          setNewPatientForm((prev) => ({ ...prev, cpf: normalizeCPF(formData.cpf) }));
                          setShowCreateModal(true);
                        }}
                        style={{ padding: '6px 10px', borderRadius: 6, background: '#1A3B6C', color: '#fff', border: 'none', cursor: 'pointer' }}
                      >
                        Cadastrar
                      </button>
                    )}
                  </div>
                </div>

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
                    <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center' }}>
                      <button
                        type="button"
                        onClick={() => {
                          setEditPatientForm({
                            cpf: normalizeCPF(formData.cpf),
                            fullName: formData.fullName,
                            birthDate: formData.birthDate,
                            address: formData.endereco || '',
                            phone: formData.phone || '',
                            email: formData.email || ''
                          });
                          setEditingPatientId(formData.id);
                          setShowEditModal(true);
                        }}
                        style={{
                          padding: '12px 21px',
                          borderRadius: 6,
                          background: '#1A3B6C',
                          color: '#fff',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        Editar
                      </button>
                    </div>
                  </>
                )}

                {cpfStatus !== 'found' && (
                  <>
                    <div className="form-field">
                      <label>Nome Completo</label>
                      <input type="text" value={formData.fullName} onChange={(e) => setFormData((p) => ({ ...p, fullName: e.target.value }))} />
                    </div>

                    <div className="form-field">
                      <label>Data de Nascimento</label>
                      <input type="date" value={formData.birthDate} onChange={(e) => setFormData((p) => ({ ...p, birthDate: e.target.value }))} />
                    </div>

                    <div className="form-field">
                      <label>Telefone</label>
                      <input type="tel" value={formData.phone} onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))} />
                    </div>

                    <div className="form-field">
                      <label>E-mail</label>
                      <input type="email" value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} />
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

            {showEditModal && (
              <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="edit-patient-title" style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.4)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000
              }}>
                <div className="modal-window" style={{
                  width: 560,
                  maxWidth: '95%',
                  background: '#fff',
                  borderRadius: 8,
                  padding: 20,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
                }}>
                  <h3 id="edit-patient-title" style={{ marginTop: 0 }}>Editar Paciente</h3>

                  <div className="fields-group" style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 12
                  }}>
                    <div className="form-field" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label>Nome Completo</label>
                      <input type="text" name="fullName" value={editPatientForm.fullName} onChange={handleEditPatientChange} />
                    </div>

                    <div className="form-field" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label>CPF</label>
                      <input
                        type="text"
                        name="cpf"
                        value={editPatientForm.cpf}
                        onChange={handleEditPatientChange}
                      />
                    </div>

                    <div className="form-field" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label>Data de Nascimento</label>
                      <input type="date" name="birthDate" value={editPatientForm.birthDate || ''} onChange={handleEditPatientChange} />
                    </div>

                    <div className="form-field" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label>Telefone</label>
                      <input type="tel" name="phone" value={editPatientForm.phone || ''} onChange={handleEditPatientChange} />
                    </div>

                    <div className="form-field" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label>E-mail</label>
                      <input type="email" name="email" value={editPatientForm.email || ''} onChange={handleEditPatientChange} />
                    </div>

                    <div className="form-field" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label>Endereço</label>
                      <input type="text" name="address" value={editPatientForm.address || ''} onChange={handleEditPatientChange} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
                    <button type="button" onClick={() => setShowEditModal(false)} style={{ padding: '8px 12px', borderRadius: 8 }}>Cancelar</button>
                    <button type="button" onClick={handleEditPatientSave} style={{ padding: '8px 12px', borderRadius: 8, background: '#1A3B6C', color: '#fff', border: 'none' }}>Salvar</button>
                  </div>
                </div>
              </div>
            )}

            <div className="form-section">
              <h2>Dados da Consulta</h2>
              <div className="fields-group">
                <div className="form-field">
                  <label>Nº Carteirinha</label>
                  <input type="text" name="cardNumber" value={consultaData.cardNumber} onChange={handleConsultaChange} />
                </div>

                <div className="form-field">
                  <label>Especialidade</label>
                  <select name="specialtyId" value={consultaData.specialtyId} onChange={handleConsultaChange}>
                    <option value="">Selecione a especialidade</option>
                    {loadingSpecialties && <option>Carregando...</option>}
                    {specialties.map((s) => (
                      <option key={s.id} value={s.id}>{s.nome}</option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label>Médico</label>
                  <select name="doctorId" value={consultaData.doctorId} onChange={handleConsultaChange}>
                    <option value="">Selecione o médico</option>
                    {loadingDoctors && <option>Carregando...</option>}
                    {doctors.map((d) => (
                      <option key={d.id} value={d.id}>{d.nome}</option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label>Tipo de Consulta</label>
                  <select name="consultationType" value={consultaData.consultationType} onChange={handleConsultaChange}>
                    <option value="primeira">Primeira Consulta</option>
                    <option value="retorno">Retorno</option>
                    <option value="exame">Exame</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>Horário</h2>
              <div className="fields-group">
                <div className="form-field">
                  <label>Data</label>
                  <input type="date" name="date" value={consultaData.date} onChange={(e) => { handleConsultaChange(e); setConsultaData((prev) => ({ ...prev, time: '' })); }} />
                </div>

                <div className="form-field">
                  <label>Período</label>
                  <select name="period" value={consultaData.period} onChange={(e) => { handleConsultaChange(e); setConsultaData((prev) => ({ ...prev, time: '' })); }}>
                    <option value="">Selecione</option>
                    <option value="manha">Manhã</option>
                    <option value="tarde">Tarde</option>
                    <option value="noite">Noite</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Horário</label>
                  <select name="time" value={consultaData.time} onChange={handleConsultaChange}>
                    <option value="">Selecione</option>
                    {getTimeSlots(consultaData.period).map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className="form-field" style={{ gridColumn: '1 / -1' }}>
                  <label>Observações</label>
                  <textarea name="observations" value={consultaData.observations} onChange={handleConsultaChange} rows="4" />
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
}
