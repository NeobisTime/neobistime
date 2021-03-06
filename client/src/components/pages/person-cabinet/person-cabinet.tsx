import React, { useState, useEffect } from "react";
import Navbar from "../../shared/navbar";
import { Link } from "react-router-dom";
import PersonalEventCreateModal from "../calendar/modals/create-personal-event";
import NoteInfoModal from "../calendar/modals/note-info";
import Alert from "../../shared/alert";
import Spinner from "../../shared/spinner/spinner";

// images
import avatar from "../../../images/shared/user.svg";
import all from "../../../images/shared/all_events.svg";
import comed from "../../../images/pages/comed_events.svg";
import missed from "../../../images/pages/missed_events.svg";
import firstAchievement from "../../../images/pages/personal_achievment_1.svg";
import secondAchievement from "../../../images/pages/personal_achievment_2.svg";
import thirdAchievement from "../../../images/pages/personal_achievment_3.svg";
import editImage from "../../../images/shared/edit_pencil_neobis_color.svg";

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
import API from "../../../API";
import withDataContainer from "../../../HOC/withData";

const PersonalOffice = (props: any) => {
  // calendar data
  const [currentEvent, setCurrentEvent] = useState<any>({});
  const [serverEvents, setServerEvents] = useState([]);
  console.log("PersonalOffice -> serverEvents", serverEvents)
  const [publicEvents, setPublicEvents] = useState([]);
  console.log("PersonalOffice -> publicEvents", publicEvents)
  const [date, setDate] = useState(new Date());

  // stats data
  const [period, setPeriod] = useState("week");
  const [statsData, setStatsData] = useState<any>([]);

  // person info
  const [userInfo, setUserInfo] = useState<any>({});
  const [department, setDepartment] = useState<any>({});

  const FIRST_MILE_STONE = 100;
  const SECOND_MILE_STONE = 250;
  const THIRD_MILE_STONE = 500;

  useEffect(() => {
    API.getPersonalStats(period).then((data) => {
      setStatsData(data.data);
    });
  }, [period]);

  useEffect(() => {
    API.getUserInfo().then((data) => {
      setUserInfo(data.data);
      let departmentNumber = props.departments.filter(
        (department: any) => +department.value === +data.data.department_id
      );
      setDepartment(departmentNumber[0]);
    });
    // chanching the localization of calendar buttons
    document.getElementsByClassName("fc-today-button")[0].innerHTML = "Сегодня";
    document.getElementsByClassName("fc-dayGridMonth-button")[0].innerHTML =
      "Месяц";
    document.getElementsByClassName("fc-timeGridWeek-button")[0].innerHTML =
      "Неделя";
    document.getElementsByClassName("fc-timeGridDay-button")[0].innerHTML =
      "День";
    document.getElementsByClassName("fc-listMonth-button")[0].innerHTML =
      "Лист";
  }, []);

  // hide statistics on load
  useEffect(() => {
    const statAdr = document.getElementsByClassName("personal-office__stat")[0];
    const stat = statAdr as HTMLElement;
    stat.style.display = "none";
  }, []);

  // * chart info
  const data = {
    datasets: [
      {
        data: [
          statsData.quantity_of_attended_events || 0,
          statsData.quantity_of_missed_events == 0
            ? 0
            : statsData.quantity_of_missed_events,
          statsData.quantity_of_missed_events == 0 &&
          statsData.quantity_of_attended_events == 0
            ? 1
            : 0,
        ],
        backgroundColor: ["#FFCE56", "#EC4C47", "grey"],
      },
    ],
    labels: ["Посещенных мероприятий", "Пропущенных мероприятий", "пока пусто"],
    legend: {
      display: false,
    },
    options: {
      legend: {
        display: false,
      },
    },
  };

  //* start function to toogle between calendar and stats
  // TODO refactor
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

  useEffect(() => {
    API.getNotes().then((data) => {
      setServerEvents(data.data);
    });
    API.getPublicChoosenNotes().then((data) => {
      setPublicEvents(data.data);
    });
  }, []);

  let [isPersonalEventCreate, setIsPersonalEventCreate] = useState<boolean>(
    false
  );
  const togglePersonalEventCreate = () => {
    setIsPersonalEventCreate(!isPersonalEventCreate);
    updateEvents();
  };

  const handleDateSelect = (selectInfo: any) => {
    setDate(selectInfo.start);
    setIsPersonalEventCreate(true);
  };

  const handleEventDropAndResize = (eventDropInfo: any) => {
    let oldEvent = serverEvents.find(
      (item: any) => item.id === Number(eventDropInfo.oldEvent._def.publicId)
    ) || {
      id: "",
      start: "",
      end: "",
    };
    oldEvent.start = eventDropInfo.event.startStr;
    oldEvent.end = eventDropInfo.event.endStr;
    const dataToPatch = {
      start: oldEvent.start,
      end: oldEvent.end,
    };
    API.patchNoteChangeData(dataToPatch, oldEvent.id)
      .then((response) => {
        openAlert(response);
      })
      .catch((error) => {
        openAlert(error.request);
      });
  };

  let [isEventInfoOpen, setIsEventInfoOpen] = useState<boolean>(false);
  const toggleEventInfoOpen = () => {
    setIsEventInfoOpen(!isEventInfoOpen);
    updateEvents();
  };
  const handleEventClick = (eventClickInfo: any) => {
    let eventId = Number(eventClickInfo.event._def.publicId);
    let findCurrentEvent = serverEvents.filter(
      (event: any) => event.id === eventId
    )
    console.log("handleEventClick -> findCurrentEvent", findCurrentEvent)

    if (!findCurrentEvent[0]) {
      findCurrentEvent = publicEvents.filter(
        (event: any) => event.id === eventId
      )
    }

    setCurrentEvent(findCurrentEvent[0]);
    toggleEventInfoOpen();
  };

  const updateEvents = () => {
    API.getNotes().then((data) => {
      setServerEvents(data.data);
    });
  };

  const [alertType, setAlertType] = useState("success");
  const [alertText, setAlertText] = useState("");
  let [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const toggleAlertOpen = () => {
    setIsAlertOpen(!isAlertOpen);
  };
  const openAlert = (response: any) => {
    if (response.status >= 200 && response.status <= 299) {
      setAlertType("success");
      setAlertText("Все прошло без ошибок");
    } else {
      setAlertType("error");
      setAlertText(response.response || "Непредвиденная ошибка");
    }
    setIsAlertOpen(true);
    setTimeout(() => {
      setIsAlertOpen(false);
    }, 5000);
  };

  const handleDateClick = (selectInfo: any) => {
    setIsPersonalEventCreate(true);
  };

  return (
    <>
      <div className="wrapper">
        <Navbar />
        <div className=" content__wrapper content__wrapper_no_margin personal-office">
          <Spinner timeOut={600} />

          <section className="personal-office__info">
            <div className="personal-office__info-picture-block">
              <img
                className="personal-office__info-avatar"
                src={userInfo.profile_img || avatar}
                alt="personal"
              />
            </div>
            <div className="personal-office__info-content-wrapper">
              <div className="personal-office__info-section">
                <p className="personal-office__info-name">
                  {userInfo.name_surname}
                </p>
                {/* <p className="personal-office__info-dep">
                  {department.label || "Neobis"} Department
                </p> */}
                <p className="personal-office__info-text">
                  E-mail: &nbsp;
                  <span className="personal-office__info-text-content">
                    {userInfo.email}
                  </span>
                </p>
                <p className="personal-office__info-text">
                  Телефон: &nbsp;
                  <span className="personal-office__info-text-content">
                    {userInfo.phone}
                  </span>
                </p>
                <Link to="/change_personal_data" className="link">
                  <button className="button personal-office__info-edit">
                    <img
                      src={editImage}
                      alt="pencil"
                      className="personal-office__info-edit-image"
                    />
                    Редактировать
                  </button>
                </Link>
              </div>
            </div>

            <div className="personal-office__info-points">
              <div className="personal-office__info-points-container">
                <p className="personal-office__info-points-value">
                  {userInfo.points}
                </p>
              </div>
              {userInfo.points ? (
                userInfo.points >= FIRST_MILE_STONE ? (
                  <div className="personal-office__info-points-achievements">
                    <div className="personal-office__info-points-achievements-images">
                      {userInfo.points ? (
                        userInfo.points >= FIRST_MILE_STONE ? (
                          <img
                            className="personal-office__info-points-achievements-image"
                            src={firstAchievement}
                            alt="achievement"
                          />
                        ) : null
                      ) : null}

                      {userInfo.points ? (
                        userInfo.points >= SECOND_MILE_STONE ? (
                          <img
                            className="personal-office__info-points-achievements-image"
                            src={secondAchievement}
                            alt="achievement"
                          />
                        ) : null
                      ) : null}
                      {userInfo.points ? (
                        userInfo.points >= THIRD_MILE_STONE ? (
                          <img
                            className="personal-office__info-points-achievements-image"
                            src={thirdAchievement}
                            alt="achievement"
                          />
                        ) : null
                      ) : null}
                    </div>
                    <div className="personal-office__info-points-achievements-values">
                      {userInfo.points ? (
                        userInfo.points >= FIRST_MILE_STONE ? (
                          <span className="personal-office__info-points-achievements-value">
                            {FIRST_MILE_STONE}
                          </span>
                        ) : null
                      ) : null}
                      {userInfo.points ? (
                        userInfo.points >= SECOND_MILE_STONE ? (
                          <span className="personal-office__info-points-achievements-value">
                            {SECOND_MILE_STONE}
                          </span>
                        ) : null
                      ) : null}
                      {userInfo.points ? (
                        userInfo.points >= THIRD_MILE_STONE ? (
                          <span className="personal-office__info-points-achievements-value">
                            {THIRD_MILE_STONE}
                          </span>
                        ) : null
                      ) : null}
                    </div>
                  </div>
                ) : null
              ) : null}
            </div>
          </section>

          {/* mobile version */}
          <section className="personal-office__info personal-office__info_mobile ">
            <div className="personal-office__info-content-wrapper_mobile">
              <div className="personal-office__info-section">
                <p className="personal-office__info-name">
                  {userInfo.name_surname}
                </p>
                <p className="personal-office__info-text">
                  E-mail: &nbsp;
                  <span className="personal-office__info-text-content">
                    {userInfo.email}
                  </span>
                </p>
                <p className="personal-office__info-text">
                  Телефон: &nbsp;
                  <span className="personal-office__info-text-content">
                    {userInfo.phone}
                  </span>
                </p>
                <Link to="/change_personal_data" className="link">
                  <button className="button personal-office__info-edit">
                    <img
                      src={editImage}
                      alt="pencil"
                      className="personal-office__info-edit-image"
                    />
                    Редактировать
                  </button>
                </Link>
              </div>
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
              locale="ru"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
              }}
              initialView="dayGridMonth"
              // events={serverEvents}
              eventSources={[publicEvents, serverEvents]}
              editable={true}
              firstDay={1}
              dayMaxEventRows={true}
              selectable={true}
              selectMirror={true}
              select={handleDateSelect}
              dateClick={handleDateClick}
              eventDrop={handleEventDropAndResize}
              eventResize={handleEventDropAndResize}
              eventClick={handleEventClick}
              slotDuration="00:15:00" // интервал при изменении на календаре
            />
          </section>

          <section className="personal-office__stat">
            <div className="personal-office__stat-wrapper">
              <div className="personal-office__stat-doughnut">
                <Doughnut
                  data={data}
                  width={100}
                  height={75}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    legend: {
                      display: false,
                    },
                  }}
                />
              </div>

              <div className="personal-office__stat-content">
                <div className="personal-office__stat-buttons">
                  {/* <p className="personal-office__stat-buttons-text">
                    Сортировать по:
                  </p> */}
                  <div className="personal-office__stat-buttons-content">
                    <input
                      type="button"
                      value="Неделя"
                      onClick={() => setPeriod("week")}
                      className={
                        period === "week"
                          ? "button personal-office__stat-button personal-office__stat-button_active"
                          : "button personal-office__stat-button"
                      }
                    />

                    <input
                      type="button"
                      value="Месяц"
                      onClick={() => setPeriod("month")}
                      className={
                        period === "month"
                          ? "button personal-office__stat-button personal-office__stat-button_active"
                          : "button personal-office__stat-button"
                      }
                    />
                    <input
                      type="button"
                      value="Год"
                      onClick={() => setPeriod("year")}
                      className={
                        period === "year"
                          ? "button personal-office__stat-button personal-office__stat-button_active"
                          : "button personal-office__stat-button"
                      }
                    />
                  </div>
                </div>
                <div className="personal-office__stat-info">
                  <div className="personal-office__stat-info-content">
                    <div className="personal-office__stat-info-block">
                      <img
                        className="personal-office__stat-info-block-img"
                        src={all}
                        alt="personal stat logo"
                      />
                      <p className="personal-office__stat-info-block-text">
                        Всего
                      </p>
                      <p
                        style={{ color: "#1070CA" }}
                        className="personal-office__stat-info-block-number"
                      >
                        {statsData.quantity_of_polls}
                      </p>
                    </div>
                    <div className="personal-office__stat-info-block">
                      <img
                        className="personal-office__stat-info-block-img"
                        src={comed}
                        alt="personal stat logo"
                      />
                      <p className="personal-office__stat-info-block-text">
                        Посещено
                      </p>
                      <p
                        style={{ color: "#F7D154" }}
                        className="personal-office__stat-info-block-number"
                      >
                        {statsData.quantity_of_attended_events}
                      </p>
                    </div>
                    <div className="personal-office__stat-info-block">
                      <img
                        className="personal-office__stat-info-block-img personal-office__stat-info-block-img_small"
                        src={missed}
                        alt="personal stat logo"
                      />
                      <p className="personal-office__stat-info-block-text">
                        Пропущено
                      </p>
                      <p
                        style={{ color: "#EC4C47" }}
                        className="personal-office__stat-info-block-number"
                      >
                        {statsData.quantity_of_missed_events}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {isAlertOpen && (
            <Alert
              type={alertType}
              text={alertText}
              onClose={toggleAlertOpen}
            />
          )}
        </div>
      </div>
      {isEventInfoOpen && (
        <NoteInfoModal
          OpenAlert={openAlert}
          onClose={toggleEventInfoOpen}
          event={currentEvent}
        />
      )}
      {isPersonalEventCreate && (
        <PersonalEventCreateModal
          onClose={togglePersonalEventCreate}
          updateEvents={updateEvents}
          date={date}
          OpenAlert={openAlert}
        />
      )}
    </>
  );
};

export default withDataContainer(PersonalOffice);
