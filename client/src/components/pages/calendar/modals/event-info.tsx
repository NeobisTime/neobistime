import React, { useState, useEffect } from "react";
import address from "../../../../images/pages/address.svg";
import moreInfoArrow from "../../../../images/shared/modal-arrow-more-info.svg";
import editPen from "../../../../images/shared/modal-edit.svg";
import { CloseModalButton } from "../calendar";
import { getCookie } from "../../../../API";

const EventInfoModal = (props: any) => {
  const [willGo, setWillGo] = useState<boolean | undefined>(false);
  const [willNotGo, setWillNotGo] = useState<boolean | undefined>(false);
  const [finalAnswer, setFinalAnswer] = useState<boolean>(false);
  const [role, setRole] = useState("");

  const handleWillGo = () => {
    setWillGo(true);
    setWillNotGo(false);
    setFinalAnswer(true);
  };
  const handleWillNotGo = () => {
    setWillGo(false);
    setWillNotGo(true);
    setFinalAnswer(false);
  };

  useEffect(() => {
    let role: any = getCookie("role");
    setRole(role);
  }, []);

  return (
    <div className="modal__wrapper ">
      <div className="event-info-modal">
        <CloseModalButton onClose={props.onClose} />
        <img className="event-info-modal__edit-pen" src={editPen} alt="edit" />
        <div className="event-info__content" style={{ width: "90%" }}>
          <p className="event-info__content-title" style={{ fontSize: "24px" }}>
            PM meetup - Jira и мониторинг
          </p>
          <p className="event-info__content-date" style={{ fontSize: "14px" }}>
            19.00 Вторник, Июль 31
          </p>
          <p
            className="event-info__content-description"
            style={{ fontSize: "18px" }}
          >
            Очередной MeetUp, организованный Необисом для дальнейшей реализации
            наших проектов. Делимся знаниями и обязательно приходим!
          </p>
          <p
            className="event-info__content-address"
            style={{ fontSize: "14px" }}
          >
            <img
              className="event-info__content-address-image"
              src={address}
              alt="address"
            />
            Адрес: г. Бишкек, ул. Советская 350 (вход со стороны кафе МастерФуд)
          </p>
          <p
            className="event-info__content-text_m_t"
            style={{ fontSize: "14px" }}
          >
            Посетители это событие?
          </p>
          <p
            className="event-info__content-text_deadline"
            style={{ fontSize: "10px" }}
          >
            deadline: 23 August 12:00
          </p>

          <div className="event-info-modal__form-wrapper">
            <form className="event-info-modal__form">
              <div className="d-flex">
                <label className="event-info-modal__label">
                  Да
                  <input
                    className="event-info-modal__input"
                    type="checkbox"
                    checked={willGo}
                    onChange={handleWillGo}
                  />
                  <span className="event-info-modal__checkmark"></span>
                </label>
                <label className="event-info-modal__label">
                  Нет
                  <input
                    className="event-info-modal__input"
                    type="checkbox"
                    checked={willNotGo}
                    onChange={handleWillNotGo}
                  />
                  <span className="event-info-modal__checkmark"></span>
                </label>
              </div>
            </form>
            <div className="event-info-modal__buttons">
              <button className="event-info-modal__more-info button">
                <div>Подробнее</div>
                <img
                  src={moreInfoArrow}
                  alt="arrow  more info"
                  className="event-info-modal__more-info-image"
                />
              </button>
            </div>
          </div>

          <div className="event-info-modal__admin-buttons">
            <div className="event-info-modal__admin-buttons-wrapper">
              <button className="event-info-modal__admin-buttons-save button">
                Сохранить
              </button>
              <button className="event-info-modal__admin-buttons-cancel button">
                Отменить
              </button>
            </div>

            <div>
              <button className="event-info-modal__more-info button">
                <div>Подробнее</div>
                <img
                  src={moreInfoArrow}
                  alt="arrow  more info"
                  className="event-info-modal__more-info-image"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInfoModal;
