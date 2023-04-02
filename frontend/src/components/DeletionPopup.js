import PopupWithForm from './PopupWithForm';

function DeletionPopup(props) {

  /** Вызвать props.onConfirmDeletion с удержанной props.card */
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onConfirmDeletion(props.card);
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delete"
      submitButton="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit} />
  )
}
export default DeletionPopup;
