import React, { useState } from "react";
import designPhoto from "../../../images/pages/authentication.svg";
import "../../../styles/pages/_auth.scss";
import { Link } from "react-router-dom";
import eye from "../../../images/pages/password_eye.svg";

const Authorization: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hidden1, setHidden1] = useState<boolean>(true);

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    validate();
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  // validate
  const [errors, setErrors] = useState({
    emailError: "",
  });
  const validate = () => {
    const errors = {
      emailError: "",
    };
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setErrors({ ...errors, emailError: "Неправильный email" });
    } else {
      setErrors({ ...errors, emailError: "" });
    }
    return errors;
  };
  async function handleSubmit(event: any) {
    event.preventDefault();
    const data = { email, password };
    validate();

    
  }

  return (
    <div className="auth">
      <div className="auth__content">
        <div className="auth__title">
          <p className="auth__title-text">Добро пожаловать в Neobis Time</p>
          <p className="auth__title-description">Войдите, чтобы продолжить</p>
        </div>
        <section className="auth__section">
          <form className="auth__form" onSubmit={handleSubmit}>
            <label className="auth__label" htmlFor="email">
              E-mail
            </label>
            <input
              className="auth__input"
              type="text"
              name="email"
              required
              value={email}
              onChange={handleChangeEmail}
              onBlur={validate}
            />
            {errors && <div className="error__span">{errors.emailError}</div>}

            <label className="auth__label" htmlFor="password">
              Пароль
            </label>
            <div className="registration__password" style={{ height: "43px" }}>
              <input
                className="registration__password-input"
                type={hidden1 ? "password" : "text"}
                minLength={8}
                name="password"
                required
                value={password}
                onChange={handleChangePassword}
              />
              <img
                onClick={() => {
                  setHidden1(!hidden1);
                }}
                src={eye}
                alt="eye"
                className="registration__password-image"
              />
            </div>
            <div className="auth__text_position">
              <span className="auth__text_small_grey">Забыли пароль?</span>
              <Link to="/recovery_password">
                <span className="auth__text_small_green">Восстановить</span>
              </Link>
            </div>
            <div className="auth__text_position auth__text_position_last">
              <button className="auth__submit" type="submit">
                Войти
              </button>
              <span className="auth__text_small_grey auth__text_small_grey_last">
                Еще нет аккаунта?
              </span>
              <Link to="/registration">
                <span className="auth__text_small_green auth__text_small_green_last">
                  Зарегистрироваться
                </span>
              </Link>
            </div>
          </form>
        </section>
        <section className="auth__section">
          <img
            src={designPhoto}
            className="auth__image"
            alt="girl introducin login"
          />
        </section>
      </div>
    </div>
  );
};

export default Authorization;
