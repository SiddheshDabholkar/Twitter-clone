import React from "react";
import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";

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
  border: 1px solid #80808038;
`;

export default function HomeNavbar() {
  const { pathname } = useLocation();
  const newPathname = pathname.substring(1);
  console.log(newPathname);
  return (
    <>
      <NavbarContainer>
        <h1>{newPathname}</h1>
      </NavbarContainer>
    </>
  );
}
