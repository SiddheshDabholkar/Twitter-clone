import React, { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
//
import { StyledInput } from "../../components/Input";
import { SmallHeader, SmallParagraph } from "../../Typography";
import { Logo, LogoContainer } from "../../components/Logo";
import { StyledButton } from "../../components/Buttons/AuthButton";
import { ButtonContainer } from "../../components/Buttons/ButtonContainer";
import {
  Bg,
  ModalContainer,
  ModalContent,
} from "../../components/Modals/ModalUtils";
//
import { MainContainer } from "../../container/MainContainer";
import { CardContainer } from "../../container/CardContainer";
import Confirmotp from "./Confirmotp";

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
