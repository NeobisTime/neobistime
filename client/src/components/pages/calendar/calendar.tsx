import React, { useState } from "react";
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

const Calendar = () => {
  const [serverEvents, setServerEvents] = useState([
    {
      title: "neobis frontend meetup",
      date: "2020-08-08",
      backgroundColor: "green",
    },
    {
      title: "neobis meetup",
      start: "2020-08-01T12:30:00",
      end: "2020-08-01T13:30:00",
    },
    {
      title: "Уборка Стирка Пылесосение Поливка разработка",
      date: "2020-09-01",
    },
    { title: "Уборка", date: "2020-08-06" },
    { title: "Уборка", date: "2020-08-06" },
    { title: "Уборка", date: "2020-08-06" },
    { title: "Уборка", date: "2020-08-06" },
    { title: "Уборка", date: "2020-08-12", backgroundColor: "red" },
    { title: "Встреча с заказчиком", date: "2020-08-10" },
    { title: "Праздник", date: "2020-08-02" },
    {
      title: "neobis python meetup",
      date: "2020-08-18",
      backgroundColor: "green",
    },
    { title: "rock party", date: "2020-08-12" },
    {
      title: "neobis frontend meetup тема: 'Абстрактный классы'",
      description: "митап об императивном программировании",
      date: "2020-08-30",
    },
    {
      title: "neobis PM meetup",
      date: "2020-08-08",
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
  ]);

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
  // TODO: modal window to see event logic
  let [isEventInfoOpen, setIsEventInfoOpen] = useState<boolean>(false);
  const toggleEventInfoOpen = () => {
    setIsEventInfoOpen(!isEventInfoOpen);
  };
  const handleEventClick = () => {
    toggleEventInfoOpen();
  };

  // create event
  let [isEventCreateChooseOpen, setIsEventCreateChooseOpen] = useState<boolean>(
    false
  );
  const toggleEventCreateChoose = () => {
    setIsEventCreateChooseOpen(!isEventCreateChooseOpen);
  };

  let [isPersonalEventCreate, setIsPersonalEventCreate] = useState<boolean>(
    false
  );
  const togglePersonalEventCreate = () => {
    setIsPersonalEventCreate(!isPersonalEventCreate);
    setIsEventCreateChooseOpen(false);
  };

  let [isAdminEventCreate, setIsAdminEventCreate] = useState<boolean>(false);
  const toggleAdminEventCreate = () => {
    setIsAdminEventCreate(!isAdminEventCreate);
    setIsEventCreateChooseOpen(false);
  };
  const handleDateSelect = (selectInfo: any) => {
    toggleEventCreateChoose();
  };

  const handleEvents = (events: any) => {
    setServerEvents(events);
  };

  // function renderEventContent(eventInfo: any) {
  //   return (
  //     <>
  //       <b>{eventInfo.timeText}</b>
  //       <i>{eventInfo.event.title}</i>
  //     </>
  //   );
  // }

  return (
    <>
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
        // dateClick={handleDateClick} //TODO: edit
        editable={true}
        firstDay={1}
        googleCalendarApiKey="AIzaSyCqbA_GExr7SrXh3ZVwCvojL_AGSnXN3X8"
        eventSources={[events, serverEvents]}
        dayMaxEventRows={true}
        selectable={true}
        selectMirror={true}
        select={handleDateSelect}
        // eventContent={renderEventContent} // custom render function //TODO edit
        eventClick={handleEventClick}
        // eventsSet={handleEvents} // called after events are initialized/added/changed/removed //TODO edit
      />

      {/* modals start */}
      {isEventInfoOpen && <EventInfoModal onClose={toggleEventInfoOpen} />}
      {isEventCreateChooseOpen && (
        <AdminChooseModal
          onClose={toggleEventCreateChoose}
          openPersonalEventCreateWindow={togglePersonalEventCreate}
          openAdminEventCreateWindow={toggleAdminEventCreate}
        />
      )}
      {isPersonalEventCreate && (
        <PersonalEventCreateModal onClose={togglePersonalEventCreate} />
      )}
      {isAdminEventCreate && (
        <AdminEventCreateModal onClose={toggleAdminEventCreate} />
      )}
      {/* modals end */}
    </>
  );
};

export default withNavbarContainer(Calendar);
