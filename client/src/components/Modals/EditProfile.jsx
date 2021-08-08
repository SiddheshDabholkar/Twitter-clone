import { useState, useEffect, useRef } from "react";
import { Bg, ModalContainer } from "./ModalUtils";
import { useQuery, gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import {
  TwitterBannerCotainer,
  TwitterBanner,
  AvatarContainer,
} from "../../screens/AfterAuthPassing/Profile";
import { Avatar } from "../../components/Avatar";
import { useDisableBodyScroll } from "../../hooks/useDisableBodyScroll";
import { Parent } from "../../screens/AfterAuthPassing/Profile";
import { useForm } from "../../hooks/useForm";
import { EditProfileInput, EditProfileTextArea } from "../Input";
import { AiOutlineClose, AiOutlineCamera } from "react-icons/ai";
import { ImageUploaderButton } from "../Tweet/index";
import useUploadImage from "../../hooks/useUploadImage";
import { useParams } from "react-router-dom";

const SaveButton = styled.button`
  display: flex;
  border-color: transparent;
  background-color: #1da1f2;
  color: #fff;
  border-radius: 25px;
  padding: 5px 10px;
  cursor: pointer;
`;
const AvtarConatinerplus = styled.div`
  position: relative;
`;

const ImgCon = styled.div`
  position: absolute;
  top: 35%;
  right: 47%;
  cursor: pointer;
`;

const TwitterBannerContainerPlus = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const ImgConUpdate = styled.div`
  position: absolute;
  top: 50%;
  right: 48%;
  cursor: pointer;
`;

const Navbar = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 55px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  justify-content: center;
  align-items: center;
`;

const NavbarInner = styled.div`
  width: 93%;
  height: 99%;
  display: flex;
  flex-direction: row;
`;

const LeftContainer = styled.div`
  display: flex;
  width: 30%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const RightContainer = styled.div`
  display: flex;
  width: 70%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: ${({ scroll }) => (scroll ? "scroll" : "")};
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  padding: 20px 90px;
`;

const GET_USER_DATA = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      name
      website
      location
      bio
      profilePic
      banner
    }
  }
`;

const EDIT_PROFILE = gql`
  mutation editProfile(
    $name: String
    $profilePic: String
    $banner: String
    $bio: String
    $location: String
    $website: String
    $name: String
    $userId: ID!
  ) {
    editProfile(
      profilePic: $profilePic
      banner: $banner
      bio: $bio
      location: $location
      website: $website
      name: $name
    ) {
      name
      website
      location
      bio
      profilePic
      banner
    }
  }
`;

export default function EditProfile({ toggle }) {
  const { profileId } = useParams();
  const { loading, data } = useQuery(GET_USER_DATA, {
    variables: { userId: profileId },
  });
  const [editProfile] = useMutation(EDIT_PROFILE);

  useDisableBodyScroll(toggle);
  const hiddenFileInput = useRef(null);
  const [selectProfile, setSelectProfile] = useState("");
  const [selectBanner, setSelectBanner] = useState("");
  const profileurl = useUploadImage(selectProfile);
  const bannerurl = useUploadImage(selectBanner);

  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");

  const Loadform = () => {
    if (loading) {
      return <h1>loading....</h1>;
    } else {
      const load = data && data.getUser;
      setName(load.name);
      setWebsite(load.website);
      setLocation(load.location);
      setBio(load.bio);
      return (
        <FormContainer>
          <EditProfileInput
            placeholder="name"
            name="name"
            defaultValue={name}
            // onChange={(e) => setName(e.target.value)}
            onChange={(e) => console.log(e.target.value)}
          />
          <EditProfileInput
            placeholder="bio"
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <EditProfileTextArea
            placeholder="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <EditProfileInput
            placeholder="website"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </FormContainer>
      );
    }
  };

  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };

  return (
    <>
      <Bg onClick={toggle}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <BodyContainer>
            <Navbar>
              <NavbarInner>
                <LeftContainer>
                  <AiOutlineClose
                    onClick={toggle}
                    style={{ fontSize: "30px" }}
                  />
                  <h2>Edit Profile</h2>
                </LeftContainer>
                <RightContainer>
                  <SaveButton
                    onClick={() => {
                      editProfile({
                        variables: {
                          name,
                          website,
                          location,
                          bio,
                          profilePic: profileurl,
                          banner: bannerurl,
                        },
                      });
                    }}
                  >
                    save
                  </SaveButton>
                </RightContainer>
              </NavbarInner>
            </Navbar>
            <BodyContainer scroll>
              <Parent>
                <TwitterBannerCotainer>
                  <TwitterBannerContainerPlus>
                    <TwitterBanner
                      height
                      src="https://res.cloudinary.com/drntday51/image/upload/v1627672203/djjmszfofddf407p8rwp.png"
                    />
                    <ImgConUpdate>
                      <ImageUploaderButton onClick={handleClick}>
                        <AiOutlineCamera
                          style={{ fontSize: "30px", color: "#fff" }}
                        />
                      </ImageUploaderButton>
                      <input
                        type="file"
                        ref={hiddenFileInput}
                        onChange={(e) => {
                          setSelectBanner(e.target.files[0]);
                          console.log("selected banner", selectBanner);
                        }}
                        style={{ display: "none" }}
                      />
                    </ImgConUpdate>
                  </TwitterBannerContainerPlus>
                  <AvatarContainer height>
                    <AvtarConatinerplus>
                      <Avatar
                        src="https://res.cloudinary.com/drntday51/image/upload/v1627672437/rchs2sorpbxtkilgisyn.png"
                        style={{
                          height: "130px",
                          width: "130px",
                          display: "block",
                        }}
                      />
                      <ImgCon>
                        <ImageUploaderButton onClick={handleClick}>
                          <AiOutlineCamera
                            style={{ fontSize: "30px", color: "#fff" }}
                          />
                        </ImageUploaderButton>
                        <input
                          type="file"
                          ref={hiddenFileInput}
                          onChange={(e) => {
                            setSelectProfile(e.target.files[0]);
                            console.log("select profile", selectProfile);
                          }}
                          style={{ display: "none" }}
                        />
                      </ImgCon>
                    </AvtarConatinerplus>
                  </AvatarContainer>
                </TwitterBannerCotainer>
              </Parent>
              <Loadform />
            </BodyContainer>
          </BodyContainer>
        </ModalContainer>
      </Bg>
    </>
  );
}
