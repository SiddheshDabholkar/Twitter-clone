import styled from "styled-components";

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ mt }) => mt};
  width: 100%;
  height: 100%;
  overflow-y: ${({ scroll }) => (scroll ? "scroll" : "")};
`;

export const Navbar = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: ${({ long }) => (long ? "70px" : "55px")};
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  justify-content: center;
  align-items: center;
`;

export const NavbarInner = styled.div`
  width: 93%;
  height: 99%;
  display: flex;
  flex-direction: row;
`;

export const LeftContainer = styled.div`
  display: flex;
  width: 30%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
