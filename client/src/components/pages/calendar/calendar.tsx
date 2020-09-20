import React, { useState, useEffect } from "react";
import withNavbarContainer from "../../../HOC/withNavbar";

// fullcalendar
import FullCalendar from "@fullcalendar/react";
import googleCalendarPlugin from "@fullcalendar/google-calendar";

// imports for view style(month, week, day, list)
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

// modals
import EventInfoModal from "./modals/event-info";
import AdminChooseModal from "./modals/admin-choose";
import PersonalEventCreateModal from "./modals/create-personal-event";
import AdminEventCreateModal from "./modals/admin-event";
import API, { getCookie } from "../../../API";
import { withRouter } from "react-router-dom";
import Alert from "../../shared/alert";

export const CloseModalButton = (props: any) => {
  return (
    <div className="event-info-modal__modal">
      <button
        onClick={props.onClose}
        className="event-info-modal__modal-btn button"
      >
        &times;
      </button>
    </div>
  );
};

const Calendar = (props: any) => {
  const [currentEvent, setCurrentEvent] = useState<any>({});
  const [role, setRole] = useState<string | undefined>("");
  const [editable, setEditable] = useState(false);
  const [date, setDate] = useState(new Date());

  // ! date не обязателен если есть start
  const [serverEvents, setServerEvents] = useState([]);

  useEffect(() => {
    API.getEvents(1000, 0, "", "").then((res) => {
      setServerEvents(res.data.results);
    });
    setRole(getCookie("role"));
    if (getCookie("role") === "admin") {
      setEditable(true);
    } else {
      setEditable(false);
    }
    let token = localStorage.getItem("neoTimeToken");
    if (!token) {
      props.history.push("/auth");
    }
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

  // google calendar api integration
  const events = {
    googleCalendarId: "neobistime.kg@gmail.com",
    borderColor: "transparent",
    classNames: ["google-calendar"],
  };

  let [isEventInfoOpen, setIsEventInfoOpen] = useState<boolean>(false);
  const toggleEventInfoOpen = () => {
    setIsEventInfoOpen(!isEventInfoOpen);
  };
  const handleEventClick = (eventClickInfo: any) => {
    let eventId = Number(eventClickInfo.event._def.publicId);
    let findCurrentEvent = serverEvents.filter(
      (event: any) => event.id === eventId
    );
    setCurrentEvent(findCurrentEvent[0]);
    toggleEventInfoOpen();
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
      setAlertText(response.response || "непредвиденная ошибка");
    }
    setIsAlertOpen(true);
    setTimeout(() => {
      setIsAlertOpen(false);
    }, 10000);
  };

  const updateStartTime = (startDate: any) => {
    let startTime = new Date(startDate);
    let finalTime = `${startTime.getFullYear()}-${
      startTime.getMonth() + 1
    }-${startTime.getDate()}T${startTime.getHours()}:${startTime.getMinutes()}:00`;
    return finalTime;
  };
  const updateEndTime = (endDate: any) => {
    let endTime = new Date(endDate);
    let finalTime = `${endTime.getFullYear()}-${
      endTime.getMonth() + 1
    }-${endTime.getDate()}T${endTime.getHours()}:${endTime.getMinutes()}:00`;
    return finalTime;
  };

  const handleEventDropAndResize = (eventDropInfo: any) => {
    let oldEvent = serverEvents.find(
      (item: any) => item.id === Number(eventDropInfo.oldEvent._def.publicId)
    ) || {
      id: "",
      start: "",
      end: "",
      deadline: "",
      my_event: false,
      place: { id: 0 },
    };
    let finalStart = updateStartTime(eventDropInfo.event.startStr);
    oldEvent.start = finalStart;
    let finalEnd = updateEndTime(eventDropInfo.event.endStr);
    oldEvent.end = finalEnd;
    oldEvent.deadline = finalStart;
    // TODO if my_event === false we should send attendees
    const dataToPatch = {
      start: oldEvent.start,
      end: oldEvent.end,
      deadline: oldEvent.start,
      my_event: String(oldEvent.my_event),
      public: String(true),
      place: oldEvent.place.id,
    };
    API.patchEventChangeData(dataToPatch, oldEvent.id)
      .then((response) => {
        openAlert(response);
      })
      .catch((error) => {
        openAlert(error.request);
      });
  };

  let [isAdminEventCreate, setIsAdminEventCreate] = useState<boolean>(false);
  const toggleAdminEventCreate = () => {
    setIsAdminEventCreate(!isAdminEventCreate);
    updateEvents();
  };

  const handleDateSelect = (selectInfo: any) => {
    setDate(selectInfo.start);
    if (getCookie("role") === "admin") {
      setIsAdminEventCreate(true)
    }
  };
  const handleDateClick = (selectInfo: any) => {
    if (getCookie("role") === "admin") {
      setIsAdminEventCreate(true)
    }
  };

  const updateEvents = () => {
    API.getEvents(1000, 0, "", "").then((res) => {
      setServerEvents(res.data.results);
    });
  };


  return (
    <>
      <div style={{ boxSizing: "border-box", marginLeft: window.innerWidth > 400 ? '10px' : '0px' }}>
        <FullCalendar
          plugins={[
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
            listPlugin,
            googleCalendarPlugin,
            bootstrapPlugin,
          ]}
          height="98vh"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
          }}
          initialView={window.innerWidth > 600 ? "dayGridMonth" : "listMonth"}
          dateClick={handleDateClick} //TODO: edit
          editable={editable}
          firstDay={1}
          googleCalendarApiKey="AIzaSyCqbA_GExr7SrXh3ZVwCvojL_AGSnXN3X8"
          eventSources={[events, serverEvents]}
          dayMaxEventRows={true}
          selectable={true}
          selectMirror={true}
          select={handleDateSelect}
          eventDrop={handleEventDropAndResize}
          eventResize={handleEventDropAndResize}
          eventClick={handleEventClick}
          slotDuration="00:15:00" // интервал при изменении на календаре
          locale="ru"
        />

        {/* modals start */}
        {isAlertOpen && (
          <Alert type={alertType} text={alertText} onClose={toggleAlertOpen} />
        )}
        {isEventInfoOpen && (
          <EventInfoModal onClose={toggleEventInfoOpen} event={currentEvent} />
        )}
        {isAdminEventCreate && (
          <AdminEventCreateModal
            OpenAlert={openAlert}
            onClose={toggleAdminEventCreate}
            date={date}
          />
        )}
        {/* modals end */}
      </div>
    </>
  );
};

export default withNavbarContainer(withRouter(Calendar));
