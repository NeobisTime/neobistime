import React, { useState, useEffect } from "react";
import { CloseModalButton } from "../calendar";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import Select from "react-select";

// icons
import time from "../../../../images/shared/modal-clock.svg";
import people from "../../../../images/shared/modal-peoples.svg";
import withDataContainer from "../../../../HOC/withData";
import API from "../../../../API";

const AdminEventCreateModal = (props: any) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<any>([]);
  const [departments, setDepartments] = useState([]);

  const [startDate, setStartDate] = useState<Date>(new Date());
  // console.log("CreateEventPage ->.>>>>>>", startDate);
  const [startDateHours, setStartDateHours] = useState<number>(-1);
  const [startDateMinutes, setStartDateMinutes] = useState<number>(-1);

  const [endDate, setEndDate] = useState<Date>(new Date());
  const [endDateHours, setEndDateHours] = useState<number>(-1);
  const [endDateMinutes, setEndDateMinutes] = useState<number>(-1);

  const [address, setAddress] = useState<string>("");
  const [addressDisable, setAddressDisable] = useState<boolean>(true);
  const [place, setPlace] = useState<any>(null);

  const [finalUsers, setFinalUsers] = useState([]);
  const [usersForSend, setUsersForSend] = useState([]);

  useEffect(() => {
    API.getUsers().then((users) => {
      let preFinalUsers: any = users.data.map((user: any) => {
        return { value: user.email, label: user.name_surname };
      });
      setFinalUsers(preFinalUsers);
    });
  }, []);

  const handleChangeAddress = (e: any) => {
    setPlace(+e.target.value);
    setAddressDisable(true);
    setAddress("");

    if (e.target.value == 4) {
      setAddressDisable(false);
    }
  };

  return (
    <div className="modal__wrapper">
      <div className="admin-create-event-modal">
        <CloseModalButton onClose={props.onClose} />

        <div className="admin-create-event-modal-wrapper">
          <div className="admin-create-event-modal-row">
            <input
              className="admin-create-event-modal-input"
              type="text"
              name="name"
              required
              value={title}
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
            <DayPickerInput onDayChange={(day) => console.log(day)} />
            <div className="admin-create-event-modal-time d-flex">
              <input type="time" name="" id="" />
              <input type="time" name="" id="" />
            </div>
          </div>

          <div className="admin-create-event-modal-row">
            <img
              src={people}
              className="admin-create-event-modal-icon"
              alt="people"
            />
            <Select
              isMulti
              isClearable={true}
              isSearchable={true}
              options={props.selectDepartments}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Добавить департамент"
              onChange={(e: any) => {
                setDepartments(e);
              }}
            />
          </div>

          <div className="admin-create-event-modal-row">
            <img
              src={people}
              className="admin-create-event-modal-icon"
              alt="people"
            />
            <Select
              isMulti
              isClearable={true}
              isSearchable={true}
              options={finalUsers}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Добавить гостей"
              onChange={(e: any) => {
                setUsersForSend(e);
              }}
            />
          </div>

          <div className="admin-create-event-modal-row">
            <img
              src={people}
              className="admin-create-event-modal-icon"
              alt="people"
            />
            <div className="create-event__form-radio">
              <div className="create-event__form-radio-container">
                <input
                  type="radio"
                  name="place"
                  onChange={handleChangeAddress}
                  value={1}
                  checked={place && +place.id === 1 ? true : false}
                />
                <label htmlFor="small">Маленькая комната</label>
              </div>
              <div className="create-event__form-radio-container">
                <input
                  type="radio"
                  name="place"
                  value={2}
                  onChange={handleChangeAddress}
                  checked={place && +place.id === 2 ? true : false}
                />
                <label htmlFor="small">Большая комната</label>
              </div>
              <div className="create-event__form-radio-container">
                <input
                  type="radio"
                  name="place"
                  value={3}
                  onChange={handleChangeAddress}
                  checked={place && +place.id === 3 ? true : false}
                />
                <label htmlFor="small">Весь офис</label>
              </div>
              <div className="create-event__form-radio-container">
                <input
                  type="radio"
                  name="place"
                  value={4}
                  onChange={handleChangeAddress}
                  checked={place && +place.id === 4 ? true : false}
                />
                <label htmlFor="small">Другое</label>
              </div>
            </div>
          </div>

          {/* <div className="create-event">
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
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default withDataContainer(AdminEventCreateModal);
