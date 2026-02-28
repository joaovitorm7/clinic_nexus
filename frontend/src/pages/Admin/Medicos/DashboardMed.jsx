import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DashboardMed.module.css';
import { DoctorsService } from '../../../services/doctors.services.js';
import { getAllEspecialidades } from '../../../services/especialidadeService.js';
import DoctorCard from '../../../components/DoctorCard/DoctorCard';
import { FaArrowLeft } from 'react-icons/fa';

export default function DashboardMed() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState(''); 
  const [especialidades, setEspecialidades] = useState([]);
  const [loadingEspecialidades, setLoadingEspecialidades] = useState(true);

  useEffect(() => {
    async function fetchEspecialidades() {
      setLoadingEspecialidades(true);
      try {
        const res = await getAllEspecialidades();
        const payload = res?.data ?? res;
        const list = Array.isArray(payload) ? payload : Array.isArray(payload?.data) ? payload.data : [];
        setEspecialidades(list);
      } catch (err) {
        console.error('Erro ao buscar especialidades:', err);
        setEspecialidades([]);
      } finally {
        setLoadingEspecialidades(false);
      }
    }

    fetchEspecialidades();
  }, []);

  useEffect(() => {
    async function loadDoctors() {
      setLoading(true);
      try {
        let response;
        if (specialtyFilter) {
          response = await DoctorsService.getByEspecialidade(parseInt(specialtyFilter, 10));
        } else {
          response = await DoctorsService.getAll();
        }

        const payload = response?.data ?? response;
        let fetchedDoctors = Array.isArray(payload) ? payload : Array.isArray(payload?.data) ? payload.data : [];

        if (search.trim() !== '') {
          const q = search.toLowerCase();
          fetchedDoctors = fetchedDoctors.filter((doc) => {
            const nome = doc?.funcionario?.nome ?? doc?.nome ?? '';
            const crm = doc?.crm ?? '';
            return nome.toLowerCase().includes(q) || crm.toLowerCase().includes(q);
          });
        }

        setDoctors(fetchedDoctors);
      } catch (error) {
        console.error('Erro ao carregar médicos:', error);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    }

    loadDoctors();
  }, [search, specialtyFilter]);

  return (
    <div className={styles.page}>
      <button
        className={styles.backButton}
        onClick={() => navigate('/administracao')}
        aria-label="Voltar ao dashboard"
      >
        <FaArrowLeft />
      </button>

      <h2 className={styles.title}>Médicos</h2>

      <div className={styles.filters}>
        <select
          value={specialtyFilter}
          onChange={(e) => setSpecialtyFilter(e.target.value)}
        >
          <option value="">Todas especialidades</option>

          {loadingEspecialidades ? (
            <option value="" disabled>Carregando especialidades...</option>
          ) : (
            especialidades.map((esp) => (
              <option key={esp.id} value={String(esp.id)}>
                {esp.nome ?? esp.descricao ?? `Especialidade ${esp.id}`}
              </option>
            ))
          )}
        </select>

        <input
          type="text"
          placeholder="Pesquisar por nome ou CRM..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className={styles.grid}>
        {loading ? (
          <p>Carregando médicos...</p>
        ) : doctors.length === 0 ? (
          <p className={styles.empty}>Nenhum médico encontrado.</p>
        ) : (
          doctors.map((doc) => (
            <DoctorCard
              key={doc.id ?? doc.funcionario?.id}
              doctor={doc}
            />
          ))
        )}
      </div>
    </div>
  );
}
