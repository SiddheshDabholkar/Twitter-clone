import styled from "styled-components";

export const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 60px;
  width: auto;
  height: 50px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  color: ${({ txtColor }) => txtColor};
  background-color: ${({ bgColor }) => bgColor};
  border-color: ${({ borderColor }) => borderColor};
  padding: 25px;
  width: 45%;
  margin: 15px;
  @media (min-width: 1200px) {
    width: 70%;
    padding: 35px;
  }
  @media (max-width: 500px) {
    width: 85%;
    padding: 23px;
  }
`;
