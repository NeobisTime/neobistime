import React, { useState } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import all from "../../../../images/pages/admin-stat-total-events.svg";
import percentComing from "../../../../images/pages/admin-stat-percent-coming.svg";
import averagePeople from "../../../../images/pages/admin-stat-leute.svg";
import Select from "react-select";

// today date
import { finalDate } from "../../../pages/today-timetable/today-timetable";

// info block icons
import procent from "../../../../images/pages/procent_coming.svg";
import events from "../../../../images/pages/events_created.svg";
import people from "../../../../images/pages/peoples_average.svg";
import time from "../../../../images/pages/time_average.svg";
import withNavbarContainer from "../../../../HOC/withNavbar";
import withDataContainer from "../../../../HOC/withData";

const AdminStat = (props: any) => {
  const [department, setDepartment] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const doughnutData = {
    datasets: [
      {
        data: [80, 100 - 80],
        backgroundColor: [
          "#F7D154",
          "lightgrey",
        ],
      },
    ],
    labels: ["% посещений", ""],
  };
  const departmentChartData = {
    datasets: [
      {
        data: [12, 10, 9, 11, 15, 16, 7, 5, 8],
        backgroundColor: [
          "#1FEAC5",
          "#6C63FF",
          "#FBBEBE",
          "#F7D154",
          "#87DBEC",
          "orange",
          "green",
          "purple",
          "red",
        ],
      },
    ],
    labels: [
      "Android",
      "C#",
      "Design",
      "Frontend",
      "IOS",
      "Java/Kotlin",
      "NodeJs",
      "PM",
      "Python",
    ],
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
          <div className="admin-stat__charts-doughnut-filters">
            <Select
              options={props.departments}
              className="admin-stat__charts-doughnut-select"
              required
              onChange={(e: any) => {
                setDepartment(e.value);
              }}
            />
            <Select
              options={props.yearsMonth}
              className="admin-stat__charts-doughnut-select"
              required
              onChange={(e: any) => {
                setMonth(e.value);
              }}
            />
            <button className="button admin-stat__charts-doughnut-button_year ">
              Год
            </button>
          </div>
          <div className="admin-stat__charts-doughnut-chart">
            <Doughnut
              data={doughnutData}
              width={250}
              height={250}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                legend: {
                  display: false,
                },
              }}
            />
          </div>
          <div className="personal-office__stat-info">
            <div className="personal-office__stat-info-content">
              <div className="personal-office__stat-info-block">
                <img
                  className="personal-office__stat-info-block-img"
                  src={all}
                  style={{ boxSizing: "border-box", padding: "10px" }}
                  alt="personal stat logo"
                />
                <p className="personal-office__stat-info-block-text">
                  Всего мероприятий
                </p>
                <p
                  style={{ color: "#1070CA" }}
                  className="personal-office__stat-info-block-number"
                >
                  13
                </p>
              </div>
              <div className="personal-office__stat-info-block">
                <img
                  className="personal-office__stat-info-block-img"
                  style={{
                    boxSizing: "border-box",
                    padding: "10px",
                    marginBottom: "2px",
                  }}
                  src={percentComing}
                  alt="personal stat logo"
                />
                <p className="personal-office__stat-info-block-text">
                  Процент посещений
                </p>
                <p
                  style={{ color: "#F7D154" }}
                  className="personal-office__stat-info-block-number"
                >
                  80
                </p>
              </div>
              <div className="personal-office__stat-info-block">
                <img
                  className="personal-office__stat-info-block-img personal-office__stat-info-block-img_small"
                  src={averagePeople}
                  alt="personal stat logo"
                />
                <p className="personal-office__stat-info-block-text">
                  людей в среднем
                </p>
                <p
                  style={{ color: "#1070CA" }}
                  className="personal-office__stat-info-block-number"
                >
                  9
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-stat__charts-bar">
          <p className="admin-stat__charts-bar-text" >
            Организовано мероприятий департаментами за все время: 
          </p>
          <Bar
            data={departmentChartData}
            width={100}
            height={75}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              legend: {
                display: false,
              },
              scales: {
                xAxes: [
                  {
                    gridLines: {
                      display: false,
                    },
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                    gridLines: {
                      display: false,
                    },
                  },
                ],
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default withNavbarContainer(withDataContainer(AdminStat), "admin");
