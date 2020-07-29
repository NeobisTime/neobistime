import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import ConfirmExit from '../../../shared/navbar/confirm-exit';

// *icons
import avatar from '../../../../images/shared/user.svg'
import exit from '../../../../images/shared/exit.svg';
import interview from '../../../../images/shared/interview.svg';
import peoples from '../../../../images/shared/admin_members.svg';
import create_event from '../../../../images/shared/edit.svg';
import stat from '../../../../images/shared/adminn_stat.svg';


const AdminNavbar = () => {
    let [isModalOpen,setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }
  return (
    <div className='navbar'>
      <div className="navbar__person-info">
        <img className="navbar__person-info-image" src={avatar} alt='default avatar' />
        <div className="navbar__person-info-text_wrapper">
          <p className="navbar__person-info-name">Adakhan Azizbek uulu</p>
          <p className="navbar__person-info-text">IOS department </p>
          <p className="navbar__person-info-text">login@example.com</p>
        </div>
      </div>
      <div className="navbar__content">
        <ul className='navbar__list'>
          <NavLink to='/admin/end_events' className="navbar__list-link" >
            <img src={peoples} className="navbar__list-image navbar__list-image_filter" alt='icon' />
            <li className="navbar__list-item">Мероприятия</li>
          </NavLink>
          <NavLink to='/admin/create_event' className="navbar__list-link" >
            <img src={create_event} className="navbar__list-image navbar__list-image_filter" alt='icon' />
            <li className="navbar__list-item">Бронирование</li>
          </NavLink>
          <NavLink to='/' className="navbar__list-link" >
            <img src={stat} className="navbar__list-image navbar__list-image_filter" alt='icon' />
            <li className="navbar__list-item">Статистика</li>
          </NavLink>
          <NavLink to='/admin/all_events' className="navbar__list-link" >
            <img src={interview} className="navbar__list-image navbar__list-image_filter" alt='icon' />
            <li className="navbar__list-item">Все события</li>
          </NavLink>
          <div className="navbar__list-link" onClick={toggleModal}>
            <img src={exit} className="navbar__list-image" alt='icon' />
            <button className="navbar__button navbar__list-item">
              Выйти
            </button>
          </div>
        </ul>
        {isModalOpen && <ConfirmExit onClose={toggleModal} />}
      </div>

    </div>
  )
}

export default AdminNavbar
