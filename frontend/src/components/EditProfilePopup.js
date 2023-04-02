import { useEffect, useState, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {

  /** Управляемый компонент для полей ввода */
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  /** Функции для onChange при вводе */
  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  /** Подписка на контекст с текущими именем и описанием аккаунта */
  const currentUser = useContext(CurrentUserContext);

  /** Первично при открытии сразу же установить значения в поля */
  useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [props.isOpen, currentUser]);


  /** Отдать в props.onUpdateUser введённые name и description и вызвать функцию с ними */
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      submitButton="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        className="popup__input popup__input_value_name"
        id="name-input"
        placeholder="Имя"
        minLength="2" maxLength="40" required
        value={name}
        onChange={handleChangeName} />
      <span className="popup__error name-input-error"></span>
      <input
        type="text"
        name="profession"
        className="popup__input popup__input_value_profession"
        placeholder="О себе"
        id="profession-input"
        minLength="2" maxLength="200" required
        value={description}
        onChange={handleChangeDescription} />
      <span className="popup__error profession-input-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
