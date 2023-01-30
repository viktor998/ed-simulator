import RNModal from "react-modal";

RNModal.setAppElement("#root");
function Modal(props) {
  const { children, modalIsOpen, onRequestClose } = props;

  return (
    <RNModal
      isOpen={modalIsOpen}
      onRequestClose={() => {
        onRequestClose();
      }}
      overlayClassName="modalOverlay"
      className={"modal"}
    >
      <div className="modalContent">{children}</div>
    </RNModal>
  );
}

export default Modal;
