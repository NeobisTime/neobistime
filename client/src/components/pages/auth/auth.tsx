import React, { useState } from "react";
import designPhoto from "../../../images/pages/authentication.svg";
import "../../../styles/pages/_auth.scss";
import { Link } from "react-router-dom";
import eye from "../../../images/pages/password_eye.svg";
import API, { getCookie } from "../../../API";
import Alert from "../../shared/alert";

const Authorization: React.FC = (props: any) => {
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

  const [alertType, setAlertType] = useState("success");
  const [alertText, setAlertText] = useState("");
  let [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const toggleAlertOpen = () => {
    setIsAlertOpen(!isAlertOpen);
  };
  const openAlert = (response: any) => {
    if (response.status >= 200 && response.status <= 299) {
      setAlertType("success");
      setAlertText("Проверьте почту");
    } else {
      setAlertType("error");
      setAlertText(response.response || "непредвиденная ошибка");
    }
    setIsAlertOpen(true);
    setTimeout(() => {
      setIsAlertOpen(false);
    }, 3000);
  };

  async function handleSubmit(event: any) {
    event.preventDefault();
    const data = { email, password };
    validate();

    let answer = await API.postAuthData(data)
      .then((response) => {
        openAlert(response);
        // let token: string = getCookie("XSRF-Token") || "";
        let token: string = localStorage.getItem('neoTimeToken') || "";
        let requestDataToPush: any = {
          token,
        };
        API.getRole(requestDataToPush).then((data: any) => {
          if (data.data.is_staff) {
            document.cookie = `role=admin`;
            localStorage.setItem("role", "admin");
            props.history.push("/");
            window.location.reload(true);
          } else {
            document.cookie = `role=user`;
            localStorage.setItem("role", "user");
            props.history.push("/");
            window.location.reload(true);
          }
        });
      })
      .catch((error) => {
        openAlert(error.request);
      });
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
        {isAlertOpen && (
          <Alert type={alertType} text={alertText} onClose={toggleAlertOpen} />
        )}
      </div>
    </div>
  );
};

export default Authorization;
