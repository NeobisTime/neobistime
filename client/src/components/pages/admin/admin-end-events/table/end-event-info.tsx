import React from "react";
import arrow from "../../../../../images/shared/arrow.svg";
import withNavbarContainer from "../../../../../HOC/withNavbar";

const EndEventInfo = () => {
  return (
    <>
      <div className="end-event-info">
        <div>
          <p className="end-event-info__title">Отчет посещаемости c++ meetup</p>
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
              <tr>
                <td>Феруза Асанова</td>
                <td>Frontend</td>
                <td className="end-event-info__table-tbody-date">01/12/2020</td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
              <tr>
                <td>Феруза Асанова</td>
                <td>Frontend</td>
                <td className="end-event-info__table-tbody-date">01/12/2020</td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
              <tr>
                <td>Феруза Асанова</td>
                <td>Frontend</td>
                <td className="end-event-info__table-tbody-date">01/12/2020</td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
              <tr>
                <td>Феруза Асанова</td>
                <td>Frontend</td>
                <td className="end-event-info__table-tbody-date">01/12/2020</td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
              <tr>
                <td>Феруза Асанова</td>
                <td>Frontend</td>
                <td className="end-event-info__table-tbody-date">01/12/2020</td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="end-event-info__pagination">
            <span className="end-event-info__pagination-text_bold">
              1-10 &nbsp;
            </span>{" "}
            of 100
            <div className="end-event-info__pagination-buttons">
              <img
                className="end-event-info__pagination-buttons-image"
                src={arrow}
                style={{ transform: "rotate(180deg)" }}
                alt="arrow"
              />
              <img
                className="end-event-info__pagination-buttons-image"
                src={arrow}
                alt="arrow"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="end-event-info__submit">
        <button className="end-event-info__submit-button button">
          Сохранить
        </button>
      </div>
    </>
  );
};

export default withNavbarContainer(EndEventInfo, 'admin');
