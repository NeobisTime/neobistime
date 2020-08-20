import React from 'react'
import ReactDOM from 'react-dom';
import myimage from '../../../images/pages/mail_sent.svg'
import './modal.scss';

const ModalSuccessRecoveryPassword = (props: any) => {

  let container = document.getElementById('portal') as HTMLDivElement;
  return ReactDOM.createPortal(
    <div className='auth modal'>
      <div className="auth__content modal__content">
        <button onClick={props.onClose} className="modal_close">
          +
        </button>
        <div className="auth__title ">
          <p className='auth__title-text modal__title-text'>Проверьте вашу почту!</p>
        </div>
        <div className="auth__title">
          <img src={myimage} className="modal__image" alt='modal__success' />
        </div>
      </div>
    </div>,
    container
  )
}

export default ModalSuccessRecoveryPassword;
