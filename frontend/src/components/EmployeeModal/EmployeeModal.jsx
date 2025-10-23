import React from 'react';
import Modal from 'react-modal';
import styles from './EmployeeModal.module.css';

Modal.setAppElement('#root'); // acessibilidade

export default function EmployeeModal({ isOpen, onRequestClose, mode = 'view', employee, onSave }) {
  // mode: 'view' or 'edit'
  // for 'edit' you can render a form and call onSave(updatedData)
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className={styles.modal} overlayClassName={styles.overlay}>
      <button onClick={onRequestClose} className={styles.close}>Fechar</button>
      {mode === 'view' ? (
        <div>
          <h2>{employee?.full_name}</h2>
          <p><strong>Usuário:</strong> {employee?.username}</p>
          <p><strong>Email:</strong> {employee?.email}</p>
          <p><strong>Telefone:</strong> {employee?.phone}</p>
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
