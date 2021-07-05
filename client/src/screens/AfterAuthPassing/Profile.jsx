import { useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../context/auth";
//
import { BsCalendar } from "react-icons/bs";
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

const Parent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  width: 100%;
`;
const TwitterBanner = styled.img`
  display: flex;
  flex-direction: column;
  background-color: grey;
  height: 275px;
  width: 100%;
`;
const TwitterBannerCotainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 99%;
`;
const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 50%;
  height: 175px;
  width: 175px;
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

  const DecideButton = () => {
    if (user.id === profileId) {
      return (
        <StyledButton
          txtColor="#1da1f2"
          bgColor="#fff"
          borderColor="#1da1f2"
          small
          style={{ width: "20%" }}
        >
          Set up profile
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

  return (
    <>
      <SNavbarContainer>
        <GoBack />
      </SNavbarContainer>
      <Parent>
        <TwitterBannerCotainer>
          <TwitterBanner src="https://images.pexels.com/photos/4835962/pexels-photo-4835962.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
        </TwitterBannerCotainer>
        <AvatarContainer>
          <Avatar style={{ height: "150px", width: "150px" }} />
        </AvatarContainer>
      </Parent>
      <ButtonContainer
        small="5px"
        style={{ justifyContent: "flex-end", width: "98%" }}
      >
        <DecideButton />
      </ButtonContainer>
      <BioContainer>
        <STweeterUsername>venom</STweeterUsername>
        <LocationnJoinContainer>
          <IconContainer>
            <BsCalendar />
          </IconContainer>
          <STweetContent>Goa,India</STweetContent>
          <IconContainer>
            <HiOutlineLocationMarker />
          </IconContainer>
          <STweetContent>69 july</STweetContent>
        </LocationnJoinContainer>
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
    </>
  );
}
