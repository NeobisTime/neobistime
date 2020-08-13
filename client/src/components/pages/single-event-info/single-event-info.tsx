import React, { useState, useEffect } from "react";
import preview from "../../../images/pages/event-info-default.png";
import address from "../../../images/pages/address.svg";
import withNavbarContainer from "../../../HOC/withNavbar";
import { withRouter } from "react-router-dom";
import API from "../../../API";

const EventInfo = (props: any) => {
  const eventId = props.match.params.id;
  const [eventData, setEventData] = useState<any>({});

  const [willGo, setwillGo] = useState<boolean | undefined>(false);
  const [willNotGo, setwillNotGo] = useState<boolean | undefined>(false);
  const [finalAnswer, setFinalAnswer] = useState<boolean>(false);
  const [rejectionReason, setRejectionReason] = useState("");

  let startDate = new Date(eventData.start_date);
  let deadline = new Date(eventData.deadline);

  const handlewillGo = () => {
    setwillGo(true);
    setwillNotGo(false);
    setFinalAnswer(true);
  };
  const handlewillNotGo = () => {
    setwillGo(false);
    setwillNotGo(true);
    setFinalAnswer(false);
  };

  useEffect(() => {
    API.getEventInfo(eventId).then((eventData) => {
      setEventData(eventData.data);
    });
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      event: eventId,
      answer: finalAnswer,
      rejection_reason: rejectionReason,
    };
    API.postPoll(data);
  };

  let days = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  let months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Cентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  return (
    <>
      <div className="event-info">
        <div className="event-info__content">
          <p className="event-info__content-title">{eventData.title}</p>
          <p className="event-info__content-date">
            {startDate.getHours()}.{startDate.getMinutes()}{" "}
            {days[startDate.getDay()]}, {months[startDate.getMonth()]}{" "}
            {startDate.getDate()}
          </p>
          <p className="event-info__content-description">
            {eventData.description}
          </p>
          <p className="event-info__content-address">
            <img
              className="event-info__content-address-image"
              src={address}
              alt="address"
            />
            Адрес: {eventData.address}
          </p>
          <p className="event-info__content-text_m_t">
            Примите ли вы участие в данном событии?
          </p>
          <p className="event-info__content-text_deadline">
            deadline: {deadline.getDate()} {months[deadline.getMonth()]}{" "}
            {deadline.getHours()}:{deadline.getMinutes()}
          </p>
          <form
            className="event-info__content-form"
            onSubmit={handleSubmit}
          >
            <label className="event-info-modal__label">
              Да
              <input
                className="event-info-modal__input"
                type="checkbox"
                checked={willGo}
                onChange={handlewillGo}
              />
              <span className="event-info-modal__checkmark"></span>
            </label>
            <label className="event-info-modal__label">
              Нет
              <input
                className="event-info-modal__input"
                type="checkbox"
                checked={willNotGo}
                onChange={handlewillNotGo}
              />
              <span className="event-info-modal__checkmark"></span>
            </label>
            <p className="event-info__content-text">
              Если нет, то укажите причину:
            </p>
            <textarea
              cols={60}
              rows={4}
              placeholder="Ваш ответ..."
              disabled={willGo ? true : false}
              id="event-info__textarea-disabled"
              className="event-info__content-form-textarea"
              onChange={(e) => {
                setRejectionReason(e.target.value);
              }}
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

export default withNavbarContainer(withRouter(EventInfo));
