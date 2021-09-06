import styled from "styled-components";

export const CStyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 60px;
  width: auto;
  height: 40px;
  cursor: pointer;
  font-size: ${({ small }) => (small ? "14px" : "20px")};
  font-weight: bold;
  color: ${({ txtColor }) => txtColor};
  background-color: ${({ bgColor }) => bgColor};
  border-color: ${({ borderColor }) => borderColor};
  padding: ${({ small }) => (small ? "10px" : "22px")};
  width: ${({ input }) => (input ? "100%" : "45%")};
  margin: 15px;
  a {
    color: ${({ txtColor }) => txtColor};
    text-decoration: none;
  }
  @media (max-width: 1280px) {
    width: 60px;
    padding: 0px !important;
    margin: 0px !important;
    border-radius: 50%;
  }
  :focus {
    outline: none;
  }
`;
