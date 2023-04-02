import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {

  /** Подписка на контекст с информацией о текущем пользователе с сервера */
  const currentUser = useContext(CurrentUserContext);

  /** Буль: владелец этой карты это текущий пользователь? */
  const isOwn = props.card.owner._id === currentUser._id;
  /** Буль: среди людей, поставивших лайк, есть текущий пользователь? */
  const isLiked = props.card.likes.some(function (element) { return element._id === currentUser._id })

  /** Вызывать функцию для зума onCardClick из пропса с аргументом card пропса */
  function handleClick() {
    props.onCardClick(props.card);
  }

  /** Вызывать функцию для лайка onCardLike из пропса с аргументом card пропса */
  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  /** Вызывать функцию для удаления onCardDelete из пропса с аргументом card пропса */
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="elements__card">
      <article className="element">
        <img className="element__photo" src={props.card.link} alt={props.card.name} onClick={handleClick} />
        <div className="element__footer">
          <h2 className="element__name">{props.card.name}</h2>
          <div className="element__like-container">
            <button type="button" className={`element__like ${isLiked && "element__like_active"}`} onClick={handleLikeClick}></button>
            <p className="element__like-counter">{props.card.likes.length}</p>
          </div>
        </div>
        {isOwn && <button type="button" className="element__delete" aria-label="Удалить" onClick={handleDeleteClick}></button>}
      </article>
    </li>)
}

export default Card;
