import React, { useState, useEffect } from "react";
import { CloseModalButton } from "../calendar";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

import Select from "react-select";
import API from "../../../../API";
import dateFnsFormat from "date-fns/format";
import withDataContainer from "../../../../HOC/withData";

// icons
import time from "../../../../images/shared/modal-clock.svg";
import peoples from "../../../../images/shared/modal-peoples.svg";
import people from "../../../../images/shared/modal-people.svg";
import placeImage from "../../../../images/shared/modal-address.svg";
import descriptionImage from "../../../../images/shared/modal-description.svg";
import fileImage from "../../../../images/shared/modal-file.svg";

const AdminEventCreateModal = (props: any) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<any>([]);
  const [departments, setDepartments] = useState([]);

  const [startDate, setStartDate] = useState<Date>(props.date);
  const [startDateHours, setStartDateHours] = useState<number>(0);
  const [startDateMinutes, setStartDateMinutes] = useState<number>(0);

  const [endDate, setEndDate] = useState<Date>(props.date);
  const [endDateHours, setEndDateHours] = useState<number>(0);
  const [endDateMinutes, setEndDateMinutes] = useState<number>(0);

  const [address, setAddress] = useState<string>("");
  const [addressDisable, setAddressDisable] = useState<boolean>(true);
  const [place, setPlace] = useState<any>(null);

  const [finalUsers, setFinalUsers] = useState([]);
  const [usersForSend, setUsersForSend] = useState([]);

  const [showAddress, setShowAddress] = useState<boolean>(false);

  const FORMAT = "dd/MM";
  function formatDate(date: any, format: any, locale: any) {
    return dateFnsFormat(date, format, { locale });
  }

  const selectDepartments = [
    { value: "all", label: "All" },
    { value: "8", label: "Android" },
    { value: "6", label: "C#" },
    { value: "7", label: "Design" },
    { value: "5", label: "Frontend" },
    { value: "9", label: "IOS" },
    { value: "4", label: "Java/Kotlin" },
    { value: "2", label: "NodeJS" },
    { value: "3", label: "PM" },
    { value: "1", label: "Python" },
  ];

  useEffect(() => {
    API.getUsers().then((users) => {
      let preFinalUsers: any = users.data.map((user: any) => {
        return { value: user.email, label: user.name_surname };
      });
      setFinalUsers(preFinalUsers);
    });
  }, []);

  const handleChangeAddress = (e: any) => {
    setPlace(+e.value);
    setAddressDisable(true);
    setAddress("");
    if (+e.value === 5) {
      setAddressDisable(false);
      setShowAddress(true);
    } else {
      setShowAddress(false);
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
    //

    let formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image[0]) {
      formData.append("image", image[0]);
    }
    formData.append("start", String(start_time));
    formData.append("deadline", String(start_time));
    formData.append("end", String(end_time));
    formData.append("place", place);
    formData.append("address", address);
    formData.append("departments", departmentNumbers);
    formData.append("individual_users", usersForSendEmails);
    formData.append("my_event", "false");
    formData.append("public", "true");

    API.postEventCreateData(formData)
      .then((response) => {
        props.OpenAlert(response);
      })
      .catch((error) => {
        props.OpenAlert(error.request);
      });
  }

  return (
    <div className="modal__wrapper">
      <div className="admin-create-event-modal">
        <CloseModalButton onClose={props.onClose} />

        <div className="admin-create-event-modal-wrapper">
          <div className="admin-create-event-modal-row">
            <input
              className="admin-create-event-modal-input-title"
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
                placeholder="Дата"
                onDayChange={(day) => {
                  setStartDate(day);
                  setEndDate(day);
                }}
                format={FORMAT}
                formatDate={formatDate}
              />
            </div>
            <div className="admin-create-event-modal-time">
              <input
                type="text"
                name=""
                maxLength={2}
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
                maxLength={2}
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
                maxLength={2}
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
                maxLength={2}
                placeholder="00"
                className="admin-create-event-modal__time-picker"
                onChange={(e) => {
                  setEndDateMinutes(parseInt(e.target.value));
                }}
              />
            </div>
          </div>

          <div className="admin-create-event-modal-row">
            <img
              src={peoples}
              className="admin-create-event-modal-icon"
              alt="people"
            />
            <Select
              isMulti
              isClearable={true}
              isSearchable={true}
              options={selectDepartments}
              className="admin-create-event-modal-select"
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
              className="admin-create-event-modal-icon admin-create-event-modal-icon-people"
              alt="people"
            />
            <Select
              isMulti
              isClearable={true}
              isSearchable={true}
              options={finalUsers}
              className="admin-create-event-modal-select"
              classNamePrefix="select"
              placeholder="Добавить гостей"
              onChange={(e: any) => {
                setUsersForSend(e);
              }}
            />
          </div>

          <div className="admin-create-event-modal-row admin-create-event-modal-row_full">
            <div className="admin-create-event-modal-row_full-block">
              <img
                src={placeImage}
                className="admin-create-event-modal-icon"
                alt="people"
              />
              <Select
                options={props.roomsForSelect}
                className="admin-create-event-modal-select_small admin-create-event-modal-row_full-block-select"
                classNamePrefix="select"
                placeholder="Добавить локацию"
                onChange={handleChangeAddress}
              />
            </div>
            {showAddress ? (
              <input
                type="text"
                className="admin-create-event-modal-select-place"
                placeholder="Адрес"
                disabled={addressDisable ? true : false}
                required={addressDisable ? false : true}
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            ) : null}
          </div>

          <div className="admin-create-event-modal-row">
            <img
              src={descriptionImage}
              className="admin-create-event-modal-icon"
              alt="people"
            />
            <textarea
              cols={30}
              rows={2}
              name="description"
              required
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Добавить описание"
              className="admin-create-event-modal-input"
            />
          </div>

          <div className="admin-create-event-modal-row">
            <img
              src={fileImage}
              className="admin-create-event-modal-icon"
              alt="people"
            />
            <label
              className="custom-file-upload"
              style={{ fontSize: "14px", padding: "8px" }}
            >
              <input
                type="file"
                name="image"
                className="custom-file-input"
                onChange={(e) => {
                  setImage(e.target.files);
                }}
              />
              {image[0] ? image[0].name : "Загрузите фото"}
            </label>
          </div>

          <div className="admin-create-event-modal-row">
            <div className="event-info-modal__admin-buttons-wrapper">
              <button
                onClick={handleSubmit}
                className="event-info-modal__admin-buttons-save button"
              >
                Сохранить
              </button>
              <button
                onClick={props.onClose}
                className="event-info-modal__admin-buttons-cancel button"
              >
                Отменить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withDataContainer(AdminEventCreateModal);
