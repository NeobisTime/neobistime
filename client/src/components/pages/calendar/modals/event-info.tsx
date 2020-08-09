import React, { useState } from "react";
import address from "../../../../images/pages/address.svg";
import moreInfoArrow from "../../../../images/pages/more_info_arrow.svg";
import { CloseModalButton } from "../calendar";

const EventInfoModal = (props: any) => {
  const [willGo, setWillGo] = useState<boolean | undefined>(false);
  const [willNotGo, setWillNotGo] = useState<boolean | undefined>(false);
  const [finalAnswer, setFinalAnswer] = useState<boolean>(false);

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

  return (
    <div className="modal__wrapper ">
      <div className="event-info-modal">
        <CloseModalButton onClose={props.onClose} />
        <div className="event-info__content w-100">
          <p className="event-info__content-title">
            PM meetup - Jira и мониторинг
          </p>
          <p className="event-info__content-date">19.00 Вторник, Июль 31</p>
          <p className="event-info__content-description">
            Очередной MeetUp, организованный Необисом для дальнейшей реализации
            наших проектов. Делимся знаниями и обязательно приходим!
          </p>
          <p className="event-info__content-address">
            <img
              className="event-info__content-address-image"
              src={address}
              alt="address"
            />
            Адрес: г. Бишкек, ул. Советская 350 (вход со стороны кафе МастерФуд)
          </p>
          <p className="event-info__content-text_m_t">
            Посетители это событие?
          </p>
          <p className="event-info__content-text_deadline">
            deadline: 23 August 12:00
          </p>
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
            <button className="event-info-modal__change button">
              Изменить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInfoModal;
