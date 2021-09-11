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

export const Acon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100% !important;
  width: 15% !important;
`;

export const TweetFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 100% !important;
  margin-bottom: 0px;
  margin-top: ${({ mt }) => mt};
  border-top: 1px solid #e0dfdf;
`;
export const FootCont = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: ${({ mr }) => mr};
  justify-content: ${({ end }) => (end ? "flex-end" : "center")};
  width: ${({ small }) => (small ? "40%" : "60%")};
`;
