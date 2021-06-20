import { useState } from "react";
import styled from "styled-components";
import { AvatarContainer } from "../../container/AvatarContainer";
import { Avatar } from "../../components/Avatar";
import { ButtonContainer } from "../../container/ButtonContainer";
import { StyledButton } from "../../components/AuthButton";
import { RestContainer } from "../../container/RestContainer";
import SearchModal from "../../components/Modals/SearchModal";
import { StyledSearchInput } from "../../components/Search";
import Search from "../../components/Search";
import { useLocation } from "react-router-dom";

const WhatsHappeningContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30%;
  /*
  Note:- if u change height to auto or 100% 
  both the home section and whats happening section
  will scroll,which is unwanted thats y provided 100
  vertical height
  */
  height: 100vh;
  border: 1px solid #80808038;
  border-bottom: 0px;
  padding: 0px;
  margin: 0px;
  @media (min-width: 1024px) {
    width: 30%;
  }
  @media (max-width: 1023px) {
    width: 25%;
  }
  @media (max-width: 1000px) {
    width: 0%;
    display: none;
  }
`;
const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: inherit;
  height: 60px;
  background-color: #fff;
  top: 0;
  position: fixed;
`;
const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 85%;
  margin: 20px;
  background-color: #f0f8ff78;
  border-radius: 20px;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 95%;
  height: 100px;
  padding: 0px 10px 0px 20px !important;
  flex-wrap: nowrap;
  border-bottom: 1px solid #80808038;
  :hover {
    background-color: #80808017;
  }
`;
const StyledTitle = styled.h1`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
  font-size: 24px;
  padding: 0px !important;
  margin: 0px !important;
`;
const StyledTitleContainer = styled.h1`
  display: flex;
  flex-direction: row;
  width: 95%;
  padding: 0px 0px 2px 12px;
  border-bottom: 1px solid #80808038;
`;
const SmallTitle = styled.p`
  font-size: 14px;
  color: grey;
  width: 100%;
  padding: 4px !important;
  margin: 0px !important;
`;
export const SmallParagrah = styled.p`
  font-size: 16px;
  color: black;
  font-weight: bolder;
  width: 100%;
  padding: 0px 2px 0px 2px !important;
  margin: 0px !important;
`;
const WhotofollowUser = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #80808038;
`;
const ShowMoreContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2px;
  justify-content: flex-start;
  align-items: center;
  height: 50px;
  width: 100%;
  :hover {
    background-color: #80808017;
  }
`;
const ShowMoreButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: auto;
  color: #1da1f2;
  border-color: transparent;
  background-color: #f0f8ff78;

  font-size: 14px;
  :hover {
    background-color: #80808017;
  }
`;
const TopictoFollow = () => {
  return (
    <>
      <ContentContainer>
        <SmallTitle>Business & finance</SmallTitle>
        <SmallParagrah>Why am i building this app</SmallParagrah>
        <SmallTitle>Trending in blackhole</SmallTitle>
      </ContentContainer>
    </>
  );
};
const Title = ({ title }) => {
  return (
    <StyledTitleContainer>
      <StyledTitle>{title}</StyledTitle>
    </StyledTitleContainer>
  );
};
const ShowMore = () => {
  return (
    <ShowMoreContainer>
      <ShowMoreButton>Show More</ShowMoreButton>
    </ShowMoreContainer>
  );
};
const WhatsHappenings = () => {
  return (
    <ContentContainer>
      <SmallTitle>Business & finance</SmallTitle>
      <SmallParagrah>Why am i building this app</SmallParagrah>
      <SmallTitle>Trending in blackhole</SmallTitle>
    </ContentContainer>
  );
};

const SStyledButton = styled(StyledButton)`
  width: 80%;
  height: 35px;
  padding: 0;
  margin: 0;
  background-color: transparent;
`;
export default function WhatsHappening() {
  const [showSearchModal, setshowSearchModal] = useState(false);
  const { pathname } = useLocation();
  const newPathname = pathname.substring(1);

  const SearchShower = () => {
    if (newPathname.startsWith("explore")) {
      return null;
    } else {
      return (
        <>
          <SearchContainer>
            {/* <Search /> */}
            <StyledSearchInput
              placeholder="Search twitter"
              onChange={(e) => {
                console.log(e.target.value);
                // setshowSearchModal(!showSearchModal);
              }}
              onCLick={() => setshowSearchModal(!showSearchModal)}
            ></StyledSearchInput>
          </SearchContainer>
        </>
      );
    }
  };

  return (
    <>
      <WhatsHappeningContainer>
        <SearchShower />
        <RestContainer>
          <SearchModal showSearchModal={showSearchModal} />
          {/* Whats happening */}
          <SubContainer>
            <Title title="Whats Happening" />
            <WhatsHappenings />
            <WhatsHappenings />
            <WhatsHappenings />
            <ShowMore />
          </SubContainer>
          {/* Who to follow section */}
          <SubContainer>
            <Title title="Who to Follow" />
            <WhotofollowUser>
              <AvatarContainer style={{ width: "20%" }}>
                <Avatar />
              </AvatarContainer>
              <SmallParagrah>venom</SmallParagrah>
              <ButtonContainer>
                <SStyledButton borderColor="#1da1f2" txtColor="#1da1f2" small>
                  Follow
                </SStyledButton>
              </ButtonContainer>
            </WhotofollowUser>

            <ShowMoreContainer>
              <ShowMoreButton>Show More</ShowMoreButton>
            </ShowMoreContainer>
          </SubContainer>
          {/* Topics to follow */}
          <SubContainer>
            <Title title="Topics to follow" />
            <TopictoFollow />
            <TopictoFollow />
            <TopictoFollow />
            <ShowMore />
          </SubContainer>
        </RestContainer>
      </WhatsHappeningContainer>
    </>
  );
}
