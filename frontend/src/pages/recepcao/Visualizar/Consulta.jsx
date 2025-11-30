import React, { useState, useEffect } from 'react';
import { getAgendamentos } from '../../../services/agendamentoService';
import './Consulta.css';

const Consultas = () => {
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const consultasData = await getAgendamentos();
        setConsultas(consultasData || []);
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
            {consultas.map((c) => {
              const pacienteNome = c.paciente?.nome ?? 'Não encontrado';

              const medicoNome =
                c.medico?.funcionario?.nome ??
                'Não informado';

              const especialidadeNome =
                c.medico?.especialidade?.nome ??
                'Não informado';

              const dataStr = c.data
                ? new Date(c.data).toLocaleString()
                : '-';

              return (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{pacienteNome}</td>
                  <td>{medicoNome}</td>               {/* Médico = funcionário */}
                  <td>{especialidadeNome}</td>         {/* Especialidade */}
                  <td>{dataStr}</td>
                  <td>{c.status ?? '-'}</td>
                  <td>{c.motivo_consulta ?? c.motivo ?? '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Consultas;
