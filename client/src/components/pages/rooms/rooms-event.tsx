import React, { useState, useEffect } from "react";
import EmptyRoom from "./rooms-empty";
import withNavbarContainer from "../../../HOC/withNavbar";
import { withRouter } from "react-router-dom";
import API from "../../../API";
import arrow from "../../../images/shared/arrow.svg";
import Select from "react-select";

const RoomsEvent = (props: any) => {
  let roomId = props.match.params.id;
  const [events, setEvents] = useState([]);
  const [period, setPeriod] = useState("");
  const periods = [
    { value: "week", label: "Неделя" },
    { value: "month", label: "Месяц" },
    { value: "year", label: "Год" },
    { value: "", label: "Все" },
  ];

  // pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);
  const [next, setNext] = useState<string | null>("");

  let monthNames = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  useEffect(() => {
    API.getRoomEvents(roomId, pageSize, currentPage * pageSize,period).then((data) => {
      setEvents(data.data.results);
      setTotalProducts(data.data.count);
      setNext(data.data.next);
    });
  }, [pageSize, currentPage, period]);
  return (
    <div>
      <div className="end-event-info">
        <div>
          <div className='rooms-event__top-side'>
            <p className="end-event-info__title">
              {roomId && +roomId === 1
                ? "Маленькая комната"
                : +roomId === 2
                ? "Большая комната"
                : "Весь офис"}
            </p>
            <Select
              options={periods}
              className="rooms-event__select"
              onChange={(e: any) => {
                setPeriod(e.value);
              }}
              placeholder="Период"
            />
          </div>

          <table className="end-event-info__table">
            <colgroup className="end-event-info__table-colgroup">
              <col id="person" />
              <col id="department" />
              <col id="date" />
              <col id="status" />
            </colgroup>
            <thead className="end-event-info__table-thead">
              <tr>
                <th scope="col">Событие</th>
                <th scope="col">Создатель</th>
                <th scope="col">Дата</th>
                <th scope="col">Время</th>
              </tr>
            </thead>
            <tbody className="end-event-info__table-tbody">
              {events ? (
                events.map((event: any) => {
                  let startDate = new Date(event.start);
                  let endDate = new Date(event.end);
                  return (
                    <tr>
                      <td className="bold">{event.title}</td>
                      <td className="bold">{event.owner}</td>
                      <td className="end-event-info__table-tbody-date">
                        {(startDate.getDate() < 10 ? "0" : "") +
                          startDate.getDate()}{" "}
                        {monthNames[startDate.getMonth()]}
                      </td>
                      <td>
                        {(startDate.getHours() < 10 ? "0" : "") +
                          startDate.getHours()}
                        :
                        {(startDate.getMinutes() < 10 ? "0" : "") +
                          startDate.getMinutes()}
                        -
                        {(endDate.getHours() < 10 ? "0" : "") +
                          endDate.getHours()}
                        :
                        {(endDate.getMinutes() < 10 ? "0" : "") +
                          endDate.getMinutes()}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <EmptyRoom />
              )}
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
    </div>
  );
};

export default withNavbarContainer(withRouter(RoomsEvent));
