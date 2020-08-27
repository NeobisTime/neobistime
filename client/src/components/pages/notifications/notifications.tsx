import React, { useState, useEffect } from "react";
import PageTitle from "../../shared/page-title";
import Select from "react-select";
import address from "../../../images/pages/address.svg";
import eventImage from "../../../images/pages/notifications_event_default.png";
import notificationArrow from "../../../images/pages/notifications_arrow_pagination.png";
import Navbar from "../../shared/navbar";
import API from "../../../API";
import { Link } from "react-router-dom";
import withDataContainer from "../../../HOC/withData";
import Spinner from "../../shared/spinner/spinner";

const BlockEventNotification = (props: any) => {
  const { event, poll } = props;

  const [willGo, setWillGo] = useState<boolean | undefined>(false);
  const [willNotGo, setWillNotGo] = useState<boolean | undefined>(false);

  const [missedDeadline, setMissedDeadline] = useState(false);
  console.log("BlockEventNotification -> missedDeadline", missedDeadline);
  const [correctPollId, setCorrectPollId] = useState<any>(0);
  let deadline = new Date(event.deadline);
  let startDate = new Date(event.start);
  let today = new Date();

  function submitPoll(finalAnswer: boolean) {
    const data = {
      event: event.id,
      answer: finalAnswer,
    };
    if (correctPollId) {
      API.patchPoll(data, correctPollId);
    } else {
      API.postPoll(data).then((data) => {
        setCorrectPollId(data.data.id);
      });
    }
  }
  const handleWillGo = () => {
    setWillGo(true);
    setWillNotGo(false);
    submitPoll(true);
  };
  const handleWillNotGo = () => {
    setWillGo(false);
    setWillNotGo(true);
    submitPoll(false);
  };

  useEffect(() => {
    // get data to poll if it exist
    API.getMyPoll().then((data) => {
      if (data.data) {
        let correctPoll: any = [];
        correctPoll = data.data.filter((poll: any) => {
          return poll.event === event.title;
        });
        // if exist fill correct data in inputs
        if (correctPoll[0]) {
          correctPoll[0].answer ? setWillGo(true) : setWillNotGo(true);
          setCorrectPollId(correctPoll[0].id);
        }
      }
    });
    // disable input if deadline crossed
    if (+today.getTime() > +deadline.getTime()) {
      setMissedDeadline(true);
    } else {
      setMissedDeadline(false);
    }
  }, [poll, correctPollId]);

  return (
    <div className="notifications__content">
      <div className="notifications__content-image-wrapper">
        <img
          className="notifications__content-image"
          src={event.image || eventImage}
          // src={eventImage}
          alt="event"
        />
      </div>
      <div className="notifications__content-block">
        <p className="notifications__content-date">
          {(startDate.getHours() < 10 ? "0" : "") + startDate.getHours()}.
          {(startDate.getMinutes() < 10 ? "0" : "") + startDate.getMinutes()}{" "}
          {props.days[startDate.getDay()]},{" "}
          {props.monthListRus[startDate.getMonth()]} {startDate.getDate()}
        </p>
        <p className="notifications__content-title">{event.title}</p>
        <p className="notifications__content-description">
          {event.description}
        </p>
        <p className="notifications__content-address">
          <img
            className="notifications__content-address-image"
            src={address}
            alt="address"
          />
          Адрес: {event.place.name || event.address}
        </p>
      </div>
      <div className="notifications__content-buttons">
        <Link to={`/today/${event.id}`} className="link">
          <button className="button notifications__content-button notifications__content-button_blue">
            Подробнее
          </button>
        </Link>
        {correctPollId ? (
          willGo ? (
            <button
              disabled={missedDeadline ? true : false}
              onClick={handleWillNotGo}
              className={
                missedDeadline
                  ? "button notifications__content-button notifications__content-button_grey"
                  : "button notifications__content-button notifications__content-button_cyan"
              }
            >
              Я пойду
            </button>
          ) : (
            <button
              disabled={missedDeadline ? true : false}
              onClick={handleWillGo}
              className={
                missedDeadline
                  ? "button notifications__content-button notifications__content-button_grey"
                  : "button notifications__content-button notifications__content-button_red"
              }
            >
              Я не пойду
            </button>
          )
        ) : (
          <button
            disabled={missedDeadline ? true : false}
            onClick={handleWillGo}
            className={
              missedDeadline
                ? "button notifications__content-button notifications__content-button_grey"
                : "button notifications__content-button notifications__content-button_red"
            }
          >
            Я не пойду
          </button>
        )}
      </div>
    </div>
  );
};

