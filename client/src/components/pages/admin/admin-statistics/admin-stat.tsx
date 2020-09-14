import React, { useState, useEffect } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
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
import all from "../../../../images/pages/admin-stat-total-events.svg";
import percentComing from "../../../../images/pages/admin-stat-percent-coming.svg";
import averagePeople from "../../../../images/pages/admin-stat-leute.svg";
import API from "../../../../API";

type GeneralStatsType = {
  quantity_of_people: number;
  quantity_of_all_events: number;
  average_number_of_people_per_event: number;
  percentage_of_attendance_at_events: number;
};

type DepartmentStatsType = {
  average_attendance: number;
  average_number_of_people_per_event: number;
  quantity_of_events_by_departments: number;
  quantity_of_students_by_departments: number;
};

const AdminStat = (props: any) => {
  // filltration data
  const [department, setDepartment] = useState<number>(1);
  const [month, setMonth] = useState<number>(1);
  const [year, setYear] = useState<boolean>(true);

  const [departmentData, setDepartmentData] = useState<
    DepartmentStatsType | any
  >({});
  const [generalStat, setGeneralStat] = useState<GeneralStatsType | any>({});
  const [departmentsChartData, setDepartmentsChartData] = useState([]);
  const [departmentsChartLabels, setDepartmentsChartLabels] = useState([]);

  const doughnutData = {
    datasets: [
      {
        data: [
          departmentData.average_attendance || 0,
          100 - departmentData.average_attendance || 100,
        ],
        backgroundColor: ["#F7D154", "lightgrey"],
      },
    ],
    labels: ["% посещений", "% пропусков"],
  };
  const departmentChartData = {
    datasets: [
      {
        data: departmentsChartData,
        backgroundColor: [
          "#6C63FF",
          "#1FEAC5",
          "#FBBEBE",
          "#87DBEC",
          "purple",
          "#F7D154",
          "orange",
          "green",
          "red",
        ],
      },
    ],
    labels: departmentsChartLabels,
  };

  useEffect(() => {
    API.getStatByDepartment(department, month, year).then((data: any) => {
      setDepartmentData(data.data);
    });
  }, [month, year, department]);

  const handleDepartmentChange = (e: any) => {
    setDepartment(e.value);
  };

  const handleMonthChange = (e: any) => {
    setMonth(+e.value + 1);
    setYear(false);
  };

  useEffect(() => {
    API.getGeneralStat().then((requestData) => {
      setGeneralStat(requestData.data);
    });
    API.getStatForAllDepartments().then((allDepartmentsData) => {
      let data = allDepartmentsData.data;
      // get data to departments chart
      let keys: any = [];
      let values: any = [];
      for (let key in data) {
        keys.push(key);
        values.push(data[key]);
      }
      setDepartmentsChartData(values);
      setDepartmentsChartLabels(keys);
    });
  }, []);

  return (
    <div className="admin-stat">
      <div className="admin-stat__row">
        <div className="admin-stat__row-info-block admin-stat__row-info-block_1">
          <div className="d-flex p-1">
            <div>
              <p className="admin-stat__row-info-block-value">
                {generalStat.percentage_of_attendance_at_events}
              </p>
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
              <p className="admin-stat__row-info-block-value">
                {generalStat.quantity_of_all_events}
              </p>
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
              <p className="admin-stat__row-info-block-value">
                {generalStat.average_number_of_people_per_event}
              </p>
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
              <p className="admin-stat__row-info-block-value">
                {generalStat.quantity_of_people}
              </p>
              <p className="admin-stat__row-info-block-text">
                численность Необиса
              </p>
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
      </div>

      <div className="admin-stat__charts">
        <div className="admin-stat__charts-doughnut">
          <div className="admin-stat__charts-doughnut-filters">
            <Select
              placeholder="Департамент"
              options={props.departments}
              className="admin-stat__charts-doughnut-select_big"
              required
              onChange={handleDepartmentChange}
            />
            <Select
              placeholder="Месяц"
              options={props.yearsMonth}
              className="admin-stat__charts-doughnut-select_small"
              required
              onChange={handleMonthChange}
            />
            <button
              onClick={() => {
                setYear(true);
              }}
              className="button admin-stat__charts-doughnut-button_year "
            >
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
                  {departmentData.quantity_of_events_by_departments}
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
                  {departmentData.average_attendance}
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
                  {departmentData.average_number_of_people_per_event}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-stat__charts-bar">
          <p className="admin-stat__charts-bar-text">
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
