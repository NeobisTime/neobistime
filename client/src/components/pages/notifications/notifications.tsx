import React from "react";
import PageTitle from "../../shared/page-title";
import Select from "react-select";
import address from "../../../images/pages/address.svg";
import eventImage from "../../../images/pages/notifications_event_default.png";
import notificationArrow from "../../../images/pages/notifications_arrow_pagination.png";
import AdminNavbar from "../admin/admin-navbar";

const BlockEventNotification = () => {
  return (
    <div className="notifications__content">
      <div className="notifications__content-image-wrapper">
        <img
          className="notifications__content-image"
          src={eventImage}
          alt="event"
        />
      </div>
      <div className="notifications__content-block">
        <p className="notifications__content-date">19.00 Вторник, Июль 31</p>
        <p className="notifications__content-title">
          PM meetup - Jira и мониторинг
        </p>
        <p className="notifications__content-description">
          Очередной Python MeetUp, организованный Необисом для дальнейшей
          реализации наших проектов. Делимся знаниями и обязательно приходим!
          Делимся знаниями и обязательно приходим! Делимся знаниями и
          обязательно приходим!
        </p>
        <p className="notifications__content-address">
          <img
            className="notifications__content-address-image"
            src={address}
            alt="address"
          />
          Адрес: Маленькая комната
        </p>
        <div className="notifications__content-buttons">
          <button className="button notifications__content-button notifications__content-button_blue">
            Подробнее
          </button>
          <button className="button notifications__content-button notifications__content-button_cyan">
            Я пойду
          </button>
        </div>
      </div>
    </div>
  );
};

const Notification = () => {
  const filters = [
    { value: "day", label: "День" },
    { value: "week", label: "Неделя" },
    { value: "month", label: "Месяц" },
  ];

  return (
    <div className="wrapper wrapper_bg_grey">
      <AdminNavbar />
      <div className="content__wrapper">
        <div className="notifications">
          <PageTitle text="Уведомления" />
          <div className="notifications__buttons">
            <input
              className="notifications__buttons-search"
              type="text"
              name="search"
              id="search"
              placeholder="Искать..."
            />
            <Select
              options={filters}
              className="notifications__buttons-select"
            />
          </div>

          <section className="notifications__section">
            <div className="notifications__section-arrow ">
              <img className="rotate_180" src={notificationArrow} alt="arrow" />
            </div>
            <div className="notifications__section-content">
              <BlockEventNotification />
              <BlockEventNotification />
              <BlockEventNotification />
              <BlockEventNotification />
              <BlockEventNotification />
              <BlockEventNotification />
            </div>
            <div className="notifications__section-arrow">
              <img src={notificationArrow} alt="arrow" />
            </div>
          </section>
          <div className="notifications__pagination" style={{margin: '0 0 40px 0'}}>
            <div className="notifications__pagination-content">
              <div className="notifications__pagination-content-number number_active">
                <p className="notifications__pagination-content-number-value">
                  1
                </p>
              </div>
              <div className="notifications__pagination-content-number ">
                <p className="notifications__pagination-content-number-value">
                  2
                </p>
              </div>
              <div className="notifications__pagination-content-number">
                <p className="notifications__pagination-content-number-value">
                  3
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
