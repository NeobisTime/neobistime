import React, { useState, useEffect } from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import ConfirmExit from "./confirm-exit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faBell,
  faKey,
  faHistory,
  faUserShield,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

// *icons
import avatar from "../../../images/shared/user.svg";
// import calendar from "../../../images/shared/calendar.svg";
// import notification from "../../../images/shared/Notification.svg";
// import today from "../../../images/shared/today.svg";
// import admin from "../../../images/shared/admin.svg";
// import exit from "../../../images/shared/exit.svg";
// import rooms from "../../../images/shared/rooms.svg";
import API, { getCookie } from "../../../API";
import withDataContainer from "../../../HOC/withData";

const links: any = [
  { name: "Уведомления", link: "/notifications", icon: faBell },
  { name: "Календарь", link: "/", icon: faCalendarAlt },
  { name: "Расписание дня", link: "/today", icon: faHistory },
  { name: "Комнаты", link: "/rooms", icon: faKey },
];

const Navbar = (props: any) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>({});
  const [role, setRole] = useState<string | undefined>("");
  const [department, setDepartment] = useState<any>({});
  const [openBurger, setOpenBurger] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    setRole(getCookie("role"));
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
      <div className="navbar__burger-wrapper">
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
          }}
        >
          <ul className="navbar__list">
            <NavLink
              exact
              to="/personal_office"
              activeStyle={{ backgroundColor: "#1DA48B" }}
              className="navbar__list-link navbar__personal-office"
            >
              <FontAwesomeIcon
                icon={faUserCircle}
                className="navbar__list-image "
              />
              <li className="navbar__list-item">Личный кабинет</li>
            </NavLink>
            {links.map((item: any, id: any) => (
              <NavLink
                exact
                key={id}
                to={item.link}
                activeStyle={{ backgroundColor: "#1DA48B" }}
                className="navbar__list-link"
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className="navbar__list-image "
                />
                <li className="navbar__list-item">{item.name}</li>
              </NavLink>
            ))}

            {role === "admin" ? (
              <NavLink
                exact
                to="/lead_admin"
                activeStyle={{ backgroundColor: "#1DA48B" }}
                className="navbar__list-link"
              >
                <FontAwesomeIcon
                  icon={faUserShield}
                  className="navbar__list-image "
                />
                <li className="navbar__list-item">Админ панель</li>
              </NavLink>
            ) : null}

            <div className="navbar__list-link" onClick={toggleModal}>
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

export default withRouter(withDataContainer(Navbar));
