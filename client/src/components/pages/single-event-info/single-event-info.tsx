import React, { useState, useEffect } from "react";
import preview from "../../../images/pages/event-info-default.png";
import addressImage from "../../../images/pages/address.svg";
import withNavbarContainer from "../../../HOC/withNavbar";
import { withRouter } from "react-router-dom";
import API from "../../../API";
import withDataContainer from "../../../HOC/withData";
import Alert from "../../shared/alert";

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

const EventInfo = (props: any) => {
  const eventId = props.match.params.id;
  const [eventData, setEventData] = useState<any>({});
  const [correctPollId, setCorrectPollId] = useState<any>(0);
  const [address, setAddress] = useState<any>({});

  const [willGo, setwillGo] = useState<boolean | undefined>(false);
  const [willNotGo, setwillNotGo] = useState<boolean | undefined>(false);
  const [finalAnswer, setFinalAnswer] = useState<boolean>(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [missedDeadline, setMissedDeadline] = useState(false);

  let startDate = new Date(eventData.start);
  let deadline = new Date(eventData.deadline);
  let today = new Date();

  const handlewillGo = () => {
    setwillGo(true);
    setwillNotGo(false);
    setFinalAnswer(true);
    setRejectionReason("");
  };
  const handlewillNotGo = () => {
    setwillGo(false);
    setwillNotGo(true);
    setFinalAnswer(false);
  };

  useEffect(() => {
    API.getEventInfo(eventId).then((eventData) => {
      setEventData(eventData.data);
      setAddress(eventData.data.place);

      // get data to poll if it exist
      API.getMyPoll().then((data) => {
        if (data.data) {
          let correctPoll: any = [];
          correctPoll = data.data.filter((poll: any) => {
            return poll.event === eventData.data.title;
          });
          // if exist fill correct data in inputs
          if (correctPoll[0]) {
            correctPoll[0].answer ? setwillGo(true) : setwillNotGo(true);
            setRejectionReason(correctPoll[0].rejection_reason);
            setCorrectPollId(correctPoll[0].id);
          }
        }
      });

      // disable input if deadline crossed
      let deadline = new Date(eventData.data.deadline);
      if (+today.getTime() > +deadline.getTime()) {
        setMissedDeadline(true);
      } else {
        setMissedDeadline(false);
      }
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
    }, 3000);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      event: eventId,
      answer: finalAnswer,
      rejection_reason: rejectionReason,
    };
    if (correctPollId) {
      API.patchPoll(data, correctPollId)
        .then((response) => {
          openAlert(response);
        })
        .catch((error) => {
          openAlert(error.request);
        });
    } else {
      API.postPoll(data).then((data) => {
        setCorrectPollId(data.data.id);
      });
    }
  };

  return (
    <>
      <div className="event-info">
        <div className="event-info__content">
          <p className="event-info__content-title">{eventData.title}</p>
          <p className="event-info__content-date" style={{fontWeight: 'bold'}}>
            {startDate.getHours()}.
            {(startDate.getMinutes() < 10 ? "0" : "") + startDate.getMinutes()}{" "}
            {props.days[startDate.getDay()]},{" "}
            {props.monthListRus[startDate.getMonth()]} {startDate.getDate()}
          </p>
          <p className="event-info__content-description">
            {eventData.description}
          </p>
          <p className="event-info__content-address" style={{fontWeight: 'bold'}}>
            <img
              className="event-info__content-address-image"
              src={addressImage}
              alt="address"
            />
            Адрес: {address.name} {eventData.address}
          </p>
          <p className="event-info__content-text_m_t">
            Примите ли вы участие в данном событии?
          </p>
          <p className="event-info__content-text_deadline">
            deadline: {deadline.getDate()} {months[deadline.getMonth()]}{" "}
            {deadline.getHours()}:
            {(deadline.getMinutes() < 10 ? "0" : "") + deadline.getMinutes()}
          </p>
          {missedDeadline ? (
            <p className="event-info__content-text_big_red">
              К СОЖАЛЕНИЮ, ВЫ ПРОПУСТИЛИ ДЭДЛАЙН
            </p>
          ) : (
            <form className="event-info__content-form" onSubmit={handleSubmit}>
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
                // cols={50}
                rows={4}
                placeholder="Ваш ответ..."
                disabled={willGo ? true : false}
                id="event-info__textarea-disabled"
                className="event-info__content-form-textarea"
                value={rejectionReason}
                onChange={(e) => {
                  setRejectionReason(e.target.value);
                }}
              />
              <button type="submit" className="event-info__content-form-submit">
                Отправить
              </button>
            </form>
          )}
        </div>
        <div className="event-info__content tablet-none">
          <img
            src={eventData.image || preview}
            alt="event"
            className="event-info__content-right-image"
          />
        </div>
      </div>
      {isAlertOpen && (
        <Alert type={alertType} text={alertText} onClose={toggleAlertOpen} />
      )}
    </>
  );
};

export default withNavbarContainer(withDataContainer(withRouter(EventInfo)));
