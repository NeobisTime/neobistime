import React, { useState } from "react";
import { CloseModalButton } from "../calendar";
import HoursScrollbar from "../../admin/admin-create-event/hours-scrollbar";
import MinutesScrollbar from "../../admin/admin-create-event/minutes-scrollbar";

const PersonalEventCreateModal = (props: any) => {
  const [name, setName] = useState<string>("");
  return (
    <div className="modal__wrapper">
      <CloseModalButton onClose={props.onClose} />
      <div className="personal-create"></div>
    </div>
  );
};

export default PersonalEventCreateModal;
