import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import withNavbarContainer from "../../../HOC/withNavbar";
import API from "../../../API";

// TODO: todayList нужно сделать переиспользуемым компонентом, он используется на  этой странице и на admin-end-events

type TodayListProps = {
  events: object[];
};

export const TodayList = ({ events }: TodayListProps) => {
  return (
    <div className="today__list">
      {events.map((event: any) => {
        const startTime = new Date(event.start_date);
        let finalStartTime = `${startTime.getHours()}:${startTime.getMinutes()}`;
        const endTime = new Date(event.end_date);
        let finalEndTime = `${endTime.getHours()}:${endTime.getMinutes()}`;
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
                  {finalStartTime} - {finalEndTime}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
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
      setTodayEvents(requestData.data.results);
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
