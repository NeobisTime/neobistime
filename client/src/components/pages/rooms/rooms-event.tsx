import React, { useState, useEffect } from "react";
import EmptyRoom from "./rooms-empty";
import withNavbarContainer from "../../../HOC/withNavbar";
import { withRouter, Link } from "react-router-dom";
import API from "../../../API";

const RoomsEvent = (props: any) => {
  let roomId = props.match.params.id;
  const [events, setEvents] = useState([]);

  // pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(7);
  const [totalProducts, setTotalProducts] = useState(0);
  const [portionSize, setPortionSize] = useState(5);
  let pagesCount = Math.ceil(totalProducts / pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

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
    API.getRoomEvents(roomId, pageSize, currentPage * pageSize).then((data) => {
      setEvents(data.data.results);
      setTotalProducts(data.data.count);
    });
  }, [pageSize, currentPage]);
  return (
    <div>
      <p className="today__title">Маленькая комната</p>
      <div className="notifications__wrapper-table">
        <table className="notifications__table">
          <colgroup span={4} className="notifications__table-colgroup">
            <col span={1} id="date" />
            <col span={1} id="time" />
            <col span={1} id="owner" />
            <col span={1} id="event" />
          </colgroup>
          <thead className="notifications__table-thead">
            <tr className="notifications__table-thead-tr">
              <th className="notifications__table-thead-tr-th w-20" scope="col">
                Дата
              </th>
              <th className="notifications__table-thead-tr-th w-20" scope="col">
                Время
              </th>
              <th className="notifications__table-thead-tr-th w-20" scope="col">
                Создатель
              </th>
              <th className="notifications__table-thead-tr-th w-35" scope="col">
                Событие
              </th>
            </tr>
          </thead>
          <tbody className="notifications__table-tbody">
            {events ? (
              events.map((event: any) => {
                let startDate = new Date(event.start_date);
                let endDate = new Date(event.end_date);
                return (
                  // <Link to={`/today/${event.id}`} className='link'>
                  <tr key={event.id} className="notifications__table-tbody-tr">
                    <td className="notifications__table-tbody-tr-td w-20">
                      {(startDate.getDate() < 10 ? "0" : "") +
                        startDate.getDate()}{" "}
                      {monthNames[startDate.getMonth()]}
                    </td>
                    <td className="notifications__table-tbody-tr-td w-20">
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
                    <td className="notifications__table-tbody-tr-td w-20">
                      {event.owner}
                    </td>
                    <td className="notifications__table-tbody-tr-td w-35">
                      {event.title}
                    </td>
                  </tr>
                  // </Link>
                );
              })
            ) : (
              <EmptyRoom />
            )}
          </tbody>
        </table>
        <div className="notifications__pagination">
          <div className="notifications__pagination-content">
            {portionNumber > 1 && (
              <div
                onClick={() => {
                  setPortionNumber(portionNumber - 1);
                }}
                className="notifications__pagination-content-arrow"
              >
                &#10094;
              </div>
            )}
            {pages
              .filter(
                (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
              )
              .map((page) => {
                return (
                  <div
                    key={page}
                    onClick={() => {
                      setCurrentPage(page - 1);
                    }}
                    className={
                      page === currentPage + 1
                        ? "notifications__pagination-content-number number_active"
                        : "notifications__pagination-content-number"
                    }
                  >
                    <p className="notifications__pagination-content-number-value">
                      {page}
                    </p>
                  </div>
                );
              })}

            {portionCount > portionNumber && (
              <div
                onClick={() => {
                  setPortionNumber(portionNumber + 1);
                }}
                className="notifications__pagination-content-arrow"
              >
                &#10095;
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withNavbarContainer(withRouter(RoomsEvent));
