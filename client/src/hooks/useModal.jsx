import { useState } from "react";

export default function useModal(Component) {
  const [showModal, setShowModal] = useState(false);
  const toggle = () => setShowModal(!showModal);

  const Modal = (props) => {
    return <Component {...props} />;
  };

  return [Modal, showModal, toggle];
}
