import React, { useState } from "react";
import AdminNavbar from "../admin-navbar";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import { Scrollbars } from "react-custom-scrollbars";
import Select from "react-select";

const CreateEventPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const hours = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
  ];
  const minutes = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
  ];
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
    <div className="wrapper wrapper_bg_grey">
      <AdminNavbar />
      <div className="content__wrapper">
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
                    <Scrollbars
                      autoHide
                      autoHideTimeout={1000}
                      autoHideDuration={200}
                      autoHeight
                      autoHeightMin={0}
                      autoHeightMax={200}
                      thumbMinSize={30}
                      universal={true}
                      className="create-event__form-scroll"
                      style={{ width: 50, height: 200 }}
                    >
                      <div className="create-event__form-number create-event__form-number_active">
                        ч.
                      </div>
                      {hours.map((number) => {
                        return (
                          <div
                            key={number}
                            className="create-event__form-number"
                          >
                            {number}
                          </div>
                        );
                      })}
                    </Scrollbars>
                    <Scrollbars
                      autoHide
                      autoHideTimeout={1000}
                      autoHideDuration={200}
                      autoHeight
                      autoHeightMin={0}
                      autoHeightMax={200}
                      thumbMinSize={30}
                      universal={true}
                      className="create-event__form-scroll"
                      style={{ width: 50, height: 200 }}
                    >
                      <div className="create-event__form-number create-event__form-number_active">
                        м.
                      </div>
                      {minutes.map((number) => {
                        return (
                          <div
                            key={number}
                            className="create-event__form-number"
                          >
                            {number}
                          </div>
                        );
                      })}
                    </Scrollbars>
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
                    <Scrollbars
                      autoHide
                      autoHideTimeout={1000}
                      autoHideDuration={200}
                      autoHeight
                      autoHeightMin={0}
                      autoHeightMax={200}
                      thumbMinSize={30}
                      universal={true}
                      className="create-event__form-scroll"
                      style={{ width: 50, height: 200 }}
                    >
                      <div className="create-event__form-number create-event__form-number_active">
                        ч.
                      </div>
                      {hours.map((number) => {
                        return (
                          <div
                            key={number}
                            className="create-event__form-number"
                          >
                            {number}
                          </div>
                        );
                      })}
                    </Scrollbars>
                    <Scrollbars
                      autoHide
                      autoHideTimeout={1000}
                      autoHideDuration={200}
                      autoHeight
                      autoHeightMin={0}
                      autoHeightMax={200}
                      thumbMinSize={30}
                      universal={true}
                      className="create-event__form-scroll"
                      style={{ width: 50, height: 200 }}
                    >
                      <div className="create-event__form-number create-event__form-number_active">
                        м.
                      </div>
                      {minutes.map((number) => {
                        return (
                          <div
                            key={number}
                            className="create-event__form-number"
                          >
                            {number}
                          </div>
                        );
                      })}
                    </Scrollbars>
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
              <button className='button create-event__form-submit '>Сохранить</button>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEventPage;
