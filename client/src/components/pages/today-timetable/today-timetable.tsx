import React from "react";
import { Link } from "react-router-dom";
import withNavbarContainer from "../../../HOC/withNavbar";

// TODO: todayList нужно сделать переиспользуемым компонентом, он используется на  этой странице и на admin-end-events

export const TodayList = () => {
  return (
    <div className="today__list">
      <Link to="/today/2" className="link">
        <div className="today__list-item">
          <div className="today__list-item-answer">
            <div
              className="today__list-item-answer_circle"
              style={{ backgroundColor: "var(--neobisColor)" }}
            ></div>
          </div>
          <div className="today__list-item-content">
            <p className="today__list-item-text">Frontend meetup</p>
            <p className="today__list-item-time">17:00 - 18:00</p>
          </div>
        </div>
      </Link>

      <Link to="/admin/end_event/3" className="link">
        <div className="today__list-item">
          <div className="today__list-item-answer">
            <div
              className="today__list-item-answer_circle"
              style={{ backgroundColor: "#EB0F0F" }}
            ></div>
          </div>
          <div className="today__list-item-content">
            <p className="today__list-item-text">Python meetup</p>
            <p className="today__list-item-time">10:00 - 13:00</p>
          </div>
        </div>
      </Link>

      <div className="today__list-item">
        <div className="today__list-item-answer">
          <div
            className="today__list-item-answer_circle"
            style={{ backgroundColor: " #2F80ED" }}
          ></div>
        </div>
        <div className="today__list-item-content">
          <p className="today__list-item-text">Orientation Day</p>
          <p className="today__list-item-time">12:00 - 16:00</p>
        </div>
      </div>
    </div>
  );
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let today = new Date();
export let finalDate = `${
  monthNames[today.getMonth()]
}${" "}${today.getDate()}  ${today.getFullYear()}`;

const TodayTimetable = () => {
  return (
    <>
      <p className="today__title">{finalDate}</p>
      <TodayList />
    </>
  );
};

export default withNavbarContainer(TodayTimetable);
