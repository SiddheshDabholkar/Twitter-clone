import React, {
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useMutation } from "@apollo/client";

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
  Acon,
  TweetFooter,
  FootCont,
} from "./common";
import {
  IconContainer,
  ImageContainer,
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
import { FETCH_TWEET } from "../../graphql/queries";

export default function MakeTweetModal({ toggle, setShow }) {
  const ref = useRef(null);
  const [tweetBodyTM, setTweetBodyTM] = useState("");
  const [selectPhotoTM, setSelectPhotoTM] = useState("");
  const { user } = useContext(AuthContext);

  useOnClickOutsideRef(ref, () => setShow(false));

  const hiddenFileInputMT = useRef(null);
  const handleClick = (e) => {
    hiddenFileInputMT.current.click();
  };

  const [makeTweet] = useMutation(MAKE_TWEET, {
    variables: { body: tweetBodyTM, photo: selectPhotoTM },
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
          sm
          ref={ref}
          // onClick={(e) => {
          //   e.preventDefault();
          //   e.stopPropagation();
          // }}
        >
          {/* <ReTweetModalContainer
            ref={ref}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          > */}
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
                    placeholder="Whats's happening?"
                    cols="40"
                    rows="2"
                    value={tweetBodyTM}
                    onChange={(e) => setTweetBodyTM(e.target.value)}
                  />
                  {selectPhotoTM && (
                    <ImageContainer
                      src={selectPhotoTM}
                      height="90%"
                      width="90%"
                    />
                  )}
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
                          onChange={(e) => {
                            e.stopPropagation();
                            // e.preventDefault();
                            const file = e.target.files[0];
                            console.log("file", file);
                            if (file) {
                              const reader = new FileReader();
                              reader.readAsDataURL(file);
                              reader.onloadend = () => {
                                setSelectPhotoTM(reader.result);
                              };
                            }
                          }}
                          style={{ display: "none" }}
                        />
                      </IconContainer>
                      <IconContainer>
                        <AiOutlineFileGif
                          id="blue"
                          style={{ color: "#1da1f2", fontSize: "20px" }}
                        />
                      </IconContainer>
                      <IconContainer>
                        <GrEmoji
                          id="blue"
                          style={{ color: "#1da1f2", fontSize: "20px" }}
                        />
                      </IconContainer>
                      <IconContainer>
                        <RiBarChartHorizontalFill
                          id="blue"
                          style={{ color: "#1da1f2", fontSize: "20px" }}
                        />
                      </IconContainer>
                      <IconContainer>
                        <FiCalendar
                          id="blue"
                          style={{ color: "#1da1f2", fontSize: "20px" }}
                        />
                      </IconContainer>
                    </FootCont>
                    <FootCont end mr="10px">
                      {tweetBodyTM.length > 0 ? (
                        <SaveButton
                          onClick={(e) => {
                            makeTweet();
                            toggle();
                          }}
                        >
                          tweet
                        </SaveButton>
                      ) : (
                        <SaveButton style={{ backgroundColor: "#9bd7ff" }}>
                          tweet
                        </SaveButton>
                      )}
                    </FootCont>
                  </TweetFooter>
                </Restcontainer>
              </STweetContainer>
            </BodyContainer>
          </BodyContainer>
          {/* </ReTweetModalContainer> */}
        </ModalContainer>
      </Bg>
    </>
  );
}
