import React from "react";
import styled from "styled-components";
import { TweeterUsername, SmallParagraph } from "../../Typography";
import { SAvatarContainer, SAvatar } from "../Avatar";

const SearchModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 26%;
  overflow-y: scroll;
  max-height: 50%;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  z-index: 1;
  margin: 2%;
  border-radius: 15px;
  margin-top: 0px;
  box-shadow: 0 5px 10px #7a6f6f66, 0 15px 40px #8a8a8a66;
`;

const UserCard = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const InfoContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

export default function SearchModal({ showSearchModal, data }) {
  const UserExists = () => {
    if (data && data.getSearchedUser.length > 0) {
      const userdata = data.getSearchedUser;
      return (
        <>
          {userdata.map((d) => {
            return (
              <>
                <UserCard>
                  <SAvatarContainer large>
                    <SAvatar />
                  </SAvatarContainer>
                  <InfoContainer>
                    <TweeterUsername>{d.username}</TweeterUsername>
                    <TweeterUsername small topzero>
                      {d.bio}
                    </TweeterUsername>
                  </InfoContainer>
                </UserCard>
              </>
            );
          })}
        </>
      );
    } else {
      return (
        <UserCard>
          <SmallParagraph small>Try searching for people</SmallParagraph>
        </UserCard>
      );
    }
  };

  if (showSearchModal) {
    return (
      <>
        <SearchModalContainer>
          <UserExists />
        </SearchModalContainer>
      </>
    );
  } else return null;
}
