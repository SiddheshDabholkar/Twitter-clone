import React from "react";
import styled from "styled-components";

const WhatsHappeningContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: auto;
  background-color: aliceblue;
  @media (max-width: 1280px) {
    width: 40%;
  }
  @media (max-width: 1000px) {
    width: 0%;
    display: none;
  }
`;

export default function WhatsHappening() {
  return (
    <>
      <WhatsHappeningContainer>
        <h1>whatshappening</h1>
      </WhatsHappeningContainer>
    </>
  );
}
