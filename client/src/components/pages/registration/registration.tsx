import React, { useState, useEffect } from "react";
import Select from "react-select";
import Alert from "../../shared/alert";

// image
import designPhoto from "../../../images/pages/authentication.svg";
import eye from "../../../images/pages/password_eye.svg";
import withDataContainer from "../../../HOC/withData";
import API from "../../../API";

export const Input = ({
  minLength = +0,
  type,
  name,
  value,
  setValue,
  title,
}: any) => {
  return (
    <input
      title={title}
      className="registration__input"
      required
      minLength={minLength}
      type={type}
      name={name}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};

const Registration = (props: any) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  // password values
  const [password1, setPassword1] = useState<string>("");
  const [hidden1, setHidden1] = useState<boolean>(true);
  const [password2, setPassword2] = useState<string>("");
  const [hidden2, setHidden2] = useState<boolean>(true);

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    validate();
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
      setAlertText(response.response || 'непредвиденная ошибка');
    }
    setIsAlertOpen(true);
    setTimeout(()=>{
      setIsAlertOpen(false);
    },3000)
  };

  useEffect(() => {
    validatePassword();
  }, [password1, password2]);

  const handleChangePassword2 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword2(event.target.value);
    validate();
  };

  const handleChangeTel = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
    validate();
  };

  // validation
  const [errors, setErrors] = useState({
    emailError: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({
    passwordSimilarity: "",
  });
  const [telErrors, setTelErrors] = useState({
    numberError: "",
  });
  const validate = () => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setErrors({ ...errors, emailError: "Неправильный email" });
    } else {
      setErrors({ ...errors, emailError: "" });
    }
    if (isNaN(Number(phone))) {
      setTelErrors({ ...telErrors, numberError: "Только цифры" });
    } else {
      setTelErrors({ ...telErrors, numberError: "" });
    }
  };
  function validatePassword() {
    if (password1 !== password2) {
      setPasswordErrors({
        ...passwordErrors,
        passwordSimilarity: "Пароли не совпадают",
      });
    } else {
      setPasswordErrors({ ...passwordErrors, passwordSimilarity: "" });
    }
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    validate();

    const data = {
      name_surname: name,
      email,
      password1,
      password2,
      phone,
      department_id: department,
    };
    API.postRegistrationData(data)
      .then((response) => {
        openAlert(response);
      })
      .catch((error) => {
        openAlert(error.request);
      });
  }

  return (
    <>
      <div className="registration auth">
        <div className="registration__content">
          <div className="auth__title">
            <p className="auth__title-text">Добро пожаловать в Neobis Time</p>
          </div>

          <section className="registration__section registration__section_w_40 ">
            <form className="auth__form" onSubmit={handleSubmit}>
              <label className="registration__label" htmlFor="name">
                ФИО
              </label>
              <Input type="text" name="name" value={name} setValue={setName} />

              <label className="registration__label" htmlFor="email">
                E-mail
              </label>
              <input
                className="registration__input"
                type="text"
                name="email"
                required
                value={email}
                onChange={handleChangeEmail}
                onBlur={validate}
              />
              {errors && <div className="error__span">{errors.emailError}</div>}

              <label className="registration__label" htmlFor="department">
                Департамент
              </label>
              <Select
                options={props.departments}
                className="registration__select"
                required
                onChange={(e: any) => {
                  setDepartment(e.value);
                }}
              />

              <label className="registration__label" htmlFor="password">
                Пароль
              </label>
              <div className="registration__password">
                <input
                  className="registration__password-input"
                  type={hidden1 ? "password" : "text"}
                  minLength={8}
                  name="password1"
                  required
                  value={password1}
                  onChange={(e) => {
                    setPassword1(e.target.value);
                  }}
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

              <label className="registration__label" htmlFor="email">
                Повторите пароль
              </label>
              <div className="registration__password">
                <input
                  minLength={8}
                  className="registration__password-input"
                  type={hidden2 ? "password" : "text"}
                  name="password2"
                  required
                  value={password2}
                  onChange={handleChangePassword2}
                />
                <img
                  onClick={() => {
                    setHidden2(!hidden2);
                  }}
                  src={eye}
                  alt="eye"
                  className="registration__password-image"
                />
              </div>
              {passwordErrors && (
                <div className="error__span">
                  {passwordErrors.passwordSimilarity}
                </div>
              )}

              <label className="registration__label" htmlFor="phone">
                Телефон
              </label>
              <input
                className="registration__input"
                type="tel"
                minLength={6}
                name="phone"
                required
                value={phone}
                onChange={handleChangeTel}
              />
              {telErrors && (
                <div className="error__span">{telErrors.numberError}</div>
              )}

              <button className="registration__submit" type="submit">
                Зарегистрироваться
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

export default withDataContainer(Registration);
