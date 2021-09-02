import styled from "styled-components";

export const Bg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  /* background-color: #b5b5b591; */
  background-color: ${({ transparent }) =>
    transparent ? transparent : "#b5b5b591"};
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1000001;
  @media (max-width: 450px) {
    margin: 0px;
    width: 100%;
    height: 100%;
  }
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000000;
  position: fixed;
  width: ${({ width }) => width};
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: 20% 10%;
  border-radius: 30px;
  background-color: #fff;

  @media (min-width: 920px) {
    margin: 7% 20%;
    height: auto;
  }

  @media (max-width: 620px) {
    /* position: relative; */
    margin: auto !important;
    width: 100% !important;
    border-radius: 0px;
    height: 100%;
  }
`;

export const ModalContent = styled.div``;
