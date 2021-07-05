import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  width: 90%;
  padding: ${({ small }) => (small ? small : "20px")};
  @media (min-width: 1201px) {
    flex-wrap: wrap;
    width: 100%;
  }
  @media (max-width: 501px) {
    flex-wrap: wrap;
    width: 100%;
    padding: 5px;
  }
`;
