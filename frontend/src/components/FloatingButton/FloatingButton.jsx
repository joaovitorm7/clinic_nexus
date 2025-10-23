import React from 'react';
import styles from './FloatingButton.module.css';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function FloatingButton({ to }) {
  // to: string (rota do formulário de cadastro)
  return (
    <Link to={to} className={styles.fab} aria-label="Adicionar">
      <FaPlus size={20} />
    </Link>
  );
}
