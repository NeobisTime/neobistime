import React, { useState, useEffect } from "react";
import arrow from "../../../../../images/shared/arrow.svg";
import withNavbarContainer from "../../../../../HOC/withNavbar";
import API from "../../../../../API";
import { withRouter } from "react-router-dom";

const EndEventInfo = (props: any) => {
  const eventId = props.match.params.id;
  const [peoples, setPeoples] = useState<any>([]);
  console.log("EndEventInfo -> peoples", peoples);
  const [eventData, setEventData] = useState<any>([]);
  let date = new Date(eventData.start);

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);
  const [next, setNext] = useState<string | null>("");

  useEffect(() => {
    API.getEventPoll(eventId, pageSize, pageSize * currentPage).then((data) => {
      setPeoples(data.data.results);
      setTotalProducts(data.data.count);
      setNext(data.data.next);
    });
  }, [currentPage]);

  useEffect(() => {
    API.getEventInfo(eventId).then((data) => {
      setEventData(data.data);
    });
  }, []);

  return (
    <>
      <div className="end-event-info">
        <div>
          <p className="end-event-info__title">
            Отчет посещаемости {eventData.title}
          </p>
          <table className="end-event-info__table">
            <colgroup className="end-event-info__table-colgroup">
              <col id="person" />
              <col id="department" />
              <col id="date" />
              <col id="status" />
            </colgroup>
            <thead className="end-event-info__table-thead">
              <tr>
                <th scope="col">Мэмбер</th>
                <th scope="col">Департамент</th>
                <th scope="col">Дата</th>
                <th scope="col">Статус</th>
              </tr>
            </thead>
            <tbody className="end-event-info__table-tbody">
              {peoples ? (
                peoples.map((poll: any) => {
                  return (
                    <tr>
                      <td className="bold">{poll.user}</td>
                      <td className="bold">{poll.department}</td>
                      <td className="end-event-info__table-tbody-date">
                        {date.getDate()}/{date.getMonth() + 1}/
                        {date.getFullYear()}
                      </td>
                      <td>
                        <input
                          onClick={() => {
                            const data = {
                              was_on_event: !poll.was_on_event,
                            };
                            API.patchMyEventPoll(eventId, poll.id, data).then(
                              (data) => {
                                // update poll data in peoples
                                let newPoll = data.data;
                                setPeoples(
                                  peoples.map((poll: any) => {
                                    if (+poll.id === +newPoll.id) {
                                      poll = newPoll;
                                    }
                                    return poll;
                                  })
                                );
                              }
                            );
                          }}
                          type="checkbox"
                          value={poll.was_on_event}
                          checked={poll.was_on_event}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td className="bold">пусто</td>
                  <td className="bold">пусто</td>
                  <td className="bold">пусто</td>
                  <td className="bold">пусто</td>
                </tr>
              )}
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
                  return currentPage > 0
                    ? setCurrentPage(currentPage - 1)
                    : null;
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
      <div className="end-event-info__submit">
        <button
          className="end-event-info__submit-button button"
          onClick={() => {
            window.location.reload(true);
          }}
        >
          Сохранить
        </button>
      </div>
    </>
  );
};

export default withNavbarContainer(withRouter(EndEventInfo), "admin");
