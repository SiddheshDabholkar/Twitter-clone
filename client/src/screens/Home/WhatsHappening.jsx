import React from "react";
import styled from "styled-components";
import Search from "../../components/Search";
import { AvatarContainer } from "../../container/AvatarContainer";
import { Avatar } from "../../components/Avatar";
import { ButtonContainer } from "../../container/ButtonContainer";
import { StyledButton } from "../../components/AuthButton";

const WhatsHappeningContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30%;
  top: 0;
  right: 0;
  position: fixed;
  height: 100%;
  border: 1px solid #80808038;
  border-bottom: 0px;

  @media (max-width: 1280px) {
    width: 40%;
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
  :hover {
    background-color: #80808017;
  }
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
`;
const StyledTitle = styled.h1`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
  font-size: 30px;
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
  font-size: 20px;
  color: grey;
  width: 100%;
  padding: 4px !important;
  margin: 0px !important;
`;
const SmallParagrah = styled.p`
  font-size: 22px;
  color: black;
  font-weight: bolder;
  width: 100%;
  padding: 0px 2px 0px 2px !important;
  margin: 0px !important;
`;
const RestContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  width: 100%;

  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  ::-webkit-scrollbar {
    /* WebKit */
    width: 0;
    height: 0;
  }
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

  font-size: 18px;
  :hover {
    background-color: #80808017;
  }
`;

export default function WhatsHappening() {
  return (
    <>
      <WhatsHappeningContainer>
        <SearchContainer>
          <Search />
        </SearchContainer>
        <RestContainer>
          {/* Whats happening */}
          <SubContainer>
            <StyledTitleContainer>
              <StyledTitle>Whats Happening</StyledTitle>
            </StyledTitleContainer>
            <ContentContainer>
              <SmallTitle>Business & finance</SmallTitle>
              <SmallParagrah>Why am i building this app</SmallParagrah>
              <SmallTitle>Trending in blackhole</SmallTitle>
            </ContentContainer>
            <ContentContainer>
              <SmallTitle>Business & finance</SmallTitle>
              <SmallParagrah>Why am i building this app</SmallParagrah>
              <SmallTitle>Trending in blackhole</SmallTitle>
            </ContentContainer>
            <ContentContainer>
              <SmallTitle>Business & finance</SmallTitle>
              <SmallParagrah>Why am i building this app</SmallParagrah>
              <SmallTitle>Trending in blackhole</SmallTitle>
            </ContentContainer>
            <ShowMoreContainer>
              <ShowMoreButton>Show More</ShowMoreButton>
            </ShowMoreContainer>
          </SubContainer>
          {/* Who to follow section */}
          <SubContainer>
            <StyledTitleContainer>
              <StyledTitle>Who to Follow</StyledTitle>
            </StyledTitleContainer>
            <WhotofollowUser>
              <AvatarContainer style={{ width: "20%" }}>
                <Avatar />
              </AvatarContainer>
              <SmallParagrah>venom</SmallParagrah>
              <ButtonContainer>
                <StyledButton
                  borderColor="#1da1f2"
                  bgColor="transparent"
                  txtColor="#1da1f2"
                  small
                  style={{ margin: "0px" }}
                >
                  Follow
                </StyledButton>
              </ButtonContainer>
            </WhotofollowUser>
            <WhotofollowUser>
              <AvatarContainer style={{ width: "20%" }}>
                <Avatar />
              </AvatarContainer>
              <SmallParagrah>venom</SmallParagrah>
              <ButtonContainer>
                <StyledButton
                  borderColor="#1da1f2"
                  bgColor="transparent"
                  txtColor="#1da1f2"
                  small
                  style={{ margin: "0px" }}
                >
                  Follow
                </StyledButton>
              </ButtonContainer>
            </WhotofollowUser>
            <WhotofollowUser>
              <AvatarContainer style={{ width: "20%" }}>
                <Avatar />
              </AvatarContainer>
              <SmallParagrah>venom</SmallParagrah>
              <ButtonContainer>
                <StyledButton
                  borderColor="#1da1f2"
                  bgColor="transparent"
                  txtColor="#1da1f2"
                  small
                  style={{ margin: "0px" }}
                >
                  Follow
                </StyledButton>
              </ButtonContainer>
            </WhotofollowUser>
            <ShowMoreContainer>
              <ShowMoreButton>Show More</ShowMoreButton>
            </ShowMoreContainer>
          </SubContainer>
          {/* Topics to follow */}
          <SubContainer>
            <StyledTitleContainer>
              <StyledTitle>Topics to follow</StyledTitle>
            </StyledTitleContainer>
            <ContentContainer>
              <SmallTitle>Business & finance</SmallTitle>
              <SmallParagrah>Why am i building this app</SmallParagrah>
              <SmallTitle>Trending in blackhole</SmallTitle>
            </ContentContainer>
            <ContentContainer>
              <SmallTitle>Business & finance</SmallTitle>
              <SmallParagrah>Why am i building this app</SmallParagrah>
              <SmallTitle>Trending in blackhole</SmallTitle>
            </ContentContainer>
            <ContentContainer>
              <SmallTitle>Business & finance</SmallTitle>
              <SmallParagrah>Why am i building this app</SmallParagrah>
              <SmallTitle>Trending in blackhole</SmallTitle>
            </ContentContainer>
            <ShowMoreContainer>
              <ShowMoreButton>Show More</ShowMoreButton>
            </ShowMoreContainer>
          </SubContainer>
        </RestContainer>
      </WhatsHappeningContainer>
    </>
  );
}
