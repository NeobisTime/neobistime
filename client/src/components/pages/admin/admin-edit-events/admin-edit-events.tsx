import React, { useState, useEffect } from "react";
import arrow from "../../../../images/shared/arrow.svg";
import editPen from "../../../../images/shared/pencil.png";
import deleteImage from "../../../../images/pages/cross.svg";
import { Link } from "react-router-dom";
import withNavbarContainer from "../../../../HOC/withNavbar";
import API from "../../../../API";
import DeleteConfirmModal from "../../calendar/modals/delete-confirm";

const EditEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);
  const [next, setNext] = useState<string | null>("");

  useEffect(() => {
    API.getEvents(pageSize, pageSize * currentPage).then((events) => {
      setEvents(events.data.results);
      setTotalProducts(events.data.count);
      setNext(events.data.next);
    });
  }, [currentPage, events]);

  let [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  let [deleteEventId, setDeleteEventId] = useState<number | string>(0);
  const toggleDeleteOpen = () => {
    setIsDeleteOpen(!isDeleteOpen);
  };

  const deleteEvent = (id: number | string) => {
    setDeleteEventId(id)
    toggleDeleteOpen();

    API.getEvents(pageSize, pageSize * currentPage).then((events) => {
      setEvents(events.data.results);
      setTotalProducts(events.data.count);
      setNext(events.data.next);
    });
  };
  return (
    <>
      <div className="end-event-info">
        <div>
          <p className="end-event-info__title">Все события</p>
          <table className="end-event-info__table">
            <colgroup className="end-event-info__table-colgroup">
              <col id="event" />
              <col id="department" />
              <col id="date" />
              <col id="address" />
              <col id="edit" />
            </colgroup>
            <thead className="end-event-info__table-thead">
              <tr>
                <th scope="col">Событие</th>
                <th scope="col">Департамент</th>
                <th scope="col">Дата</th>
                <th scope="col">Адрес</th>
                <th scope="col">Изменить</th>
              </tr>
            </thead>
            <tbody className="end-event-info__table-tbody">
              {events.map((event: any) => {
                let date = new Date(event.start);
                return (
                  <tr key={event.id}>
                    <td data-label='Событие' className="bold">{event.title}</td>
                    <td data-label='Департамент' className="bold">{event.department}</td>
                    <td data-label='Дата' className="end-event-info__table-tbody-date">
                      {date.getDate()}/{date.getMonth() + 1}/
                      {date.getFullYear()}
                    </td>
                    <td data-label='Адрес'>
                      {event.place.name} {event.address}
                    </td>
                    <td data-label='Изменить' className="all-events__edit-wrapper">
                      {event.my_event ? (
                        <div className="d-flex">
                          <Link
                            to={`/lead_admin/create_event/${event.id}`}
                            className="link"
                          >
                            <img
                              src={editPen}
                              alt="edit pen"
                              className="all-events__edit-image"
                            />
                          </Link>
                          <img
                            onClick={() => {
                              deleteEvent(event.id);
                            }}
                            src={deleteImage}
                            alt="edit pen"
                            className="all-events__edit-image"
                          />
                        </div>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="end-event-info__pagination">
            <div className="end-event-info__pagination-buttons">
              <img
                className="end-event-info__pagination-buttons-image"
                src={arrow}
                style={{ transform: "rotate(180deg)" }}
                alt="arrow"
                onClick={() => {
                  return currentPage > 0
                    ? setCurrentPage(currentPage - 1)
                    : null;
                }}
              />
              <span className="end-event-info__pagination-text_bold">
                {currentPage * pageSize + 1}-
                {currentPage * pageSize + pageSize > totalProducts
                  ? totalProducts
                  : currentPage * pageSize + pageSize}{" "}
                &nbsp;
              </span>{" "}
              of {totalProducts}
              <img
                className="end-event-info__pagination-buttons-image"
                src={arrow}
                alt="arrow"
                onClick={() => {
                  return next ? setCurrentPage(currentPage + 1) : null;
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {isDeleteOpen && <DeleteConfirmModal onClose={toggleDeleteOpen} eventId={deleteEventId} />}
    </>
  );
};

export default withNavbarContainer(EditEventsPage, "admin");
