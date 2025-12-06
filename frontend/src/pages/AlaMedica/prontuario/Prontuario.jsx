import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import { useParams } from 'react-router-dom';
import api from '../../../services/api';
import './Prontuario.css';

export default function Prontuario() {
  const [cpfBuscando, setCpfBuscando] = useState('');
  const [pacienteEncontrado, setPacienteEncontrado] = useState(false); // Flag para saber se achou

  // Dados do paciente
  const [paciente, setPaciente] = useState({
    id: null,
    nome: '',
    cpf: '',
    dataNascimento: '',
    contato: '',
    endereco: ''
  });

    // Lista de consultas do médico e seleção
  const [consultas, setConsultas] = useState([]);
  const [selectedConsulta, setSelectedConsulta] = useState(null);

  // Campo de busca por médico (id/CRM)
  const [medicoBusca, setMedicoBusca] = useState('');

  // Histórico de consultas/atendimentos anteriores - Precisa vim do banco 
  const [historico, setHistorico] = useState([]);

  // Dados do formulário de novo atendimento
  const [novoAtendimento, setNovoAtendimento] = useState({
    dataAtendimento: new Date().toISOString().split('T')[0], // Data atual
    queixa: '',
    anamnese: '',
    examesFisicos: '',
    diagnostico: '',
    evolucao: '',      // descrição da evolução
    conduta: '',        //  o que fazer/tratamento
    encaminhamentos: '', //  se precisa encaminhar
    medicacoes: '',
    observacoes: ''
  });

  const [loading, setLoading] = useState(true);

  const handleSelectConsulta = async (consulta) => {
    setSelectedConsulta(consulta);
    const pacienteObj = consulta.paciente || {};
    setPaciente({
      id: pacienteObj.id || consulta.id_paciente || null,
      nome: pacienteObj.nome || pacienteObj.nome_completo || '',
      cpf: pacienteObj.cpf || '',
      dataNascimento: pacienteObj.dataNascimento || pacienteObj.data_nascimento || '',
      contato: pacienteObj.contato || '',
      endereco: pacienteObj.endereco || ''
    });
    setPacienteEncontrado(true);

    // Atualizar histórico do paciente
    try {
      setLoading(true);
      const resHistorico = await api.get('/agendamentos');
      const all = Array.isArray(resHistorico.data) ? resHistorico.data : [];
      const pacienteId = pacienteObj.id || consulta.id_paciente || consulta.paciente_id;
      const hist = all.filter(a => (a.paciente?.id || a.paciente_id) === pacienteId);
      setHistorico(hist);
    } catch (err) {
      console.warn('Erro ao buscar histórico:', err);
      setHistorico([]);
    } finally {
      setLoading(false);
    }

    // Rolar para o formulário
    setTimeout(() => {
      document.querySelector('.prontuario-formulario')?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  const handleBuscarPorMedico = async (medicoId) => {
    if (!medicoId || !String(medicoId).trim()) {
      alert('Informe o médico (ID ou CRM)');
      return;
    }
    try {
      setLoading(true);
      // Chama a rota que existe no backend
      const res = await api.get(`/agendamentos`);
      console.log('agendamentos recebidos:', res.data);
      const lista = Array.isArray(res.data) ? res.data : [];
      // Filtra no cliente pelos agendamentos cujo médico tem o id informado
      // Ajuste o campo conforme sua estrutura: c.medico?.id ou c.medico?.funcionario?.id se necessário
      const filtradas = lista.filter(c => {
        const medico = c.medico || {};
        // se você está usando CRM em vez de id, adapte aqui
        return String(medico.id) === String(medicoId) || String(medico.funcionario?.id) === String(medicoId);
      });
      setConsultas(filtradas);

      if (filtradas.length > 0) {
        const primeira = filtradas[0];
        setSelectedConsulta(primeira);
        const pacienteObj = primeira.paciente || {};
        setPaciente({
          id: pacienteObj.id || primeira.paciente_id || null,
          nome: pacienteObj.nome || pacienteObj.nome_completo || '',
          cpf: pacienteObj.cpf || '',
          dataNascimento: pacienteObj.dataNascimento || pacienteObj.data_nascimento || '',
          contato: pacienteObj.contato || '',
          endereco: pacienteObj.endereco || ''
        });
        setPacienteEncontrado(true);

        // Buscar histórico: use agendamentos filtrando pelo paciente
        try {
          const resHist = await api.get('/agendamentos');
          const all = Array.isArray(resHist.data) ? resHist.data : [];
          const hist = all.filter(a => (a.paciente?.id || a.paciente_id) === (pacienteObj.id || primeira.paciente_id));
          setHistorico(hist);
        } catch (err) {
          console.warn('Erro ao buscar histórico (agendamentos):', err);
          setHistorico([]);
        }
      } else {
        setSelectedConsulta(null);
        setPaciente({ id: null, nome: '', cpf: '', dataNascimento: '', contato: '', endereco: '' });
        setPacienteEncontrado(false);
        setHistorico([]);
        alert('Nenhuma consulta/agenda encontrada para esse médico');
      }
    } catch (err) {
      console.error('Erro ao buscar agendamentos por médico:', err);
      alert('Erro ao buscar consultas. Veja o console para detalhes.');
    } finally {
      setLoading(false);
    }
  };


  // Função para buscar paciente pelo CPF
  const handleBuscarPaciente = async () => {
    if (!cpfBuscando.trim()) {
      alert('Por favor, digite um CPF');
      return;
    }

    try {
      setLoading(true);

      // Buscar paciente pelo CPF - ROTA CORRIGIDA: /pacientes/cpf/:cpf
      const resPaciente = await api.get(`/pacientes/cpf/${cpfBuscando}`);
      const all = Array.isArray(resHistorico.data) ? resHistorico.data : [];
      const hist = all.filter(a => (a.paciente?.id || a.paciente_id) === pacienteData.id);
      setHistorico(hist);

      // resPaciente.data é um array, pega o primeiro resultado
      const pacienteData = Array.isArray(resPaciente.data)
        ? resPaciente.data[0]
        : resPaciente.data;

      if (!pacienteData) {
        alert('Paciente não encontrado com este CPF');
        return;
      }

      // Preencher dados do paciente
      setPaciente({
        id: pacienteData.id,
        nome: pacienteData.nome || '',
        cpf: pacienteData.cpf || '',
        dataNascimento: pacienteData.dataNascimento || pacienteData.data_nascimento || '',
        contato: pacienteData.contato || '',
        endereco: pacienteData.endereco || ''
      });

      setPacienteEncontrado(true);
      setLoading(false);

      // Buscar histórico de consultas deste paciente
      try {
        const resHistorico = await api.get(`/consultas?id_paciente=${pacienteData.id}`);
        setHistorico(resHistorico.data || []);
      } catch (err) {
        console.warn('Histórico não encontrado ou vazio:', err);
        setHistorico([]);
      }

      // Rolar para o formulário
      setTimeout(() => {
        document.querySelector('.prontuario-formulario')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);

    } catch (err) {
      console.error('Erro ao buscar paciente:', err);
      alert('Erro ao buscar paciente. Verifique o CPF digitado. Erro: ' + err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  // Função para calcular idade
  const calcularIdade = (dataNascimento) => {
    if (!dataNascimento) return '-';
    const hoje = new Date();
    const nasc = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const mes = hoje.getMonth() - nasc.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nasc.getDate())) {
      idade--;
    }
    return idade;
  };

  const handleSubmitAtendimento = async (e) => {
    e.preventDefault();

    try {
      const dados = {
        id_paciente: paciente.id,
        data: new Date(novoAtendimento.dataAtendimento).toISOString(),
        queixa_principal: novoAtendimento.queixa,
        anamnese: novoAtendimento.anamnese,
        exames_fisicos: novoAtendimento.examesFisicos,
        diagnostico: novoAtendimento.diagnostico,
        evolucao: novoAtendimento.evolucao,
        conduta: novoAtendimento.conduta,
        encaminhamentos: novoAtendimento.encaminhamentos,
        medicacoes: novoAtendimento.medicacoes,
        observacoes: novoAtendimento.observacoes,
        status: 'concluído'
      };

      // Enviar para API (criar novo atendimento)
      await api.post('/consultas', dados);

      alert('Atendimento salvo com sucesso!');

      // Limpar formulário
      setNovoAtendimento({
        dataAtendimento: new Date().toISOString().split('T')[0],
        queixa: '',
        anamnese: '',
        examesFisicos: '',
        diagnostico: '',
        evolucao: '',
        conduta: '',
        encaminhamentos: '',
        medicacoes: '',
        observacoes: ''
      });

    } catch (err) {
      console.error('Erro ao salvar:', err);
      alert('Erro ao salvar atendimento');
    }
  };

  return (
    <>
      <Navbar />
      {/* PAINEL DE BUSCA DE PACIENTE */}
      <div className="prontuario-search">
        <div className="search-container">
          <h3>Buscar Consultas por Médico</h3>
          <div className="search-row">
            <input
              type="text"
              placeholder="Digite o ID/CRM do médico"
              value={medicoBusca}
              onChange={(e) => setMedicoBusca(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleBuscarPorMedico(medicoBusca);
              }}
            />
            <button onClick={() => handleBuscarPorMedico(medicoBusca)} disabled={loading}>
              {loading ? 'Buscando...' : 'Buscar consultas'}
            </button>
          </div>
        </div>
      </div>

      {consultas.length > 0 && (
        <section className="consultas-list" style={{ maxWidth: 1200, margin: '12px auto', padding: 12 }}>
          <h4>Consultas encontradas</h4>
          <div className="lista-consultas">
            {consultas.map((c) => (
              <div
                key={c.id}
                className={`consulta-item ${selectedConsulta?.id === c.id ? 'selected' : ''}`}
                onClick={() => handleSelectConsulta(c)}
                style={{ cursor: 'pointer', padding: 10, borderBottom: '1px solid #eee', display: 'flex', gap: 12, alignItems: 'center' }}
              >
                <div style={{ minWidth: 160 }}>
                  {c.data ? new Date(c.data).toLocaleString('pt-BR') : '-'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{c.paciente?.nome || c.paciente_nome || '-'}</div>
                  <div style={{ color: '#666' }}>{c.motivo_consulta || c.motivo || '-'}</div>
                </div>
                <div style={{ minWidth: 100, textAlign: 'right', color: '#333' }}>
                  {c.status || '-'}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CABEÇALHO FIXO - SÓ APARECE APÓS BUSCAR */}
    {pacienteEncontrado && (
      <div className="prontuario-header">
        <div className="paciente-info">
            {selectedConsulta && (
              <div className="consulta-info" style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 12 }}>
                  <div><label>Data da Consulta:</label><div>{new Date(selectedConsulta.data).toLocaleString('pt-BR')}</div></div>
                  <div><label>Motivo:</label><div>{selectedConsulta.motivo_consulta || selectedConsulta.motivo || '-'}</div></div>
                  <div><label>Status:</label><div>{selectedConsulta.status || '-'}</div></div>
                  <div><label>Médico:</label><div>{selectedConsulta.medico?.funcionario?.nome || selectedConsulta.medico?.nome || '-'}</div></div>
                </div>
              </div>
            )}
          <div className="info-group">
            <label>Nome:</label>
            <span>{paciente.nome || '-'}</span>
          </div>
          <div className="info-group">
            <label>CPF:</label>
            <span>{paciente.cpf || '-'}</span>
          </div>
          <div className="info-group">
            <label>Data de Nascimento:</label>
            <span>{paciente.dataNascimento || '-'}</span>
          </div>
          <div className="info-group">
            <label>Idade:</label>
            <span>{calcularIdade(paciente.dataNascimento)} anos</span>
          </div>
          <div className="info-group">
            <label>Contato:</label>
            <span>{paciente.contato || '-'}</span>
          </div>
          <div className="info-group">
            <label>Endereço:</label>
            <span>{paciente.endereco || '-'}</span>
          </div>
        </div>
      </div>
    )}

      <main className="page-prontuario">
        {/* HISTÓRICO DE ATENDIMENTOS */}
        <section className="prontuario-historico">
          <h2>Histórico Médico</h2>

          {historico.length === 0 ? (
            <p className="sem-historico">Nenhum atendimento anterior registrado.</p>
          ) : (
            <div className="lista-historico">
              {historico.map((atendimento) => (
                <div key={atendimento.id} className="historico-item">
                  <div className="historico-header">
                    <span className="data">
                      {new Date(atendimento.data).toLocaleDateString('pt-BR')}
                    </span>
                    <span className="medico">
                      {atendimento.medico?.funcionario?.nome || 'Médico não informado'}
                    </span>
                    <span className="especialidade">
                      {atendimento.medico?.especialidade?.nome || '-'}
                    </span>
                  </div>
                  <div className="historico-conteudo">
                    <p><strong>Diagnóstico:</strong> {atendimento.diagnostico || '-'}</p>
                    <p><strong>Conduta:</strong> {atendimento.conduta || '-'}</p>
                    <p><strong>Observações:</strong> {atendimento.motivo_consulta || '-'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* FORMULÁRIO DE NOVO ATENDIMENTO */}
        <section className="prontuario-formulario">
          <h2>Novo Atendimento</h2>

          <form onSubmit={handleSubmitAtendimento}>

            {/* Linha 1: Data e Queixa */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dataAtendimento">Data do Atendimento:</label>
                <input
                  id="dataAtendimento"
                  type="date"
                  value={novoAtendimento.dataAtendimento}
                  onChange={(e) => setNovoAtendimento({
                    ...novoAtendimento,
                    dataAtendimento: e.target.value
                  })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="queixa">Queixa Principal:</label>
                <input
                  id="queixa"
                  type="text"
                  placeholder="Ex: Dor de cabeça, febre..."
                  value={novoAtendimento.queixa}
                  onChange={(e) => setNovoAtendimento({
                    ...novoAtendimento,
                    queixa: e.target.value
                  })}
                />
              </div>
            </div>

            {/* Campo médio: Anamnese */}
            <div className="form-group">
              <label htmlFor="anamnese">Anamnese (História do Paciente):</label>
              <textarea
                id="anamnese"
                rows="4"
                placeholder="Descreva a história clínica, fatores relevantes..."
                value={novoAtendimento.anamnese}
                onChange={(e) => setNovoAtendimento({
                  ...novoAtendimento,
                  anamnese: e.target.value
                })}
              />
            </div>

            {/* Campo médio: Exames Físicos */}
            <div className="form-group">
              <label htmlFor="examesFisicos">Exames Físicos / Vitais:</label>
              <textarea
                id="examesFisicos"
                rows="4"
                placeholder="Resultados dos exames, sinais vitais, PA, FC, etc..."
                value={novoAtendimento.examesFisicos}
                onChange={(e) => setNovoAtendimento({
                  ...novoAtendimento,
                  examesFisicos: e.target.value
                })}
              />
            </div>

            {/* Campo médio: Diagnóstico */}
            <div className="form-group">
              <label htmlFor="diagnostico">Diagnóstico:</label>
              <textarea
                id="diagnostico"
                rows="4"
                placeholder="Diagnóstico clínico baseado na avaliação..."
                value={novoAtendimento.diagnostico}
                onChange={(e) => setNovoAtendimento({
                  ...novoAtendimento,
                  diagnostico: e.target.value
                })}
              />
            </div>

            {/* CAMPO GRANDE: EVOLUÇÃO */}
            <div className="form-group form-group-grande">
              <label htmlFor="evolucao">Evolução do Paciente:</label>
              <textarea
                id="evolucao"
                rows="8"
                placeholder="Descreva detalhadamente a evolução clínica, como o paciente responde ao tratamento..."
                value={novoAtendimento.evolucao}
                onChange={(e) => setNovoAtendimento({
                  ...novoAtendimento,
                  evolucao: e.target.value
                })}
              />
            </div>

            {/* CAMPO GRANDE: CONDUTA */}
            <div className="form-group form-group-grande">
              <label htmlFor="conduta">Conduta / Tratamento:</label>
              <textarea
                id="conduta"
                rows="8"
                placeholder="Descreva o plano de tratamento, medicações, procedimentos recomendados..."
                value={novoAtendimento.conduta}
                onChange={(e) => setNovoAtendimento({
                  ...novoAtendimento,
                  conduta: e.target.value
                })}
              />
            </div>

            {/* CAMPO GRANDE: ENCAMINHAMENTOS */}
            <div className="form-group form-group-grande">
              <label htmlFor="encaminhamentos">Encaminhamentos:</label>
              <textarea
                id="encaminhamentos"
                rows="8"
                placeholder="Para quais especialistas encaminhar o paciente, se necessário..."
                value={novoAtendimento.encaminhamentos}
                onChange={(e) => setNovoAtendimento({
                  ...novoAtendimento,
                  encaminhamentos: e.target.value
                })}
              />
            </div>

            {/* Campo médio: Medicações */}
            <div className="form-group">
              <label htmlFor="medicacoes">Medicações Prescritas:</label>
              <textarea
                id="medicacoes"
                rows="4"
                placeholder="Medicamento - Dosagem - Frequência"
                value={novoAtendimento.medicacoes}
                onChange={(e) => setNovoAtendimento({
                  ...novoAtendimento,
                  medicacoes: e.target.value
                })}
              />
            </div>

            {/* Campo pequeno: Observações */}
            <div className="form-group">
              <label htmlFor="observacoes">Observações Gerais:</label>
              <textarea
                id="observacoes"
                rows="3"
                placeholder="Outras observações importantes..."
                value={novoAtendimento.observacoes}
                onChange={(e) => setNovoAtendimento({
                  ...novoAtendimento,
                  observacoes: e.target.value
                })}
              />
            </div>

            {/* Botões de ação */}
            <div className="form-actions">
              <button type="submit" className="btn-salvar">Salvar Atendimento</button>
              <button type="reset" className="btn-limpar">Limpar Formulário</button>
            </div>
          </form>
        </section>
      </main>

    {!pacienteEncontrado && !loading && (
      <main className="page-prontuario">
        <div className="mensagem-vazia">
          <p>Digite o CPF do paciente acima e clique em "Buscar" para começar o atendimento</p>
        </div>
      </main>
    )}
    </>
  );
}