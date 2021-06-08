import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: auto;
  background-color: blue;
  @media (max-width: 1280px) {
    width: 90%;
  }
  @media (max-width: 1000px) {
    width: 85%;
  }
`;

export default function Middle() {
  return (
    <>
      <MiddleContainer>
        <Navbar />
        <h1>middle</h1>
        <Footer />
      </MiddleContainer>
    </>
  );
}
