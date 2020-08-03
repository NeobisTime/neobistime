import React from "react";
import { TodayList } from "../../today-timetable/today-timetable";
import withNavbarContainer from "../../../../HOC/withNavbar";

const EndEvents = () => {
  return <TodayList />;
};

export default withNavbarContainer(EndEvents, "admin");
