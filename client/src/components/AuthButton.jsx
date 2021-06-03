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
  width: ${({ input }) => (input ? "100%" : "45%")};
  margin: 15px;
  a {
    color: ${({ txtColor }) => txtColor};
    text-decoration: none;
  }
  @media (min-width: 1200px) {
    width: ${({ input }) => (input ? "100%" : "70%")};
    padding: ${({ input }) => (input ? "1px" : "30px")};
  }
  @media (max-width: 500px) {
    width: 85%;
    padding: 23px;
  }
`;
