import React, { useState, useEffect } from "react";
import arrow from "../../../../images/shared/arrow.svg";
import editPen from "../../../../images/shared/pencil.png";
import { Link } from "react-router-dom";
import withNavbarContainer from "../../../../HOC/withNavbar";
import API from "../../../../API";

const EditEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);
  const [next, setNext] = useState<string | null>("");

  useEffect(() => {
    API.getEvents(pageSize, pageSize * currentPage, "").then((events) => {
      setEvents(events.data.results);
      setTotalProducts(events.data.count);
      setNext(events.data.next);
    });
  }, [currentPage]);
  return (
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
              let date = new Date(event.start_date);
              return (
                <tr>
                  <td className="bold">{event.title}</td>
                  <td className="bold">-</td>
                  <td className="end-event-info__table-tbody-date">
                    {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
                  </td>
                  <td>Маленькая комната</td>
                  <td className="all-events__edit-wrapper">
                    <Link
                      to={`/admin/create_event/${event.id}`}
                      className="link"
                    >
                      <img
                        src={editPen}
                        alt="edit pen"
                        className="all-events__edit-image"
                      />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="end-event-info__pagination">
          <span className="end-event-info__pagination-text_bold">
            {currentPage * pageSize + 1}-
            {currentPage * pageSize + pageSize > totalProducts
              ? totalProducts
              : currentPage * pageSize + pageSize}{" "}
            &nbsp;
          </span>{" "}
          of {totalProducts}
          <div className="end-event-info__pagination-buttons">
            <img
              className="end-event-info__pagination-buttons-image"
              src={arrow}
              style={{ transform: "rotate(180deg)" }}
              alt="arrow"
              onClick={() => {
                return currentPage > 0 ? setCurrentPage(currentPage - 1) : null;
              }}
            />
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
  );
};

export default withNavbarContainer(EditEventsPage, "admin");
