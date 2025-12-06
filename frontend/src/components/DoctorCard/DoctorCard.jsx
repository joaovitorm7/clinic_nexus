import React from 'react';
import styles from './DoctorCard.module.css';

export default function DoctorCard({ doctor }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.name}>{doctor.funcionario?.nome}</h3>

      <p className={styles.crm}>
        <strong>CRM:</strong> {doctor.crm}
      </p>

      <p className={styles.specialty}>
        <strong>Especialidade:</strong> {doctor.especialidade?.nome}
      </p>
    </div>
  );
}
