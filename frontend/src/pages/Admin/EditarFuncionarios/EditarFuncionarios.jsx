import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import api from '../../../services/api';
import './EditarFuncionarios.css';

export default function EditarFuncionarios() {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState('cpf'); // 'cpf' ou 'nome'
  const [searchValue, setSearchValue] = useState('');
  const [funcionario, setFuncionario] = useState(null);
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    cargo: '',
    email: '',
    telefone: '',
    endereco: ''
  });
  const [loading, setLoading] = useState(false);

  const normalizeCPF = (s) => (s || '').replace(/\D/g, '');

  // Função para buscar funcionário por CPF ou Nome
  const buscarFuncionario = async () => {
    if (!searchValue.trim()) {
      alert('Digite um ' + (searchType === 'cpf' ? 'CPF' : 'nome') + ' para buscar');
      return;
    }

    setLoading(true);
    try {
      let res;
      if (searchType === 'cpf') {
        const raw = normalizeCPF(searchValue);
        if (raw.length !== 11) {
          alert('CPF inválido (deve ter 11 dígitos)');
          setLoading(false);
          return;
        }
        // Busque pela sua API de funcionários (ajuste a rota conforme seu backend)
        res = await api.get(`/funcionarios/cpf/${raw}`);
      } else {
        // Busque por nome
        res = await api.get(`/funcionarios/nome/${searchValue}`);
      }

      const arr = res?.data ?? [];
      if (!arr.length) {
        alert('Funcionário não encontrado');
        setFuncionario(null);
        setLoading(false);
        return;
      }

      // Pegue o primeiro resultado
      const f = Array.isArray(arr) ? arr[0] : arr;
      setFuncionario(f);
      setForm({
        nome: f.nome || '',
        cpf: f.cpf || '',
        cargo: f.cargo || '',
        email: f.email || '',
        telefone: f.telefone || '',
        endereco: f.endereco || ''
      });
    } catch (err) {
      console.error(err);
      alert('Erro ao buscar funcionário: ' + (err.response?.data?.message || 'Tente novamente'));
    } finally {
      setLoading(false);
    }
  };

  // Função para salvar edição
  const handleSalvar = async (e) => {
    e.preventDefault();
    if (!funcionario?.id) {
      alert('Busque um funcionário primeiro');
      return;
    }

    setLoading(true);
    try {
      await api.put(`/funcionarios/${funcionario.id}`, {
        nome: form.nome,
        cargo: form.cargo,
        email: form.email,
        telefone: form.telefone,
        endereco: form.endereco
        // Não edite CPF (geralmente imutável)
      });
      alert('Funcionário atualizado com sucesso!');
      navigate('/funcionarios');
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar: ' + (err.response?.data?.message || 'Tente novamente'));
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
        aria-label="Voltar para Administração"
      >
        <FaArrowLeft size={18} style={{ marginRight: 8 }} /> Voltar
      </button>

      <h1>Editar Funcionário</h1>

      {/* Seção de Busca */}
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
            placeholder={searchType === 'cpf' ? 'Digite o CPF' : 'Digite o nome'}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && buscarFuncionario()}
          />
          <button type="button" onClick={buscarFuncionario} disabled={loading}>
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
      </div>

      {/* Formulário de Edição (aparece após encontrar funcionário) */}
      {funcionario && (
        <form className="edit-form" onSubmit={handleSalvar}>
          <h2>Dados de {form.nome}</h2>

          <div className="form-group">
            <label>
              Nome
              <input
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
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
                onChange={(e) => setForm({ ...form, cargo: e.target.value })}
              />
            </label>

            <label>
              Email
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </label>

            <label>
              Telefone
              <input
                value={form.telefone}
                onChange={(e) => setForm({ ...form, telefone: e.target.value })}
              />
            </label>

            <label>
              Endereço
              <input
                value={form.endereco}
                onChange={(e) => setForm({ ...form, endereco: e.target.value })}
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