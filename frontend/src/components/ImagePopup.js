function ImagePopup(props) {
  return (
    <div className={`popup popup_type_photo ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" aria-label="Закрыть" onClick={props.onClose}></button>
        <figure className="popup__figure">
          <img className="popup__photo" src={props.card.link} alt={props.card.name} />
          <figcaption className="popup__caption">{props.card.name}</figcaption>
        </figure>
      </div>
    </div>)
}

export default ImagePopup;
