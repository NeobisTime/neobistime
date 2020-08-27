import React from "react";
import successImage from "../../../images/shared/alert_success.svg";
import errorImage from "../../../images/shared/alert_error.svg";

const Alert = (props: any) => {
  const { type = "error", text = "" } = props;
  return (
    <div className="modal__alert">
      <div className="modal__alert_bottom_right">
        {type === "success" ? (
          <section className="modal__alert-content">
            <img
              src={successImage}
              alt="success"
              className="modal__alert-image"
            />
            <div className="modal__alert-content-wrapper">
              <p className="modal__alert-title">Успешно</p>
              <p className="modal__alert-text">{text}</p>
            </div>
            <div className="modal__alert-close">
              <div
                onClick={props.onClose}
                className="modal__alert-close-content"
              >
                &times;
              </div>
            </div>
          </section>
        ) : (
          <section className="modal__alert-content modal__alert-content_red">
            <img src={errorImage} alt="error" className="modal__alert-image" />
            <div className="modal__alert-content-wrapper">
              <p className="modal__alert-title modal__alert-title_red">
                Ошибка
              </p>
              <p className="modal__alert-text modal__alert-text_red">{text}</p>
            </div>
            <div className="modal__alert-close">
              <div
                onClick={props.onClose}
                className="modal__alert-close-content"
              >
                &times;
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Alert;
