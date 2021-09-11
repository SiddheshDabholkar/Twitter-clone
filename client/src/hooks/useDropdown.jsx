import { useState } from "react";

export default function useDropdown(Component) {
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const toggle = () => setShow(!show);
  const toggleModal = () => setShowModal(!showModal);

  const DropDown = (props) => {
    return <Component {...props} />;
  };

  return {
    DropDown,
    show,
    toggle,
    setShow,
    showModal,
    setShowModal,
    toggleModal,
  };
}
