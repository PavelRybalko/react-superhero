import React from 'react';
import ReactDOM from 'react-dom';
import { CgClose } from 'react-icons/cg';
import s from './Modal.module.css';

const styles = {
  marginRight: 6,
};

// const modalRoot = document.querySelector('#modal-root');
const modalRoot = document.getElementById('modal-root');

export default function Modal({ setEditHero, active, setActive, children }) {
  const handleCloseModal = () => {
    setEditHero(null);
    setActive(false);
  };

  return ReactDOM.createPortal(
    <div
      className={active ? `${s.modal} ${s.active}` : s.modal}
      onClick={handleCloseModal}
    >
      <div
        className={active ? `${s.modalContent} ${s.active}` : s.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={s.modalCloseButton} onClick={handleCloseModal}>
          <CgClose size="26" style={styles} />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
}
