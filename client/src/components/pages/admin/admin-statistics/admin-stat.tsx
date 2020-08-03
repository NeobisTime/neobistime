import React from "react";
import { Doughnut } from "react-chartjs-2";

// today date
import { finalDate } from "../../../pages/today-timetable/today-timetable";

// info block icons
import procent from "../../../../images/pages/procent_coming.svg";
import events from "../../../../images/pages/events_created.svg";
import people from "../../../../images/pages/peoples_average.svg";
import time from "../../../../images/pages/time_average.svg";
import withNavbarContainer from "../../../../HOC/withNavbar";


const AdminStat = () => {
  const doughnutData = {
    datasets: [
      {
        data: [10, 18, 13],
        backgroundColor: ["#36A2EB", "#FFCE56", "#d1f435"],
      },
    ],
    labels: ["значение", "значение", "значение"],
  };

  return (
    <div className="admin-stat">
      <div className="admin-stat__row">
        <div className="admin-stat__row-info-block admin-stat__row-info-block_1">
          <div className="d-flex p-1">
            <div>
              <p className="admin-stat__row-info-block-value">89</p>
              <p className="admin-stat__row-info-block-text">
                % посещений мероприятий
              </p>
            </div>
            <div>
              <img
                className="admin-stat__row-info-block-img"
                src={procent}
                alt="beautiful content"
              />
            </div>
          </div>
          <div className="admin-stat__row-info-block-date">{finalDate}</div>
        </div>

        <div className="admin-stat__row-info-block admin-stat__row-info-block_2">
          <div className="d-flex p-1">
            <div>
              <p className="admin-stat__row-info-block-value">103</p>
              <p className="admin-stat__row-info-block-text">
                мероприятий организовано
              </p>
            </div>
            <div>
              <img
                className="admin-stat__row-info-block-img"
                src={events}
                alt="beautiful content"
              />
            </div>
          </div>
          <div className="admin-stat__row-info-block-date">{finalDate}</div>
        </div>

        <div className="admin-stat__row-info-block admin-stat__row-info-block_3">
          <div className="d-flex p-1">
            <div>
              <p className="admin-stat__row-info-block-value">18</p>
              <p className="admin-stat__row-info-block-text">людей в среднем</p>
            </div>
            <div>
              <img
                className="admin-stat__row-info-block-img"
                src={people}
                alt="beautiful content"
              />
            </div>
          </div>
          <div className="admin-stat__row-info-block-date">{finalDate}</div>
        </div>

        <div className="admin-stat__row-info-block admin-stat__row-info-block_4">
          <div className="d-flex p-1">
            <div>
              <p className="admin-stat__row-info-block-value">70</p>
              <p className="admin-stat__row-info-block-text">
                минут средняя длительность
              </p>
            </div>
            <div>
              <img
                className="admin-stat__row-info-block-img"
                src={time}
                alt="beautiful content"
              />
            </div>
          </div>
          <div className="admin-stat__row-info-block-date">{finalDate}</div>
        </div>
      </div>

      <div className="admin-stat__charts">
        <div className="admin-stat__charts-doughnut">
          <Doughnut
            data={doughnutData}
            width={300}
            height={300}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              legend: {
                display: false,
              },
            }}
          />
        </div>
        <div className="admin-stat__charts-line"></div>
      </div>
    </div>
  );
};

export default withNavbarContainer(AdminStat, 'admin');
