import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MakeTweet from "../../components/MakeTweet";
import Tweet from "../../components/Tweet";

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 500px;
  top: 0;
  /* position: fixed; */
  justify-content: center;
  /* width: 50%; */
  width: 50%;
  height: auto;
  overflow: hidden;
  background-color: blue;
  border: 1px solid #80808038;
  @media (max-width: 1280px) {
    width: 90%;
  }
  @media (max-width: 1000px) {
    width: 85%;
  }
  @media (max-width: 500px) {
    width: 100%;
  }

  /* .parent {
    width: 400px;
    height: 200px;
    border: 1px solid #aaa;
    overflow: hidden;
  } */
  .child {
    /* height: 100%; */
    /* margin-right: -50px; */
    /* padding-right: 50px; */
    overflow-y: scroll;
  }
`;

export default function Middle() {
  return (
    <>
      <MiddleContainer>
        <Navbar />
        <MakeTweet />
        <Tweet />
      </MiddleContainer>
    </>
  );
}
