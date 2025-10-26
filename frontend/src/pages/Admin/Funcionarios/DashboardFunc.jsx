import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DashboardFunc.module.css';
import EmployeeCard from '../../../components/EmployeeCard/EmployeeCard';
import FloatingButton from '../../../components/FloatingButton/FloatingButton';
import EmployeeModal from '../../../components/EmployeeModal/EmployeeModal';
import { getEmployees, getRoles } from '../../../services/employees.services';
import { FaPlus } from 'react-icons/fa';

export default function DashboardFunc() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  // controls
  const [sortBy, setSortBy] = useState('full_name'); // ou 'created_at'
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

  async function loadRoles() {
    try {
      const res = await getRoles();
      setRoles(res.data || []);
    } catch (err) { console.error(err); }
  }

  async function loadEmployees() {
    setLoading(true);
    try {
      const params = {
        sortBy,
        order,
        roleId: roleFilter || undefined,
        q: search || undefined,
      };
      const res = await getEmployees(params);
      setEmployees(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadRoles(); }, []);
  useEffect(() => { loadEmployees(); }, [sortBy, order, roleFilter, search]);

  function handleView(emp) {
    setModalEmployee(emp);
    setModalMode('view');
    setModalOpen(true);
  }
  function handleEdit(emp) {
    setModalEmployee(emp);
    setModalMode('edit');
    setModalOpen(true);
  }

    function toggleSelectMode() {
        setSelectMode(!selectMode);
        setSelectedEmployees([]); // limpa seleção quando entra/sai do modo
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
            alert("Selecione ao menos um funcionário para desativar.");
        }
    }

    function confirmDeactivation() {
        // Local para a API de desativação
        console.log("Funcionários desativados:", selectedEmployees);
        setConfirmOpen(false);
        setSelectMode(false);
        setSelectedEmployees([]);
    }

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
                          {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                      </select>

                      <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                          <option value="full_name">Nome</option>
                          <option value="created_at">Data de criação</option>
                      </select>

                      <button onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}>
                          Ordem: {order === 'asc' ? 'A→Z' : 'Z→A'}
                      </button>

                      <input placeholder="Pesquisar..." value={search} onChange={e => setSearch(e.target.value)} />
                  </div>
              </div>
          </div>

          <div className={styles.grid}>
              {loading ? <p>Carregando...</p> :
                  employees.length === 0 ? <p>Nenhum funcionário encontrado.</p> :
                      employees.map(emp => (
                          <EmployeeCard
                              key={emp.id}
                              employee={emp}
                              onView={handleView}
                              onEdit={handleEdit}
                              selectMode={selectMode}
                              selected={selectedEmployees.includes(emp.id)}
                              onSelect={() => handleSelectEmployee(emp.id)}
                          />
                      ))
              }
          </div>

            
          <button
          // Botãp de adicionar funcionário
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
                      Desativar Funcionários
                  </button>
              ) : (
                  <>
                      <button
                          className={styles.cancelButton}
                          onClick={toggleSelectMode}
                      >
                          Cancelar
                      </button>
                      <button
                          className={styles.confirmSelectButton}
                          onClick={handleDeactivateClick}
                          disabled={selectedEmployees.length === 0}
                      >
                          Confirmar Seleção ({selectedEmployees.length})
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
        // onSave={...}
      />
    </div>
  );
}
