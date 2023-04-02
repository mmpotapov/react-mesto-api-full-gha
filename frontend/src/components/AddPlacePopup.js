import { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  /** Управляемый компонент для полей ввода */
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  /** Функции для onChange при вводе */
  function handleChangePlace(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  /** Отдать в props.onUpdateUser введённые name и description и вызвать функцию с ними */
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="card"
      submitButton="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <input
        type="text"
        name="place"
        className="popup__input popup__input_value_place"
        placeholder="Название"
        id="place-input"
        minLength="2" maxLength="20" required
        value={name}
        onChange={handleChangePlace} />
      <span className="popup__error place-input-error"></span>
      <input
        type="url"
        name="link"
        className="popup__input popup__input_value_link"
        required
        id="link-input"
        placeholder="Ссылка на изображение"
        value={link}
        onChange={handleChangeLink} />
      <span className="popup__error link-input-error"></span>
    </PopupWithForm>)
}

export default AddPlacePopup;
