import { useState } from "react";
import { useDisableBodyScroll } from "./useDisableBodyScroll";

export default function useModal(Component) {
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);
  const Modal = (props) => {
    useDisableBodyScroll(toggle);
    return <Component {...props} />;
  };

  return { Modal, show, toggle, setShow };
}
