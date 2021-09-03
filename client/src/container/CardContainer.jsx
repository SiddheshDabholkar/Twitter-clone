import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 410px;
  height: auto;
  @media (max-width: 450px) {
    width: 100%;
    /* padding: 10px; */
  }
`;
