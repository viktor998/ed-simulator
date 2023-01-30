import { createContext, ReactNode, useContext, useState } from "react";
import Modal from "./modal";

// import Modal from "./modal";

const LogicContext = createContext({
  burgerButton: null,
  setBurgerButton: (value) => {},
  content: null,
  setContent: (value) => {},
  handleModalOpen: (content) => {},
  closeModal: () => {},
});
export default function Container(props) {
  // const [index, setIndex] = useState<number>(0); // create  index
  const [burgerButton, setBurgerButton] = useState(null);
  const [content, setContent] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState();

  const handleModalOpen = (content) => {
    setModalContent(content);
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <LogicContext.Provider
      value={{
        burgerButton,
        setBurgerButton,
        content,
        setContent,
        handleModalOpen,
        closeModal,
      }}
    >
      <Modal modalIsOpen={openModal} onRequestClose={() => setOpenModal(false)}>
        {modalContent}
      </Modal>
      {props.children}
    </LogicContext.Provider>
  );
}
export function useLayoutLogic() {
  return useContext(LogicContext);
}
