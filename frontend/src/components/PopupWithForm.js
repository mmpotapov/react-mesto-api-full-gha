function PopupWithForm(props) {

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" aria-label="Закрыть" onClick={props.onClose}></button>
        <form
          className="popup__form"
          name={`${props.name}-form`}
          onSubmit={props.onSubmit}>
          <h2 className="popup__header">{props.title}</h2>
          {props.children}
          <button type="submit" className="popup__save">{props.submitButton}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
