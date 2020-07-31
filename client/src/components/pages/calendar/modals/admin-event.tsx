import React, { useState } from "react";
import { CloseModalButton } from "../calendar";
import HoursScrollbar from "../../admin/admin-create-event/hours-scrollbar";
import MinutesScrollbar from "../../admin/admin-create-event/minutes-scrollbar";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import Select from "react-select";

const AdminEventCreateModal = (props: any) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const departments = [
    { value: "All", label: "All" },
    { value: "Python", label: "Python" },
    { value: "Frontend", label: "Frontend" },
    { value: "PM", label: "PM" },
    { value: "Design", label: "Design" },
    { value: "C#", label: "C#" },
    { value: "Java", label: "Java" },
    { value: "Android", label: "Android" },
    { value: "IOS", label: "IOS" },
    { value: "NodeJS", label: "NodeJS" },
  ];

  return (
    <div className="modal__wrapper">
      <div className="admin-create-event-modal">
        <CloseModalButton onClose={props.onClose} />

        <div className="create-event">
          <form className="create-event__form">
            <section className="create-event__form-section">
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
                className="create-event__form-textarea"
              />

              <label className="create-event__form-label">Изображение</label>
              <div className="create-event__form-file">
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="create-event__form-file-input button"
                />
                <label
                  className="create-event__form-file-input-value"
                  htmlFor="file"
                >
                  Загрузить Документ
                </label>
              </div>
            </section>

            <section className="create-event__form-section_calendar">
              <DayPicker
                onDayClick={(date) => {
                  setSelectedDate(date);
                }}
                selectedDays={selectedDate}
              />

              <div className="d-flex">
                <div className="create-event__form-label_wrapper">
                  <label
                    className="create-event__form-label"
                    htmlFor="time-start"
                  >
                    Начало
                  </label>
                  <div className="d-flex">
                    <HoursScrollbar />
                    <MinutesScrollbar />
                  </div>
                </div>

                <div className="create-event__form-label_wrapper">
                  <label
                    className="create-event__form-label"
                    htmlFor="time-start"
                  >
                    Конец
                  </label>
                  <div className="d-flex">
                    <HoursScrollbar />
                    <MinutesScrollbar />
                  </div>
                </div>
              </div>
            </section>

            <section className="create-event__form-section">
              <label className="create-event__form-label" htmlFor="description">
                Выберите локацию
              </label>
              <div className="create-event__form-radio">
                <div className="create-event__form-radio-container">
                  <input type="radio" name="small" id="small" checked={true} />
                  <label htmlFor="small">Маленькая комната</label>
                </div>
                <div className="create-event__form-radio-container">
                  <input type="radio" name="small" id="small" />
                  <label htmlFor="small">Большая комната</label>
                </div>
                <div className="create-event__form-radio-container">
                  <input type="radio" name="small" id="small" />
                  <label htmlFor="small">Весь офис</label>
                </div>
                <div className="create-event__form-radio-container">
                  <input type="radio" name="small" id="small" />
                  <label htmlFor="small">Другое</label>
                </div>

                <input
                  className="create-event__form-input create-event__form-input_border"
                  type="text"
                  name="address"
                  required
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div>
              <label className="create-event__form-label" htmlFor="invite">
                Пригласить
              </label>
              <Select
                isMulti
                isClearable={true}
                isSearchable={true}
                options={departments}
                className="basic-multi-select"
                classNamePrefix="select"
              />
              <button className="button create-event__form-submit ">
                Сохранить
              </button>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminEventCreateModal;
