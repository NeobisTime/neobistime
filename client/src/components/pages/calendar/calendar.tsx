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
  const [currentEvent, setCurrentEvent] = useState<any>({});
  const [role, setRole] = useState<string | undefined>("");
  const [editable, setEditable] = useState(false);

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
  }, []);

  // google calendar api integration
  const events = {
    googleCalendarId: "neobistime.kg@gmail.com",
    borderColor: "transparent",
    classNames: ["google-calendar"],
  };

  // TODO: modal window to see event logic
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

  const handleEventDropAndResize = (eventDropInfo: any) => {
    let oldEvent = serverEvents.find(
      (item: any) => item.id === Number(eventDropInfo.oldEvent._def.publicId)
    ) || {
      id: "",
      start: "",
      end: "",
      deadline: "",
      my_event: false,
    };
    oldEvent.start = eventDropInfo.event.startStr;
    oldEvent.end = eventDropInfo.event.endStr;
    oldEvent.deadline = eventDropInfo.event.startStr;
    // TODO if my_event === false we should send attendees
    const dataToPatch = {
      start: oldEvent.start,
      end: oldEvent.end,
      deadline: oldEvent.start,
      my_event: oldEvent.my_event,
      public: true,
    };
    API.patchEventChangeData(dataToPatch, oldEvent.id);
    // API.getEventInfo(oldEvent.id).then((data) => {
    //   let attendees = data.data.attendees;
    //   const dataToPatch = {
    //     start: oldEvent.start,
    //     end: oldEvent.end,
    //     deadline: oldEvent.start,
    //     my_event: oldEvent.my_event,
    //     departments: attendees.departments,
    //     individual_users: attendees.individual_users,
    //   };
    //   API.patchEventChangeData(dataToPatch, oldEvent.id);
    // });
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

  // const handleEvents = (events: any) => {
  //   setServerEvents(events);
  // };

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
      {isEventInfoOpen && (
        <EventInfoModal onClose={toggleEventInfoOpen} event={currentEvent} />
      )}
      {isEventCreateChooseOpen && (
        <AdminChooseModal
          onClose={toggleEventCreateChoose}
          openPersonalEventCreateWindow={togglePersonalEventCreate}
          openAdminEventCreateWindow={toggleAdminEventCreate}
        />
      )}
      <PersonalEventCreateModal onClose={togglePersonalEventCreate} />
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
