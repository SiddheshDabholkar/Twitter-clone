import React from "react";
import styled from "styled-components";

const SearchModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 26%;
  height: 50%;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  z-index: 1;
  margin: 2%;
  border-radius: 15px;
  margin-top: 0px;
  box-shadow: 0 5px 10px #7a6f6f66, 0 15px 40px #8a8a8a66;
`;

export default function SearchModal({ showSearchModal }) {
  if (showSearchModal) {
    return (
      <>
        <SearchModalContainer>lol</SearchModalContainer>
      </>
    );
  } else return null;
}
