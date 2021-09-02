import styled from "styled-components";

export const Dropdown = styled.div`
  position: absolute;
  /* position: fixed; */
  top: -20%;
  left: 0;
  width: 150px;
  border-radius: 10px;
  z-index: 100;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
`;

export const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  height: 100%;
  width: 100% !important;
  padding: 1px !important;
  margin: 0 !important;
`;

export const Li = styled.li`
  padding: 8px 12px;
  margin: 0 !important;
  justify-content: center;
  :hover {
    background-color: rgba(0, 0, 0, 0.14);
    cursor: pointer;
  }
`;
