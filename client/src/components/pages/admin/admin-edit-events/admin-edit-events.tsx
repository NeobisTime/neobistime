import React from "react";
import arrow from "../../../../images/shared/arrow.svg";
import editPen from "../../../../images/shared/pencil.png";
import { Link } from "react-router-dom";
import withNavbarContainer from "../../../../HOC/withNavbar";

const EditEventsPage = () => {
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
            <tr>
              <td>Orientation day</td>
              <td>Frontend</td>
              <td className="end-event-info__table-tbody-date">01/12/2020</td>
              <td>Маленькая комната</td>
              <td className="all-events__edit-wrapper">
                <Link to="/admin/create_event/2" className="link">
                  <img
                    src={editPen}
                    alt="edit pen"
                    className="all-events__edit-image"
                  />
                </Link>
              </td>
            </tr>

            <tr>
              <td>Orientation day</td>
              <td>Frontend</td>
              <td className="end-event-info__table-tbody-date">01/12/2020</td>
              <td>Маленькая комната</td>
              <td className="all-events__edit-wrapper">
                <img
                  src={editPen}
                  alt="edit pen"
                  className="all-events__edit-image"
                />
              </td>
            </tr>
            <tr>
              <td>Orientation day</td>
              <td>Frontend</td>
              <td className="end-event-info__table-tbody-date">01/12/2020</td>
              <td>Маленькая комната</td>
              <td className="all-events__edit-wrapper">
                <img
                  src={editPen}
                  alt="edit pen"
                  className="all-events__edit-image"
                />
              </td>
            </tr>
            <tr>
              <td>Orientation day</td>
              <td>Frontend</td>
              <td className="end-event-info__table-tbody-date">01/12/2020</td>
              <td>Маленькая комната</td>
              <td className="all-events__edit-wrapper">
                <img
                  src={editPen}
                  alt="edit pen"
                  className="all-events__edit-image"
                />
              </td>
            </tr>
            <tr>
              <td>Orientation day</td>
              <td>Frontend</td>
              <td className="end-event-info__table-tbody-date">01/12/2020</td>
              <td>Маленькая комната</td>
              <td className="all-events__edit-wrapper">
                <img
                  src={editPen}
                  alt="edit pen"
                  className="all-events__edit-image"
                />
              </td>
            </tr>
            <tr>
              <td>Orientation day</td>
              <td>Frontend</td>
              <td className="end-event-info__table-tbody-date">01/12/2020</td>
              <td>Маленькая комната</td>
              <td className="all-events__edit-wrapper">
                <img
                  src={editPen}
                  alt="edit pen"
                  className="all-events__edit-image"
                />
              </td>
            </tr>
            <tr>
              <td>Orientation day</td>
              <td>Frontend</td>
              <td className="end-event-info__table-tbody-date">01/12/2020</td>
              <td>Маленькая комната</td>
              <td className="all-events__edit-wrapper">
                <img
                  src={editPen}
                  alt="edit pen"
                  className="all-events__edit-image"
                />
              </td>
            </tr>
            <tr>
              <td>Orientation day</td>
              <td>Frontend</td>
              <td className="end-event-info__table-tbody-date">01/12/2020</td>
              <td>Маленькая комната</td>
              <td className="all-events__edit-wrapper">
                <img
                  src={editPen}
                  alt="edit pen"
                  className="all-events__edit-image"
                />
              </td>
            </tr>
            <tr>
              <td>Orientation day</td>
              <td>Frontend</td>
              <td className="end-event-info__table-tbody-date">01/12/2020</td>
              <td>Маленькая комната</td>
              <td className="all-events__edit-wrapper">
                <img
                  src={editPen}
                  alt="edit pen"
                  className="all-events__edit-image"
                />
              </td>
            </tr>
            <tr>
              <td>Orientation day</td>
              <td>Frontend</td>
              <td className="end-event-info__table-tbody-date">01/12/2020</td>
              <td>Маленькая комната</td>
              <td>
                <img
                  src={editPen}
                  alt="edit pen"
                  className="all-events__edit-image"
                />
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
  );
};

export default withNavbarContainer(EditEventsPage, 'admin');
