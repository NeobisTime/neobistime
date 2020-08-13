import React, { useState, useEffect } from "react";
import AdminNavbar from "../admin-navbar";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import Select from "react-select";
import HoursScrollbar from "./hours-scrollbar";
import MinutesScrollbar from "./minutes-scrollbar";
import withDataContainer from "../../../../HOC/withData";
import API from "../../../../API";

const CreateEventPage = (props: any) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<any>([]);
  const [departments, setDepartments] = useState([]);

  const [startDate, setStartDate] = useState<Date>(new Date());
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
  };

  const updateStartTime = () => {
    let startTime = new Date(startDate);
    startTime.setHours(startDateHours, startDateMinutes, 0);
    let finalTime = `${startTime.getFullYear()}-${startTime.getMonth()}-${startTime.getDate()}T${startTime.getHours()}:${startTime.getMinutes()}`;
    return finalTime;
  };
  const updateEndTime = () => {
    let endTime = new Date(endDate);
    endTime.setHours(endDateHours, endDateMinutes, 0);
    let finalTime = `${endTime.getFullYear()}-${endTime.getMonth()}-${endTime.getDate()}T${endTime.getHours()}:${endTime.getMinutes()}`;
    return finalTime;
  };

  async function handleSubmit(event: any) {
    event.preventDefault();

    let start_time = await updateStartTime();
    let end_time = await updateEndTime();
    let attendees = {
      departments: [departments],
      individual_users: [usersForSend],
    };

    console.log(place);
    
    let formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image[0]) {
      formData.append("image", image[0]);
    }
    formData.append("start_date", String(start_time));
    formData.append("deadline", String(start_time));
    formData.append("end_date", String(end_time));
    if (place){
      formData.append("place", place);
    }
    formData.append("address", address);
    formData.append("attendees", String(attendees));
    console.log("handleSubmit -> formData", formData);

    API.postEventCreateData(formData);
  }

  return (
    <div className="wrapper wrapper_bg_grey">
      <AdminNavbar />
      <div className="content__wrapper">
        <div className="create-event">
          <form
            className="create-event__form"
            onSubmit={handleSubmit}
            method="post"
            encType="multipart/form-data"
          >
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
                  value={image[0] ? image[0].name : "empty"}
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
                      setPlace(null);
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
              <div className="create-event__form-select-container">
                <label className="create-event__form-label" htmlFor="invite">
                  Пригласить департамент
                </label>
                <Select
                  isMulti
                  isClearable={true}
                  isSearchable={true}
                  options={props.selectDepartments}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(e: any) => {
                    setDepartments(e);
                  }}
                />
              </div>

              <label className="create-event__form-label" htmlFor="invite">
                Пригласить отдельных людей
              </label>
              <Select
                isMulti
                isClearable={true}
                isSearchable={true}
                options={finalUsers}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(e: any) => {
                  setUsersForSend(e);
                }}
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
