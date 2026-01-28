import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DashboardFunc.module.css';
import EmployeeCard from '../../../components/EmployeeCard/EmployeeCard';
import EmployeeModal from '../../../components/EmployeeModal/EmployeeModal';
import { employeeService } from '../../../services/employees.services';
import { FaPlus, FaEdit, FaTimesCircle  } from 'react-icons/fa';

export default function DashboardFunc() {
  const navigate = useNavigate();

  // estados principais
  const [employees, setEmployees] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // controles
  const [sortBy, setSortBy] = useState('full_name'); 
  const [order, setOrder] = useState('asc');
  const [roleFilter, setRoleFilter] = useState('');
  const [search, setSearch] = useState('');
  const [selectMode, setSelectMode] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEmployee, setModalEmployee] = useState(null);
  const [modalMode, setModalMode] = useState('view');

  // --- Funções de carregamento ---
  async function loadRoles() {
    try {
      const res = employeeService.getRoles(); // já retorna array
      setRoles(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error('Erro ao carregar cargos:', err);
    }
  }

  async function loadEmployees() {
    setLoading(true);
    setError(null);
    try {
      const data = await employeeService.getEmployees();
      setEmployees(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Erro ao carregar funcionários:', err);
      setError('Erro ao carregar funcionários.');
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRoles();
  }, []);

  useEffect(() => {
    loadEmployees();
  }, [sortBy, order, roleFilter, search]);

  function handleView(emp) {
    setModalEmployee(emp);
    setModalMode('view');
    setModalOpen(true);
  }

  function handleEdit(emp) {
  // Redirecionar para a página de editar funcionário
  navigate(`/admin/editar-funcionarios?id=${emp.id}`);
}

  function toggleSelectMode() {
    setSelectMode(prev => !prev);
    setSelectedEmployees([]);
  }

  function handleSelectEmployee(empId) {
    setSelectedEmployees(prev =>
      prev.includes(empId)
        ? prev.filter(id => id !== empId)
        : [...prev, empId]
    );
  }

  function handleDeactivateClick() {
    if (selectedEmployees.length > 0) {
      setConfirmOpen(true);
    } else {
      alert('Selecione ao menos um funcionário para desativar.');
    }
  }

  function confirmDeactivation() {
    console.log('Funcionários desativados:', selectedEmployees);
    setConfirmOpen(false);
    setSelectMode(false);
    setSelectedEmployees([]);
  }

  // --- Render ---
  return (
    <div className={styles.page}>
      <div className={styles.controls}>
        <div className={styles.left}>
          <button onClick={() => navigate(-1)} className={styles.back} aria-label="Voltar">←</button>
        </div>

        <div className={styles.center}>
          <h2>Funcionários</h2>
        </div>

        <div className={styles.right}>
          <div className={styles.filters}>
            <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
              <option value="">Todos cargos</option>
              {roles.map(r => (
                <option key={r.id || r} value={r.id || r}>
                  {r.name || r}
                </option>
              ))}
            </select>

            <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="full_name">Nome</option>
              <option value="created_at">Data de criação</option>
            </select>

            <button  className={styles.orderButton} onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}>
              Ordem: {order === 'asc' ? 'A→Z' : 'Z→A'}
            </button>

            <input placeholder="Pesquisar..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {loading && <p>Carregando...</p>}
        {!loading && error && <p>{error}</p>}
        {!loading && !error && employees.length === 0 && <p>Nenhum funcionário encontrado.</p>}
        {!loading && !error && employees.length > 0 && employees.map(emp => (
          <EmployeeCard
            key={emp.id}
            employee={emp}
            onView={() => handleView(emp)}
            onEdit={() => handleEdit(emp)}
            selectMode={selectMode}
            selected={selectedEmployees.includes(emp.id)}
            onSelect={() => handleSelectEmployee(emp.id)}
          />
        ))}
      </div>

      <button
        onClick={() => navigate('/admin/funcionarios/AddFunc')}
        className={styles.floatingButton}
        aria-label="Adicionar funcionário"
      >
        <FaPlus />
      </button>

      <div className={styles.bottomActions}>
        {!selectMode ? (
          <button
            className={styles.deactivateButton}
            onClick={toggleSelectMode}
            disabled={employees.length === 0}
          >
            <FaTimesCircle style={{ marginRight: 8 }} /> Desativar Funcionários
          </button>
        ) : (
          <>
            <button className={styles.cancelButton} onClick={toggleSelectMode}>
              Cancelar
            </button>
            <button
              className={styles.confirmSelectButton}
              onClick={handleDeactivateClick}
              disabled={selectedEmployees.length === 0}
            >
              <FaTimesCircle style={{ marginRight: 8 }} /> Confirmar Seleção ({selectedEmployees.length})
            </button>
          </>
        )}
      </div>

      {confirmOpen && (
        <div className={styles.confirmOverlay}>
          <div className={styles.confirmBox}>
            <p>Tem certeza que deseja desativar {selectedEmployees.length} funcionário(s)?</p>
            <div className={styles.confirmButtons}>
              <button onClick={confirmDeactivation} className={styles.confirmYes}>Sim</button>
              <button onClick={() => setConfirmOpen(false)} className={styles.confirmNo}>Não</button>
            </div>
          </div>
        </div>
      )}

      <EmployeeModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        mode={modalMode}
        employee={modalEmployee}
      />
    </div>
  );
}
