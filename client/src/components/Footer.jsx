import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export default function Footer() {
  return (
    <>
      <StyledFooter>
        <p>
          made with &#10084; by <a href="lol">Siddhesh</a>
        </p>
      </StyledFooter>
    </>
  );
}
