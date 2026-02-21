import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EmployeeAddFunc.module.css';
import { employeeService } from '../../services/employees.services';
import { getAllEspecialidades } from '../../services/especialidadeService';

export default function AddEmployee() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    tipo: '',
    status: 'ativo',
    cpf: '',
    birth_date: '',
    phone: '',
    is_active: true,
    crm: '',
    especialidade_id: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rolesData = employeeService.getRoles();
        setRoles(Array.isArray(rolesData) ? rolesData : []);
      } catch {
        setRoles([]);
      }
    };
    const fetchEspecialidades = async () => {
      try {
        const resp = await getAllEspecialidades();
        const data = resp?.data ?? resp;
        setEspecialidades(Array.isArray(data) ? data : []);
      } catch {
        setEspecialidades([]);
      }
    };
    fetchRoles();
    fetchEspecialidades();
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setForm(prev => {
      const updated = { ...prev, [name]: newValue };
      if (name === 'tipo' && value !== 'Médico') {
        updated.crm = '';
        updated.especialidade_id = '';
      }
      return updated;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.tipo) {
      alert('Escolha um cargo');
      return;
    }
    if (form.tipo === 'Médico') {
      if (!form.crm || form.crm.trim() === '') {
        alert('CRM é obrigatório para médicos');
        return;
      }
      if (!form.especialidade_id) {
        alert('Selecione a especialidade do médico');
        return;
      }
    }
    setLoading(true);
    try {
      const payload = {
        nome: form.nome,
        email: form.email,
        senha: form.senha,
        cargo: form.tipo,
        cpf: form.cpf && form.cpf.trim() !== '' ? form.cpf.trim() : null,
        telefone: form.phone && form.phone.trim() !== '' ? form.phone.trim() : null,
        crm: form.tipo === 'Médico' ? String(form.crm).trim() : undefined,
        especialidadeId: form.tipo === 'Médico' ? Number(form.especialidade_id) : undefined
      };
      const created = await employeeService.createEmployee(payload);
      alert('Usuário criado com sucesso');
      navigate('/funcionarios');
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data ?? err?.message ?? err;
      alert('Erro ao criar usuário: ' + JSON.stringify(msg));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <button onClick={() => navigate(-1)} className={styles.back}>←</button>
        <h2>Cadastro de Funcionários</h2>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.inlineField}>
          <span className={styles.labelText}>Nome completo</span>
          <input type="text" name="nome" value={form.nome} onChange={handleChange} required placeholder="Ex: Antonio Silva Alves" />
        </label>
        <label className={styles.inlineField}>
          <span className={styles.labelText}>E-mail</span>
          <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="Ex: antonio123@gmail.com" />
        </label>
        <label className={styles.inlineField}>
          <span className={styles.labelText}>Senha</span>
          <input type="password" name="senha" value={form.senha} onChange={handleChange} required placeholder="Digite a senha" />
        </label>
        <label className={styles.inlineField}>
          <span className={styles.labelText}>CPF</span>
          <input type="text" name="cpf" value={form.cpf} onChange={handleChange} placeholder="Ex: 123.456.789-00" />
        </label>
        <label>
          Data de nascimento:
          <input type="date" name="birth_date" value={form.birth_date} onChange={handleChange} />
        </label>
        <label className={styles.inlineField}>
          <span className={styles.labelText}>Telefone</span>
          <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="Ex: (88)99999-9999" />
        </label>
        <label>
          Cargo:
          <select name="tipo" value={form.tipo} onChange={handleChange} required>
            <option value="">Selecione um cargo</option>
            {roles.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </label>
        {form.tipo === 'Médico' && (
          <>
            <label className={styles.inlineField}>
              <span className={styles.labelText}>CRM</span>
              <input type="text" name="crm" value={form.crm} onChange={handleChange} required placeholder="Ex: 123456" />
            </label>
            <label>
              Especialidade:
              <select name="especialidade_id" value={form.especialidade_id} onChange={handleChange} required>
                <option value="">Selecione</option>
                {especialidades.map(esp => (
                  <option key={esp.id ?? esp._id ?? esp.especialidade_id} value={esp.id ?? esp._id ?? esp.especialidade_id}>
                    {esp.nome ?? esp.name ?? esp.titulo ?? esp.descricao}
                  </option>
                ))}
              </select>
            </label>
          </>
        )}
        <label className={styles.checkboxLabel}>
          <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} />
          Funcionário ativo
        </label>
        <div className={styles.formActions}>
          <button type="button" className={styles.cancelBtn} onClick={() => navigate(-1)}>Cancelar</button>
          <button type="submit" className={styles.saveBtn} disabled={loading}>{loading ? 'Salvando...' : 'Salvar'}</button>
        </div>
      </form>
    </div>
  );
}
