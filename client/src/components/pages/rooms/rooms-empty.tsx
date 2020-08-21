import React from "react";
import emptyRoom from "../../../images/pages/empty-room.png";
import { Link } from "react-router-dom";

const EmptyRoom = () => {
  return (
    <div className="empty-room">
      <p className="empty-room__text">Еще никто не бронировал эту комнату.</p>
      <p className="empty-room__text"> Вы можете быть первыми!</p>
      <div className="empty-room__block">
        <Link to="/admin/create_event" className="link">
          <button className="empty-room__button button">Забронировать</button>
        </Link>
        <img src={emptyRoom} className="empty-room__image" alt="empty rooom" />
      </div>
    </div>
  );
};

export default EmptyRoom;
