import { useModal } from '../../context/Modal';

function OpenModalButton({
  modalComponent: ModalComponent,
  buttonText,
  onButtonClick,
  onModalClose,
  modalProps
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(<ModalComponent {...modalProps} />);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return <button onClick={onClick}>{buttonText}</button>;
}

export default OpenModalButton;