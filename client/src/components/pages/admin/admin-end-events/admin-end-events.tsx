import React from "react";
import AdminNavbar from "../admin-navbar";
import { TodayList } from "../../today-timetable/today-timetable";

const EndEvents = () => {
  return (
    <div className="wrapper">
      <AdminNavbar />
      <div className="content__wrapper">
        <TodayList />
      </div>
    </div>
  );
};

export default EndEvents;
