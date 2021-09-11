import React, { useContext, useRef, useState } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { MdPermMedia } from "react-icons/md";
import { AiOutlineFileGif } from "react-icons/ai";
import { GrEmoji } from "react-icons/gr";
import { RiBarChartHorizontalFill } from "react-icons/ri";
import { FiCalendar } from "react-icons/fi";

import { Bg, ModalContainer } from "./ModalUtils";
import {
  BodyContainer,
  Navbar,
  NavbarInner,
  LeftContainer,
  FootCont,
  Acon,
  TweetFooter,
} from "./common";
import {
  IconContainer,
  Restcontainer,
  STweetContainer,
  TweetContent,
  Row,
  SLink,
  ImageContainer,
  ImageUploaderButton,
} from "../Tweet";
import { SAvatar, SAvatarContainer } from "../Avatar";
import { SaveButton } from "./EditProfile";
import { TweetInput } from "../Input";
import { AuthContext } from "../../context/auth";
import { TwetCon, Container } from "../Tweet/ReTweet";
import { TweeterUsername } from "../../Typography";
import { Link } from "react-router-dom";
import useOnClickOutsideRef from "../../hooks/useOnClickOutsideRef";
import useUploadImage from "../../hooks/useUploadImage";
import { MAKE_TWEET } from "../../graphql/mutation";
import { FETCH_TWEET } from "../../graphql/queries";
import { useMutation } from "@apollo/client";

export default function ReTweeQuoteModal(props) {
  const { toggle, toggleModal, setShowModal } = props;
  console.log("props", props);
  const { user } = useContext(AuthContext);
  const ref = useRef(null);
  useOnClickOutsideRef(ref, () => setShowModal(false));
  const [tweetBodyTM, setTweetBodyTM] = useState("");
  const [selectPhotoTM, setSelectPhotoTM] = useState("");
  const url = useUploadImage(selectPhotoTM);
  const {
    data: {
      id,
      body,
      username,
      createdAt,
      photo,
      // user: {
      // id: userid,
      // username: userUsername,
      // phone,
      // email,
      // createdAt: userCreatedAt,
      // updatedAt: userUpdatedAt,
      // profilePic,
      // },
    },
  } = props;

  const hiddenFileInputMT = useRef(null);
  const handleClick = (e) => {
    hiddenFileInputMT.current.click();
  };

  const TweetInsideReTweet = () => {
    return (
      <TwetCon full>
        <Container>
          <SAvatarContainer>
            {/* <Link to={`/profile/${userid}`}> */}
            <SAvatar
              small
              // src={
              //   profilePic
              //     ? profilePic
              //     : "https://res.cloudinary.com/drntday51/image/upload/v1627672437/rchs2sorpbxtkilgisyn.png"
              // }
            />
            {/* </Link> */}
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

  const [makeTweet] = useMutation(MAKE_TWEET, {
    variables: { body: tweetBodyTM, photo: url },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_TWEET,
      });
      proxy.writeQuery({
        query: FETCH_TWEET,
        data: {
          getTweets: [result.data.createTweet, ...data.getTweets],
        },
      });
      setTweetBodyTM("");
    },
  });

  return (
    <>
      <Bg transparent>
        <ModalContainer
          ref={ref}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <BodyContainer
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Navbar style={{ borderBottom: "1px solid #00011110" }} long>
              <NavbarInner>
                <LeftContainer>
                  <AiOutlineClose
                    style={{ fontSize: "30px" }}
                    onClick={toggleModal}
                  />
                </LeftContainer>
              </NavbarInner>
            </Navbar>
            <BodyContainer mt="10px" scroll>
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
                    value={tweetBodyTM}
                    onChange={(e) => setTweetBodyTM(e.target.value)}
                  />
                  <TweetInsideReTweet />
                  <TweetFooter mt="15px">
                    <FootCont small>
                      <IconContainer>
                        <ImageUploaderButton onClick={handleClick}>
                          <MdPermMedia
                            id="blue"
                            style={{ color: "#1da1f2", fontSize: "20px" }}
                          />
                        </ImageUploaderButton>
                        <input
                          type="file"
                          ref={hiddenFileInputMT}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectPhotoTM(e.target.files[0]);
                          }}
                          style={{ display: "none" }}
                        />
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
                      <SaveButton
                        onClick={(e) => {
                          makeTweet();
                          toggle();
                        }}
                      >
                        tweet
                      </SaveButton>
                    </FootCont>
                  </TweetFooter>
                </Restcontainer>
              </STweetContainer>
            </BodyContainer>
          </BodyContainer>
        </ModalContainer>
      </Bg>
    </>
  );
}
