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
    $username: String
    $password: String
    $email: String
    $phone: String
    $profilePic: String
    $banner: String
    $bio: String
    $location: String
    $website: String
    $name: String
    $userId: ID!
  ) {
    editProfile(
      name: $name
      username: $username
      password: $password
      email: $email
      phone: $phone
      profilePic: $profilePic
      banner: $banner
      bio: $bio
      location: $location
      website: $website
      name: $name
      userId: $userId
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

  useDisableBodyScroll(toggle);
  const hiddenFileBannerInput = useRef(null);
  const hiddenFileProfileInput = useRef(null);
  const [selectProfile, setSelectProfile] = useState("");
  const [selectBanner, setSelectBanner] = useState("");
  const profileurl = useUploadImage(selectProfile);
  const bannerurl = useUploadImage(selectBanner);

  console.log("profile", profileurl);
  console.log("banner", bannerurl);

  useEffect(() => {
    if (selectBanner) {
      setSelectBanner(selectBanner);
    }
  }, [selectBanner]);

  useEffect(() => {
    if (selectProfile) {
      setSelectProfile(selectProfile);
    }
  }, [selectProfile]);

  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");

  const handleClickBanner = (e) => {
    hiddenFileBannerInput.current.click();
  };
  const handleClickProfile = (e) => {
    hiddenFileProfileInput.current.click();
  };

  const [editProfilefn] = useMutation(EDIT_PROFILE, {
    variables: {
      userId: profileId,
      // name,
      // website,
      // location,
      // bio,
      // profilePic: profileurl,
      // banner: bannerurl,
    },
  });

  if (loading) {
    return <h1>loading....</h1>;
  }
  if (data) {
    const load = data.getUser;
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
                        editProfilefn();
                        toggle();
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
                        <ImageUploaderButton onClick={handleClickBanner}>
                          <AiOutlineCamera
                            style={{ fontSize: "30px", color: "#fff" }}
                          />
                        </ImageUploaderButton>
                        <input
                          type="file"
                          ref={hiddenFileBannerInput}
                          onChange={(e) => {
                            setSelectBanner(e.target.files[0]);
                            console.log(selectBanner);
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
                          <ImageUploaderButton onClick={handleClickProfile}>
                            <AiOutlineCamera
                              style={{ fontSize: "30px", color: "#fff" }}
                            />
                          </ImageUploaderButton>
                          <input
                            type="file"
                            ref={hiddenFileProfileInput}
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
                {/* <Loadform /> */}
                <FormContainer>
                  <EditProfileInput
                    type="text"
                    placeholder="name"
                    name="name"
                    defaultValue={load.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <EditProfileInput
                    type="text"
                    placeholder="bio"
                    name="bio"
                    defaultValue={load.bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                  <EditProfileTextArea
                    type="text"
                    placeholder="location"
                    name="location"
                    defaultValue={load.location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <EditProfileInput
                    type="text"
                    placeholder="website"
                    name="website"
                    defaultValue={load.website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </FormContainer>
              </BodyContainer>
            </BodyContainer>
          </ModalContainer>
        </Bg>
      </>
    );
  }
}
