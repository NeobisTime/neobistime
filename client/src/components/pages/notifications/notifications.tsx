import React from "react";
import PageTitle from "../../shared/page-title";
import Select from "react-select";
import withNavbarContainer from "../../../HOC/withNavbar";

const Notification = () => {
  const filters = [
    { value: "day", label: "День" },
    { value: "week", label: "Неделя" },
    { value: "month", label: "Месяц" },
  ];

  return (
    <div>
      <PageTitle text="Уведомления" />
      <div className="notifications__buttons">
        <input
          className="notifications__buttons-search"
          type="text"
          name="search"
          id="search"
        />
        <Select options={filters} className="notifications__buttons-select" />
      </div>
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
              <td className="notifications__table-tbody-tr-td w-20">28 jan</td>
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
              <td className="notifications__table-tbody-tr-td w-20">29 jul</td>
              <td className="notifications__table-tbody-tr-td w-20">
                10:30-20:00
              </td>
              <td className="notifications__table-tbody-tr-td w-20">
                Feruza А.
              </td>
              <td className="notifications__table-tbody-tr-td w-35">
                Плюс 2 человека
              </td>
            </tr>

            <tr className="notifications__table-tbody-tr">
              <td className="notifications__table-tbody-tr-td w-20">
                07 april
              </td>
              <td className="notifications__table-tbody-tr-td w-20">
                13:00-17:30
              </td>
              <td className="notifications__table-tbody-tr-td w-20">
                Комолдин А.
              </td>
              <td className="notifications__table-tbody-tr-td w-35">Уборка</td>
            </tr>

            <tr className="notifications__table-tbody-tr">
              <td className="notifications__table-tbody-tr-td w-20">1 aug</td>
              <td className="notifications__table-tbody-tr-td w-20">
                08:00-10:00
              </td>
              <td className="notifications__table-tbody-tr-td w-20">Куна А.</td>
              <td className="notifications__table-tbody-tr-td w-35">
                Закончились печеньки
              </td>
            </tr>

            <tr className="notifications__table-tbody-tr">
              <td className="notifications__table-tbody-tr-td w-20">28 jan</td>
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
              <td className="notifications__table-tbody-tr-td w-20">28 jan</td>
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

        <div className="notifications__pagination">
          <div className="notifications__pagination-content">
            <div className="notifications__pagination-content-arrow">
              &#10094;
            </div>
            <div className="notifications__pagination-content-number number_active">
              <p className="notifications__pagination-content-number-value">
                1
              </p>
            </div>
            <div className="notifications__pagination-content-number ">
              <p className="notifications__pagination-content-number-value">
                2
              </p>
            </div>
            <div className="notifications__pagination-content-number">
              <p className="notifications__pagination-content-number-value">
                3
              </p>
            </div>
            <div className="notifications__pagination-content-arrow">
              &#10095;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withNavbarContainer(Notification);
