import styled from "styled-components";

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
