import { useState, useEffect } from "react";
import { Bg, ModalContainer } from "./ModalUtils";

export default function EditProfile({ toggle }) {
  return (
    <>
      <Bg onClick={toggle}>
        <ModalContainer>
          <h1>hey</h1>
        </ModalContainer>
      </Bg>
    </>
  );
}
