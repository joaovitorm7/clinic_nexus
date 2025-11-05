import React, { useEffect, useState } from 'react';
import { employeeService } from './services/employees.services';

export default function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadEmployees() {
    setLoading(true);
    try {
      const data = await employeeService.getEmployees(); // já retorna array
      setEmployees(data || []);
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar funcionários.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Funcionários</h2>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && employees.length === 0 && <p>Nenhum funcionário encontrado.</p>}

      {!loading && employees.length > 0 && (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Tipo</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.nome}</td>
                <td>{emp.email}</td>
                <td>{emp.tipo}</td>
                <td>{emp.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
