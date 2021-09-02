import React from "react";
import styled from "styled-components";
import { Bg, ModalContainer } from "./ModalUtils";

const ReTweetModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 80%;
  background-color: black;
`;

export default function ReTweetModal() {
  return (
    <>
      <Bg>
        <ReTweetModalContainer onClick={(e) => e.stopPropogation()}>
          <div>lol</div>
        </ReTweetModalContainer>
      </Bg>
    </>
  );
}
