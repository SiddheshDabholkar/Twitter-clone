import { useState, useRef } from "react";
import useOnClickOutside from "./useOnClickOutsideRef";

export default function useDropdown(Component) {
  const dropdownRef = useRef();
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);
  const dropdown = useOnClickOutside(() => setShow(false), dropdownRef);

  const DropDown = (props) => {
    return <Component {...props} ref={dropdown} />;
  };

  return { DropDown, show, toggle };
}
