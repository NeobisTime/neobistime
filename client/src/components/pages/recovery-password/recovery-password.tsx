import React, { useState } from 'react'
import designPhoto from '../../../images/pages/forgot_password_gi2d.svg';
import ModalSuccessRecoveryPassword from './modal';


const RecoveryPassword = () => {
  const [email, setEmail] = useState<string>("");
  let [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    const data = { email };
    toggleModal();
  }

  return (
    <div className="auth recovery">
      <div className="auth__content">
        <div className="auth__title">
          <p className='auth__title-text'>Мы отправим код восстановления на вашу почту</p>
        </div>
        <section className="auth__section" >
          <form className="recovery__form" onSubmit={handleSubmit}>
            <label className="recovery__label" htmlFor="email">Электронная почта</label>
            <input
              className="auth__input"
              type="text"
              name="email"
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
            />
            <button className="button recovery__submit" type="submit">Отправить</button>
          </form>
        </section >
        <section className="auth__section">
          <img src={designPhoto} className='auth__image' alt="girl introducin login" />
        </section>

        {isModalOpen && <ModalSuccessRecoveryPassword onClose={toggleModal} />}
      </div>
    </div>
  )
}

export default RecoveryPassword
