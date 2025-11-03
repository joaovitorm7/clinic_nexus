import React, { useEffect, useState } from 'react';
import styles from './DashboardMed.module.css';
import { getDoctors } from '../../../services/doctors.services.js';
import DoctorCard from '../../../components/DoctorCard/DoctorCard';

export default function DashboardMed() {
const [doctors, setDoctors] = useState([]);
const [loading, setLoading] = useState(true);
const [search, setSearch] = useState('');
const [specialtyFilter, setSpecialtyFilter] = useState('');

useEffect(() => {
async function loadDoctors() {
    setLoading(true);
    try {
    const params = {
        q: search || undefined,
        specialty: specialtyFilter || undefined,
    };
    const res = await getDoctors(params);
    setDoctors(res.data || []);
    } catch (err) {
    console.error(err);
    } finally {
    setLoading(false);
    }
}

loadDoctors();
}, [search, specialtyFilter]);

return (
<div className={styles.page}>
    <h2 className={styles.title}>Médicos</h2>

    <div className={styles.filters}>
    <select value={specialtyFilter} onChange={e => setSpecialtyFilter(e.target.value)}>
        <option value="">Todas especialidades</option>
        <option value="Cardiologia">Cardiologia</option>
        <option value="Dermatologia">Dermatologia</option>
        <option value="Ortopedia">Ortopedia</option>
        <option value="Pediatria">Pediatria</option>
    </select>

    <input
        type="text"
        placeholder="Pesquisar por nome..."
        value={search}
        onChange={e => setSearch(e.target.value)}
    />
    </div>

    <div className={styles.grid}>
    {loading ? (
        <p>Carregando médicos...</p>
    ) : doctors.length === 0 ? (
        <p>Nenhum médico encontrado.</p>
    ) : (
        doctors.map(doc => (
        <DoctorCard key={doc.id} doctor={doc} />
        ))
    )}
    </div>
</div>
);
}