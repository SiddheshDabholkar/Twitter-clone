import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";
import { useHistory } from "react-router-dom";

const ButtonContainerSS = styled.div`
  display: flex;
  flex-direction: column;
  width: 15%;
  height: 100%;
`;
const Button = styled.button`
  background-color: #fff;
  border-color: transparent;
  height: 100%;
  width: 100%;
`;

export default function GoBackButton() {
  const history = useHistory();
  return (
    <>
      <ButtonContainerSS>
        <Button onClick={() => history.goBack()}>
          <BiArrowBack style={{ fontSize: "25px", color: "#1da1f2" }} />
        </Button>
      </ButtonContainerSS>
    </>
  );
}
