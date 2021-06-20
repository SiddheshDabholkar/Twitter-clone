import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { SAvatar, SAvatarContainer } from "../../components/Tweet";
import { StyledSearchInput } from "../../components/Search";
import { ButtonContainer } from "../../components/MakeTweet";
import { StyledButton } from "../../components/AuthButton";
import useWindowSize from "../../hooks/useWindow";
import { BiArrowBack } from "react-icons/bi";
import { useHistory } from "react-router-dom";

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

const ButtonContainerSS = styled.div`
  display: flex;
  flex-direction: column;
  width: 15%;
  background-color: #000777;
  height: 100%;
`;

const Button = styled.button`
  background-color: #fff;
  border-color: transparent;
  height: 100%;
  width: 100%;
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
  const history = useHistory();

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

  const ComposingTweet = () => {
    if (newPathname.startsWith("composetweet")) {
      return (
        <>
          <ButtonAndTweetContainer>
            <ButtonContainerSS>
              <Button onClick={() => history.goBack()}>
                <BiArrowBack style={{ fontSize: "25px" }} />
              </Button>
            </ButtonContainerSS>
            <ShowButtonsIfwidthIsLessThanFiveHundered />
          </ButtonAndTweetContainer>
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
          <Headerdecider />
        </>
      );
    }
  };

  return (
    <>
      <NavbarContainer>
        <ComposingTweet />
      </NavbarContainer>
    </>
  );
}
