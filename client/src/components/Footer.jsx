import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 100%;
  color: #8b949e;
  font-size: 22px;
  a {
    text-decoration: none;
    color: #8b949e;
  }
`;

export default function Footer() {
  return (
    <>
      <StyledFooter>
        <p>
          made with &#10084; by{" "}
          <a href="https://github.com/SiddheshDabholkar/Twitter-clone">
            Siddhesh
          </a>
        </p>
      </StyledFooter>
    </>
  );
}
