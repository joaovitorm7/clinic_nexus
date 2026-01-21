import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { getPatientByCPF, editarPaciente } from '../../../services/pacienteService';
import './EditarPaciente.css';

export default function EditarPaciente() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cpf, setCpf] = useState('');
  const [patient, setPatient] = useState(null);
  const [form, setForm] = useState({ nome:'', data_nascimento:'', contato:'', endereco:'', email:'' });
  const cpfRef = useRef(null);

  const normalizeCPF = (s) => (s||'').replace(/\D/g,'');

  const buscarPorCPF = async () => {
    const raw = normalizeCPF(cpf);
    if (raw.length !== 11) { alert('CPF inválido'); return; }
    setLoading(true);
    try {
      const res = await getPatientByCPF(raw);
      const arr = res?.data ?? res ?? [];
      if (!arr.length) { alert('Paciente não encontrado'); setPatient(null); setLoading(false); return; }
      const p = arr[0];
      setPatient(p);
      setForm({ nome: p.nome || '', data_nascimento: p.data_nascimento || '', contato: p.contato || '', endereco: p.endereco || '', email: p.email || '' });
    } catch (e) { console.error(e); alert('Erro ao buscar'); }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patient?.id) return alert('Busque um paciente primeiro');
    setLoading(true);
    try {
      await editarPaciente(patient.id, {
        nome: form.nome,
        data_nascimento: form.data_nascimento,
        contato: form.contato,
        endereco: form.endereco,
        email: form.email
      });
      alert('Paciente atualizado com sucesso');
      navigate('/recepcao/pacientes'); // ou voltar ao dashboard
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar');
    } finally { setLoading(false); }
  };

  return (
    <div className="page-edit-paciente">
      <button type="button" className="back-button" onClick={() => navigate('/recepcao')} aria-label="Voltar para Recepção">
        <FaArrowLeft size={18} style={{ marginRight: 8 }} /> Voltar
      </button>
      <h1>Editar Paciente</h1>

      <div className="search-row">
        <input ref={cpfRef} value={cpf} onChange={e => setCpf(e.target.value)} placeholder="CPF" />
        <button type="button" onClick={buscarPorCPF} disabled={loading}>Buscar</button>
      </div>

      {patient && (
        <form className="edit-form" onSubmit={handleSubmit}>
          <label>Nome<input value={form.nome} onChange={e => setForm(f => ({...f, nome: e.target.value}))} /></label>
          <label>Data de Nascimento<input type="date" value={form.data_nascimento} onChange={e => setForm(f => ({...f, data_nascimento: e.target.value}))} /></label>
          <label>Contato<input value={form.contato} onChange={e => setForm(f => ({...f, contato: e.target.value}))} /></label>
          <label>Endereço<input value={form.endereco} onChange={e => setForm(f => ({...f, endereco: e.target.value}))} /></label>
          <label>Email<input value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} /></label>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/recepcao')}>Cancelar</button>
            <button type="submit" disabled={loading}>Salvar</button>
          </div>
        </form>
      )}
    </div>
  );
}
