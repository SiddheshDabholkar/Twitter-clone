import React from "react";
import { StyledInput } from "../components/Input";
import { SmallHeader } from "../Typography";
import { LogoContainer } from "../container/LogoContainer";
import { Logo } from "../components/Logo";
import { MainContainer } from "../container/MainContainer";
import { StyledButton } from "../components/AuthButton";
import { ButtonContainer } from "../container/ButtonContainer";
import { Bg, ModalContainer, ModalContent } from "../container/ModalUtils";
import { CardContainer } from "../container/CardContainer";
import { Link, useLocation } from "react-router-dom";

export default function Confirmotp({ showModal, onCloseModal }) {
  const location = useLocation();
  if (!showModal) return null;
  return (
    <>
      <Bg>
        <ModalContainer onClick={onCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CardContainer>
              <MainContainer nowrap style={{ flexDirection: "row" }}>
                <LogoContainer>
                  <Logo src={`${process.env.PUBLIC_URL}/icons8-twitter.svg`} />
                </LogoContainer>
              </MainContainer>
              <SmallHeader>Create your account</SmallHeader>
              <StyledInput placeholder="enter verification code" />
              <ButtonContainer>
                <StyledButton
                  bgColor="#1da1f2"
                  borderColor="transparent"
                  txtColor="#fff"
                  style={{ width: "100%" }}
                >
                  <Link
                    to={{
                      pathname: "/confirmotp",
                      state: { background: location },
                    }}
                  >
                    confirm
                  </Link>
                </StyledButton>
              </ButtonContainer>
            </CardContainer>
          </ModalContent>
        </ModalContainer>
      </Bg>
    </>
  );
}
