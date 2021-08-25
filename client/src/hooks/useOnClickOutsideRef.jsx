import { useEffect, useRef } from "react";

export default function useOnClickOutsideRef(callback, initialValue = null) {
  const elementRef = useRef(initialValue);
  useEffect(() => {
    function handler(event) {
      if (!elementRef.current?.contains(event.target)) {
        callback();
      }
    }
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [callback]);
  return elementRef;
}

// https://blog.bhanuteja.dev/easily-detect-outside-click-using-useref-hook
