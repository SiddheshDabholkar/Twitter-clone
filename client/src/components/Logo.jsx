import styled from "styled-components";

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  float: left;
  width: 100%;
`;

export const Logo = styled.img`
  height: ${({ small }) => (small ? "45px" : "70px")};
  padding: ${({ small }) => (small ? "10px" : "")};
  background-repeat: no-repeat;
  @media (max-width: 760px) {
    height: 55px;
  }
  @media (max-width: 500px) {
    height: 40px;
  }
`;
