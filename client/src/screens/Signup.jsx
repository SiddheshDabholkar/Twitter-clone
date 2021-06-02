import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Bg = styled.div`
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
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: 200px 500px;
  border-radius: 30px;
  background-color: blue;
`;
const ModalContent = styled.div``;
const ModalHeader = styled.h1``;
const ModalTitle = styled.h1``;
const ModalBody = styled.p``;
const ModalFooter = styled.div``;

export default function Signin({ show, onClose }) {
  // const closeOnEscapeKeyDown = (e) => {
  //   if ((e.charCode || e.keyCode) === 27) {
  //     onClose();
  //   }
  // };
  // useEffect(() => {
  //   document.body.addEventListener("keydown", closeOnEscapeKeyDown);
  //   return function cleanup() {
  //     document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
  //   };
  // }, []);
  const history = useHistory();
  const closeModal = (e) => {
    e.stopPropagation();
    history.goBack();
  };
  if (!show) return null;

  return (
    <>
      <Bg>
        <ModalContainer onClick={onClose}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>iugjh</ModalTitle>
            </ModalHeader>
            <ModalBody>lmaoododjjd</ModalBody>
            <ModalFooter>
              <button onClick={onClose}>close</button>
            </ModalFooter>
          </ModalContent>
        </ModalContainer>
      </Bg>
    </>
  );
}
