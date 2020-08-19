import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import withNavbarContainer from "../../../HOC/withNavbar";
import API from "../../../API";
import EmptyRoom from "../rooms/rooms-empty";

// TODO: todayList нужно сделать переиспользуемым компонентом, он используется на  этой странице и на admin-end-events

type TodayListProps = {
  events: object[];
};

export const TodayList = ({ events }: TodayListProps) => {
  return (
    <div className="today__list">
      {events ? (
        events.map((event: any) => {
          const startDate = new Date(event.start);
          const endDate = new Date(event.end);
          return (
            <Link to={`/today/${event.id}`} key={event.id} className="link">
              <div className="today__list-item">
                <div className="today__list-item-answer">
                  <div
                    className="today__list-item-answer_circle"
                    style={{ backgroundColor: "var(--neobisColor)" }}
                  ></div>
                </div>
                <div className="today__list-item-content">
                  <p className="today__list-item-text">{event.title}</p>
                  <p className="today__list-item-time">
                    {startDate.getHours()}:
                    {(startDate.getMinutes() < 10 ? "0" : "") +
                      startDate.getMinutes()}{" "}
                    - {endDate.getHours()}:
                    {(endDate.getMinutes() < 10 ? "0" : "") +
                      endDate.getMinutes()}{" "}
                  </p>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <EmptyRoom />
      )}
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

const TodayTimetable = (props: any) => {
  const [todayEvents, setTodayEvents] = useState([]);
  useEffect(() => {
    API.getTodaySchedule().then((requestData) => {
      console.log("TodayTimetable -> requestData", requestData);
      setTodayEvents(requestData.data);
    });
  }, []);
  return (
    <>
      <p className="today__title">{finalDate}</p>
      <TodayList events={todayEvents} />
    </>
  );
};

export default withNavbarContainer(TodayTimetable);
