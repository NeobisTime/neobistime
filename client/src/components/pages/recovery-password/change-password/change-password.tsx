import React, { useState, useEffect } from "react";
import API from "../../../../API";
import { Input } from "../../registration/registration";
import designPhoto from "../../../../images/pages/forgot_password_gi2d.svg";
import { withRouter } from "react-router-dom";
import Alert from "../../../shared/alert";

const ChangePassword = (props: any) => {
  const [uid, setUid] = useState("");
  const [tokenFromEmail, setTokenFromEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    validate();
    let data = {
      new_password1: newPassword,
      new_password2: newPasswordConfirm,
      uid,
      token: tokenFromEmail,
    };
    API.postResetPasswordConfirm(data)
      .then((response) => {
        openAlert(response);
      })
      .catch((error) => {
        openAlert(error.request);
      });
  };
  const validate = () => {
    const errors = {};

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
      setAlertText("Все прошло без ошибок");
      // setTimeout(() => {
      //   props.history.push("/auth");
      // }, 1400);
    } else {
      setAlertType("error");
      setAlertText(response.response || "непредвиденная ошибка");
    }
    setIsAlertOpen(true);
    setTimeout(() => {
      setIsAlertOpen(false);
    }, 5000);
  };

  return (
    <>
      <div className="registration auth">
        <div className="registration__content">
          <div className="auth__title">
            <p className="auth__title-text">
              Проверьте почту, там в письме содержатся uid и token, вам
              необходимо вставить их сюда
            </p>
          </div>

            <section className="registration__section registration__section_w_40 m-center ">
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

          {isAlertOpen && (
            <Alert
              type={alertType}
              text={alertText}
              onClose={toggleAlertOpen}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default withRouter(ChangePassword);
