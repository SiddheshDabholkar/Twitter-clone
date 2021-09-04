import { useState } from "react";

export default function useDropdown(Component) {
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);

  const DropDown = (props) => {
    return <Component {...props} />;
  };

  return { DropDown, show, toggle, setShow };
}
