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
export const TweeterUsername = styled.p`
  color: ${({ small }) => (small ? "grey" : "black")};
  font-weight: bolder;
  font-size: ${({ small }) => (small ? "12px" : "18px")};
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  line-height: 30px;
  padding: 0;
  /* margin: 2px; */
  margin: ${({ topzero }) => (topzero ? "0px 2px" : "2px")};
`;
