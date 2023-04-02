import successReg from '../images/successReg.svg'
import failedReg from '../images/failedReg.svg'

function InfoTooltip(props) {

  return (
    <div className={`popup popup_type_result ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" aria-label="Закрыть" onClick={props.onClose}></button>
        <div className="popup__notice">
          <img
            className="popup__icon"
            src={props.isSuccess ? (successReg) : (failedReg)}
            alt={props.isSuccess ? ("Успех") : ("Ошибка")} />
          <p className="popup__sign">{props.isTextMessage}</p>
        </div>
      </div>
    </div>)
}
export default InfoTooltip;
