import React from "react";
import styled from "styled-components";
import { MainContainer } from "../container/MainContainer";
import { StyledButton } from "../components/AuthButton";
import { ButtonContainer } from "../container/ButtonContainer";
import Footer from "../components/Footer";

const LeftImage = styled.img`
  height: auto;
  width: 100%;
  background-repeat: no-repeat;
  background-size: auto;
`;
const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  float: left;
  width: 100%;
`;
const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  padding: 50px 25px;
  width: 90%;
`;
const StyledHeader = styled.h1`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  font-weight: bolder;
  font-size: ${({ small }) => (small ? "50px" : "100px")};
  @media (max-width: 790px) {
    font-size: ${({ small }) => (small ? "35px" : "85px")};
  }
  @media (max-width: 500px) {
    font-size: ${({ small }) => (small ? "25px" : "65px")};
  }
`;
const Logo = styled.img`
  height: 70px;
  background-repeat: no-repeat;
`;
export default function WelcomePage() {
  return (
    <>
      <MainContainer rev col>
        <MainContainer>
          <MainContainer col>
            <LeftImage src={`${process.env.PUBLIC_URL}/twitter.png`} />
          </MainContainer>
          <MainContainer col>
            <RightContainer>
              <LogoContainer>
                <Logo src={`${process.env.PUBLIC_URL}/icons8-twitter.svg`} />
              </LogoContainer>
              <StyledHeader>Happening now</StyledHeader>
              <StyledHeader small>join Twitter today</StyledHeader>
              <ButtonContainer>
                <StyledButton
                  bgColor="#1da1f2"
                  borderColor="transparent"
                  txtColor="#fff"
                >
                  lmao
                </StyledButton>
                <StyledButton
                  bgColor={"#fff"}
                  borderColor="#1da1f2"
                  txtColor="#1da1f2"
                >
                  lmao
                </StyledButton>
              </ButtonContainer>
            </RightContainer>
          </MainContainer>
        </MainContainer>
        <Footer />
      </MainContainer>
    </>
  );
}
