import { useContext, useRef } from "react";
import styled from "styled-components";
import { AuthContext } from "../../context/auth";
import { useHistory } from "react-router-dom";
import { SAvatarContainer, SAvatar } from "../Avatar";
import useOnClickOutside from "../../hooks/useOnClickOutsideRef";

const LogOutModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 18%;
  height: 20%;
  background-color: #fff;
  position: fixed;
  z-index: 1;
  border-radius: 8px;
  bottom: 15%;
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05), 0 15px 40px #8a8a8a66;
`;

const StyledCard = styled.div`
  width: 100%;
  height: 50%;
  background-color: #fff;
  border-bottom: 1px solid #80808036;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: ${({ pointer }) => (pointer ? "pointer" : "")};
`;

const CardCon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

const SSAvatrcont = styled(SAvatarContainer)`
  width: 20%;
  align-items: center;
  justify-content: center;
`;

const SmallPContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 100%;
`;

const SmallP = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  font-size: 18px;
  line-height: 0;
  height: 50%;
  /* font-weight: bold; */
  font-weight: ${({ bold }) => (bold ? "bold" : "")};
  color: ${({ color }) => (color ? "grey" : "#000")};
`;

export default function LogOutDropdown({ setShow }) {
  const ref = useRef(null);
  const history = useHistory();
  const { user, logout } = useContext(AuthContext);
  useOnClickOutside(ref, () => setShow(false));

  const handleClick = () => {
    logout();
    history.push("/");
  };

  return (
    <>
      <LogOutModalContainer ref={ref}>
        <StyledCard>
          <CardCon>
            <SSAvatrcont>
              <SAvatar
                small
                src={
                  user.profilePic
                    ? user.profilePic
                    : "https://res.cloudinary.com/drntday51/image/upload/v1627672437/rchs2sorpbxtkilgisyn.png"
                }
              />
            </SSAvatrcont>
            <SmallPContainer>
              <SmallP bold>{user.username}</SmallP>
              <SmallP color>{user.email}</SmallP>
            </SmallPContainer>
          </CardCon>
        </StyledCard>
        <StyledCard onClick={handleClick} pointer>
          logout @{user.username}
        </StyledCard>
      </LogOutModalContainer>
    </>
  );
}
