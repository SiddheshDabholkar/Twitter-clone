import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 60px;
  width: auto;
  height: ${({ htsmall }) => (htsmall ? "10px" : "50px")};
  cursor: pointer;
  font-size: ${({ small }) => (small ? "15px" : "20px")};
  font-weight: bold;
  color: ${({ txtColor }) => txtColor};
  background-color: ${({ bgColor }) => bgColor};
  border-color: ${({ borderColor }) => borderColor};
  padding: ${({ small }) => (small ? "10px" : "25px")};
  width: ${({ input }) => (input ? "100%" : "45%")};
  margin: 15px;
  a {
    color: ${({ txtColor }) => txtColor};
    text-decoration: none;
  }
  @media (min-width: 1200px) {
    width: ${({ input }) => (input ? "100%" : "70%")};
    padding: ${({ input }) => (input ? "1px" : "30px")};
    padding: ${({ small }) => (small ? "5px" : "30px")};
  }
  @media (max-width: 1000px) {
    padding: ${({ small }) => (small ? "20px" : "30px")};
    font-size: ${({ small }) => (small ? "15px" : "20px")};
  }
  @media (max-width: 500px) {
    width: 85%;
    padding: 23px;
  }

  &:hover {
    background-color: ${({ hbgColor }) => hbgColor};
  }
`;

export const StyledLinkButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 60px;
  width: auto;
  height: ${({ htsmall }) => (htsmall ? "10px" : "50px")};
  cursor: pointer;
  font-size: ${({ small }) => (small ? "15px" : "20px")};
  font-weight: bold;
  color: ${({ txtColor }) => txtColor};
  background-color: ${({ bgColor }) => bgColor};
  border: ${({ border }) => border} !important;
  padding: ${({ small }) => (small ? "10px" : "3px")};
  width: ${({ input }) => (input ? "100%" : "45%")};
  margin: 15px;
  a {
    color: ${({ txtColor }) => txtColor};
    text-decoration: none;
  }
  @media (min-width: 1200px) {
    width: ${({ input }) => (input ? "100%" : "70%")};
    padding: ${({ input }) => (input ? "1px" : "30px")};
    padding: ${({ small }) => (small ? "5px" : "3px")};
  }
  @media (max-width: 1000px) {
    padding: ${({ small }) => (small ? "20px" : "3px")};
    font-size: ${({ small }) => (small ? "15px" : "20px")};
  }
  @media (max-width: 500px) {
    width: 85%;
    padding: 2px;
  }

  &:hover {
    background-color: ${({ hbgColor }) => hbgColor};
  }
`;
