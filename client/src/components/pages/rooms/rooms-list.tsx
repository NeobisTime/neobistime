import React from "react";
import Navbar from "../../shared/navbar";
import { Link } from "react-router-dom";

const RoomsList = () => {
  return (
    <div className="wrapper">
      <Navbar />
      <div className="content__wrapper">
        <p className="today__title">Доступные помещения</p>
        <div className="today__list">
          <Link to="/rooms/1" className="link">
            <div className="today__list-item">
              <div className="today__list-item-answer">
                <div
                  className="today__list-item-answer_circle"
                  style={{ backgroundColor: "var(--neobisColor)" }}
                ></div>
              </div>
              <div className="today__list-item-content">
                <p className="today__list-item-text">Маленькая комната</p>
                <p className="today__list-item-time">Советская 70</p>
              </div>
            </div>
          </Link>

          <Link to="/rooms/1" className="link">
            <div className="today__list-item">
              <div className="today__list-item-answer">
                <div
                  className="today__list-item-answer_circle"
                  style={{ backgroundColor: "var(--neobisColor)" }}
                ></div>
              </div>
              <div className="today__list-item-content">
                <p className="today__list-item-text">Большая комната</p>
                <p className="today__list-item-time">Советская 70</p>
              </div>
            </div>
          </Link>

          <Link to="/rooms/1" className="link">
          <div className="today__list-item">
            <div className="today__list-item-answer">
              <div
                className="today__list-item-answer_circle"
                style={{ backgroundColor: "var(--neobisColor)" }}
              ></div>
            </div>
            <div className="today__list-item-content">
              <p className="today__list-item-text">Весь Офис</p>
              <p className="today__list-item-time">Советская 70</p>
            </div>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomsList;
