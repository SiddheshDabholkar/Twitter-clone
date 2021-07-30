import { useState, useEffect } from "react";
import { Bg, ModalContainer } from "./ModalUtils";
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
  top: 33%;
  right: 38%;
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

export default function EditProfile({ toggle }) {
  useDisableBodyScroll(toggle);
  // const initialState = {
  //   input: "",
  //   email: "",
  // };
  // const { onChange, onSubmit, values } = useForm(
  //   LoginUserCallback,
  //   initialState
  // );

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
                  <SaveButton>save</SaveButton>
                </RightContainer>
              </NavbarInner>
            </Navbar>
            <BodyContainer scroll>
              <Parent>
                <TwitterBannerCotainer>
                  <TwitterBanner
                    height
                    src="https://images.pexels.com/photos/4835962/pexels-photo-4835962.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  />
                  <AvatarContainer height>
                    <AvtarConatinerplus>
                      <Avatar
                        src="https://lh3.googleusercontent.com/proxy/zDIgShsvCOoVeSQwKyWzc64VLbQ6yVE03RupRuO9c2KyMOjSEWtQEMYyko3qN1RUHqA9q_36ATcHn8aPyxWwfZ0VwlJQTMo-ghN4mdE7hbdOccXCRqI"
                        style={{
                          height: "130px",
                          width: "130px",
                          display: "block",
                        }}
                      />
                      <ImgCon style={{ fontSize: "30px" }}>
                        <AiOutlineCamera />
                      </ImgCon>
                    </AvtarConatinerplus>
                  </AvatarContainer>
                </TwitterBannerCotainer>
              </Parent>
              <FormContainer>
                <EditProfileInput placeholder="name" name="name" />
                <EditProfileInput placeholder="bio" name="bio" />
                <EditProfileTextArea placeholder="location" name="location" />
                <EditProfileInput placeholder="website" name="website" />
              </FormContainer>
            </BodyContainer>
          </BodyContainer>
        </ModalContainer>
      </Bg>
    </>
  );
}
