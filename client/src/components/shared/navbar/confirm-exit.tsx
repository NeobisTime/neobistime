import React from 'react'
import './confirm.scss'
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

type ConfirmProps = {
    onClose: () => void
}

const ConfirmExit = ({ onClose }: ConfirmProps) => {
    return (
        <div className="confirm-exit">
            <p className='confirm-exit__text'>Вы уверены, что хотите выйти с аккаунта?</p>
            <div className='confirm-exit__buttons-wrapper'>
                <span className='confirm-exit__button_red_left' onClick={onClose}>Отмена</span>
                <Link to='/auth' className="link">
                    <span className='confirm-exit__button_black_right'>Выйти</span>
                </Link>
            </div>
        </div>
    )
}

export default ConfirmExit;
