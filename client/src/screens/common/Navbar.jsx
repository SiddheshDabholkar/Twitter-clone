import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { SAvatar, SAvatarContainer } from "../../components/Tweet";

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: inherit;
  height: 60px;
  background-color: #fff;
  top: 0;
  position: fixed;
`;
const Tohide = styled.div`
  display: flex;
  flex-direction: row;
  background-color: aqua;
  align-items: center;
  justify-content: center;
  width: 10%;
  @media (min-width: 500px) {
    display: none;
  }
`;

export default function HomeNavbar() {
  const { pathname } = useLocation();
  const newPathname = pathname.substring(1);
  console.log(newPathname);
  return (
    <>
      <NavbarContainer>
        <Tohide>
          <SAvatarContainer>
            <SAvatar />
          </SAvatarContainer>
        </Tohide>
        <h1>{newPathname}</h1>
      </NavbarContainer>
    </>
  );
}
