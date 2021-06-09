import React from "react";
import styled from "styled-components";

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: inherit;
  height: 60px;
  background-color: blueviolet;
  top: 0;
  position: fixed;
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
