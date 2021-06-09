import React from "react";
import { TweetContainer } from "../container/TweetContainer";
import { LogoContainer } from "../container/LogoContainer";
import { Logo } from "./Logo";
import styled from "styled-components";

const Restcontainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const TweeterUsername = styled.p`
  color: #000;
  font-weight: bold;
  font-size: 28px;
`;

export default function Tweet() {
  return (
    <>
      <TweetContainer>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <Restcontainer>
          <Restcontainer>
            <TweeterUsername>lorem ipsum</TweeterUsername>
          </Restcontainer>
        </Restcontainer>
      </TweetContainer>
    </>
  );
}
