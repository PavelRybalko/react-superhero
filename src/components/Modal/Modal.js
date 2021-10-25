import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CgClose } from 'react-icons/cg';
import s from './Modal.module.css';

const styles = {
  marginRight: 6,
};

// const modalRoot = document.querySelector('#modal-root');
const modalRoot = document.getElementById('modal-root');

export default function Modal({ active, setActive, children }) {
  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (e.code === 'Escape') {
  //       setActive(false);
  //     }
  //   };

  //   window.addEventListener('keydown', handleKeyDown);
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, []);

  return ReactDOM.createPortal(
    <div
      className={active ? `${s.modal} ${s.active}` : s.modal}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? `${s.modalContent} ${s.active}` : s.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={s.modalCloseButton} onClick={() => setActive(false)}>
          <CgClose size="26" style={styles} />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
}
