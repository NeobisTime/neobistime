import React from "react";
import "./confirm.scss";
import { Link } from "react-router-dom";

type ConfirmProps = {
  onClose: () => void;
};

const ConfirmExit = ({ onClose }: ConfirmProps) => {
  const handleClose = () => {
    document.cookie = "XSRF-Token = ; role =";
  };
  return (
    <div className="confirm-exit">
      <p className="confirm-exit__text">
        Вы уверены, что хотите выйти с аккаунта?
      </p>
      <div className="confirm-exit__buttons-wrapper">
        <span className="confirm-exit__button_red_left" onClick={onClose}>
          Отмена
        </span>
        <Link to="/auth" className="link">
          <span
            onClick={handleClose}
            className="confirm-exit__button_black_right"
          >
            Выйти
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ConfirmExit;
