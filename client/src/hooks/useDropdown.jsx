import { useState } from "react";
import useOnClickOutsideRef from "./useOnClickOutsideRef";

export default function useDropdown(Component) {
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);
  const dropdown = useOnClickOutsideRef(() => setShow(false));

  const DropDown = (props) => {
    return <Component {...props} ref={dropdown} />;
  };

  return { DropDown, show, toggle };
}