const Notification = (props: any) => {
  const filters = [
    { value: "day", label: "День" },
    { value: "week", label: "Неделя" },
    { value: "month", label: "Месяц" },
    { value: "", label: "Все" },
  ];
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState("");
  const [myPoll, setMyPoll] = useState<any>({});

  // pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const [totalProducts, setTotalProducts] = useState(0);
  const [portionSize, setPortionSize] = useState(5);
  const [next, setNext] = useState<string | null>("");
  let pagesCount = Math.ceil(totalProducts / pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  useEffect(() => {
    API.getEvents(pageSize, currentPage * pageSize, search, period).then(
      (data) => {
        setEvents(data.data.results);
        setTotalProducts(data.data.count);
        setNext(data.data.next);
      }
    );

    // get data to poll if it exist
    API.getMyPoll().then((data) => {
      setMyPoll(data.data);
    });
  }, [pageSize, currentPage, search, period]);

  return (
    <div className="wrapper wrapper_bg_grey">
      <Navbar />
      <div className="content__wrapper">
        <Spinner timeOut={1500} />
        <div className="notifications">
          <PageTitle text="Уведомления" />
          <div className="notifications__buttons">
            <input
              className="notifications__buttons-search"
              type="text"
              name="search"
              id="search"
              placeholder="Искать..."
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
            <Select
              options={filters}
              className="notifications__buttons-select"
              onChange={(e: any) => {
                setPeriod(e.value);
              }}
              placeholder="Выберите период"
            />
          </div>

          <section className="notifications__section">
            <div className="notifications__section-arrow ">
              <img
                onClick={() => {
                  return currentPage > 0
                    ? setCurrentPage(currentPage - 1)
                    : null;
                }}
                className="rotate_180"
                src={notificationArrow}
                alt="arrow"
              />
            </div>
            <div className="notifications__section-content">
              {events
                ? events.map((event: any) => {
                    return (
                      <BlockEventNotification
                        key={event.id}
                        poll={myPoll}
                        event={event}
                        {...props}
                      />
                    );
                  })
                : null}
            </div>
            <div className="notifications__section-arrow">
              <img
                onClick={() => {
                  return next ? setCurrentPage(currentPage + 1) : null;
                }}
                src={notificationArrow}
                alt="arrow"
              />
            </div>
          </section>

          <div
            className="notifications__pagination"
            style={{ margin: "0 0 40px 0" }}
          >
            <div className="notifications__pagination-content">
              {portionNumber > 1 && (
                <div
                  onClick={() => {
                    setPortionNumber(portionNumber - 1);
                  }}
                  className="notifications__pagination-content-arrow"
                >
                  &#10094;
                </div>
              )}
              {pages
                .filter(
                  (p) =>
                    p >= leftPortionPageNumber && p <= rightPortionPageNumber
                )
                .map((page) => {
                  return (
                    <div
                      key={page}
                      onClick={() => {
                        setCurrentPage(page - 1);
                      }}
                      className={
                        page === currentPage + 1
                          ? "notifications__pagination-content-number number_active"
                          : "notifications__pagination-content-number"
                      }
                    >
                      <p className="notifications__pagination-content-number-value">
                        {page}
                      </p>
                    </div>
                  );
                })}

              {portionCount > portionNumber && (
                <div
                  onClick={() => {
                    setPortionNumber(portionNumber + 1);
                  }}
                  className="notifications__pagination-content-arrow"
                >
                  &#10095;
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withDataContainer(Notification);
