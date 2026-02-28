import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams  } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './EditarFuncionarios.css';
import { employeeService } from '../../../services/employees.services';
import { DoctorsService } from '../../../services/doctors.services';
import { getAllEspecialidades } from '../../../services/especialidadeService.js';


export default function EditarFuncionarios() {
  const navigate = useNavigate();

  const [searchType, setSearchType] = useState('cpf');
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [funcionario, setFuncionario] = useState(null);
  
  // autocomplete
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchInputRef = useRef(null);

  // especialidades
  const [especialidades, setEspecialidades] = useState([]);
  const [isMedico, setIsMedico] = useState(false);
  const [formMedico, setFormMedico] = useState({
    crm: '',
    especialidadeId: '',
  });

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    cargo: '',
    email: '',
    telefone: '',
    endereco: '',
  });

  useEffect(() => {
    async function loadEspecialidades() {
      try {
        const res = await getAllEspecialidades();
        const list = res?.data ?? res;
        setEspecialidades(Array.isArray(list) ? list : []);
      } catch (err) {
        console.error('Erro ao carregar especialidades:', err);
      }
    }
    loadEspecialidades();
  }, []);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const emp = await employeeService.getEmployeeById(id);
        if (!mounted) return;
        setFuncionario(emp);
        
        const isMedicoFunc = emp.cargo?.toLowerCase() === 'médico' || emp.cargo?.toLowerCase() === 'medico';
        setIsMedico(isMedicoFunc);
        
        if (isMedicoFunc && emp.medico) {
          setFormMedico({
            crm: emp.medico.crm || '',
            especialidadeId: emp.medico.especialidade?.id || '',
          });
        }
        
        setForm({
          nome: emp.nome || '',
          cpf: emp.cpf || '',
          cargo: emp.cargo || '',
          email: emp.usuarios?.[0]?.email || '',
          telefone: emp.telefone || '',
          endereco: emp.endereco || '',
        });
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  const normalizeCPF = (s) => (s || '').replace(/\D/g, '');

  // busca sugestões de médicos pelo nome
  useEffect(() => {
    if (searchType === 'nome') {
      const fetchSuggestions = async () => {
        const q = searchValue.trim();
        if (q.length < 2) {
          setSuggestions([]);
          setShowSuggestions(false);
          return;
        }
        
        try {
          const res = await DoctorsService.getByNome(q);
          const medicos = Array.isArray(res) ? res : res?.data || [];
          setSuggestions(medicos);
          setShowSuggestions(medicos.length > 0);
        } catch (err) {
          console.error('Erro ao buscar sugestões:', err);
        }
      };
      
      const timeoutId = setTimeout(fetchSuggestions, 300);
      return () => clearTimeout(timeoutId);
    } else if (searchType === 'cpf') {
      const fetchSuggestions = async () => {
        const q = normalizeCPF(searchValue);
        if (q.length < 3) {
          setSuggestions([]);
          setShowSuggestions(false);
          return;
        }
        
        try {
          const res = await employeeService.getEmployees();
          const allEmployees = Array.isArray(res) ? res : res?.data || [];
          const filtered = allEmployees.filter(e => 
            e.cpf && String(e.cpf).replace(/\D/g, '').includes(q)
          );
          setSuggestions(filtered);
          setShowSuggestions(filtered.length > 0);
        } catch (err) {
          console.error('Erro ao buscar sugestões:', err);
        }
      };
      
      const timeoutId = setTimeout(fetchSuggestions, 300);
      return () => clearTimeout(timeoutId);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchValue, searchType]);

  // fecha sugestões ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchInputRef.current && !searchInputRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const buscarFuncionario = async () => {
    if (!searchValue.trim()) return;
 
    try {
      setLoading(true);

      let res;

      if (searchType === 'cpf') {
        const cpf = normalizeCPF(searchValue);
        res = await employeeService.FindByCpf(cpf);
      } else {
        res = await employeeService.FindByName(searchValue);
      }

      const data = res?.data ?? res;

      if (!data) {
        setFuncionario(null);
        return;
      }

      setFuncionario(data);
      
      const isMedicoFunc = data.cargo?.toLowerCase() === 'médico' || data.cargo?.toLowerCase() === 'medico';
      setIsMedico(isMedicoFunc);
      
      if (isMedicoFunc && data.medico) {
        setFormMedico({
          crm: data.medico.crm || '',
          especialidadeId: data.medico.especialidade?.id || '',
        });
      } else {
        setFormMedico({ crm: '', especialidadeId: '' });
      }
      
      setForm({
        nome: data.nome ?? '',
        cpf: data.cpf ?? '',
        cargo: data.cargo ?? '',
        email: data.usuarios?.[0]?.email ?? '',
        telefone: data.telefone ?? '',
        endereco: data.endereco ?? '',
      });
    } catch (err) {
      console.error('Erro ao buscar funcionário:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    if (searchType === 'nome') {
      const medico = suggestion;
      const nomeFuncionario = medico.funcionario?.nome || medico.nome;
      setSearchValue(nomeFuncionario);
      setShowSuggestions(false);
      const fetchFuncionario = async () => {
        try {
          setLoading(true);
          const employeeId = medico.funcionario?.id || medico.funcionarioId || medico.id;
          const emp = await employeeService.getEmployeeById(employeeId);
          setFuncionario(emp);
          
          const isMedicoFunc = emp.cargo?.toLowerCase() === 'médico' || emp.cargo?.toLowerCase() === 'medico';
          setIsMedico(isMedicoFunc);
          
          if (isMedicoFunc && emp.medico) {
            setFormMedico({
              crm: emp.medico.crm || '',
              especialidadeId: emp.medico.especialidade?.id || '',
            });
          } else {
            setFormMedico({ crm: '', especialidadeId: '' });
          }
          
          setForm({
            nome: emp.nome || '',
            cpf: emp.cpf || '',
            cargo: emp.cargo || '',
            email: emp.usuarios?.[0]?.email || '',
            telefone: emp.telefone || '',
            endereco: emp.endereco || '',
          });
        } catch (err) {
          console.error('Erro ao carregar funcionário:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchFuncionario();
    } else {
      const emp = suggestion;
      const cpfFormatado = emp.cpf || '';
      setSearchValue(cpfFormatado);
      setShowSuggestions(false);
      setFuncionario(emp);
      
      const isMedicoFunc = emp.cargo?.toLowerCase() === 'médico' || emp.cargo?.toLowerCase() === 'medico';
      setIsMedico(isMedicoFunc);
      
      if (isMedicoFunc && emp.medico) {
        setFormMedico({
          crm: emp.medico.crm || '',
          especialidadeId: emp.medico.especialidade?.id || '',
        });
      } else {
        setFormMedico({ crm: '', especialidadeId: '' });
      }
      
      setForm({
        nome: emp.nome || '',
        cpf: emp.cpf || '',
        cargo: emp.cargo || '',
        email: emp.usuarios?.[0]?.email || '',
        telefone: emp.telefone || '',
        endereco: emp.endereco || '',
      });
    }
  };

  
const handleSalvar = async (e) => {
  e.preventDefault();
  console.log('handleSalvar disparado', form, formMedico);
  setLoading(true);
  try {
    const payload = {
      ...form,
      ...(isMedico && {
        crm: formMedico.crm,
        especialidadeId: formMedico.especialidadeId ? parseInt(formMedico.especialidadeId, 10) : undefined,
      }),
    };
    await employeeService.updateEmployee(funcionario.id, payload);
    console.log('Salvou!');
    navigate('/funcionarios');
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="page-editar-funcionarios">
      <button
        type="button"
        className="back-button"
        onClick={() => navigate('/administracao')}
      >
        <FaArrowLeft size={18} style={{ marginRight: 8 }} />
        Voltar
      </button>

      <h1>Editar Funcionário</h1>

      {!id && (
      <div className="search-section">
        <div className="search-type">
          <label>
            <input
              type="radio"
              value="cpf"
              checked={searchType === 'cpf'}
              onChange={(e) => {
                setSearchType(e.target.value);
                setSearchValue('');
                setFuncionario(null);
              }}
            />
            Buscar por CPF
          </label>

          <label>
            <input
              type="radio"
              value="nome"
              checked={searchType === 'nome'}
              onChange={(e) => {
                setSearchType(e.target.value);
                setSearchValue('');
                setFuncionario(null);
              }}
            />
            Buscar por Nome
          </label>
        </div>

        <div className="search-row" ref={searchInputRef}>
          <input
            type="text"
            placeholder={
              searchType === 'cpf' ? 'Digite o CPF' : 'Digite o nome'
            }
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && buscarFuncionario()}
            onFocus={() => searchType === 'nome' && suggestions.length > 0 && setShowSuggestions(true)}
          />
          
          {showSuggestions && (
            <ul className="suggestions-list">
              {suggestions.map((item) => (
                <li 
                  key={searchType === 'nome' ? item.id : item.id} 
                  onClick={() => handleSelectSuggestion(item)}
                >
                  {searchType === 'nome' ? (
                    <>
                      <strong>{item.funcionario?.nome || item.nome}</strong>
                      {item.especialidade?.nome && <span> - {item.especialidade.nome}</span>}
                    </>
                  ) : (
                    <>
                      <strong>{item.nome}</strong>
                      <span> - CPF: {item.cpf}</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}

          <button type="button" onClick={buscarFuncionario} disabled={loading}>
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
      </div>
      )}

      {funcionario && (
        <form className="edit-form" onSubmit={handleSalvar}>
          <h2>Dados de {form.nome}</h2>

          <div className="form-group">
            <label>
              Nome
              <input
                value={form.nome}
                onChange={(e) =>
                  setForm((p) => ({ ...p, nome: e.target.value }))
                }
              />
            </label>

            <label>
              CPF (não editável)
              <input value={form.cpf} disabled />
            </label>

            <label>
              Cargo
              <input
                value={form.cargo}
                onChange={(e) =>
                  setForm((p) => ({ ...p, cargo: e.target.value }))
                }
              />
            </label>

            <label>
              Email
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
              />
            </label>

            <label>
              Telefone
              <input
                value={form.telefone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, telefone: e.target.value }))
                }
              />
            </label>

            <label>
              Endereço
              <input
                value={form.endereco}
                onChange={(e) =>
                  setForm((p) => ({ ...p, endereco: e.target.value }))
                }
              />
            </label>
          </div>

          {isMedico && (
            <div className="form-group">
              <h3>Dados do Médico</h3>
              
              <label>
                CRM
                <input
                  value={formMedico.crm}
                  onChange={(e) =>
                    setFormMedico((p) => ({ ...p, crm: e.target.value }))
                  }
                />
              </label>

              <label>
                Especialidade
                <select
                  value={formMedico.especialidadeId}
                  onChange={(e) =>
                    setFormMedico((p) => ({ ...p, especialidadeId: e.target.value }))
                  }
                >
                  <option value="">Selecione uma especialidade</option>
                  {especialidades.map((esp) => (
                    <option key={esp.id} value={esp.id}>
                      {esp.nome}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/funcionarios')}>
              Cancelar
            </button>
            <button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
