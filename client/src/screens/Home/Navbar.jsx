import React from "react";
import styled from "styled-components";

const NavbarContainer = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  background-color: blueviolet;
  top: 0;
  position: fixed;
  @media (min-width: 500px) {
    display: none;
  }
`;

export default function HomeNavbar() {
  return (
    <>
      <NavbarContainer>
        <h1>Navbar</h1>
      </NavbarContainer>
    </>
  );
}
