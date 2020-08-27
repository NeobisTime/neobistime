import React, { useState, useEffect } from "react";
import API from "../../../../API";
import { Input } from "../../registration/registration";
import designPhoto from "../../../../images/pages/forgot_password_gi2d.svg";
import { setuid } from "process";

const ChangePassword = () => {
  const [uid, setUid] = useState("");
  const [tokenFromEmail, setTokenFromEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  useEffect(() => {}, []);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    validate();
    let data = {
      new_password1: newPassword,
      new_password2: newPasswordConfirm,
      uid,
      token: tokenFromEmail,
    };
    API.postResetPasswordConfirm(data);
  };
  const validate = () => {
    const errors = {};

    return errors;
  };

  return (
    <div className="registration auth">
      <div className="registration__content">
        <div className="auth__title">
          <p className="auth__title-text">Проверьте почту, там в письме содержатся uid и token, вам необходимо вставить их сюда</p>
        </div>

        <section className="registration__section registration__section_w_40 ">
          <form className="auth__form" onSubmit={handleSubmit}>
            <label className="registration__label" htmlFor="name">
              Новый пароль
            </label>
            <Input
              type="text"
              name="name"
              value={newPassword}
              setValue={setNewPassword}
            />
            <label className="registration__label" htmlFor="name">
              Подтвердите новый пароль
            </label>
            <Input
              type="text"
              name="name"
              value={newPasswordConfirm}
              setValue={setNewPasswordConfirm}
            />
            <label className="registration__label" htmlFor="name">
              uid
            </label>
            <Input
              title="проверьте в письме на почте"
              type="text"
              name="name"
              value={uid}
              setValue={setUid}
            />
            <label className="registration__label" htmlFor="name">
              Token
            </label>
            <Input
              type="text"
              name="name"
              value={tokenFromEmail}
              setValue={setTokenFromEmail}
            />

            <button
              style={{ width: "60%", margin: "30px auto 0" }}
              className="registration__submit"
              type="submit"
            >
              Сохранить
            </button>
          </form>
        </section>
        <section className="registration__section registration__section_w_60">
          <img
            src={designPhoto}
            className="registration__image"
            alt="girl introducin login"
          />
        </section>
      </div>
    </div>
  );
};

export default ChangePassword;
