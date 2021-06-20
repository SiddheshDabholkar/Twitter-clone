import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { SAvatar, SAvatarContainer } from "../../components/Tweet";
import { StyledSearchInput } from "../../components/Search";
import { ButtonContainer } from "../../components/MakeTweet";
import { StyledButton } from "../../components/AuthButton";
import useWindowSize from "../../hooks/useWindow";
import GoBackButton from "../../components/GoBackButton";

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
  const newPathname = pathname.substring(1);
  console.log(newPathname);

  const ButtonDecider = () => {
    if (newPathname.startsWith("composetweet")) {
      return (
        <>
          <ButtonContainer>
            <StyledButton
              small
              txtColor="#fff"
              bgColor="#1da1f2"
              borderColor="transparent"
            >
              tweet
            </StyledButton>
          </ButtonContainer>
        </>
      );
    } else return null;
  };
  const ShowButtonsIfwidthIsLessThanFiveHundered = () => {
    if (width < 500) {
      return <ButtonDecider />;
    } else return null;
  };
  const TweetHeaders = () => {
    if (newPathname.startsWith("composetweet")) {
      return (
        <>
          <ButtonAndTweetContainer>
            <GoBackButton />
            <ShowButtonsIfwidthIsLessThanFiveHundered />
          </ButtonAndTweetContainer>
        </>
      );
    } else if (newPathname.startsWith("explore")) {
      return (
        <>
          <SearchContainer>
            <StyledSearchInput placeholder="search" />
          </SearchContainer>
        </>
      );
    } else if (newPathname.startsWith("tweet")) {
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
            <SAvatarContainer>
              <SSAvatar />
            </SAvatarContainer>
          </Tohide>
          <HeaderName>
            <h2>{newPathname}</h2>
          </HeaderName>
        </>
      );
    }
  };
  {
    /*
    NOTE:
    Twitter profile page shows name and number of 
    tweets.If i try to show that over here.I ll need to use 
    context.So to prevent it a separate navbar will be shown
    in profile section
  */
  }
  if (newPathname.startsWith("profile")) {
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
