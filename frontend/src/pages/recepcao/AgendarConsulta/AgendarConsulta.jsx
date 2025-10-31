import { useState, useEffect } from 'react';
import './AgendarConsulta.css';
import { getPatientByCPF } from '../../../services/pacienteService';




const AgendarConsulta = () => {
  // Estados - coloque aqui, antes do return
  const [patientType, setPatientType] = useState('new'); // controla o radio button
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    cpf: '',
    phone: '',
    email: ''
  });

  // Estados auxiliares (para carregamento)
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loadingSpecialties, setLoadingSpecialties] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);

  // Função que lida com a mudança do tipo de paciente (novo/existente)
  const handlePatientTypeChange = (e) => {
    const type = e.target.value;
    setPatientType(type);

    if (type === 'new') {
      // Limpa os campos se for paciente novo
      setFormData({
        fullName: '',
        birthDate: '',
        cpf: '',
        phone: '',
        email: ''
      });
    }
  };

  // Função para buscar paciente por CPF
  const handleCPFSearch = async (cpf) => {
    try {
      const response = await getPatientByCPF(cpf);
      setFormData(response.data);
      // Aqui você fará a chamada para sua API
      // const response = await api.get(`/patients/${cpf}`);
      // const patientData = response.data;

      // Simularei dados para exemplo
      const patientData = {
        fullName: 'João Silva',
        birthDate: '1990-01-01',
        cpf: cpf,
        phone: '(11) 99999-9999',
        email: 'joao@email.com'
      };

      setFormData(patientData);
    } catch (error) {
      console.error('Erro ao buscar paciente:', error);
      // Aqui você pode adicionar uma notificação de erro
    }
  };

  // Função para lidar com mudanças nos campos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Se for o campo CPF e for paciente existente, busca os dados
    if (name === 'cpf' && patientType === 'existing' && value.length === 11) {
      handleCPFSearch(value);
    }
  };

  // Função para submeter o formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do formulário:', { patientType, ...formData });
    // Aqui você fará o POST para sua API
  };

  // Estado para armazenar os dados da consulta
  const [consultaData, setConsultaData] = useState({
    cardNumber: '',
    specialtyId: '',
    doctorId: '',
    consultationType: ''
  });

  // Função para atualizar os campos de consulta
  const handleConsultaChange = (e) => {
    const { name, value } = e.target;
    setConsultaData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // retorna array de strings 'HH:MM' com slots por período
  function getTimeSlots(period) {
    if (!period) return [];
    const slots = [];
    let startHour, endHour;
    if (period === 'manha') { startHour = 8; endHour = 12; }
    if (period === 'tarde') { startHour = 13; endHour = 17; }
    if (period === 'noite') { startHour = 18; endHour = 21; }

    const stepMinutes = 30; // intervalo entre slots (ajuste se quiser 15/20/60)
    for (let h = startHour; h < endHour; h++) {
      for (let m = 0; m < 60; m += stepMinutes) {
        const hh = String(h).padStart(2, '0');
        const mm = String(m).padStart(2, '0');
        slots.push(`${hh}:${mm}`);
      }
    }
    return slots;
  }


  return (
    <div className="page-agendar">
      <div className="content-wrapper">
        <h1>Agendar Consulta</h1>
        
        <div className="form-container">
          <form>
            {/* Seção: Tipo de Paciente */}
            <div className="form-section">
              <h2>Dados do Paciente</h2>
              
              <div className="patient-type">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="patientType"
                    value="new"
                    checked={patientType === 'new'}
                    onChange={handlePatientTypeChange}
                  />
                  <span>Novo Paciente</span>
                </label>
                
                <label className="radio-label">
                  <input
                    type="radio"
                    name="patientType"
                    value="existing"
                    checked={patientType === 'existing'}
                    onChange={handlePatientTypeChange}
                  />
                  <span>Paciente Cadastrado</span>
                </label>
              </div>

              {/* Campos do Paciente */}
              <div className="fields-group">
                <div className="form-field">
                  <label>Nome Completo</label>
                  <input type="text" 
                  name="fullName" 
                  value={formData.fullName}
                  onChange={handleInputChange}
                  readOnly={patientType === 'existing'} />
                </div>
                
                <div className="form-field">
                  <label>Data de Nascimento</label>
                  <input type="date" 
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  readOnly={patientType === 'existing'} />
                </div>

                <div className="form-field">
                  <label>CPF</label>
                  <input type="text" 
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleInputChange}/>
                </div>

                <div className="form-field">
                  <label>Telefone</label>
                  <input type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  readOnly={patientType === 'existing'} />
                </div>

                <div className="form-field">
                  <label>E-mail</label>
                  <input type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  readOnly={patientType === 'existing'} />
                </div>
              </div>
            </div>

            {/* Seção: Dados da Consulta */}
            <div className="form-section">
              <h2>Dados da Consulta</h2>
              <div className="fields-group">
                <div className="form-field">
                  <label>Nº Carteirinha</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={consultaData.cardNumber}
                    onChange={handleConsultaChange}
                    placeholder="0000000"
                  />
                </div>

                <div className="form-field">
                  <label>Especialidade</label>
                  <select
                    name="specialtyId"
                    value={consultaData.specialtyId}
                    onChange={handleConsultaChange}
                  >
                    <option value="">Selecione a especialidade</option>
                    {loadingSpecialties ? (
                      <option value="">Carregando...</option>
                    ) : (
                      specialties.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))
                    )}
                  </select>
                </div>

                <div className="form-field">
                  <label>Médico</label>
                  <select
                    name="doctorId"
                    value={consultaData.doctorId}
                    onChange={handleConsultaChange}
                    disabled={loadingDoctors || !consultaData.specialtyId}
                  >
                    <option value="">{loadingDoctors ? 'Carregando...' : 'Selecione o médico'}</option>
                    {/*carregou todos os médicos: filtre aqui por specialtyId */}
                    {(doctors || []).map(d => (
                      // caso use filtro local, filtre por specialtyId:
                      // consultaData.specialtyId ? doctors.filter(x=>x.specialtyId===consultaData.specialtyId).map(...) : null
                      <option key={d.id} value={d.id}>{d.full_name || d.name}</option>
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

            {/* Seção: Horário */}
            <div className="form-section">
              <h2>Horário</h2>
              <div className="fields-group">
                <div className="form-field">
                  <label>Data da Consulta</label>
                  <input
                    type="date"
                    name="date"
                    value={consultaData.date}
                    onChange={(e) => {
                      handleConsultaChange(e);
                      // limpa horário se data mudar
                      setConsultaData(prev => ({ ...prev, time: '' }));
                    }}
                    min={new Date().toISOString().split('T')[0]} // impede escolher passado
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Período</label>
                  <select
                    name="period"
                    value={consultaData.period}
                    onChange={(e) => {
                      handleConsultaChange(e);
                      // limpar time ao trocar período
                      setConsultaData(prev => ({ ...prev, time: '' }));
                    }}
                    required
                  >
                    <option value="">Selecione o período</option>
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
                    required
                    disabled={!consultaData.period || !consultaData.date || !consultaData.doctorId}
                  >
                    <option value="">{(!consultaData.period || !consultaData.date || !consultaData.doctorId) ? 'Escolha data, período e médico' : 'Selecione o horário'}</option>

                    {getTimeSlots(consultaData.period).map(t => (
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
                    placeholder="Informações adicionais sobre a consulta (queixas, preparo, etc.)"
                    rows={5}
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

export default AgendarConsulta;  // Adicione esta linha