import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EmployeeAddFunc.module.css';
import { employeeService } from '../../services/employees.services';

export default function AddEmployee() {
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    tipo: '',
    status: 'ativo',
  });

  const [loading, setLoading] = useState(false);

  // Carregar cargos fixos
useEffect(() => {
  const fetchRoles = async () => {
    try {
      const rolesData = employeeService.getRoles(); // retorna ['Recepcionista','Administrador','Médico']
      setRoles(Array.isArray(rolesData) ? rolesData : []);
    } catch (err) {
      console.error('Erro ao carregar cargos:', err);
      setRoles([]);
    }
  };

  fetchRoles();
}, []);


  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await employeeService.createEmployee(form);      
      alert("Usuário criado com sucesso!");
      navigate('/funcionarios');
    } catch (err) {
      console.error(err);
      alert("Erro ao criar usuário.");
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
      name="nome"
      value={form.nome}
      onChange={handleChange}
      required
      placeholder="Ex: Antonio Silva Alves"
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
      placeholder="Ex: antonio123@gmail.com"
    />
  </label>

  <label className={styles.inlineField}>
    <span className={styles.labelText}>Senha</span>
    <input
      type="password"
      name="senha"
      value={form.senha}
      onChange={handleChange}
      required
      placeholder="Digite a senha"
    />
  </label>

  <label className={styles.inlineField}>
    <span className={styles.labelText}>CPF</span>
    <input
      type="text"
      name="cpf"
      value={form.cpf}
      onChange={handleChange}
      placeholder="Ex: 123.456.789-00"
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
      placeholder="Ex: (88)99999-9999"
    />
  </label>

  <label>
    Cargo:
    <select
      name="tipo"
      value={form.tipo}
      onChange={handleChange}
      required
    >
      <option value="">Selecione um cargo</option>
      {roles.map(r => (
        <option key={r} value={r}>{r}</option>
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
