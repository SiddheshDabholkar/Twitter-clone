import React from "react";
import styled from "styled-components";
import Navbar from "./Home/Navbar";
import Footer from "./Home/Footer";
import Tweet from "../components/Tweet";
import { RestContainer } from "../container/RestContainer";

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* Dont change this height bitch */
  height: 100vh;
  width: 50%;
  border: 1px solid #80808038;
  top: 0;

  @media (max-width: 1280px) {
    width: 90%;
  }
  @media (max-width: 1000px) {
    width: 85%;
  }
  @media (max-width: 500px) {
    width: 100%;
  }
`;

export default function Profile() {
  return (
    <>
      <MiddleContainer>
        <Navbar />
        <RestContainer>
          <Tweet />
        </RestContainer>
        <Footer />
      </MiddleContainer>
    </>
  );
}
