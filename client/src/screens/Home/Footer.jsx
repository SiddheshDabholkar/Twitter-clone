import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  height: 60px;
  background-color: burlywood;
  width: 100%;
  @media (min-width: 500px) {
    display: none;
  }
`;

export default function HomeFooter() {
  return (
    <>
      <FooterContainer>
        <h1>Footer</h1>
      </FooterContainer>
    </>
  );
}
