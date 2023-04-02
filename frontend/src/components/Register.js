import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

function Register(props) {

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

  /** Отдать в props.onRegisterUser введённые email и password и вызвать функцию с ними */
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegisterUser({
      password: password,
      email: email,
    });
  }

  return props.loggedIn ? (<Navigate to="/" replace />) : (
    <main className="content">
      <section className="unauthorized" aria-label="Регистрация">
        <form className="unauthorized__form registration-form" name="registration-form" onSubmit={handleSubmit}>
          <h2 className="registration-form__header">Регистрация</h2>
          <input
            className="registration-form__input"
            type="email"
            name="email"
            id="email-input"
            placeholder="Email"
            value={email}
            onChange={handleChangeEmail} />
          <input
            className="registration-form__input"
            type="password"
            name="password"
            id="password-input"
            placeholder="Пароль"
            value={password}
            onChange={handleChangePassword}/>
          <button type="submit" className="registration-form__submit">Зарегистрироваться</button>
        </form>
        <p className="unauthorized__sign">Уже зарегистрированы? <Link className="unauthorized__login" to="/sign-in">Войти</Link></p>
      </section>
    </main>
  )
}

export default Register;
