import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import ConfirmExit from "../../../shared/navbar/confirm-exit";

// *icons
import avatar from "../../../../images/shared/user.svg";
import exit from "../../../../images/shared/exit.svg";
import events from "../../../../images/shared/all_events.svg";
import peoples from "../../../../images/shared/admin_members.svg";
import create_event from "../../../../images/shared/edit.svg";
import stat from "../../../../images/shared/adminn_stat.svg";
import calendar from "../../../../images/shared/calendar.svg";

const AdminNavbar = () => {
  let [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className="navbar">
      <Link to="/personal_office" className="link">
        <div className="navbar__person-info">
          <img
            className="navbar__person-info-image"
            src={avatar}
            alt="default avatar"
          />
          <div className="navbar__person-info-text_wrapper">
            <p className="navbar__person-info-name">Adakhan Azizbek uulu</p>
            <p className="navbar__person-info-text">IOS department </p>
            <p className="navbar__person-info-text">login@example.com</p>
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
            to="/admin/end_events"
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
            to="/admin/create_event"
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
            to="/admin"
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
            to="/admin/all_events"
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

export default AdminNavbar;
