import React from "react";
import { MainContainer } from "../container/MainContainer";
import { ButtonContainer } from "../container/ButtonContainer";
import { StyledButton } from "../components/AuthButton";

export default function Login() {
  return (
    <>
      <MainContainer>
        <h1>login</h1>
        <ButtonContainer>
          <StyledButton>login bitch</StyledButton>
        </ButtonContainer>
      </MainContainer>
    </>
  );
}
