import React from "react";
import { CloseModalButton } from "../calendar";
import API from "../../../../API";

const DeleteConfirmModal = (props: any) => {
  const { eventId } = props;
  const handleDelete = () => {
    API.deleteEvent(eventId);
  };
  return (
    <div className="modal__wrapper ">
      <div className="event-info-modal" style={{ width: "250px" }}>
        <CloseModalButton onClose={props.onClose} />
        <div className="event-info__content" style={{ width: "90%" }}>
          <p
            className="event-info__content-description"
            style={{ fontSize: "18px" }}
          >
            Вы действительно хотите удалить event?
          </p>
          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <button
              onClick={handleDelete}
              className="personal-create__buttons-delete button"
            >
              Удалить
            </button>
            <button
              onClick={props.onClose}
              className="personal-create__buttons-cancel button"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
