import React, { useState, useEffect } from "react";
import designPhoto from "../../../images/pages/forgot_password_gi2d.svg";
import { Input } from "../registration/registration";
import withDataContainer from "../../../HOC/withData";
import API from "../../../API";

const ChangePassword = (props: any) => {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [image, setImage] = useState<any>([]);

  const handleChangeTel = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
    validate();
  };
  // validation
  const [telErrors, setTelErrors] = useState({
    numberError: "",
  });
  const validate = () => {
    const errors = {};
    if (isNaN(Number(phone))) {
      setTelErrors({ ...errors, numberError: "Только цифры" });
    } else {
      setTelErrors({ ...errors, numberError: "" });
    }

    return errors;
  };

  useEffect(() => {
    API.getUserInfo().then((data) => {
      let requestData = data.data;
      console.log("requestData", requestData);
      setName(requestData.name_surname);
      setPhone(requestData.phone);
    });
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    validate();

    let formData = new FormData();
    formData.append("name_surname", name);
    formData.append("phone", phone);
    if (image[0]) {
      formData.append("profile_img", image[0]);
    }
    API.patchUserInfo(formData);
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

            {/* <label className="registration__label" htmlFor="email">
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
            {errors && <div className="error__span">{errors.emailError}</div>} */}
            {/* 
            <label className="registration__label" htmlFor="department">
              Департамент
            </label>
            <Select
              options={props.departments}
              className="registration__select"
              onChange={(e: any) => {
                setDepartment(e.value);
              }}
            /> */}

            <label className="registration__label" htmlFor="department">
              Фото
            </label>
            <div className="registration__input">
              <input
                type="file"
                name="image"
                onChange={(e) => {
                  setImage(e.target.files);
                }}
              />
            </div>
            {/* <label className="registration__label" htmlFor="password">
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
            </div> */}

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

export default withDataContainer(ChangePassword);
