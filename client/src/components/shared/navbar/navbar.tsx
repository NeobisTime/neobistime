import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import ConfirmExit from "./confirm-exit";

// *icons
import avatar from "../../../images/shared/user.svg";
import calendar from "../../../images/shared/calendar.svg";
import notification from "../../../images/shared/Notification.svg";
import today from "../../../images/shared/today.svg";
import admin from "../../../images/shared/admin.svg";
import exit from "../../../images/shared/exit.svg";
import rooms from "../../../images/shared/rooms.svg";
import API, { getCookie } from "../../../API";
import withDataContainer from "../../../HOC/withData";

const Navbar = (props: any) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>({});
  const [role, setRole] = useState<string | undefined>("");
  const [department, setDepartment] = useState<any>({});

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    setRole(getCookie("role"));
    API.getUserInfo().then((data) => {
      setUserInfo(data.data);
      let departmentNumber = props.departments.filter(
        (department: any) => +department.value === +data.data.department_id
      );
      setDepartment(departmentNumber[0]);
    });
  }, []);

  return (
    <div className="navbar">
      <Link to="/personal_office" className="link">
        <div className="navbar__person-info">
          <div className="navbar__person-info-image-container">
            <img
              className="navbar__person-info-image"
              src={userInfo.profile_img || avatar}
              alt="default avatar"
            />
          </div>

          <div className="navbar__person-info-text_wrapper">
            <p className="navbar__person-info-name">{userInfo.name_surname}</p>
            <p className="navbar__person-info-text">
              {department.label || "Neobis"} department{" "}
            </p>
            <p className="navbar__person-info-text">{userInfo.email}</p>
          </div>
        </div>
      </Link>

      <div className="navbar__content">
        <ul className="navbar__list">
          <NavLink
            exact
            to="/notifications"
            activeStyle={{ backgroundColor: "#1DA48B" }}
            className="navbar__list-link"
          >
            <img
              src={notification}
              className="navbar__list-image navbar__list-image_filter"
              alt="icon"
            />
            <li className="navbar__list-item">Уведомления</li>
          </NavLink>
          <NavLink
            exact
            to="/"
            activeStyle={{ backgroundColor: "#1DA48B" }}
            className="navbar__list-link"
          >
            <img
              src={calendar}
              className="navbar__list-image navbar__list-image_events navbar__list-image_filter"
              alt="icon"
            />
            <li className="navbar__list-item">Календарь</li>
          </NavLink>
          <NavLink
            exact
            to="/today"
            activeStyle={{ backgroundColor: "#1DA48B" }}
            className="navbar__list-link"
          >
            <img
              src={today}
              className="navbar__list-image navbar__list-image_filter"
              alt="icon"
            />
            <li className="navbar__list-item">Расписание дня</li>
          </NavLink>
          <NavLink
            exact
            to="/rooms"
            activeStyle={{ backgroundColor: "#1DA48B" }}
            className="navbar__list-link"
          >
            <img
              src={rooms}
              className="navbar__list-image navbar__list-image_rooms navbar__list-image_filter"
              alt="icon"
            />
            <li className="navbar__list-item">Комнаты</li>
          </NavLink>

          {role === "admin" ? (
            <NavLink
              exact
              to="/admin"
              activeStyle={{ backgroundColor: "#1DA48B" }}
              className="navbar__list-link"
            >
              <img
                src={admin}
                className="navbar__list-image navbar__list-image_filter"
                alt="icon"
              />
              <li className="navbar__list-item">Админ панель</li>
            </NavLink>
          ) : null}

          <div className="navbar__list-link" onClick={toggleModal}>
            <img src={exit} className="navbar__list-image" alt="icon" />
            <button className="navbar__button navbar__list-item">Выйти</button>
          </div>
        </ul>
        {isModalOpen && <ConfirmExit onClose={toggleModal} />}
      </div>
    </div>
  );
};

export default withDataContainer(Navbar);
