import { useState, useEffect, useRef } from "react";
import { Bg, ModalContainer } from "./ModalUtils";
import { useQuery, useMutation } from "@apollo/client";
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
import { useParams } from "react-router-dom";
import { Navbar, NavbarInner, LeftContainer, BodyContainer } from "./common";
import { EDIT_PROFILE } from "../../graphql/mutation";
import { FETCH_USER } from "../../graphql/queries";

export const SaveButton = styled.button`
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

const RightContainer = styled.div`
  display: flex;
  width: 70%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  padding: 20px 90px;
`;

export default function EditProfile({ toggle, userInfo }) {
  const { banner: ubanner, profilePic: uprofilePic } = userInfo;
  const { profileId } = useParams();
  const { loading, data } = useQuery(FETCH_USER, {
    variables: { userId: profileId },
  });

  useDisableBodyScroll(toggle);

  const hiddenFileBannerInput = useRef(null);
  const hiddenFileProfileInput = useRef(null);

  const [selectProfile, setSelectProfile] = useState("");
  const [selectBanner, setSelectBanner] = useState("");
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");

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

  useEffect(() => {
    const load = data.getUser;
    const setEditProfileInputData = (load) => {
      // console.log(load.name);
      load.name && setName(load.name);
      load.website && setWebsite(load.website);
      load.location && setLocation(load.location);
      load.bio && setBio(load.bio);
    };
    load && setEditProfileInputData(load);
  }, [data]);

  const handleClickBanner = (e) => {
    hiddenFileBannerInput.current.click();
  };
  const handleClickProfile = (e) => {
    hiddenFileProfileInput.current.click();
  };

  const [editProfilefn] = useMutation(EDIT_PROFILE, {
    variables: {
      userId: profileId,
      name,
      website,
      location,
      bio,
      profilePic: selectProfile,
      banner: selectBanner,
    },
    refetchQueries: [
      {
        query: FETCH_USER,
        variables: {
          userId: profileId,
        },
      },
    ],
    // update(cache, result) {
    //   const data = cache.readQuery({
    //     query: FETCH_USER,
    //     variables: {
    //       userId: profileId,
    //     },
    //   });
    //   console.log("data", data);
    //   console.log("result", result);
    //   // cache.writeQuery({
    //   //   query: FETCH_USER,
    //   //   data: {
    //   //     getUser: result.editProfile,
    //   //   },
    //   // });
    // },
  });

  if (loading) {
    return <h1>loading....</h1>;
  }
  if (data) {
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
                        src={
                          ubanner !== "" && ubanner
                            ? ubanner
                            : "https://res.cloudinary.com/drntday51/image/upload/v1627672203/djjmszfofddf407p8rwp.png"
                        }
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
                            // console.log(selectBanner);
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.readAsDataURL(file);
                              reader.onloadend = () => {
                                setSelectBanner(reader.result);
                              };
                            }
                          }}
                          style={{ display: "none" }}
                        />
                      </ImgConUpdate>
                    </TwitterBannerContainerPlus>
                    <AvatarContainer height>
                      <AvtarConatinerplus>
                        <Avatar
                          src={
                            uprofilePic !== "" && uprofilePic
                              ? uprofilePic
                              : "https://res.cloudinary.com/drntday51/image/upload/v1627672437/rchs2sorpbxtkilgisyn.png"
                          }
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
                              const file = e.target.files[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onloadend = () => {
                                  setSelectProfile(reader.result);
                                };
                                // console.log("select profile", selectProfile);
                              }
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
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <EditProfileInput
                    type="text"
                    placeholder="bio"
                    name="bio"
                    defaultValue={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                  <EditProfileTextArea
                    type="text"
                    placeholder="location"
                    name="location"
                    defaultValue={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <EditProfileInput
                    type="text"
                    placeholder="website"
                    name="website"
                    defaultValue={website}
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
