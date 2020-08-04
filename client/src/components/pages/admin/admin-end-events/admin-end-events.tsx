import React from "react";
import { TodayList } from "../../today-timetable/today-timetable";
import withNavbarContainer from "../../../../HOC/withNavbar";

const EndEvents = () => {
  return (
    <>
      <p className="today__title">Закончившиеся Мероприятия</p>
      <TodayList />
    </>
  );
};

export default withNavbarContainer(EndEvents, "admin");
