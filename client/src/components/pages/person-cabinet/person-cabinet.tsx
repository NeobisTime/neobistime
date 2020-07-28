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

const PersonalOffice = () => {
  const contentEditable = false;

  const serverEvents = [
    { title: "Уборка", date: "2020-07-06" },
    { title: "Встреча с заказчиком", date: "2020-07-10" },
    { title: "Праздник", date: "2020-07-02" },
    { title: "neobis python meetup", date: "2020-07-18" },
    { title: "rock party", date: "2020-07-12" },
    { title: "Уборка", date: "2020-08-06" },
    { title: "Встреча с заказчиком", date: "2020-08-10" },
    { title: "Праздник", date: "2020-08-02" },
    { title: "neobis python meetup", date: "2020-08-18" },
    { title: "rock party", date: "2020-08-12" },
  ];

  const openStatistics = () => {
    const calendarAdr = document.getElementsByClassName(
      "personal-office__calendar"
    )[0];
    const calendar = calendarAdr as HTMLElement;
    const statAdr = document.getElementsByClassName("personal-office__stat")[0];
    const stat = statAdr as HTMLElement;

    calendar.style.display = "none";
    stat.style.display = "block";
  };
  const openCalendar = () => {
    const calendarAdr = document.getElementsByClassName(
      "personal-office__calendar"
    )[0];
    const calendar = calendarAdr as HTMLElement;
    const statAdr = document.getElementsByClassName("personal-office__stat")[0];
    const stat = statAdr as HTMLElement;
    stat.style.display = "none";
    calendar.style.display = "block";
  };

  return (
    <div className="wrapper">
      <Navbar />
      <div className=" content__wrapper content__wrapper_no_margin personal-office">
        <section className="personal-office__info">
          <div className="personal-office__info-section">
            <p className="personal-office__info-name">Феруза Асанова</p>
            <p className="personal-office__info-dep">Frontend Department</p>
          </div>
          <div className="personal-office__info-section">
            <p className="personal-office__info-text">
              E-mail:
              <span className="personal-office__info-text-content">
                login@example.com
              </span>
            </p>
            <p className="personal-office__info-text">
              Телефон:
              <span className="personal-office__info-text-content">
                +996700123321
              </span>
            </p>
          </div>
          <button className="button personal-office__info-edit">
            Редактировать
          </button>
        </section>

        <section className="personal-office__buttons">
          <div className="personal-office__buttons-section ">
            <p
              className="personal-office__buttons-section-btn personal-office__buttons-section-btn_active"
              onClick={openCalendar}
            >
              Календарь
            </p>
          </div>
          <div className="personal-office__buttons-section ">
            <p
              className="personal-office__buttons-section-btn "
              onClick={openStatistics}
            >
              Статистика
            </p>
          </div>
        </section>

        <section className="personal-office__calendar">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              interactionPlugin,
              timeGridPlugin,
              listPlugin,
              googleCalendarPlugin,
              bootstrapPlugin,
            ]}
            height="610px"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            events={serverEvents}
            editable={true}
            firstDay={1}
            dayMaxEventRows={true}
          />
        </section>

        <section className="personal-office__stat"></section>
      </div>
    </div>
  );
};

export default PersonalOffice;
