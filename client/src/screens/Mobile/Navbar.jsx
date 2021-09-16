import { useContext } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
//
import { SAvatar, SAvatarContainer } from "../../components/Avatar";
import GoBackButton from "../../components/Buttons/GoBackButton";
import { AuthContext } from "../../context/auth";

export const NavbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 50%;
  height: 50px;
  top: 0;
  background-color: #fff;
  position: fixed;
  border: 1px solid #80808042;
  @media (min-width: 1024px) {
    width: 50%;
  }
  @media (max-width: 1023px) {
    width: 60%;
  }
  @media (max-width: 1000px) {
    width: 85%;
  }
  @media (max-width: 500px) {
    width: 100%;
  }
`;
const Tohide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 10%;
  margin-left: 7%;
  @media (min-width: 500px) {
    display: none;
  }
`;
const HeaderName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;
const SSAvatar = styled(SAvatar)`
  height: 30px;
  width: 30px;
`;

export default function HomeNavbar({ children }) {
  const { pathname } = useLocation();
  const newPathname = pathname.substring(1);
  const { user } = useContext(AuthContext);

  if (newPathname.startsWith("profile")) {
    return null;
  } else {
    return (
      <>
        <NavbarContainer>
          {newPathname.startsWith("explore") ? (
            <>{children}</>
          ) : newPathname.startsWith("tweet") ? (
            <>
              <GoBackButton />
              <h2>Tweet</h2>
            </>
          ) : (
            <>
              <Tohide>
                <Link to={`/profile/${user.id}`}>
                  <SAvatarContainer>
                    <SSAvatar src={user.profilePic} />
                  </SAvatarContainer>
                </Link>
              </Tohide>
              <HeaderName>
                <h2>{newPathname}</h2>
              </HeaderName>
            </>
          )}
        </NavbarContainer>
      </>
    );
  }
}
