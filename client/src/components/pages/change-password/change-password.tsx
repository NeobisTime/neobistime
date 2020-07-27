import React, { useState } from "react";
import designPhoto from "../../../images/pages/forgot_password_gi2d.svg";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>("");

  async function handleSubmit(event: any) {
    event.preventDefault();
    // const data = { oldPassword };
  }
  return (
    <div className="auth change">
      <div className="auth__content">
        <div className="auth__title">
          <p className="auth__title-text">Введите новый пароль</p>
        </div>
        <section className="auth__section">
          <form className="change__form" onSubmit={handleSubmit}>
            <label className="change__label" htmlFor="old-password">
              Старый пароль
            </label>
            <input
              className="auth__input"
              type="text"
              name="old-password"
              required
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
            />

            <label className="change__label" htmlFor="new-password">
              Новый пароль
            </label>
            <input
              className="auth__input"
              type="text"
              name="new-password"
              required
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />

            <label className="change__label" htmlFor="new-password-confirm">
              Повторите новый пароль
            </label>
            <input
              className="auth__input"
              type="text"
              name="new-password-confirm"
              required
              value={newPasswordConfirm}
              onChange={(e) => {
                setNewPasswordConfirm(e.target.value);
              }}
            />
            <button className=" auth__submit change__submit" type="submit">
              Сохранить
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
      </div>
    </div>
  );
};

export default ChangePassword;
