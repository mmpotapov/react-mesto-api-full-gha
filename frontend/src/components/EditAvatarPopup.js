import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

  /** Извлечённый объект для рефа */
  const inputRef = useRef();

  /** Отдать в props.onUpdateAvatar вставленную в поле ссылку и вызвать функцию с ней */
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar(inputRef.current.value);
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      submitButton="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <input
        type="url"
        name="avatar"
        className="popup__input popup__input_value_avatar"
        required
        placeholder="Ссылка"
        id="avatar-input"
        ref={inputRef} />
      <span className="popup__error avatar-input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
