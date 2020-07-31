import React from "react";
import { CloseModalButton } from "../calendar";

const AdminChooseModal = (props: any) => {
  return (
    <div className="modal__wrapper">
      <div className="admin-choose-modal">
        <CloseModalButton onClose={props.onClose} />
        <p className="admin-choose-modal__text">Какой создать ивент?</p>
        <button onClick={props.openPersonalEventCreateWindow} className="admin-choose-modal__button button">Для себя</button>
        <button onClick={props.openAdminEventCreateWindow} className="admin-choose-modal__button button">Мероприятие</button>
      </div>
    </div>
  );
};

export default AdminChooseModal;
