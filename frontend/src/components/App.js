import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { api } from '../utils/Api.js';
import { authApi } from '../utils/Auth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletionPopup from './DeletionPopup';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';

function App() {

  /** Хуки для изменения состояние попапов (открыт/не открыт) */
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isOpenImagePopupOpen, setIsOpenImagePopupOpen] = useState(false);
  const [isConfirmCardDeletionOpen, setIsConfirmCardDeletionOpen] = useState(false);
  const [isRegistrationResultPopupOpen, setIsRegistrationResultPopupOpen] = useState(false);
  /** Стейты для данных о профиле и списка карточек */
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [currentEmail, setCurrentEmail] = useState("");
  /** Стейт для хранения выбранной карточки */
  const [selectedCard, setSelectedCard] = useState({});
  /** Стейты для данных о авторизации и регистрации */
  const [isAuthorizedUser, setIsAuthorizedUser] = useState(false);
  const [isSuccessfulRegistration, setIsSuccessfulRegistration] = useState(false);
  const [isRegistrationMessage, setIsRegistrationMessage] = useState("");

  /** Хук useNavigate */
  const navigate = useNavigate();

  /** Открыть попап изменения профиля (изменить переменную состояния на true) */
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  /** Открыть попап изменения аватара */
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  /** Открыть попап добавления карточки */
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  /** Открыть попап с подтверждением удаления + изменить объект текущей карточки */
  const handleDeletionCardClick = (cardObject) => {
    setIsConfirmCardDeletionOpen(true);
    setSelectedCard(cardObject);
  }

  /** Открыть попап картинки + изменить объект текущей карточки */
  const handleCardClick = (cardObject) => {
    setIsOpenImagePopupOpen(true);
    setSelectedCard(cardObject);
  }

  /** Закрыть любой попап (изменить переменную состояния попапа на false) */
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsOpenImagePopupOpen(false);
    setIsConfirmCardDeletionOpen(false);
    setIsRegistrationResultPopupOpen(false);
  }

  /** Первичная проверка токена при загрузке страницы */
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      authApi.checkToken(jwt)
        .then((res) => {
          setCurrentEmail(res.email);
          setIsAuthorizedUser(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  /** Запрос данных о профиле и запрос массива карточек */
  useEffect(() => {
    if (isAuthorizedUser) {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        api._headers.Authorization = `Bearer ${jwt}`;
        Promise.all([api.getProfile(), api.getInitialCards()])
          .then(([profileInfo, cardList]) => {
            setCurrentUser(profileInfo);
            setCards(cardList);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [isAuthorizedUser]);
  // useEffect(() => {
  //   if (isAuthorizedUser) {
  //     Promise.all([api.getProfile(), api.getInitialCards()])
  //       .then(([profileInfo, cardList]) => {
  //         setCurrentUser(profileInfo);
  //         setCards(cardList);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [isAuthorizedUser])

  /** Функция-реакция на submit формы регистрации */
  function handleRegister(inputs) {
    /** Отправь на сервер email и пароль нового юзера */
    authApi.register(inputs.password, inputs.email)
      .then(() => {
        /** Открой попап с уведомлением об успешной регистрации */
        setIsRegistrationMessage("Вы успешно зарегистрировались!");
        setIsSuccessfulRegistration(true);
        setIsRegistrationResultPopupOpen(true);
        navigate('/sign-in');
      })
      .catch((err) => {
        /** Открой попап с уведомлением о проблеме */
        setIsRegistrationMessage("Что-то пошло не так! Попробуйте ещё раз.");
        setIsSuccessfulRegistration(false);
        setIsRegistrationResultPopupOpen(true);
        console.log(err);
      })
  }

  /** Функция-реакция на submit формы авторизации  */
  function handleLogin(inputs) {
    /** Отправь на сервер email и пароль */
    authApi.login(inputs.password, inputs.email)
      .then((data) => {
        /** Сохрани полученный jwt */
        localStorage.setItem('jwt', data.token);
        setCurrentEmail(inputs.email);
        setIsAuthorizedUser(true);
      })
      .catch((err) => {
        /** Открой попап с уведомлением о проблеме */
        setIsRegistrationMessage("Что-то пошло не так! Попробуйте ещё раз.");
        setIsSuccessfulRegistration(false);
        setIsRegistrationResultPopupOpen(true);
        console.log(err);
      })
  }

  /** Функция-реакция на Выход (удаление JWT и логаут) */
  function handleLogout() {
    localStorage.removeItem('jwt');
    setIsAuthorizedUser(false);
  }

  /** Функция-реакция нажатия на лайк */
  function handleCardLike(card) {
    /** Буль: среди людей, поставивших лайк, есть текущий пользователь? */
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    /** Если лайка не было, то отправь на сервер запрос на его проставление */
    if (!isLiked) {
      api.addLike(card._id)
        .then((updatedCard) => {
          setCards((cardList) =>
            /** Проверка, с какой карточкой из списка мы взаимодействовали; какую подменить и отдать setCards видоизменённый массив*/
            cardList.map((c) => (c._id === card._id ? updatedCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
      /** Если лайк был, то отправь на сервер запрос на его удаление */
    } else {
      api.deleteLike(card._id)
        .then((updatedCard) => {
          setCards((cardList) =>
            cardList.map((c) => (c._id === card._id ? updatedCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  /** Функция-реакция нажатия на корзину */
  function handleCardDelete(card) {
    /** Отправь на сервер запрос на удаление этой карточки */
    api.deleteCard(card._id)
      /** Перерисовка: отфильтровать карточку, с которой взаимодействовали*/
      .then(() => {
        const newCards = cards.filter((c) =>
          c._id === card._id ? '' : c)
        setCards(newCards);
        /** Закрыть попап-форму подтверждения удаления */
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  /** Функция-реакция на submit формы редактирования профиля */
  function handleUpdateUser(inputs) {
    /** Отправь на сервер новую информацию о юзере */
    api.editProfile(inputs.name, inputs.about)
      .then((res) => {
        /** Изменить контекст текущего пользователя */
        setCurrentUser(res);
        /** Закрыть попап-форму изменения профиля */
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  /** Функция-реакция на submit формы обновления аватара */
  function handleUpdateAvatar(link) {
    api.editAvatar(link)
      .then((res) => {
        /** Изменить контекст текущего пользователя */
        setCurrentUser(res);
        /** Закрыть попап-форму изменения аватара */
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  /** Функция-реакция на submit формы для добавления новой карточки */
  function handleAddPlaceSubmit(inputs) {
    api.addCard(inputs.name, inputs.link)
      /** Добавление новой карточки в начало к текущим */
      .then((newCard) => {
        setCards([newCard, ...cards]);
        /** Закрыть попап-форму добавления карточки */
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root__container">
        <Header
          loggedIn={isAuthorizedUser}
          onLogout={handleLogout}
          currentEmail={currentEmail} />
        <Routes>
          <Route path="/sign-up" element={
            <Register
              loggedIn={isAuthorizedUser}
              onRegisterUser={handleRegister} />} />
          <Route path="/sign-in" element={
            <Login
              loggedIn={isAuthorizedUser}
              onLogin={handleLogin} />} />
          <Route path="/" element={
            <ProtectedRoute
              element={Main}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeletionCardClick}
              cards={cards}
              loggedIn={isAuthorizedUser} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {isAuthorizedUser && <Footer />}

        {/** Попапы */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit} />
        <ImagePopup
          isOpen={isOpenImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard} />
        <DeletionPopup
          isOpen={isConfirmCardDeletionOpen}
          onClose={closeAllPopups}
          onConfirmDeletion={handleCardDelete}
          card={selectedCard} />
        <InfoTooltip
          isOpen={isRegistrationResultPopupOpen}
          isSuccess={isSuccessfulRegistration}
          isTextMessage={isRegistrationMessage}
          onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
