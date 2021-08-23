import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../context/auth";
//
import { HiOutlineLocationMarker } from "react-icons/hi";
//
import { IconContainer, TweetContent } from "../../components/Tweet/index";
import { Avatar } from "../../components/Avatar";
import { ButtonContainer } from "../../components/Buttons/ButtonContainer";
import { StyledButton } from "../../components/Buttons/AuthButton";
import { NavbarContainer } from "../Mobile/Navbar";
import { TweeterUsername } from "../../Typography";
import ProfileTab from "../../screens/AfterAuthPassing/Profile/ProfileTabs";
import GoBack from "../../components/Buttons/GoBackButton";
import EditProfile from "../../components/Modals/EditProfile";
import useModal from "../../hooks/useModal";
import { useQuery, gql } from "@apollo/client";

export const Parent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  width: 100%;
`;
export const TwitterBanner = styled.img`
  display: flex;
  flex-direction: column;
  background-color: grey;
  /* height: 275px; */
  height: ${({ height }) => (height ? "200px" : "275px")};
  width: 100%;
`;
export const TwitterBannerCotainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 99%;
`;
export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 50%;
  height: ${({ height }) => (height ? "150px" : "175px")};
  width: ${({ height }) => (height ? "150px" : "175px")};
  position: absolute;
  z-index: 3;
  top: 65%;
  left: 5%;
`;

const BioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
`;
const STweeterUsername = styled(TweeterUsername)`
  width: 90%;
`;
const LocationnJoinContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 90%;
  margin-top: 10px;
`;
const STweetContent = styled(TweetContent)`
  color: grey;
  margin-right: 10px;
`;
const SNavbarContainer = styled(NavbarContainer)`
  height: 55px;
`;

const FETCH_USER = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      username
      phone
      email
      profilePic
      banner
      bio
      location
      website
      name
    }
  }
`;

export default function Profile() {
  let { profileId } = useParams();
  const { user } = useContext(AuthContext);
  const [Modal, show, toggle] = useModal(EditProfile);
  const { loading, data, error } = useQuery(FETCH_USER, {
    variables: { userId: profileId },
  });

  const DecideButton = () => {
    if (user.id === profileId) {
      return (
        <StyledButton
          txtColor="#1da1f2"
          bgColor="#fff"
          borderColor="#1da1f2"
          small
          style={{ width: "20%" }}
          onClick={toggle}
        >
          Edit profile
        </StyledButton>
      );
    } else {
      return (
        <StyledButton
          txtColor="#1da1f2"
          bgColor="#fff"
          borderColor="#1da1f2"
          small
          style={{ width: "20%" }}
        >
          follow
        </StyledButton>
      );
    }
  };

  if (loading) {
    return <h1>loading....</h1>;
  } else {
    const userInfo = data.getUser;
    const {
      username,
      phone,
      email,
      profilePic,
      banner,
      bio,
      location,
      website,
      name,
    } = userInfo;
    return (
      <>
        <SNavbarContainer>
          <GoBack />
        </SNavbarContainer>
        <Parent>
          <TwitterBannerCotainer>
            <TwitterBanner
              src={
                data
                  ? profilePic
                  : "https://res.cloudinary.com/drntday51/image/upload/v1627108184/twitter/ptupstjuaejspvhj9mfj.jpg"
              }
            />
          </TwitterBannerCotainer>
          <AvatarContainer>
            <Avatar
              style={{ height: "150px", width: "150px" }}
              src={
                data
                  ? banner
                  : "https://res.cloudinary.com/drntday51/image/upload/v1627108184/twitter/ptupstjuaejspvhj9mfj.jpg"
              }
            />
          </AvatarContainer>
        </Parent>
        <ButtonContainer
          small="5px"
          style={{ justifyContent: "flex-end", width: "98%" }}
        >
          <DecideButton />
        </ButtonContainer>
        <BioContainer>
          {bio && <STweeterUsername>{bio}</STweeterUsername>}
          {name && <STweeterUsername>{name}</STweeterUsername>}
          {location && (
            <LocationnJoinContainer>
              <IconContainer>
                <HiOutlineLocationMarker />
              </IconContainer>
              <STweetContent>{location}</STweetContent>
            </LocationnJoinContainer>
          )}
          <LocationnJoinContainer>
            <STweetContent>
              <b style={{ color: "black" }}>69</b> following
            </STweetContent>
            <STweetContent>
              <b style={{ color: "black" }}>69</b> follower
            </STweetContent>
          </LocationnJoinContainer>
        </BioContainer>
        <ProfileTab />
        {show && <Modal toggle={toggle} />}
      </>
    );
  }
}
