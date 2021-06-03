import styled from "styled-components";

export const StyledInput = styled.input`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  height: 70px;
  border-color: #1da1f2 !important;
  font-size: 20px;
  padding: 5px 20px;
  width: 90%;
  margin: 20px;
  @media (max-width: 450px) {
    width: 80%;
    margin: 10px;
    height: 40px;
  }
  @media (max-width: 350px) {
    width: 80%;
    margin: 5px;
    height: 40px;
  }
`;
