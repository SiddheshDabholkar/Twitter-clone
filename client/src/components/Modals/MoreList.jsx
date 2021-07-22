import React from "react";
import { Bg } from "./ModalUtils";
import styled from "styled-components";

const ListModalContainer = styled.div`
  display: flex;
  width: 100%;
  height: 0px;
  overflow: visible;
  flex-direction: column;
  background-color: blue;
  align-items: flex-end;
  justify-content: flex-start;
`;

const ListModal = styled.div`
  width: 40%;
  z-index: 1;
  height: auto;
  margin: -2% 10% 0px 0px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: -10px 9px 36px -10px rgba(110, 110, 110, 0.69);
  -webkit-box-shadow: -10px 9px 36px -10px rgba(110, 110, 110, 0.69);
  -moz-box-shadow: -10px 9px 36px -10px rgba(110, 110, 110, 0.69);
`;

const ListBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px 10px;
`;

export default function MoreList() {
  const List = () => {
    return (
      <>
        <ListBox>
          <h1>delete</h1>
        </ListBox>
      </>
    );
  };

  return (
    <>
      {/* <Bg /> */}
      <ListModalContainer onclick={(e) => e.preventDefault()}>
        <ListModal onclick={(e) => e.preventDefault()}>
          <List />
        </ListModal>
      </ListModalContainer>
    </>
  );
}
