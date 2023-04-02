import { useState } from 'react';
import { Navigate } from "react-router-dom";

function Login(props) {

  /** Управляемый компонент для полей ввода */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /** Функции для onChange при вводе */
  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  /** Отдать в props.onLogin введённые email и password и вызвать функцию с ними */
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin({
      password: password,
      email: email,
    });
  }

  return props.loggedIn ? (<Navigate to="/" replace />) : (
    <main className="content">
      <section className="unauthorized" aria-label="Вход">
        <form className="unauthorized__form login-form" name="login-form" onSubmit={handleSubmit}>
          <h2 className="login-form__header">Вход</h2>
          <input
            className="login-form__input"
            type="email"
            name="email"
            id="email-input"
            placeholder="Email"
            value={email}
            onChange={handleChangeEmail} />
          <input
            className="login-form__input"
            type="password"
            name="password"
            id="password-input"
            placeholder="Пароль"
            value={password}
            onChange={handleChangePassword} />
          <button type="submit" className="login-form__submit">Войти</button>
        </form>
      </section>
    </main>
  )
}

export default Login;
