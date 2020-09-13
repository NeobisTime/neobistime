import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import withNavbarContainer from "../../../HOC/withNavbar";
import API from "../../../API";
import withDataContainer, { roomType } from "../../../HOC/withData";

const RoomsList = (props: any) => {
  const address = "Тыныстанова 98";
  useEffect(() => {
    API.getRooms().then((data) => {
      console.log(data.data);
    });
  }, []);
  return (
    <>
      <p className="today__title">Доступные помещения</p>
      <div className="today__list">
        {props.roomsNames.map((room: roomType) => {
          return (
            <Link to={`/rooms/${room.id}`} className="link">
              <div className="today__list-item">
                <div className="today__list-item-answer">
                  <div
                    className="today__list-item-answer_circle"
                    style={{ backgroundColor: "var(--neobisColor)" }}
                  ></div>
                </div>
                <div className="today__list-item-content">
                  <p className="today__list-item-text">{room.name}</p>
                  <p className="today__list-item-time">{address}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default withNavbarContainer(withDataContainer(RoomsList));
