import React, { useState, useEffect } from "react";
import designPhoto from "../../../images/pages/forgot_password_gi2d.svg";
import { Input } from "../registration/registration";
import withDataContainer from "../../../HOC/withData";
import API from "../../../API";
import Alert from "../../shared/alert";

const ChangePersonalData = (props: any) => {
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
    } else {
      setAlertType("error");
      setAlertText(response.response || "непредвиденная ошибка");
    }
    setIsAlertOpen(true);
    setTimeout(() => {
      setIsAlertOpen(false);
    }, 5000);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    validate();

    let formData = new FormData();
    formData.append("name_surname", name);
    formData.append("phone", phone);
    if (image[0]) {
      formData.append("profile_img", image[0]);
    }
    API.patchUserInfo(formData)
      .then((response) => {
        openAlert(response);
      })
      .catch((error) => {
        openAlert(error.request);
      });
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
            <label className="registration__label" htmlFor="department">
              Фото
            </label>
            <div className="registration__input">
              <label className="custom-file-upload">
                <input
                  type="file"
                  name="image"
                  className="custom-file-input"
                  onChange={(e) => {
                    setImage(e.target.files);
                  }}
                />
                {image[0] ? image[0].name : "Загрузите фото"}
              </label>
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
          <Alert type={alertType} text={alertText} onClose={toggleAlertOpen} />
        )}
      </div>
    </div>
  );
};

export default withDataContainer(ChangePersonalData);
