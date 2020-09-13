import React from "react";

export type roomType = {
  id: number;
  name: string;
};
const withDataContainer = (Component: any) => {
  const departments = [
    { value: "8", label: "Android" },
    { value: "6", label: "C#" },
    { value: "7", label: "Design" },
    { value: "5", label: "Frontend" },
    { value: "9", label: "IOS" },
    { value: "4", label: "Java/Kotlin" },
    { value: "2", label: "NodeJS" },
    { value: "3", label: "PM" },
    { value: "1", label: "Python" },
  ];
  const selectDepartments = [{ value: "all", label: "All" }, ...departments];
  let days = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  let months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Cентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  const yearsMonth = [
    { value: "0", label: "Январь" },
    { value: "1", label: "Февраль" },
    { value: "2", label: "Март" },
    { value: "3", label: "Апрель" },
    { value: "4", label: "Май" },
    { value: "5", label: "Июнь" },
    { value: "6", label: "Июль" },
    { value: "7", label: "Август" },
    { value: "8", label: "Сентябрь" },
    { value: "9", label: "Октябрь" },
    { value: "10", label: "Ноябрь" },
    { value: "11", label: "Декабрь" },
  ];

  const roomsNames: roomType[] = [
    { id: 1, name: "Classroom" },
    { id: 2, name: "Hall" },
    { id: 3, name: "Whole Office" },
    { id: 4, name: "Staff Room" },
  ];
  const rooms: roomType[] = [...roomsNames, { id: 5, name: "Another location" }];

  const roomsForSelect: any = rooms.map((room) => {
    return {
      value: String(room.id),
      label: String(room.name),
    };
  });

  const withData = (props: any) => {
    return (
      <Component
        days={days}
        monthListRus={months}
        departments={departments}
        selectDepartments={selectDepartments}
        yearsMonth={yearsMonth}
        rooms={rooms}
        roomsNames={roomsNames}
        roomsForSelect={roomsForSelect}
        {...props}
      />
    );
  };
  return withData;
};

export default withDataContainer;
