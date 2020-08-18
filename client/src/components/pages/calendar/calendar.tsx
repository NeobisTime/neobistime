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
import API from "../../../API";

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
  // ! date не обязателен если есть start
  const [serverEvents, setServerEvents] = useState([
    {
      id: "1",
      title: "Orientation day",
      backgroundColor: "red",
      start: "2020-08-04T10:30:00",
      end: "2020-08-04T12:12:00",
    },
  ]);
  console.log("Calendar -> serverEvents", serverEvents);

  useEffect(() => {
    API.getEvents(1000, 0, "", "").then((res) => {
      console.log(res.data.results);
      // setServerEvents(res.data.results);
    });
  }, []);

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
  const handleEventClick = (eventClickInfo: any) => {
    toggleEventInfoOpen();
  };

  // !event drop on calendar function
  const handleEventDrop = (eventDropInfo: any) => {
    let oldEvent = serverEvents.find(
      (item: any) => item.id === eventDropInfo.oldEvent._def.publicId
    ) || {
      id: "",
      title: "",
      backgroundColor: "",
      start: "",
      end: "",
    };
    oldEvent.start = eventDropInfo.event.startStr;
    oldEvent.end = eventDropInfo.event.endStr;
    console.log("handleEventDrop -> oldEvent", oldEvent);
  };
  // !event resize function
  const handleEventResize = (eventResizeInfo: any) => {
    let oldEvent = serverEvents.find(
      (item: any) => item.id === eventResizeInfo.oldEvent._def.publicId
    ) || {
      id: "",
      title: "",
      backgroundColor: "",
      start: "",
      end: "",
    };
    oldEvent.start = eventResizeInfo.event.startStr;
    oldEvent.end = eventResizeInfo.event.endStr;
    console.log("handleEventDrop -> oldEvent", oldEvent);
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
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
        eventClick={handleEventClick}
        slotDuration="00:15:00" // интервал при изменении на календаре
        locale="ru"
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
      <AdminEventCreateModal onClose={toggleAdminEventCreate} />
      {isAdminEventCreate && (
        <AdminEventCreateModal onClose={toggleAdminEventCreate} />
      )}
      {/* modals end */}
    </>
  );
};

export default withNavbarContainer(Calendar);
