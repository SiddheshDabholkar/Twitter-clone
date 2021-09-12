import { useContext, useState } from "react";
import styled from "styled-components";
import useWindowSize from "../../hooks/useWindow";
import { Link, useLocation } from "react-router-dom";
//
import { StyledSearchInput } from "../../components/Search";
import { CStyledButton } from "../../components/Buttons/CircleButton";
import { SAvatar, SAvatarContainer } from "../../components/Avatar";
import { ButtonContainer } from "../../components/Buttons/ButtonContainer";
import GoBackButton from "../../components/Buttons/GoBackButton";
import { AuthContext } from "../../context/auth";

export const NavbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: inherit;
  height: 70px;
  top: 0;
  background-color: #fff;
  position: fixed;
  border: 1px solid #80808042;
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
const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  padding: 2px;
  align-items: center;
`;
const ButtonAndTweetContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  height: 100%;
`;

export default function HomeNavbar() {
  const { pathname } = useLocation();
  const { width } = useWindowSize();
  const [query, setQuery] = useState("");
  const newPathname = pathname.substring(1);
  const { user } = useContext(AuthContext);

  const TweetHeaders = () => {
    if (newPathname.startsWith("tweet")) {
      return (
        <>
          <GoBackButton />
          <h2>Tweet</h2>
        </>
      );
    } else {
      return (
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
      );
    }
  };

  if (newPathname.startsWith("profile") || newPathname.startsWith("explore")) {
    return null;
  } else {
    return (
      <>
        <NavbarContainer>
          <TweetHeaders />
        </NavbarContainer>
      </>
    );
  }
}
