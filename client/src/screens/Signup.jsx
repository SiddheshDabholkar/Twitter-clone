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
import Confirmotp from "./Confirmotp";
import { Link, useLocation, useHistory } from "react-router-dom";

export default function Signin({ onClose, show }) {
  const [useFirst, setUseFirst] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const history = useHistory();

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
                <LogoContainer>
                  <Logo src={`${process.env.PUBLIC_URL}/icons8-twitter.svg`} />
                </LogoContainer>
              </MainContainer>
              <SmallHeader>Create your account</SmallHeader>
              <StyledInput placeholder="name" />
              <Input />
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
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    Signup
                  </Link>
                </StyledButton>
              </ButtonContainer>
            </CardContainer>
          </ModalContent>
        </ModalContainer>
      </Bg>
      <Confirmotp
        showModal={showModal}
        onCloseModal={() => {
          setShowModal(false);
          history.push("/");
        }}
      />
    </>
  );
}
