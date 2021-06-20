import { useState } from "react";
import styled from "styled-components";

export const StyledSearchInput = styled.input`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 80%;
  background-color: #80808038;
  border-radius: 100px;
  border: 0px;
  font-size: 18px;
  height: 40px;
  padding: 2px;
  :focus {
    outline: none;
  }
`;

export default function Search() {
  return (
    <>
      <StyledSearchInput
        placeholder="Search twitter"
        onChange={(e) => console.log(e.target.value)}
      ></StyledSearchInput>
    </>
  );
}
