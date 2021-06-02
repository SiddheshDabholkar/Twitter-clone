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
    flex-wrap: wrap;
    /* flex-direction: column-reverse; */
    flex-direction: ${({ rev }) => (rev ? "column" : "column-reverse")};
  }
`;
