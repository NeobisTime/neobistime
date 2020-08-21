import React, { useState, useEffect } from "react";
import { CloseModalButton } from "../calendar";
import { Link } from "react-router-dom";

const NoteInfoModal = (props: any) => {
  const { event } = props;
  let startDate = new Date(event.start);

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

  return (
    <div className="modal_centered">
      <div className="modal__wrapper">
        <div className="event-info-modal">
          <CloseModalButton onClose={props.onClose} />
          <div className="event-info__content" style={{ width: "90%" }}>
            <p
              className="event-info__content-title"
              style={{ fontSize: "24px" }}
            >
              {event.title}
            </p>
            <p
              className="event-info__content-date"
              style={{ fontSize: "14px" }}
            >
              {(startDate.getHours() < 10 ? "0" : "") + startDate.getHours()}.
              {(startDate.getMinutes() < 10 ? "0" : "") +
                startDate.getMinutes()}{" "}
              {days[startDate.getDay()]}, {months[startDate.getMonth()]}{" "}
              {startDate.getDate()}
            </p>
            <p
              className="event-info__content-description"
              style={{ fontSize: "18px" }}
            >
              {event.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteInfoModal;
