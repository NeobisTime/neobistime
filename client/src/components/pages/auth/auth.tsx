import React, { useState } from "react";
import designPhoto from '../../../images/pages/authentication.svg';
import '../../../styles/pages/_auth.scss'
import { Link } from "react-router-dom";

const Authorization: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  async function handleSubmit(event: any) {
    event.preventDefault();
    const data = { email, password };
  }

  return (
    <div className='auth'>
      <div className="auth__content">
        <div className="auth__title">
          <p className='auth__title-text'>Добро пожаловать в Neobis Time</p>
          <p className='auth__title-description'>Войдите, чтобы продолжить</p>
        </div>
        <section className="auth__section" >
          <form className="auth__form" onSubmit={handleSubmit}>
            <label className="auth__label" htmlFor="email">E-mail</label>
            <input
              className="auth__input"
              type="text"
              name="email"
              required
              value={email}
              onChange={handleChangeEmail}
            />

            <label className="auth__label" htmlFor="password">Пароль</label>
            <input
              className="auth__input auth__input_password"
              type="password"
              name="password"
              required
              value={password}
              onChange={handleChangePassword}
            />
            <div className="auth__text_position">
              <span className="auth__text_small_grey">Забыли пароль?</span>
              <Link to='/recovery_password'>
                <span className="auth__text_small_green">Восстановить</span>
              </Link>
            </div>
            <div className="auth__text_position auth__text_position_last">
              <button className="auth__submit" type="submit">Войти</button>
              <span className="auth__text_small_grey auth__text_small_grey_last">Еще нет аккаунта?</span>
              <Link to='/registration'>
                <span className="auth__text_small_green auth__text_small_green_last">Зарегистрироваться</span>
              </Link>
            </div>
          </form>
        </section >
        <section className="auth__section">
          <img src={designPhoto} className='auth__image' alt="girl introducin login" />
        </section>
      </div>
    </div>
  );
};

export default Authorization;
