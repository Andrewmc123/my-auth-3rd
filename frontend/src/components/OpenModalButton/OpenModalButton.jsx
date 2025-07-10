import { useModal } from "../../context/Modal";

function OpenModalButton({
	modalComponent: ModalComponent,
	buttonText,
	onButtonClick,
	onModalClose,
	modalProps,
}) {
	const { setModalContent, setOnModalClose } = useModal();

	const onClick = (e) => {
		if (onModalClose) setOnModalClose(onModalClose);
		setModalContent(<ModalComponent {...modalProps} />);
		if (typeof onButtonClick === "function") onButtonClick(e);
	};

	return (
		<button type="button" onClick={onClick}>
			{buttonText}
		</button>
	);
}

export default OpenModalButton;
