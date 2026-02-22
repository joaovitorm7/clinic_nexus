import React from 'react';
import Modal from 'react-modal';
import styles from './EmployeeModal.module.css';

Modal.setAppElement('#root'); // acessibilidade

export default function EmployeeModal({ isOpen, onRequestClose, mode = 'view', employee, onSave }) {
  
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className={styles.modal} overlayClassName={styles.overlay}>

      <div className={styles.modalHeader}>
        <h3>Informações do Funcionário</h3>
        <button onClick={onRequestClose} className={styles.closeButton} aria-label="Fechar">✕</button>
      </div>

      {mode === 'view' ? (
        <div className={styles.content}>
          <div className={styles.header}>
            <h2>{employee?.nome}</h2>
          </div>
          <div className={styles.infoGroup}>
            <label>CPF</label>
            <p>{employee?.cpf}</p>
          </div>
          <div className={styles.infoGroup}>
            <label>Email</label>
            <p>{employee?.email}</p>
          </div>
          <div className={styles.infoGroup}>
            <label>Telefone</label>
            <p>{employee?.telefone}</p>
          </div>
          <div className={styles.infoGroup}>
            <label>Cargo</label>
            <p>{employee?.cargo}</p>
          </div>
        </div>
      ) : (
        <div>
          {/* renderize um formulário aqui (ou importe AddEmployeeForm e passe props) */}
          <p>Formulário de edição (implementar)</p>
        </div>
      )}
    </Modal>
  );
}
