import { useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import logo from '../images/logo.svg'

function Header(props) {

  /** Шторка для экранов смартфонов */
  const [isAccountInfoOpen, setIsAccountInfoOpen] = useState(false);
  function handleButtonHideClick() {
    if (isAccountInfoOpen) {
      setIsAccountInfoOpen(false)
    } else {
      setIsAccountInfoOpen(true)
    };
  }

  /** Вызвать функцию props.onLogout с выходом из профиля */
  function handleButtonLogout() {
    props.onLogout();
  }

  return (
    <header className="header">
      {props.loggedIn && (
      <div className={`header__mobile ${isAccountInfoOpen && "header__mobile_active"}`}>
        <p className="header__email">{props.currentEmail}</p>
        <button className="header__button-profile" onClick={handleButtonLogout}>Выйти</button>
      </div>)}
      <div className="header__main">
        <a href="#0" className="header__logo-link">
          <img alt="Логотип" src={logo} className="header__logo" />
        </a>
        <div className={`header__account`}>
          {props.loggedIn && (<>
            <button
              onClick={handleButtonHideClick}
              className={`header__button-hide ${isAccountInfoOpen && "header__button-hide_active"}`}>
            </button>
            <p className="header__email">{props.currentEmail}</p>
            </>)}
          <Routes>
            <Route path="/sign-up" element={<Link className="header__button-profile header__button-profile_unauthorized" to="/sign-in">Войти</Link>} />
            <Route path="/sign-in" element={<Link className="header__button-profile header__button-profile_unauthorized" to="/sign-up">Регистрация</Link>} />
            <Route path="/" element={<Link className="header__button-profile" to="/sign-in" onClick={handleButtonLogout}>Выйти</Link>} />
          </Routes>
        </div>
      </div>
    </header>
  )
}

export default Header;


