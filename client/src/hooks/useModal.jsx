import { useState } from "react";
import { useDisableBodyScroll } from "./useDisableBodyScroll";
import useOnClickOutsideRef from "./useOnClickOutsideRef";

export default function useModal(Component) {
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);
  const modal = useOnClickOutsideRef(() => setShow(false));

  const Modal = (props) => {
    useDisableBodyScroll(toggle);
    return <Component {...props} ref={modal} />;
  };

  return { Modal, show, toggle };
}
