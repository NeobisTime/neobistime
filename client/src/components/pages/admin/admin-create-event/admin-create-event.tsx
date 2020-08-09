import React, { useState } from "react";
import AdminNavbar from "../admin-navbar";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import Select from "react-select";
import HoursScrollbar from "./hours-scrollbar";
import MinutesScrollbar from "./minutes-scrollbar";
import withDataContainer from "../../../../HOC/withData";

const CreateEventPage = (props: any) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<FileList | null>();

  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [startDateHours, setStartDateHours] = useState<number>(-1);
  const [startDateMinutes, setStartDateMinutes] = useState<number>(-1);

  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [endDateHours, setEndDateHours] = useState<number>(-1);
  const [endDateMinutes, setEndDateMinutes] = useState<number>(-1);

  const [address, setAddress] = useState<string>("");
  const [addressDisable, setAddressDisable] = useState<boolean>(true);
  const [place, setPlace] = useState<number | null>(null);

  const handleChangeAddress = (e: any) => {
    setPlace(+e.target.value);
    setAddressDisable(true);
    setAddress("");
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    // set hours and minutes of event
    startDate?.setHours(startDateHours);
    startDate?.setMinutes(startDateMinutes);
    startDate?.setSeconds(0);
    endDate?.setHours(endDateHours);
    endDate?.setMinutes(endDateMinutes);
    endDate?.setSeconds(0);
  };

  return (
    <div className="wrapper wrapper_bg_grey">
      <AdminNavbar />
      <div className="content__wrapper">
        <div className="create-event">
          <form className="create-event__form" onSubmit={handleSubmit}>
            <section className="create-event__form-section">
              <label className="create-event__form-label" htmlFor="name">
                Название
              </label>
              <input
                className="create-event__form-input"
                type="text"
                name="name"
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <label className="create-event__form-label" htmlFor="description">
                Описание
              </label>
              <textarea
                cols={30}
                rows={14}
                name="description"
                required
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                placeholder="Some Meet Up"
                className="create-event__form-textarea"
              />

              <label className="create-event__form-label">Изображение</label>
              <div className="create-event__form-file">
                <input
                  style={{
                    width: "100%",
                    margin: "0 0 10px 0",
                  }}
                  className="create-event__form-input"
                  type="text"
                  value={image ? image[0].name : "empty"}
                  readOnly
                />
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="create-event__form-file-input button"
                  onChange={(e) => {
                    setImage(e.target.files);
                  }}
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
                  setStartDate(date);
                  setEndDate(date);
                }}
                selectedDays={startDate}
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
                    <HoursScrollbar
                      value={startDateHours}
                      setValue={setStartDateHours}
                    />
                    <MinutesScrollbar
                      value={startDateMinutes}
                      setValue={setStartDateMinutes}
                    />
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
                    <HoursScrollbar
                      value={endDateHours}
                      setValue={setEndDateHours}
                    />
                    <MinutesScrollbar
                      value={endDateMinutes}
                      setValue={setEndDateMinutes}
                    />
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
                  <input
                    type="radio"
                    name="place"
                    onChange={handleChangeAddress}
                    value={1}
                  />
                  <label htmlFor="small">Маленькая комната</label>
                </div>
                <div className="create-event__form-radio-container">
                  <input
                    type="radio"
                    name="place"
                    value={2}
                    onChange={handleChangeAddress}
                  />
                  <label htmlFor="small">Большая комната</label>
                </div>
                <div className="create-event__form-radio-container">
                  <input
                    type="radio"
                    name="place"
                    value={3}
                    onChange={handleChangeAddress}
                  />
                  <label htmlFor="small">Весь офис</label>
                </div>
                <div className="create-event__form-radio-container">
                  <input
                    type="radio"
                    name="place"
                    onChange={() => {
                      setAddressDisable(false);
                    }}
                  />
                  <label htmlFor="small">Другое</label>
                </div>

                <input
                  className="create-event__form-input create-event__form-input_border"
                  type="text"
                  name="address"
                  disabled={addressDisable ? true : false}
                  required={addressDisable ? false : true}
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
                options={props.selectDepartments}
                className="basic-multi-select"
                classNamePrefix="select"
              />
              <button
                className="button create-event__form-submit "
                type="submit"
              >
                Сохранить
              </button>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withDataContainer(CreateEventPage);
