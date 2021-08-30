import { useState } from "react";
import styled from "styled-components";
import { Link, useLocation, useHistory } from "react-router-dom";
//
import { MainContainer } from "../../container/MainContainer";
import { StyledButton } from "../../components/Buttons/AuthButton";
import { ButtonContainer } from "../../components/Buttons/ButtonContainer";
import { Logo, LogoContainer } from "../../components/Logo";
import Signup from "./Signup";
import Footer from "../../components/Footer";

const LeftImage = styled.img`
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-size: auto;
`;
const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  /* padding: 50px 25px; */
  width: 90%;
  @media (max-width: 760px) {
    padding: 30px 15px;
  }
`;
const StyledHeader = styled.h1`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  font-weight: bolder;
  font-size: ${({ small }) => (small ? "45px" : "75px")};
  @media (max-width: 1400px) {
    font-size: ${({ small }) => (small ? "40px" : "65px")};
  }
  @media (max-width: 1200px) {
    font-size: ${({ small }) => (small ? "30px" : "55px")};
  }
  @media (max-width: 972px) {
    font-size: ${({ small }) => (small ? "30px" : "70px")};
  }
  @media (max-width: 790px) {
    font-size: ${({ small }) => (small ? "35px" : "85px")};
  }
  @media (max-width: 500px) {
    font-size: ${({ small }) => (small ? "25px" : "55px")};
  }
`;

export default function WelcomePage() {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const history = useHistory();

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
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  <Link
                    to={{
                      pathname: "/signup",
                      state: { background: location },
                    }}
                  >
                    Signup
                  </Link>
                </StyledButton>
                <Signup
                  show={show}
                  onClose={() => {
                    setShow(false);
                    history.goBack();
                  }}
                />
                <StyledButton
                  bgColor={"#fff"}
                  borderColor="#1da1f2"
                  txtColor="#1da1f2"
                >
                  <Link to="/login">Login</Link>
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
