import React, {useState,useEffect} from "react";
import Navbar from "../../shared/navbar";
import { Link } from "react-router-dom";

// default avatar
import avatar from "../../../images/shared/user.svg";

// charts
import { Doughnut } from "react-chartjs-2";

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
  useEffect(() => {
    const statAdr = document.getElementsByClassName("personal-office__stat")[0];
    const stat = statAdr as HTMLElement;
    stat.style.display = "none";
  }, [])
  
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

  // * chart info
  const data = {
    datasets: [{
      data: [10, 20],
      backgroundColor: [
        '#36A2EB',
        '#FFCE56'
        ],
    }],
    labels: [
      'Посещенных мероприятий',
      'Всего мероприятий',
    ],
    legend: {
      display: false
    },
    options: {
      legend: {
        display: false
      }
    }
  }

  //* start function to toogle between calendar and stats
  const openStatistics = () => {
    const calendarAdr = document.getElementsByClassName(
      "personal-office__calendar"
    )[0];
    const calendar = calendarAdr as HTMLElement;
    const statAdr = document.getElementsByClassName("personal-office__stat")[0];
    const stat = statAdr as HTMLElement;

    const statId = document.getElementById("personal-office__stat");
    const statIdFinal = statId as HTMLElement;
    const calendarId = document.getElementById("personal-office__calendar");
    const calendarIdFinal = calendarId as HTMLElement;
    calendar.style.display = "none";
    stat.style.display = "block";
    calendarIdFinal.className =
      "personal-office__buttons-section-btn personal-office__buttons-section-btn_non_active";
    statIdFinal.className =
      "personal-office__buttons-section-btn personal-office__buttons-section-btn_active";
  };
  const openCalendar = () => {
    const calendarAdr = document.getElementsByClassName(
      "personal-office__calendar"
    )[0];
    const calendar = calendarAdr as HTMLElement;
    const statAdr = document.getElementsByClassName("personal-office__stat")[0];
    const stat = statAdr as HTMLElement;

    const statId = document.getElementById("personal-office__stat");
    const statIdFinal = statId as HTMLElement;
    const calendarId = document.getElementById("personal-office__calendar");
    const calendarIdFinal = calendarId as HTMLElement;
    stat.style.display = "none";
    calendar.style.display = "block";
    calendarIdFinal.className =
      "personal-office__buttons-section-btn personal-office__buttons-section-btn_active";
    statIdFinal.className =
      "personal-office__buttons-section-btn personal-office__buttons-section-btn_non_active";
  };

  // end function to toogle between calendar and stats

  return (
    <div className="wrapper">
      <Navbar />
      <div className=" content__wrapper content__wrapper_no_margin personal-office">
        <section className="personal-office__info">
          <div className="personal-office__info-picture-block">
            <img
              className="personal-office__info-avatar"
              src={avatar}
              alt="personal"
            />
          </div>
          <div className="personal-office__info-content-wrapper">
            <div className="personal-office__info-section">
              <p className="personal-office__info-name">Адахан Азизбек уулу</p>
              <p className="personal-office__info-dep">Ios Department</p>
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

            <Link to="/change_password" className="link">
              <button className="button personal-office__info-edit">
                Редактировать
              </button>
            </Link>
          </div>
          <div className="personal-office__info-points">
            <div className="personal-office__info-points-value">10</div>
          </div>
        </section>

        <section className="personal-office__buttons">
          <div className="personal-office__buttons-section ">
            <p
              id="personal-office__calendar"
              className="personal-office__buttons-section-btn personal-office__buttons-section-btn_active"
              onClick={openCalendar}
            >
              Календарь
            </p>
          </div>
          <div className="personal-office__buttons-section">
            <p
              id="personal-office__stat"
              className="personal-office__buttons-section-btn personal-office__buttons-section-btn_non_active"
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

        <section className="personal-office__stat">
          <Doughnut
            data={data}
            width={300}
            height={100}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              legend: {
                display: false
              }
            }}
          />
        </section>
      </div>
    </div>
  );
};

export default PersonalOffice;
