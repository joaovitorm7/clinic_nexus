import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EmployeeAddFunc.module.css';
import { getRoles, createEmployee } from '../../services/employees.services';

export default function AddEmployee() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    role_id: '',
    phone: '',
    birth_date: '',
    is_active: true,
  });
  const [loading, setLoading] = useState(false);

  // Carregar cargos
  useEffect(() => {
    async function loadRoles() {
      try {
        const res = await getRoles();
        setRoles(res.data || []);
      } catch (err) {
        console.error(err);
      }
    }
    loadRoles();
  }, []);

  // atualiza campos, tratando checkbox corretamente
  function handleChange(e) {
    const { name, type, value, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  // Atualiza os valores do formulário
  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // Envia o formulário
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await createEmployee(form); // função da sua API
      alert('Funcionário criado com sucesso!');
      navigate('/administracao/funcionarios'); // volta pro dashboard
    } catch (err) {
      console.error(err);
      alert('Erro ao criar funcionário.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <button onClick={() => navigate(-1)} className={styles.back}>← Voltar</button>
      <h2>Cadastro de Funcionários</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.inlineField}>
          <span className={styles.labelText}>Nome completo</span>
          <input
            type="text"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            required
            placeholder='Ex: Antonio Silva Alves'
          />
        </label>

        <label className={styles.inlineField}>
          <span className={styles.labelText}>E-mail</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder='Ex: antonio123@gmail.com'
          />
        </label>

        <label>
          Data de nascimento:
          <input
            type="date"
            name="birth_date"
            value={form.birth_date}
            onChange={handleChange}
          />
        </label>

        <label className={styles.inlineField}>
          <span className={styles.labelText}>Telefone</span>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder='Ex: (88)99999-9999'
          />
        </label>

        <label>
          Cargo:
          <select
            name="role_id"
            value={form.role_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um cargo</option>
            {roles.map(r => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </label>

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="is_active"
            checked={form.is_active}
            onChange={handleChange}
          />
          Funcionário ativo
        </label>

        <div className={styles.formActions}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className={styles.saveBtn}
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
}
