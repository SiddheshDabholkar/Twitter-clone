import styled from "styled-components";

export const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 50%;
  border: 1px solid #80808038;
  top: 0;
  @media (min-width: 1024px) {
    width: 50%;
  }
  @media (max-width: 1023px) {
    width: 60%;
  }
  @media (max-width: 1000px) {
    width: 85%;
  }
  @media (max-width: 500px) {
    width: 100%;
  }
`;
