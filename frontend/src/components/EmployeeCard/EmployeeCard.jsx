import React from 'react';
import styles from './EmployeeCard.module.css';
import { FaEye, FaPencilAlt } from 'react-icons/fa';

export default function EmployeeCard({ employee, onView, onEdit, selectMode, selected, onSelect }) {
  return (
    <div className={`${styles.card} ${selected ? styles.selected : ''}`}>
      {selectMode && (
        <div className={styles.selectCircle} onClick={onSelect}>
          {selected && <span className={styles.innerCircle}></span>}
        </div>
      )}
      <div className={styles.cardContent} onClick={() => !selectMode && onView(employee)}>
        <h3>{employee.full_name}</h3>
        <p>{employee.role}</p>
      </div>
      {!selectMode && (
        <button onClick={() => onEdit(employee)} className={styles.editBtn}>Editar</button>
      )}
    </div>
  );
}

