import React from "react";
import EmptyRoom from "./rooms-empty";
import withNavbarContainer from "../../../HOC/withNavbar";

const RoomsEvent = () => {
  return (
    <div>
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
            <tr className="notifications__table-tbody-tr">
              <td className="notifications__table-tbody-tr-td w-20">30 jul</td>
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
              <td className="notifications__table-tbody-tr-td w-20">31 jul</td>
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
              <td className="notifications__table-tbody-tr-td w-20">1 aug</td>
              <td className="notifications__table-tbody-tr-td w-20">
                08:30-14:27
              </td>
              <td className="notifications__table-tbody-tr-td w-20">Куна А.</td>
              <td className="notifications__table-tbody-tr-td w-35">
                Orientation day
              </td>
            </tr>

            <tr className="notifications__table-tbody-tr">
              <td className="notifications__table-tbody-tr-td w-20">2 aug</td>
              <td className="notifications__table-tbody-tr-td w-20">
                18:30-20:30
              </td>
              <td className="notifications__table-tbody-tr-td w-20">Нодир</td>
              <td className="notifications__table-tbody-tr-td w-35">
                Java курсы
              </td>
            </tr>

            <tr className="notifications__table-tbody-tr">
              <td className="notifications__table-tbody-tr-td w-20">3 aug</td>
              <td className="notifications__table-tbody-tr-td w-20">
                18:30-20:30
              </td>
              <td className="notifications__table-tbody-tr-td w-20">
                Димитриос Х.
              </td>
              <td className="notifications__table-tbody-tr-td w-35">
                Курсы JS
              </td>
            </tr>

            <tr className="notifications__table-tbody-tr">
              <td className="notifications__table-tbody-tr-td w-20">30 jul</td>
              <td className="notifications__table-tbody-tr-td w-20">
                13:30-15:30
              </td>
              <td className="notifications__table-tbody-tr-td w-20">
                Chpokman
              </td>
              <td className="notifications__table-tbody-tr-td w-35">
                Movie night
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default withNavbarContainer(RoomsEvent);
