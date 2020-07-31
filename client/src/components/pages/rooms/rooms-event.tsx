import React from "react";
import Navbar from "../../shared/navbar";
import EmptyRoom from "./rooms-empty";

const RoomsEvent = () => {
  return (
    <div className="wrapper">
      <Navbar />
      <div className="content__wrapper">
        <p className="today__title">Маленькая комната</p>
        {/* <EmptyRoom /> */}
        <div className="notifications__content">
          <table className="notifications__table">
            <colgroup span={4} className="notifications__table-colgroup">
              <col span={1} id="date" />
              <col span={1} id="time" />
              <col span={1} id="owner" />
              <col span={1} id="event" />
            </colgroup>
            <thead className="notifications__table-thead">
              <tr className="notifications__table-thead-tr">
                <th
                  className="notifications__table-thead-tr-th w-20"
                  scope="col"
                >
                  Дата
                </th>
                <th
                  className="notifications__table-thead-tr-th w-20"
                  scope="col"
                >
                  Время
                </th>
                <th
                  className="notifications__table-thead-tr-th w-20"
                  scope="col"
                >
                  Создатель
                </th>
                <th
                  className="notifications__table-thead-tr-th w-35"
                  scope="col"
                >
                  Событие
                </th>
              </tr>
            </thead>
            <tbody className="notifications__table-tbody">
              <tr className="notifications__table-tbody-tr">
                <td className="notifications__table-tbody-tr-td w-20">
                  30 jul
                </td>
                <td className="notifications__table-tbody-tr-td w-20">
                  13:30-15:30
                </td>
                <td className="notifications__table-tbody-tr-td w-20">
                  Адахан А.
                </td>
                <td className="notifications__table-tbody-tr-td w-35">
                  Orientation day
                </td>
              </tr>

              <tr className="notifications__table-tbody-tr">
                <td className="notifications__table-tbody-tr-td w-20">
                  30 jul
                </td>
                <td className="notifications__table-tbody-tr-td w-20">
                  13:30-15:30
                </td>
                <td className="notifications__table-tbody-tr-td w-20">
                  Адахан А.
                </td>
                <td className="notifications__table-tbody-tr-td w-35">
                  Orientation day
                </td>
              </tr>

              <tr className="notifications__table-tbody-tr">
                <td className="notifications__table-tbody-tr-td w-20">
                  30 jul
                </td>
                <td className="notifications__table-tbody-tr-td w-20">
                  13:30-15:30
                </td>
                <td className="notifications__table-tbody-tr-td w-20">
                  Адахан А.
                </td>
                <td className="notifications__table-tbody-tr-td w-35">
                  Orientation day
                </td>
              </tr>

              <tr className="notifications__table-tbody-tr">
                <td className="notifications__table-tbody-tr-td w-20">
                  30 jul
                </td>
                <td className="notifications__table-tbody-tr-td w-20">
                  13:30-15:30
                </td>
                <td className="notifications__table-tbody-tr-td w-20">
                  Адахан А.
                </td>
                <td className="notifications__table-tbody-tr-td w-35">
                  Orientation day
                </td>
              </tr>

              <tr className="notifications__table-tbody-tr">
                <td className="notifications__table-tbody-tr-td w-20">
                  30 jul
                </td>
                <td className="notifications__table-tbody-tr-td w-20">
                  13:30-15:30
                </td>
                <td className="notifications__table-tbody-tr-td w-20">
                  Адахан А.
                </td>
                <td className="notifications__table-tbody-tr-td w-35">
                  Orientation day
                </td>
              </tr>

              <tr className="notifications__table-tbody-tr">
                <td className="notifications__table-tbody-tr-td w-20">
                  30 jul
                </td>
                <td className="notifications__table-tbody-tr-td w-20">
                  13:30-15:30
                </td>
                <td className="notifications__table-tbody-tr-td w-20">
                  Адахан А.
                </td>
                <td className="notifications__table-tbody-tr-td w-35">
                  Orientation day
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RoomsEvent;
