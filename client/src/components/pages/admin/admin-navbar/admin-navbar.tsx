import React, { useState, useEffect } from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import ConfirmExit from "../../../shared/navbar/confirm-exit";
import API, { getCookie } from "../../../../API";

// *icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faUserCheck,
  faCalendarPlus,
  faPoll,
  faEdit,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import avatar from "../../../../images/shared/user.svg";
// import exit from "../../../../images/shared/exit.svg";
// import events from "../../../../images/shared/all_events.svg";
// import peoples from "../../../../images/shared/admin_members.svg";
// import create_event from "../../../../images/shared/edit.svg";
// import stat from "../../../../images/shared/adminn_stat.svg";
// import calendar from "../../../../images/shared/calendar.svg";
import withDataContainer from "../../../../HOC/withData";

const AdminNavbar = (props: any) => {
  let [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>({});
  const [department, setDepartment] = useState<any>({});
  const [openBurger, setOpenBurger] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  useEffect(() => {
    API.getUserInfo().then((data) => {
      setUserInfo(data.data);
      let departmentNumber = props.departmentsForNavbar.filter(
        (department: any) => +department.value === +data.data.department_id
      );
      setDepartment(departmentNumber[0]);
    });
    let token = localStorage.getItem("neoTimeToken");
    if (!token) {
      props.history.push("/auth");
    }
  }, []);

  return (
    <>
      <div
        className="navbar__burger-wrapper"
        style={{
          backgroundColor: "#6C63FF",
        }}
      >
        <div
          className={
            openBurger ? "navbar__burger open_burger" : "navbar__burger"
          }
          onClick={() => {
            setOpenBurger(!openBurger);
          }}
        >
          <div className="navbar__burger-button"></div>
        </div>
      </div>
      <div
        className="navbar"
        style={{
          height:
            window.innerWidth > 769 ? "auto" : openBurger ? "340px" : "0px",
          backgroundColor: "#6C63FF",
        }}
      >
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
              <p className="navbar__person-info-name">
                {userInfo.name_surname}
              </p>
              <p className="navbar__person-info-text">
                {department.label || "Neobis"}
              </p>
              <p className="navbar__person-info-text">{userInfo.email}</p>
            </div>
          </div>
        </Link>
        <div
          className="navbar__content"
          style={{
            clipPath:
              window.innerWidth > 769
                ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                : openBurger
                ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                : "polygon(0 0, 100% 0, 100% 0, 0 0)",
            backgroundColor: "#6C63FF",
          }}
        >
          <ul className="navbar__list">
            <NavLink
              exact
              to="/personal_office"
              activeStyle={{ backgroundColor: "#5E57DB" }}
              className="navbar__list-link navbar__personal-office"
            >
              <FontAwesomeIcon
                icon={faUserCircle}
                className="navbar__list-image "
              />
              <li className="navbar__list-item">Личный кабинет</li>
            </NavLink>
            <NavLink
              exact
              to="/"
              activeStyle={{ backgroundColor: "#5E57DB" }}
              className="navbar__list-link"
            >
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className="navbar__list-image "
              />
              <li className="navbar__list-item">На главную</li>
            </NavLink>
            <NavLink
              exact
              to="/lead_admin/end_events"
              activeStyle={{ backgroundColor: "#5E57DB" }}
              className="navbar__list-link"
            >
              <FontAwesomeIcon
                icon={faUserCheck}
                className="navbar__list-image "
              />
              <li className="navbar__list-item">Мероприятия</li>
            </NavLink>
            <NavLink
              exact
              to="/lead_admin/create_event"
              activeStyle={{ backgroundColor: "#5E57DB" }}
              className="navbar__list-link"
            >
              <FontAwesomeIcon
                icon={faCalendarPlus}
                className="navbar__list-image "
              />
              <li className="navbar__list-item">Бронирование</li>
            </NavLink>
            <NavLink
              exact
              to="/lead_admin"
              activeStyle={{ backgroundColor: "#5E57DB" }}
              className="navbar__list-link"
            >
              <FontAwesomeIcon icon={faPoll} className="navbar__list-image " />
              <li className="navbar__list-item">Статистика</li>
            </NavLink>
            <NavLink
              exact
              to="/lead_admin/all_events"
              activeStyle={{ backgroundColor: "#5E57DB" }}
              className="navbar__list-link"
            >
              <FontAwesomeIcon icon={faEdit} className="navbar__list-image " />
              <li className="navbar__list-item">Все события</li>
            </NavLink>
            <div className="navbar__list-link " onClick={toggleModal}>
              {/* <img src={exit} className="navbar__list-image" alt="icon" /> */}
              <button
                className="navbar__button navbar__list-item"
                style={{ padding: "5px 0" }}
              >
                Выйти
              </button>
            </div>
          </ul>
          {isModalOpen && <ConfirmExit onClose={toggleModal} />}
        </div>
      </div>
    </>
  );
};

export default withDataContainer(withRouter(AdminNavbar));
