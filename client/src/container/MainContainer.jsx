import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: ${({ col }) => (col ? "column" : "row")};
  align-items: center;
  justify-content: center;
  height: auto;
  width: 100%;
  flex-wrap: nowrap;
  @media (max-width: 972px) {
    flex-wrap: ${({ nowrap }) => (nowrap ? "nowrap" : "wrap")};
    flex-direction: ${({ rev }) => (rev ? "column" : "column-reverse")};
  }
`;
