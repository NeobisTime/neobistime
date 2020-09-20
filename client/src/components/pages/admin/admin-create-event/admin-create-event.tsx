import React, { useState, useEffect } from "react";
import AdminNavbar from "../admin-navbar";
import DayPicker from "react-day-picker";
import MomentLocaleUtils from "react-day-picker/moment";
import "moment/locale/ru";

import "react-day-picker/lib/style.css";
import Select from "react-select";
import HoursScrollbar from "./hours-scrollbar";
import MinutesScrollbar from "./minutes-scrollbar";
import withDataContainer from "../../../../HOC/withData";
import API from "../../../../API";
import { withRouter } from "react-router-dom";
import Alert from "../../../shared/alert";
import { roomType } from "../../../../HOC/withData";
import Spinner from "../../../shared/spinner/spinner";

const CreateEventPage = (props: any) => {
  console.log("CreateEventPage -> props", props);
  const eventId = props.match.params.id;

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

  // final users = users to show in select
  const [finalUsers, setFinalUsers] = useState([]);
  const [usersForSend, setUsersForSend] = useState([]);

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
    }, 5000);
  };

  useEffect(() => {
    API.getUsers().then((users) => {
      let preFinalUsers: any = users.data.map((user: any) => {
        return { value: user.email, label: user.name_surname };
      });
      setFinalUsers(preFinalUsers);
    });
  }, []);
  // with params for put request
  useEffect(() => {
    if (eventId) {
      API.getEventInfo(eventId).then((requestData) => {
        let data = requestData.data;
        setTitle(data.title);
        setImage(data.image);
        setDescription(data.description);
        setStartDate(new Date(data.start));
        setEndDate(new Date(data.end));
        setPlace(data.place);
        setAddress(data.address);
        if (data.place.id === 4) {
          setAddressDisable(false);
        }
        // fill departments attendees
        let requestDepartments = data.attendees.departments;
        let allDepartments = props.departments;
        let duplicatesDepartments = allDepartments.filter((val: any) => {
          return requestDepartments.indexOf(+val.value) != -1;
        });
        setDepartments(duplicatesDepartments);

        let requestUsers = data.attendees.individual_users;
        API.getUsers().then((users) => {
          let preFinalUsers: any = users.data.map((user: any) => {
            return { value: user.email, label: user.name_surname };
          });
          let duplicateUsers = preFinalUsers.filter((val: any) => {
            return requestUsers.indexOf(val.value) !== -1;
          });
          setUsersForSend(duplicateUsers);
        });

        // set time for scrollbars
        let startDate = new Date(data.start);
        setStartDateHours(startDate.getHours());
        setStartDateMinutes(startDate.getMinutes());
        let endDate = new Date(data.end);
        setEndDateHours(endDate.getHours());
        setEndDateMinutes(endDate.getMinutes());
      });
    }
  }, []);

  const handleChangeAddress = (e: any) => {
    if (eventId) {
      setPlace({ ...place, id: e.target.value });
      if (e.target.value == 5) {
        setAddressDisable(false);
      }
    } else {
      setPlace(+e.target.value);
      setAddressDisable(true);
      setAddress("");

      if (e.target.value == 5) {
        setAddressDisable(false);
      }
    }
  };

  const updateStartTime = () => {
    let startTime = new Date(startDate);
    startTime.setHours(startDateHours, startDateMinutes, 0);
    let finalTime = `${startTime.getFullYear()}-${
      startTime.getMonth() + 1
    }-${startTime.getDate()}T${startTime.getHours()}:${startTime.getMinutes()}:00`;
    return finalTime;
  };
  const updateEndTime = () => {
    let endTime = new Date(endDate);
    endTime.setHours(endDateHours, endDateMinutes, 0);
    let finalTime = `${endTime.getFullYear()}-${
      endTime.getMonth() + 1
    }-${endTime.getDate()}T${endTime.getHours()}:${endTime.getMinutes()}:00`;
    return finalTime;
  };

  async function handleSubmit(event: any) {
    event.preventDefault();

    let start_time = await updateStartTime();
    let end_time = await updateEndTime();

    // working with forming attendees
    let departmentNumbers: any = [];
    if (departments) {
      let CheckForAll = departments.find((item: any) => item.value === "all");
      if (CheckForAll) {
        // * if selected all departments we return array with all
        departmentNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      } else {
        // * else return selected deparments
        departmentNumbers = departments.map((item: any) => {
          return +item.value;
        });
      }
    }
    let usersForSendEmails: any = [];
    if (usersForSend) {
      usersForSendEmails = usersForSend.map((item: any) => {
        return item.value;
      });
    }

    let formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (eventId) {
      if (typeof image !== typeof "") {
        formData.append("image", image[0]);
      } else console.log("image is string");
    } else {
      if (image[0]) {
        formData.append("image", image[0]);
      }
    }
    formData.append("start", String(start_time));
    formData.append("deadline", String(start_time));
    formData.append("end", String(end_time));
    if (eventId) {
      formData.append("place", place.id);
    } else {
      formData.append("place", place);
    }
    formData.append("address", address);
    formData.append("departments", departmentNumbers);
    formData.append("individual_users", usersForSendEmails);
    formData.append("my_event", "false");
    formData.append("public", "true");

    if (eventId) {
      API.patchEventChangeData(formData, eventId)
        .then((response) => {
          openAlert(response);
        })
        .catch((error) => {
          openAlert(error.request);
        });
    } else {
      API.postEventCreateData(formData)
        .then((response) => {
          openAlert(response);
        })
        .catch((error) => {
          openAlert(error.request);
        });
    }
  }

  return (
    <>
      <div className="wrapper wrapper_bg_grey">
        <AdminNavbar />
        <div className="content__wrapper">
          <Spinner timeOut={600} />
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
                <label
                  className="create-event__form-label"
                  htmlFor="description"
                >
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
                  placeholder="Описание ивента"
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
                    value={image[0] ? image[0].name || image : "Изображение"}
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
                  locale="ru"
                  localeUtils={MomentLocaleUtils}
                  firstDayOfWeek={1}
                  onDayClick={(date) => {
                    setStartDate(date);
                    setEndDate(date);
                  }}
                  selectedDays={startDate}
                />

                <div className="create-event__form-section_calendar-content-wrapper">
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
                <label
                  className="create-event__form-label"
                  htmlFor="description"
                >
                  Выберите локацию
                </label>
                <div className="create-event__form-radio">
                  {props.rooms.map((item: roomType) => (
                    <div className="create-event__form-radio-container">
                      <input
                        type="radio"
                        name="place"
                        className="create-event__form-radio-button"
                        onChange={handleChangeAddress}
                        value={item.id}
                        checked={
                          eventId
                            ? place && +place.id === item.id
                              ? true
                              : false
                            : undefined
                        }
                      />
                      <label htmlFor="small">{item.name}</label>
                    </div>
                  ))}
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
                {/* <div className="create-event__form-select-container"> */}
                <label
                  className="create-event__form-label"
                  htmlFor="invite"
                  style={{ margin: "30px 0 10px 0" }}
                >
                  Пригласить департамент
                </label>
                <Select
                  isMulti
                  value={departments}
                  isClearable={true}
                  isSearchable={true}
                  options={props.selectDepartments}
                  className="basic-multi-select"
                  placeholder="Выбрать департамент"
                  classNamePrefix="select"
                  onChange={(e: any) => {
                    setDepartments(e);
                  }}
                />
                {/* </div> */}

                <label
                  className="create-event__form-label"
                  htmlFor="invite"
                  style={{ margin: "30px 0 10px 0" }}
                >
                  Пригласить отдельных людей
                </label>
                <Select
                  isMulti
                  isClearable={true}
                  value={usersForSend}
                  isSearchable={true}
                  options={finalUsers}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Выбрать людей"
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
          {isAlertOpen && (
            <Alert
              type={alertType}
              text={alertText}
              onClose={toggleAlertOpen}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default withDataContainer(withRouter(CreateEventPage));
