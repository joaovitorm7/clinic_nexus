import React, { useState, useEffect } from 'react';
import { getAgendamentos } from '../../../services/agendamentoService';
import { getPatientById } from '../../../services/pacienteService';
import './Consulta.css';

const Consultas = () => {
  const [consultas, setConsultas] = useState([]);
  const [pacientes, setPacientes] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Buscar todas as consultas
        const consultasData = await getAgendamentos();
        setConsultas(consultasData);

        // 2️⃣ Criar mapa de pacientes
        const pacientesMap = {};
        const uniqueIds = [...new Set(
          consultasData
            .map(c => c.id_paciente)
            .filter(Boolean) // remove null ou undefined
        )];

        // 3️⃣ Buscar cada paciente pelo ID
        await Promise.all(uniqueIds.map(async (id) => {
          try {
            const res = await getPatientById(id);
            pacientesMap[id] = res.data.nome;
          } catch (err) {
            pacientesMap[id] = 'Não encontrado';
          }
        }));

        setPacientes(pacientesMap);

      } catch (err) {
        console.error('Erro ao carregar consultas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Carregando consultas...</p>;

  return (
    <div className="page-consultas">
      <h1>Consultas Agendadas</h1>
      {consultas.length === 0 ? (
        <p>Nenhuma consulta encontrada.</p>
      ) : (
        <table className="consultas-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Paciente</th>
              <th>Médico</th>
              <th>Especialidade</th>
              <th>Data / Hora</th>
              <th>Status</th>
              <th>Observações</th>
            </tr>
          </thead>
        <tbody>
    {consultas.map((c) => (
    <tr key={c.id}>
      <td>{c.id}</td>
      <td>{c.paciente ? c.paciente.nome : 'Não encontrado'}</td>
      <td>{c.id_medico ?? '-'}</td>
      <td>{c.especialidade ?? '-'}</td>
      <td>{new Date(c.data).toLocaleString()}</td>
      <td>{c.status}</td>
      <td>{c.motivo_consulta ?? '-'}</td>
    </tr>
  ))}
    </tbody>
        </table>
      )}
    </div>
  );
};

export default Consultas;