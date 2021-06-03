import React, { useState } from "react";
import { StyledInput } from "../components/Input";
import { SmallHeader, SmallParagraph } from "../Typography";
import { LogoContainer } from "../container/LogoContainer";
import { Logo } from "../components/Logo";
import { MainContainer } from "../container/MainContainer";
import { StyledButton } from "../components/AuthButton";
import { ButtonContainer } from "../container/ButtonContainer";
import { Bg, ModalContainer, ModalContent } from "../container/ModalUtils";
import { CardContainer } from "../container/CardContainer";

export default function Signin({ onClose, show }) {
  const [useFirst, setUseFirst] = useState(true);

  const Input = () => {
    if (useFirst) {
      return (
        <>
          <StyledInput placeholder="phone" />
          <SmallParagraph
            start
            onClick={() => setUseFirst(false)}
            style={{ cursor: "pointer" }}
          >
            use Email instead
          </SmallParagraph>
        </>
      );
    } else {
      return (
        <>
          <StyledInput placeholder="email" />
          <SmallParagraph
            start
            onClick={() => setUseFirst(true)}
            style={{ cursor: "pointer" }}
          >
            use phone instead
          </SmallParagraph>
        </>
      );
    }
  };

  if (!show) return null;
  return (
    <>
      <Bg>
        <ModalContainer onClick={onClose}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CardContainer>
              <MainContainer nowrap style={{ flexDirection: "row" }}>
                <LogoContainer style={{ width: "90%" }}>
                  <Logo src={`${process.env.PUBLIC_URL}/icons8-twitter.svg`} />
                </LogoContainer>
                <ButtonContainer style={{ width: "10%" }}>
                  <StyledButton
                    bgColor="#1da1f2"
                    borderColor="transparent"
                    txtColor="#fff"
                    style={{
                      borderRadius: "20px",
                      padding: "20px 40px",
                      fontWeight: "bolder",
                    }}
                  >
                    confirm
                  </StyledButton>
                </ButtonContainer>
              </MainContainer>
              <SmallHeader>Create your account</SmallHeader>
              <StyledInput placeholder="name" />
              <Input />
            </CardContainer>
          </ModalContent>
        </ModalContainer>
      </Bg>
    </>
  );
}
