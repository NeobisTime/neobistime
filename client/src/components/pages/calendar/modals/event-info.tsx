import React, { useState, useEffect } from "react";
import address from "../../../../images/pages/address.svg";
import moreInfoArrow from "../../../../images/shared/modal-arrow-more-info.svg";
import editPen from "../../../../images/shared/modal-edit.svg";
import { CloseModalButton } from "../calendar";
import API, { getCookie } from "../../../../API";
import { Link } from "react-router-dom";

const EventInfoModal = (props: any) => {
  const [willGo, setWillGo] = useState<boolean | undefined>(false);
  const [willNotGo, setWillNotGo] = useState<boolean | undefined>(false);
  const [role, setRole] = useState("");

  const [missedDeadline, setMissedDeadline] = useState(false);
  const [correctPollId, setCorrectPollId] = useState<any>(0);
  const { event } = props;
  let deadline = new Date(event.deadline);
  let startDate = new Date(event.start);
  let today = new Date();

  function submitPoll(finalAnswer: boolean) {
    const data = {
      event: event.id,
      answer: finalAnswer,
    };
    if (correctPollId) {
      API.patchPoll(data, correctPollId);
    } else {
      API.postPoll(data).then((data) => {
        setCorrectPollId(data.data.id);
      });
    }
  }
  const handleWillGo = () => {
    setWillGo(true);
    setWillNotGo(false);
    submitPoll(true);
  };
  const handleWillNotGo = () => {
    setWillGo(false);
    setWillNotGo(true);
    submitPoll(false);
  };

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
  let days = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];

  useEffect(() => {
    let role: any = getCookie("role");
    setRole(role);

    // get data to poll if it exist
    API.getMyPoll().then((data) => {
      if (data.data) {
        let correctPoll: any = [];
        correctPoll = data.data.filter((poll: any) => {
          return poll.event === event.title;
        });
        console.log("EventInfoModal -> correctPoll", correctPoll);
        // if exist fill correct data in inputs
        if (correctPoll[0]) {
          correctPoll[0].answer ? setWillGo(true) : setWillNotGo(true);
          setCorrectPollId(correctPoll[0].id);
        }
      }
    });

    // disable input if deadline crossed
    if (+today.getTime() > +deadline.getTime()) {
      setMissedDeadline(true);
    } else {
      setMissedDeadline(false);
    }
  }, []);

  return (
    <div className="modal__wrapper ">
      <div className="event-info-modal">
        <CloseModalButton onClose={props.onClose} />
        {role === "admin" ? (
          <Link to={`/admin/create_event/${event.id}`} className="link">
            <img
              className="event-info-modal__edit-pen"
              src={editPen}
              alt="edit"
            />
          </Link>
        ) : null}
        <div className="event-info__content" style={{ width: "90%" }}>
          <p className="event-info__content-title" style={{ fontSize: "24px" }}>
            {event.title}
          </p>
          <p className="event-info__content-date" style={{ fontSize: "14px" }}>
            {(startDate.getHours() < 10 ? "0" : "") + startDate.getHours()}.
            {(startDate.getMinutes() < 10 ? "0" : "") + startDate.getMinutes()}{" "}
            {days[startDate.getDay()]}, {months[startDate.getMonth()]}{" "}
            {startDate.getDate()}
          </p>
          <p
            className="event-info__content-description"
            style={{ fontSize: "18px" }}
          >
            {event.description}
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
            Адрес: {event.place.name} {event.address}
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
            deadline: {deadline.getDate()} {months[deadline.getMonth()]}{" "}
            {deadline.getHours()}:
            {(deadline.getMinutes() < 10 ? "0" : "") + deadline.getMinutes()}
          </p>

          {missedDeadline ? (
            <p className="event-info__content-text">Вы пропустили deadline</p>
          ) : (
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
                <Link to={`/today/${event.id}`}>
                  <button className="event-info-modal__more-info button">
                    <div>Подробнее</div>
                    <img
                      src={moreInfoArrow}
                      alt="arrow  more info"
                      className="event-info-modal__more-info-image"
                    />
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventInfoModal;
