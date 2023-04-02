import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {

  /** Подписка на контекст с информацией о текущем пользователе с сервера */
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile" aria-label="Профиль">
        <div className="profile__account">
          <img className="profile__avatar" src={currentUser.avatar} alt="Фото профиля" />
          <button className="profile__avatar-edit" aria-label="Изменить фото" onClick={props.onEditAvatar}></button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" className="profile__edit" aria-label="Редактировать" onClick={props.onEditProfile}></button>
            <p className="profile__profession">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" className="profile__button-add" aria-label="Добавить" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements" aria-label="Галерея мест">
        <ul className="elements__list">
          {props.cards.map((card) => {
            return <Card
              card={card}
              onCardClick={props.onCardClick}
              key={card._id}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete} />
          })}
        </ul>
      </section>
    </main>
  )
}

export default Main;
