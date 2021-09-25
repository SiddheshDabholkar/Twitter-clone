import { useContext, useEffect, useState } from "react";
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
import { useQuery, useMutation } from "@apollo/client";
import { FOLLOW_UNFOLLOW } from "../../graphql/mutation";
import { FETCH_USER } from "../../graphql/queries";

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

export default function Profile() {
  let { profileId } = useParams();
  const { user } = useContext(AuthContext);
  const { Modal, show, toggle } = useModal(EditProfile);

  const [FOLLOWING, SETFOLLOWING] = useState(false);

  const { loading, data } = useQuery(FETCH_USER, {
    variables: { userId: profileId },
  });

  const [followUnfollow] = useMutation(FOLLOW_UNFOLLOW);

  useEffect(() => {
    const checkIFUserISFollowing = (followers) => {
      return followers.some((f) => f.id === user.id);
    };
    if (data) {
      const userInfo = data.getUser;
      const { followers } = userInfo;
      // console.log(checkIFUserISFollowing(followers));
      if (checkIFUserISFollowing(followers)) {
        SETFOLLOWING(true);
      } else {
        SETFOLLOWING(false);
      }
    }
  }, [user.id, data]);

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
          onClick={() =>
            followUnfollow({ variables: { otherUserId: profileId } })
          }
        >
          {FOLLOWING ? "following" : "follow"}
        </StyledButton>
      );
    }
  };

  if (loading) {
    return <h1>loading....</h1>;
  } else {
    const userInfo = data.getUser;
    const {
      // id,
      // username,
      // phone,
      // email,
      profilePic,
      banner,
      bio,
      location,
      // website,
      name,
      following,
      followers,
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
                data && data.banner !== ""
                  ? banner
                  : "https://res.cloudinary.com/drntday51/image/upload/v1627108184/twitter/ptupstjuaejspvhj9mfj.jpg"
              }
            />
          </TwitterBannerCotainer>
          <AvatarContainer>
            <Avatar
              style={{ height: "150px", width: "150px" }}
              src={
                data && data.profilePic !== ""
                  ? profilePic
                  : "https://res.cloudinary.com/drntday51/image/upload/v1627672437/rchs2sorpbxtkilgisyn.png"
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
              <b style={{ color: "black" }}>{following.length}</b> following
            </STweetContent>
            <STweetContent>
              <b style={{ color: "black" }}>{followers.length}</b> follower
            </STweetContent>
          </LocationnJoinContainer>
        </BioContainer>
        <ProfileTab />
        {show && <Modal toggle={toggle} userInfo={userInfo} />}
      </>
    );
  }
}
