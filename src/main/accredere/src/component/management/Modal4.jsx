// Modal.js
import React from "react";
import Styles from '../../css/Management/Modal4.css'

function Modal(props) {

function closeModal() {
    props.closeModal();
  }

  return (
    <div className="Modal" onClick={closeModal}>
      <div className="modalBody_4" onClick={(e) => e.stopPropagation()}>
        <button id="modalCloseBtn" onClick={closeModal}>
          ✖
        </button>
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
