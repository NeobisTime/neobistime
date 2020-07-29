import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import ConfirmExit from "./confirm-exit";

// *icons
import avatar from "../../../images/shared/user.svg";
import calendar from "../../../images/shared/calendar.svg";
import notification from "../../../images/shared/Notification.svg";
import interview from "../../../images/shared/interview.svg";
import today from "../../../images/shared/today.svg";
import admin from "../../../images/shared/admin.svg";
import exit from "../../../images/shared/exit.svg";

const Navbar = () => {
  let [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className="navbar">
      <Link to="/personal_office" className='link'>
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
          <NavLink to="/notifications" className="navbar__list-link">
            <img
              src={notification}
              className="navbar__list-image navbar__list-image_filter"
              alt="icon"
            />
            <li className="navbar__list-item">Уведомления</li>
          </NavLink>
          <NavLink to="/" className="navbar__list-link">
            <img
              src={calendar}
              className="navbar__list-image navbar__list-image_filter"
              alt="icon"
            />
            <li className="navbar__list-item">Календарь</li>
          </NavLink>
          <NavLink to="/today" className="navbar__list-link">
            <img
              src={today}
              className="navbar__list-image navbar__list-image_filter"
              alt="icon"
            />
            <li className="navbar__list-item">Расписание дня</li>
          </NavLink>
          <NavLink to="/today" className="navbar__list-link">
            <img
              src={interview}
              className="navbar__list-image navbar__list-image_filter"
              alt="icon"
            />
            <li className="navbar__list-item">Опросы</li>
          </NavLink>
          <NavLink to="/rooms" className="navbar__list-link">
            {/* <img
              src={interview}
              className="navbar__list-image navbar__list-image_filter"
              alt="icon"
            /> */}
            <li className="navbar__list-item">Комнаты</li>
          </NavLink>
          <NavLink to="/admin" className="navbar__list-link">
            <img
              src={admin}
              className="navbar__list-image navbar__list-image_filter"
              alt="icon"
            />
            <li className="navbar__list-item">Админ панель</li>
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

export default Navbar;
