import React from 'react';
import styles from './EmployeeCard.module.css';
import { FaEye, FaPencilAlt } from 'react-icons/fa';

export default function EmployeeCard({ employee, onEdit, onView }) {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.avatar}>
          {/* opcional: iniciais do nome */}
          {employee.full_name ? employee.full_name.split(' ').map(n=>n[0]).slice(0,2).join('') : 'EU'}
        </div>
        <div className={styles.info}>
          <h4>{employee.full_name}</h4>
          <small>{employee.username} • {employee.email || '—'}</small>
        </div>
        <div className={styles.actions}>
          <button onClick={() => onView(employee)} aria-label="Visualizar"><FaEye /></button>
          <button onClick={() => onEdit(employee)} aria-label="Editar"><FaPencilAlt /></button>
        </div>
      </div>
      <div className={styles.bottom}>
        <span className={styles.role}>{employee.role_name || '—'}</span>
      </div>
    </div>
  );
}
