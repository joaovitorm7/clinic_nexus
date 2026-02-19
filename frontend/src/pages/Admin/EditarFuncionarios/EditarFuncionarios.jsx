import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams  } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './EditarFuncionarios.css';
import { employeeService } from '../../../services/employees.services';


export default function EditarFuncionarios() {
  const navigate = useNavigate();

  const [searchType, setSearchType] = useState('cpf');
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [funcionario, setFuncionario] = useState(null);

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
    if (!id) return;
    let mounted = true;
    (async () => {
      try {
        const emp = await employeeService.getEmployeeById(id);
        if (!mounted) return;
        // preencher o state/inputs do formulário com emp
        setForm({
          nome: emp.nome || '',
          cpf: emp.cpf || '',
          cargo: '',
          email: '',
          telefone: '',
          endereco: '',
        });
      } catch (err) {
        console.error(err);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  const normalizeCPF = (s) => (s || '').replace(/\D/g, '');


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
      setForm({
        nome: data.nome ?? '',
        cpf: data.cpf ?? '',
        cargo: data.cargo ?? '',
        email: data.usuarios?.[0]?.email ?? '',
        telefone: data.telefone ?? '',
      });
    } catch (err) {
      console.error('Erro ao buscar funcionário:', err);
    } finally {
      setLoading(false);
    }
  };

  
const handleSalvar = async (e) => {
  e.preventDefault();
  console.log('handleSalvar disparado', form);
  setLoading(true);
  try {
    await employeeService.updateEmployee(funcionario.id, form);
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

        <div className="search-row">
          <input
            type="text"
            placeholder={
              searchType === 'cpf' ? 'Digite o CPF' : 'Digite o nome'
            }
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && buscarFuncionario()}
          />

          <button type="button" onClick={buscarFuncionario} disabled={loading}>
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
      </div>

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
