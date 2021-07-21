import { useState } from "react";
import { Bg, ModalContainer } from "../components/Modals/ModalUtils";

export default function useModal(Component) {
  const [showModal, setShowModal] = useState(false);
  const toggle = () => setShowModal(!showModal);

  const Modal = (props) => {
    return (
      <Bg onClick={props.closeModal}>
        <ModalContainer width={props.width}>
          <Component {...props} />
        </ModalContainer>
      </Bg>
    );
  };

  return [Modal, showModal, toggle];
}
