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
      <h2>Adicionar Funcionário</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Nome completo:
          <input
            type="text"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Telefone:
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
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

        <button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Adicionar Funcionário'}
        </button>
      </form>
    </div>
  );
}
