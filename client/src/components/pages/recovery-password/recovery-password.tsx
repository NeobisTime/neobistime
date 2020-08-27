import React, { useState } from "react";
import designPhoto from "../../../images/pages/forgot_password_gi2d.svg";
import ModalSuccessRecoveryPassword from "./modal";
import eye from "../../../images/pages/password_eye.svg";
import { withRouter } from "react-router-dom";
import API from "../../../API";

const RecoveryPassword = (props: any) => {
  const [email, setEmail] = useState<string>("");
  let [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    validate();
  };

  const toggleModal = (value: boolean) => {
    setIsModalOpen(value);
    if (value === false) {
      props.history.push("/change_password");
    }
  };

  // validate
  const [errors, setErrors] = useState({
    emailError: "",
  });
  const validate = () => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,4}$/i.test(email)) {
      setErrors({ ...errors, emailError: "Неправильный email" });
    } else {
      setErrors({ ...errors, emailError: "" });
    }
  };

  async function handleSubmit(event: any) {
    event.preventDefault();
    const data = { email };
    await validate();
    // TODO toggle modal if POST request was good
    API.postRecoveryPasswordData(data).then((data) => {
      if (data.status >= 200 && data.status <= 299) {
        toggleModal(true);
        setTimeout(() => {
          props.history.push("/change_password");
        }, 3500);
      }
    });
  }

  return (
    <div className="auth recovery">
      <div className="auth__content">
        <div className="auth__title">
          <p className="auth__title-text">
            Мы отправим код восстановления на вашу почту
          </p>
        </div>
        <section className="auth__section">
          <form className="recovery__form" onSubmit={handleSubmit}>
            <label className="recovery__label" htmlFor="email">
              Электронная почта
            </label>
            <input
              className="auth__input"
              type="text"
              name="email"
              required
              value={email}
              onChange={handleChangeEmail}
            />
            {errors && <div className="error__span">{errors.emailError}</div>}
            <button className="button recovery__submit" type="submit">
              Отправить
            </button>
          </form>
        </section>
        <section className="auth__section">
          <img
            src={designPhoto}
            className="auth__image"
            alt="girl introducin login"
          />
        </section>

        {isModalOpen && <ModalSuccessRecoveryPassword onClose={toggleModal} />}
      </div>
    </div>
  );
};

export default withRouter(RecoveryPassword);
