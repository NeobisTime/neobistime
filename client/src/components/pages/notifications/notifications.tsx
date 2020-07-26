import React from 'react'
import Navbar from '../../shared/navbar'
import PageTitle from '../../shared/page-title'


const Notification = () => {
  return (
    <div className="wrapper">
      <Navbar />
      <div className="content__wrapper">
        <PageTitle text='Уведомления' />

      </div>
    </div>
  )
}

export default Notification
