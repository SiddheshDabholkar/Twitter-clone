import styled from "styled-components";
import { FaFeatherAlt } from "react-icons/fa";
import MakeTweetModal from "../Modals/MakeTweetModal";
import useModal from "../../hooks/useModal";

export const Button = styled.button`
  display: flex;
  position: absolute;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #1da1f2;
  border: 0px solid transparent;
  position: fixed;
  bottom: 10%;
  right: 10%;
  height: 65px;
  width: 65px;
  @media (min-width: 500px) {
    display: none;
  }
`;

export default function FloatingButton() {
  const { Modal, show, toggle, setShow } = useModal(MakeTweetModal);
  return (
    <>
      <Button onClick={toggle}>
        <FaFeatherAlt style={{ color: "#fff", fontSize: "22px" }} />
      </Button>
      {show && <Modal toggle={toggle} setShow={setShow} />}
    </>
  );
}
