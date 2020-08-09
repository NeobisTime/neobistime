import React, { useState } from "react";
import designPhoto from "../../../images/pages/forgot_password_gi2d.svg";
import Select from "react-select";
import eye from "../../../images/pages/password_eye.svg";
import {Input} from '../registration/registration';

const ChangePassword = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  // password values
  const [password, setPassword] = useState<string>("");
  const [hidden1, setHidden1] = useState<boolean>(true);

  const departments = [
    { value: "Android", label: "Android" },
    { value: "C#", label: "C#" },
    { value: "Design", label: "Design" },
    { value: "Frontend", label: "Frontend" },
    { value: "IOS", label: "IOS" },
    { value: "Java", label: "Java" },
    { value: "NodeJS", label: "NodeJS" },
    { value: "PM", label: "PM" },
    { value: "Python", label: "Python" },
  ];

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
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
  const [telErrors, setTelErrors] = useState({
    numberError: "",
  });
  const validate = () => {
    const errors = {
      emailError: "",
      passwordSimilarity: "",
    };
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setErrors({ ...errors, emailError: "Неправильный email" });
    } else {
      setErrors({ ...errors, emailError: "" });
    }
    if (isNaN(Number(phone))) {
      setTelErrors({ ...errors, numberError: "Только цифры" });
    } else {
      setTelErrors({ ...errors, numberError: "" });
    }

    return errors;
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    validate();
  };

  return (
    <div className="registration auth">
      <div className="registration__content">
        <div className="auth__title">
          <p className="auth__title-text">Измените ваши данные</p>
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
              options={departments}
              className="registration__select"
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
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
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
            <button style={{width: '60%', margin: '30px auto 0'}} className="registration__submit" type="submit">
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
