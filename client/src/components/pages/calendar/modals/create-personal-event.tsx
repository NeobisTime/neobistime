import React, { useState } from "react";
import { CloseModalButton } from "../calendar";
import API from "../../../../API";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

// icons
import time from "../../../../images/shared/modal-clock.svg";
import descriptionImage from "../../../../images/shared/modal-description.svg";

const PersonalEventCreateModal = (props: any) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [startDate, setStartDate] = useState<Date>(props.date);
  const [startDateHours, setStartDateHours] = useState<number>(0);
  const [startDateMinutes, setStartDateMinutes] = useState<number>(0);

  const [endDate, setEndDate] = useState<Date>(props.date);
  const [endDateHours, setEndDateHours] = useState<number>(0);
  const [endDateMinutes, setEndDateMinutes] = useState<number>(0);

  const updateStartTime = () => {
    let startTime = new Date(startDate);
    startTime.setHours(startDateHours, startDateMinutes, 0);
    let finalTime = `${startTime.getFullYear()}-${
      startTime.getMonth() + 1
    }-${startTime.getDate()}T${startTime.getHours()}:${startTime.getMinutes()}`;
    return finalTime;
  };
  const updateEndTime = () => {
    let endTime = new Date(endDate);
    endTime.setHours(endDateHours, endDateMinutes, 0);
    let finalTime = `${endTime.getFullYear()}-${
      endTime.getMonth() + 1
    }-${endTime.getDate()}T${endTime.getHours()}:${endTime.getMinutes()}`;
    return finalTime;
  };
  async function handleSubmit(event: any) {
    event.preventDefault();

    let start_time = await updateStartTime();
    let end_time = await updateEndTime();

    const data = {
      title,
      description,
      start: start_time,
      end: end_time,
    };
    API.postNoteCreateData(data)
      .then((response) => {
        props.OpenAlert(response);
      })
      .catch((error) => {
        props.OpenAlert(error.request);
      });
  }

  return (
    <div className="modal_centered">
      <div className="modal__wrapper">
        <CloseModalButton onClose={props.onClose} />
        <div className="personal-create">
          <div className="personal-create-row">
            <input
              className="personal-create__input"
              type="text"
              name="name"
              required
              value={title}
              placeholder="Введите название"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>

          <div className="admin-create-event-modal-row">
            <img
              src={time}
              className="admin-create-event-modal-icon"
              alt="time"
            />
            <div className="admin-create-event-modal__day-picker">
              <DayPickerInput
                value={props.date}
                onDayChange={(day) => {
                  setStartDate(day);
                  setEndDate(day);
                }}
              />
            </div>
            <div className="admin-create-event-modal-time">
              <input
                type="text"
                name=""
                placeholder="00"
                className="admin-create-event-modal__time-picker"
                onChange={(e) => {
                  setStartDateHours(parseInt(e.target.value));
                }}
              />
              {/* // colon- двоеточие */}
              <div className="admin-create-event-modal__time-picker-colon">
                .
              </div>
              <input
                type="text"
                name=""
                placeholder="00"
                className="admin-create-event-modal__time-picker"
                onChange={(e) => {
                  setStartDateMinutes(parseInt(e.target.value));
                }}
              />
              &nbsp;-&nbsp;
              <input
                type="text"
                name=""
                placeholder="00"
                className="admin-create-event-modal__time-picker"
                onChange={(e) => {
                  setEndDateHours(parseInt(e.target.value));
                }}
              />
              {/* // colon- двоеточие */}
              <div className="admin-create-event-modal__time-picker-colon">
                .
              </div>
              <input
                type="text"
                name=""
                placeholder="00"
                className="admin-create-event-modal__time-picker"
                onChange={(e) => {
                  setEndDateMinutes(parseInt(e.target.value));
                }}
              />
            </div>
          </div>

          <div className="personal-create-row">
            <div className="personal-create__textarea-wrapper">
              <img
                src={descriptionImage}
                className="admin-create-event-modal-icon"
                alt="people"
              />
              <input
                name="description"
                required
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                placeholder="Добавить описание"
                className="personal-create__textarea"
              />
            </div>
          </div>

          <div className="personal-create-row">
            <div className="personal-create__buttons-wrapper">
              <button
                onClick={handleSubmit}
                className="personal-create__buttons-save button"
              >
                Создать
              </button>
              <button
                onClick={props.onClose}
                className="personal-create__buttons-cancel button"
              >
                отмена
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalEventCreateModal;
