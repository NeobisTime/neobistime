import React, { useState } from 'react'
import Select from 'react-select';


// image
import designPhoto from '../../../images/pages/authentication.svg';

const options = [
  { value: 'Python', label: 'Python' },
  { value: 'Frontend', label: 'Frontend' },
  { value: 'PM', label: 'PM' },
  { value: 'Design', label: 'Design' },
  { value: 'C#', label: 'C#' },
  { value: 'Java', label: 'Java' },
  { value: 'Android', label: 'Android' },
  { value: 'IOS', label: 'IOS' },
  { value: 'NodeJS', label: 'NodeJS' },
]

const Registration = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [controlPassword, setControlPassword] = useState<string>("");

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
  }

  return (
    <div className="registration auth">
      <div className="registration__content">
        <div className="auth__title">
          <p className='auth__title-text'>Добро пожаловать в Neobis Time</p>
        </div>

        <section className="registration__section registration__section_w_40 " >
          <form className="auth__form" onSubmit={handleSubmit}>
            <label className="auth__label" htmlFor="name">ФИО</label>
            <input
              className="auth__input"
              type="text"
              name="name"
              required
              value={name}
              onChange={(e) => { setName(e.target.value) }}
            />

            <label className="auth__label" htmlFor="email">E-mail</label>
            <input
              className="auth__input"
              type="text"
              name="email"
              required
              value={email}
              onChange={handleChangeEmail}
            />

            <label className="auth__label" htmlFor="department">Департамент</label>
            <Select options={options}  className="registration__select"/>

            <label className="auth__label" htmlFor="password">Пароль</label>
            <input
              className="auth__input"
              type="password"
              name="password"
              required
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
            />

            <label className="auth__label" htmlFor="email">Повторите пароль</label>
            <input
              className="auth__input"
              type="password"
              name="email"
              required
              value={controlPassword}
              onChange={(e) => { setControlPassword(e.target.value) }}
            />

            <button className="auth__submit registration__submit" type="submit">Зарегистрироваться</button>


          </form>
        </section >
        <section className="registration__section registration__section_w_60">
          <img src={designPhoto} className='registration__image' alt="girl introducin login" />
        </section>
      </div>

    </div>
  )
}

export default Registration
