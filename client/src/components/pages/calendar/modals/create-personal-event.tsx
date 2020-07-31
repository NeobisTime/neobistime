import React, { useState } from "react";
import { CloseModalButton } from "../calendar";
import HoursScrollbar from "../../admin/admin-create-event/hours-scrollbar";
import MinutesScrollbar from "../../admin/admin-create-event/minutes-scrollbar";

const PersonalEventCreateModal = (props: any) => {
  const [name, setName] = useState<string>("");
  return (
    <div className="modal__wrapper">
      <CloseModalButton onClose={props.onClose} />
      <div className="personal-create">
        <div className="personal-create__content">
          <label className="create-event__form-label" htmlFor="name">
            Название
          </label>
          <input
            className="create-event__form-input"
            type="text"
            name="name"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label className="create-event__form-label" htmlFor="description">
            Описание
          </label>
          <textarea
            cols={30}
            rows={14}
            name="description"
            placeholder="Some Meet Up"
            className="create-event__form-textarea m-0"
          />
          <button className="button create-event__form-submit">Создать</button>
        </div>
        <div className="personal-create__time">
        <div className="personal-create__time-wrapper">
            <div>
              <label className="create-event__form-label" htmlFor="time-start">
                Начало
              </label>
            </div>
            <div style={{display: "flex"}}>
              <HoursScrollbar />
              <MinutesScrollbar />
            </div>
          </div>
          <div className="personal-create__time-wrapper">
            <div>
              <label className="create-event__form-label" htmlFor="time-start">
                Конец
              </label>
            </div>
            <div style={{display: "flex"}}>
              <HoursScrollbar />
              <MinutesScrollbar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalEventCreateModal;
