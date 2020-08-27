import React, { useState, useEffect } from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import ConfirmExit from "../../../shared/navbar/confirm-exit";
import API, { getCookie } from "../../../../API";

// *icons
import avatar from "../../../../images/shared/user.svg";
import exit from "../../../../images/shared/exit.svg";
import events from "../../../../images/shared/all_events.svg";
import peoples from "../../../../images/shared/admin_members.svg";
import create_event from "../../../../images/shared/edit.svg";
import stat from "../../../../images/shared/adminn_stat.svg";
import calendar from "../../../../images/shared/calendar.svg";
import withDataContainer from "../../../../HOC/withData";

const AdminNavbar = (props: any) => {
  let [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>({});
  const [department, setDepartment] = useState<any>({});

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  useEffect(() => {
    API.getUserInfo().then((data) => {
      setUserInfo(data.data);
      let departmentNumber = props.departments.filter(
        (department: any) => +department.value === +data.data.department_id
      );
      setDepartment(departmentNumber[0]);
    });
    let token = localStorage.getItem('token')
    if (!token) {
      props.history.push("/auth");
    }
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
            to="/"
            activeStyle={{ backgroundColor: "#1DA48B" }}
            className="navbar__list-link"
          >
            <img
              src={calendar}
              className="navbar__list-image navbar__list-image_events navbar__list-image_filter"
              alt="icon"
            />
            <li className="navbar__list-item">На главную</li>
          </NavLink>
          <NavLink
            exact
            to="/lead_admin/end_events"
            activeStyle={{ backgroundColor: "#1DA48B" }}
            className="navbar__list-link"
          >
            <img
              src={peoples}
              className="navbar__list-image navbar__list-image_filter"
              alt="icon"
            />
            <li className="navbar__list-item">Мероприятия</li>
          </NavLink>
          <NavLink
            exact
            to="/lead_admin/create_event"
            activeStyle={{ backgroundColor: "#1DA48B" }}
            className="navbar__list-link"
          >
            <img
              src={create_event}
              className="navbar__list-image navbar__list-image_filter"
              alt="icon"
            />
            <li className="navbar__list-item">Бронирование</li>
          </NavLink>
          <NavLink
            exact
            to="/lead_admin"
            activeStyle={{ backgroundColor: "#1DA48B" }}
            className="navbar__list-link"
          >
            <img
              src={stat}
              className="navbar__list-image navbar__list-image_filter"
              alt="icon"
            />
            <li className="navbar__list-item">Статистика</li>
          </NavLink>
          <NavLink
            exact
            to="/lead_admin/all_events"
            activeStyle={{ backgroundColor: "#1DA48B" }}
            className="navbar__list-link"
          >
            <img
              src={events}
              className="navbar__list-image navbar__list-image_events navbar__list-image_filter"
              alt="icon"
            />
            <li className="navbar__list-item">Все события</li>
          </NavLink>
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

export default withDataContainer(withRouter(AdminNavbar));
