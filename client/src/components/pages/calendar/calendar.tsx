import React from "react";
import Navbar from "../../shared/navbar";

// fullcalendar
import FullCalendar from "@fullcalendar/react";
import googleCalendarPlugin from "@fullcalendar/google-calendar";

// imports for view style(month, week, day, list)
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import bootstrapPlugin from "@fullcalendar/bootstrap";

import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

const Calendar = () => {
  const serverEvents = [
    {
      title: "neobis frontend meetup",
      date: "2020-07-08",
      backgroundColor: "green",
    },
    {
      title: "neobis meetup",
      start: "2020-08-01T12:30:00",
      end: "2020-08-01T13:30:00",
      backgroundColor: "",
    },
    {
      title: "Уборка Стирка Пылесосение Поливка разработка",
      date: "2020-07-06",
    },
    { title: "Уборка", date: "2020-07-06" },
    { title: "Уборка", date: "2020-07-06" },
    { title: "Уборка", date: "2020-07-06" },
    { title: "Уборка", date: "2020-07-06" },
    { title: "Уборка", date: "2020-07-06" },
    { title: "Встреча с заказчиком", date: "2020-07-10" },
    { title: "Праздник", date: "2020-07-02" },
    { title: "neobis python meetup", date: "2020-07-18" },
    { title: "rock party", date: "2020-07-12" },
    {
      title: "neobis frontend meetup тема: 'Абстрактный классы'",
      description: "митап об императивном программировании",
      date: "2020-07-30",
      backgroundColor: "grey"
    },
    {
      title: "neobis PM meetup",
      date: "2020-07-08",
      backgroundColor: "red",
    },
    {
      title: "Orientation day",
      // ! date не обязателен если есть start
      // date: "2020-07-21",
      start: "2020-07-28T10:30:00",
      backgroundColor: "red",
      end: "2020-07-28T12:30:00",
    },
    {
      title: "Orientation day part2",
      backgroundColor: "green",
      start: "2020-07-29T12:30:00",
      end: "2020-07-29T13:30:00",
    },
  ];

  // google calendar api integration
  const events = {
    googleCalendarId: "neobistime.kg@gmail.com",
    borderColor: "transparent",
    classNames: ["google-calendar"],
  };

  // TODO: here will be modal window open to add event
  const handleDateClick = (arg: any) => {
    // bind with an arrow function
    alert(arg.dateStr);
  };

  return (
    <div className="wrapper">
      <Navbar />

      <div className="content__wrapper">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
            listPlugin,
            googleCalendarPlugin,
            bootstrapPlugin
          ]}
          height="610px"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
          }}
          initialView="dayGridMonth"
          // events={events}
          dateClick={handleDateClick}
          editable={true}
          firstDay={1}
          googleCalendarApiKey="AIzaSyCqbA_GExr7SrXh3ZVwCvojL_AGSnXN3X8"
          eventSources={[events, serverEvents]}
          dayMaxEventRows={true}
          // themeSystem="bootstrap"  //minty theme add 
        />
      </div>

    </div>
  );
};

export default Calendar;
