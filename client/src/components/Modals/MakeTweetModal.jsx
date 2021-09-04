import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";

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
  ImageUploaderButton,
  Restcontainer,
  STweetContainer,
} from "../Tweet";
import { SAvatar } from "../Avatar";
import { SaveButton } from "./EditProfile";
import { TweetInput } from "../Input";
import { AuthContext } from "../../context/auth";
import useOnClickOutsideRef from "../../hooks/useOnClickOutsideRef";
import { MAKE_TWEET } from "../../graphql/mutation";
import useUploadImage from "../../hooks/useUploadImage";
import { FETCH_TWEET } from "../../graphql/queries";

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

export default function MakeTweetModal({ toggle, setShow }) {
  const ref = useRef(null);
  const [tweetBodyTM, setTweetBodyTM] = useState("");
  const [selectPhotoTM, setSelectPhotoTM] = useState("");
  const { user } = useContext(AuthContext);

  useOnClickOutsideRef(ref, () => setShow(false));
  const url = useUploadImage(selectPhotoTM);

  const hiddenFileInputMT = useRef(null);
  const handleClick = (e) => {
    hiddenFileInputMT.current.click();
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
        <ReTweetModalContainer
          ref={ref}
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
                    style={{ fontSize: "30px", cursor: "pointer" }}
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
                    placeholder="Whats's happening?"
                    cols="40"
                    rows="2"
                    value={tweetBodyTM}
                    onChange={(e) => setTweetBodyTM(e.target.value)}
                  />
                  <TweetFooter>
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
                            // console.log("selected photo", selectPhotoTM);
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
        </ReTweetModalContainer>
      </Bg>
    </>
  );
}
