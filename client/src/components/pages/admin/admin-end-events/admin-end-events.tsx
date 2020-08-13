import React, { useState } from "react";
import withNavbarContainer from "../../../../HOC/withNavbar";
import { Link } from "react-router-dom";

type EndEventsListProps = {
  events: object[];
};

const EndEventsList = ({ events }: EndEventsListProps) => {
  return (
    <div className="today__list">
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
    </div>
  );
};

const EndEvents = () => {
  const [endEvents, setEndEvents] = useState([]);

  return (
    <>
      <p className="today__title">Закончившиеся Мероприятия</p>
      <EndEventsList events={endEvents} />
    </>
  );
};

export default withNavbarContainer(EndEvents, "admin");
