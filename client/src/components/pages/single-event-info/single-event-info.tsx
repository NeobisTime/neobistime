import React, { useState } from "react";
import preview from "../../../images/pages/event-info-default.png";
import address from "../../../images/pages/address.svg";
import withNavbarContainer from "../../../HOC/withNavbar";

const EventInfo = (props: any) => {
  const [yes, setYes] = useState<boolean | undefined>(false);
  const [no, setNo] = useState<boolean | undefined>(false);
  const [finalAnswer, setFinalAnswer] = useState<boolean>(false);

  const handleYes = () => {
    setYes(true);
    setNo(false);
    setFinalAnswer(true);
  };
  const handleNo = () => {
    setYes(false);
    setNo(true);
    setFinalAnswer(false);
    // document.getElementById("event-info__textarea-disabled").required = true;
  };

  return (
    <>
      <div className="event-info">
        <div className="event-info__content">
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
            Примите ли вы участие в данном событии?
          </p>
          <p className="event-info__content-text_deadline">
            deadline: 23 August 12:00
          </p>
          <form className="event-info__content-form">
            <label className="event-info__content-form-label">
              <input type="checkbox" checked={yes} onChange={handleYes} />
              Да
            </label>
            <label>
              <input type="checkbox" checked={no} onChange={handleNo} />
              Нет
            </label>
            <p className="event-info__content-text">
              Если нет, то укажите причину:
            </p>
            <textarea
              cols={40}
              rows={5}
              placeholder="Ваш ответ..."
              id="event-info__textarea-disabled"
              className="event-info__content-form-textarea"
            />
            <button type="submit" className="event-info__content-form-submit">
              Отправить
            </button>
          </form>
        </div>
        <div className="event-info__content">
          <img src={preview} alt="event" />
        </div>
      </div>
    </>
  );
};

export default withNavbarContainer(EventInfo);
