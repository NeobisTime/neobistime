import React, { useState, useEffect } from "react";
import withNavbarContainer from "../../../../HOC/withNavbar";
import { Link } from "react-router-dom";
import API from "../../../../API";
import withDataContainer from "../../../../HOC/withData";

type EndEventsListProps = {
  events: object[];
};

const EndEventsList = ({ events }: EndEventsListProps) => {
  return (
    <div className="today__list">
      {events &&
        events.map((item: any) => {
          let startDate = new Date(item.start);
          let endDate = new Date(item.end);
          return (
            <Link to={`/lead_admin/end_event/${item.id}`} className="link">
              <div className="today__list-item">
                <div className="today__list-item-answer">
                  <div
                    className="today__list-item-answer_circle_red"
                  ></div>
                </div>
                <div className="today__list-item-content">
                  <p className="today__list-item-text">{item.title}</p>
                  <p className="today__list-item-time">
                    {startDate.getHours()}:
                    {(startDate.getMinutes() < 10 ? "0" : "") +
                      startDate.getMinutes()}{" "}
                    - {endDate.getHours()}:
                    {(endDate.getMinutes() < 10 ? "0" : "") +
                      endDate.getMinutes()}{" "}
                    &nbsp;&nbsp;&nbsp;
                    {(startDate.getDate() < 10 ? "0" : "") +
                      startDate.getDate()}
                    .
                    {(startDate.getMonth() + 1 < 10 ? "0" : "") +
                      (startDate.getMonth() + 1)}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

const EndEvents = () => {
  const [endEvents, setEndEvents] = useState([]);

  useEffect(() => {
    API.getEndEvents().then((data) => {
      setEndEvents(data.data);
    });
  }, []);

  return (
    <>
      <p className="today__title">Закончившиеся Мероприятия</p>
      <EndEventsList events={endEvents} />
    </>
  );
};

export default withDataContainer(withNavbarContainer(EndEvents, "admin"));
