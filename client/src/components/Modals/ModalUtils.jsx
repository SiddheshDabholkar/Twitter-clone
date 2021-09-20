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
  margin: ${({ sm }) => (sm ? "10% 20%" : "8% 10%")};
  border-radius: 30px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);

  @media (min-width: 920px) {
    margin: ${({ sm }) => (sm ? "14% 20%" : "5% 25%")};
    /* height: auto; */
    /* max-height: 50%; */
  }
  @media (min-width: 620px) {
    margin: ${({ sm }) => (sm ? "14% 20%" : "5% 25%")};
    /* max-height: 50%; */
  }
  @media (max-width: 620px) {
    margin: auto !important;
    width: 100% !important;
    border-radius: 0px;
    height: 100%;
  }
`;

export const ModalContent = styled.div``;
