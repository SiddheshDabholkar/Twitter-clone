import styled from "styled-components";

const Bg = styled.div`
  display: flex;
  height: auto;
  width: auto;
  flex: 1;
  background-color: bisque;
`;

const PopupContainer = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: blue;
`;

export default function Popover({ show, onClose, children }) {
  if (!show) return null;
  return (
    <>
      <Bg onClick={onClose}>
        <PopupContainer>{children}</PopupContainer>
      </Bg>
    </>
  );
}
