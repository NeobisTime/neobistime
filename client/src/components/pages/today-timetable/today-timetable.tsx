import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import withNavbarContainer from "../../../HOC/withNavbar";
import API from "../../../API";
import EmptyRoom from "../rooms/rooms-empty";

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
                    className={
                      +today.getTime() > +startDate.getTime()
                        ? "today__list-item-answer_circle_red"
                        : "today__list-item-answer_circle"
                    }
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

let months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Cентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
let today = new Date();
export let finalDate = `${
  months[today.getMonth()]
}${" "}${today.getDate()}  ${today.getFullYear()}`;

const TodayTimetable = (props: any) => {
  const [todayEvents, setTodayEvents] = useState([]);
  // let {state: todayEvents, setState: setTodayEvents} = useState([])

  // google events from google calendat api
  const [gevents, setGevents] = useState<any>();
  const GOOGLE_API_KEY = "AIzaSyCqbA_GExr7SrXh3ZVwCvojL_AGSnXN3X8";
  const CALENDAR_ID = "neobistime.kg@gmail.com";

  useEffect(() => {
    API.getTodaySchedule().then((requestData: any) => {
      setTodayEvents(requestData.data);
    });
  }, []);

  // function getEvents() {
  //   function start() {
  //     gapi.client
  //       .init({
  //         apiKey: GOOGLE_API_KEY,
  //       })
  //       .then(function () {
  //         return gapi.client.request({
  //           path: `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`,
  //         });
  //       })
  //       .then(
  //         (response: any) => {
  //           let events = response.result.items;
  //           setGevents(events);
  //           console.log(gevents?.state?.events);
  //         },
  //         function (reason: any) {
  //           console.log(reason);
  //         }
  //       );
  //   }
  //   gapi.load("client", start);
  // }

  return (
    <>
      <p className="today__title">{finalDate}</p>
      <TodayList events={todayEvents} />
    </>
  );
};

export default withNavbarContainer(TodayTimetable);
