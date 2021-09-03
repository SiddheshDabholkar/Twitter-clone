import React, { useContext } from "react";
import styled from "styled-components";

import { AiOutlineClose } from "react-icons/ai";
import { MdPermMedia } from "react-icons/md";
import { AiOutlineFileGif } from "react-icons/ai";
import { GrEmoji } from "react-icons/gr";
import { RiBarChartHorizontalFill } from "react-icons/ri";
import { FiCalendar } from "react-icons/fi";

import { Bg } from "./ModalUtils";
import { BodyContainer, Navbar, NavbarInner, LeftContainer } from "./common";
import {
  IconContainer,
  Restcontainer,
  STweetContainer,
  TweetContent,
  Row,
  SLink,
  ImageContainer,
} from "../Tweet";
import { SAvatar, SAvatarContainer } from "../Avatar";
import { SaveButton } from "./EditProfile";
import { TweetInput } from "../Input";
import { AuthContext } from "../../context/auth";
import { TwetCon, Container } from "../Tweet/ReTweet";
import { TweeterUsername } from "../../Typography";
import { Link } from "react-router-dom";

const ReTweetModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  max-height: 60%;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
  border-radius: 10px;
`;

const Acon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100% !important;
  width: 15% !important;
`;

//footer
const TweetFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 100% !important;
  margin-bottom: 0px;
  margin-top: ${({ mt }) => mt};
  border-top: 1px solid #e0dfdf;
`;
const FootCont = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: ${({ mr }) => mr};
  justify-content: ${({ end }) => (end ? "flex-end" : "center")};
  width: ${({ small }) => (small ? "40%" : "60%")};
`;
export default function ReTweetModal(props) {
  const { toggle } = props;
  const {
    data: {
      id,
      body,
      username,
      createdAt,
      photo,
      user: {
        id: userid,
        // username: userUsername,
        // phone,
        // email,
        // createdAt: userCreatedAt,
        // updatedAt: userUpdatedAt,
        profilePic,
      },
    },
  } = props;
  const { user } = useContext(AuthContext);

  const TweetInsideReTweet = () => {
    return (
      <TwetCon full>
        <Container>
          <SAvatarContainer>
            <Link to={`/profile/${userid}`}>
              <SAvatar
                small
                src={
                  profilePic
                    ? profilePic
                    : "https://res.cloudinary.com/drntday51/image/upload/v1627108184/twitter/ptupstjuaejspvhj9mfj.jpg"
                }
              />
            </Link>
          </SAvatarContainer>
          <Restcontainer
            col
            style={{
              width: "90%",
            }}
          >
            <SLink to={`/tweet/${id}`} col>
              <Row>
                <TweeterUsername>{username}</TweeterUsername>
                <TweeterUsername small>
                  {" . "}
                  {createdAt}
                </TweeterUsername>
              </Row>
              <Row>
                <TweetContent>{body}</TweetContent>
              </Row>
              {photo && <ImageContainer src={photo} />}
            </SLink>
          </Restcontainer>
        </Container>
      </TwetCon>
    );
  };

  return (
    <>
      <Bg transparent>
        <ReTweetModalContainer
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <BodyContainer>
            <Navbar style={{ borderBottom: "1px solid #00011110" }} long>
              <NavbarInner>
                <LeftContainer>
                  <AiOutlineClose
                    style={{ fontSize: "30px" }}
                    onClick={toggle}
                  />
                </LeftContainer>
              </NavbarInner>
            </Navbar>
            <BodyContainer mt="10px">
              <STweetContainer noborder noHover no>
                <Acon>
                  <SAvatar
                    src={
                      user
                        ? user.profilePic
                        : "https://res.cloudinary.com/drntday51/image/upload/v1627108184/twitter/ptupstjuaejspvhj9mfj.jpg"
                    }
                  />
                </Acon>
                <Restcontainer
                  col
                  style={{
                    width: "85%",
                  }}
                >
                  <TweetInput
                    placeholder="Add a comment ?"
                    cols="40"
                    rows="2"
                  />
                  <TweetInsideReTweet />
                  <TweetFooter mt="15px">
                    <FootCont small>
                      <IconContainer>
                        <MdPermMedia id="blue" />
                      </IconContainer>
                      <IconContainer>
                        <AiOutlineFileGif id="blue" />
                      </IconContainer>
                      <IconContainer>
                        <GrEmoji id="blue" />
                      </IconContainer>
                      <IconContainer>
                        <RiBarChartHorizontalFill id="blue" />
                      </IconContainer>
                      <IconContainer>
                        <FiCalendar id="blue" />
                      </IconContainer>
                    </FootCont>
                    <FootCont end mr="10px">
                      <SaveButton>tweet</SaveButton>
                    </FootCont>
                  </TweetFooter>
                </Restcontainer>
              </STweetContainer>
            </BodyContainer>
          </BodyContainer>
        </ReTweetModalContainer>
      </Bg>
    </>
  );
}
