import { useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { SAvatar, SAvatarContainer } from "../../components/Tweet";
import { StyledSearchInput } from "../../components/Search";

const NavbarContainer = styled.div`
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

export default function HomeNavbar() {
  const { pathname } = useLocation();
  const newPathname = pathname.substring(1);
  useEffect(() => {}, []);
  const Headerdecider = () => {
    if (newPathname.startsWith("explore")) {
      return (
        <>
          <SearchContainer>
            <StyledSearchInput placeholder="   search" />
          </SearchContainer>
        </>
      );
    } else {
      return (
        <HeaderName>
          <h2>{newPathname}</h2>
        </HeaderName>
      );
    }
  };
  return (
    <>
      <NavbarContainer>
        <Tohide>
          <SAvatarContainer>
            <SSAvatar />
          </SAvatarContainer>
        </Tohide>
        <Headerdecider />
      </NavbarContainer>
    </>
  );
}
