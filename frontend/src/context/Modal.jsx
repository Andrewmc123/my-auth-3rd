import { useRef, useState, useContext, createContext } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

// I believe this sets up the context to share modal functions across the app
const ModalContext = createContext();

// This is doing the setup for providing modal tools to everything inside
export function ModalProvider({ children }) {
  const modalRef = useRef(); // I believe this is referencing the modal div
  const [modalContent, setModalContent] = useState(null); // This holds what should be shown inside the modal
  const [onModalClose, setOnModalClose] = useState(null); // This stores a function to run when modal is closed

  // This is doing the logic to close the modal and run cleanup
  const closeModal = () => {
    setModalContent(null); // I believe this clears what's inside the modal
    if (typeof onModalClose === "function") {
      setOnModalClose(null); // I believe this resets the close callback
      onModalClose(); // This is doing the actual call to the close function
    }
  };

  // I believe this is the object we share across the app using context
  const contextValue = {
    modalRef,
    modalContent,
    setModalContent,
    setOnModalClose,
    closeModal
  };

  // This is doing the actual context setup and rendering the modal root div
  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

// I believe this is the component that shows the modal
export function Modal() {
  const { modalRef, modalContent, closeModal } = useContext(ModalContext);

  // This is doing a check — if modal doesn't exist or has no content, show nothing
  if (!modalRef || !modalRef.current || !modalContent) return null;

  // This is doing the rendering of the modal in a portal (outside regular DOM flow)
  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={closeModal} />
      <div id="modal-content">{modalContent}</div>
    </div>,
    modalRef.current
  );
}

// I believe this makes it easy to use the modal context in other files
export const useModal = () => useContext(ModalContext);
