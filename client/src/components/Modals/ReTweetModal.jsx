import React from "react";
import { useDisableBodyScroll } from "../../hooks/useDisableBodyScroll";

export default function ReTweetModal({ toggle }) {
  useDisableBodyScroll(toggle);
  return (
    <>
      <h1>Retweet modal</h1>
    </>
  );
}
