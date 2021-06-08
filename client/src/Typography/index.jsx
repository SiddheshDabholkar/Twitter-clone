import styled from "styled-components";

export const SmallHeader = styled.h1`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 40px;
`;
export const SmallParagraph = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: ${({ start }) => (start ? "flex-start" : "center")};
  justify-content: ${({ start }) => (start ? "flex-start" : "center")};
  font-size: 20px;
  margin: 10px;
  a {
    color: #000;
  }
`;
