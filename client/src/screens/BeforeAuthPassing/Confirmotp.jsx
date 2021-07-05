import { Link, useLocation } from "react-router-dom";

import { StyledInput } from "../../components/Input";
import { SmallHeader } from "../../Typography";
import { LogoContainer, Logo } from "../../components/Logo";
import { MainContainer } from "../../container/MainContainer";
import { CardContainer } from "../../container/CardContainer";
import { StyledButton } from "../../components/Buttons/AuthButton";
import { ButtonContainer } from "../../components/Buttons/ButtonContainer";
import {
  Bg,
  ModalContainer,
  ModalContent,
} from "../../components/Modals/ModalUtils";

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
