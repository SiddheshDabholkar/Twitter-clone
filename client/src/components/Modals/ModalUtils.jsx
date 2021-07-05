import styled from "styled-components";

export const Bg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  background-color: #b5b5b591;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  @media (max-width: 450px) {
    margin: 0px;
    width: 100%;
    height: 100%;
    padding: 10px;
  }
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: 20% 10%;
  border-radius: 30px;
  background-color: #fff;

  @media (min-width: 920px) {
    margin: 10% 25%;
    height: auto;
  }

  @media (max-width: 550px) {
    /* position: relative; */
    margin: 0px;
    width: 100%;
    height: 100%;
    padding: 10px;
  }
`;

export const ModalContent = styled.div``;
