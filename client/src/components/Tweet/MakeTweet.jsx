import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
//
import { MdPermMedia } from "react-icons/md";
import { AiOutlineFileGif } from "react-icons/ai";
import { GrEmoji } from "react-icons/gr";
import { RiBarChartHorizontalFill } from "react-icons/ri";
import { FiCalendar } from "react-icons/fi";
//
import { SAvatarContainer, SAvatar } from "../Avatar";
import { TweetInput } from "../Input";
import { CStyledButton } from "./../Buttons/CircleButton";
import { ButtonContainer } from "./../Buttons/ButtonContainer";
import {
  TweetContainer,
  IconContainer,
  UtilContainer,
  UploadcontentContainer,
  Restcontainer,
  ImageUploaderButton,
} from "./";
import useUploadImage from "../../hooks/useUploadImage";
import { FETCH_TWEET } from "../../screens/AfterAuthPassing/Home";

const Div = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: ${({ width }) => width};
  height: 40px;
`;
const SIconContainer = styled(IconContainer)`
  color: #1da1f2;
  margin: 10px;
`;

// TODO:
// After mutation , We have to refresh
// the page to see the new Tweet
// checkout the ben awad youtube video
// how to update cache after mutation

const MAKE_TWEET = gql`
  mutation createTweet($body: String!, $photo: String) {
    createTweet(body: $body, photo: $photo) {
      id
      body
      photo
    }
  }
`;

export default function MakeTweet() {
  const { pathname } = useLocation();
  const newPathname = pathname.substring(1);
  const [tweetBody, setTweetBody] = useState("");
  const [selectPhoto, setSelectPhoto] = useState("");
  const url = useUploadImage(selectPhoto);

  const hiddenFileInput = useRef(null);
  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };
  const [makeTweet] = useMutation(
    MAKE_TWEET
    //   ,
    //   {
    //   update(cache, { data: { makeTweet } }) {
    //     cache.modify({
    //       fields: {
    //         getTweets(existingTweets = []) {
    //           const newTweetRef = cache.writeFragment({
    //             data: makeTweet,
    //             fragment: gql`
    //               fragment newTweets on Tweet {
    //                 id
    //                 body
    //                 username
    //                 createdAt
    //                 photo
    //                 updatedAt
    //                 likes {
    //                   id
    //                   createdAt
    //                   username
    //                 }
    //                 user {
    //                   id
    //                   username
    //                   phone
    //                   email
    //                   token
    //                   createdAt
    //                   updatedAt
    //                 }
    //                 tweet {
    //                   id
    //                   body
    //                   username
    //                   createdAt
    //                 }
    //               }
    //             `,
    //           });
    //           return [...existingTweets, newTweetRef];
    //         },
    //       },
    //     });
    //   },
    // }
  );

  const ButtonDecider = () => {
    if (newPathname.startsWith("composetweet")) {
      return null;
    } else {
      return (
        <>
          <ButtonContainer>
            <CStyledButton
              small
              txtColor="#fff"
              bgColor="#1da1f2"
              borderColor="transparent"
              onClick={() =>
                makeTweet({ variables: { body: tweetBody, photo: url } })
              }
            >
              tweet
            </CStyledButton>
          </ButtonContainer>
        </>
      );
    }
  };

  return (
    <>
      <TweetContainer row margin="30px 0px 0px 0px">
        <SAvatarContainer>
          <SAvatar style={{ marginTop: "20%" }} />
        </SAvatarContainer>
        <Restcontainer
          col
          style={{
            width: "80%",
            padding: "10px",
          }}
        >
          <TweetInput
            placeholder="Whats Happening ?"
            cols="40"
            rows="5"
            onChange={(e) => setTweetBody(e.target.value)}
          />
          <UtilContainer>
            <Div width="70%">
              <UploadcontentContainer>
                <SIconContainer>
                  <ImageUploaderButton onClick={handleClick}>
                    <MdPermMedia
                      id="blue"
                      style={{ color: "#1da1f2", fontSize: "20px" }}
                    />
                  </ImageUploaderButton>
                  <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={(e) => {
                      setSelectPhoto(e.target.files[0]);
                      console.log("selected photo", selectPhoto);
                    }}
                    style={{ display: "none" }}
                  />
                </SIconContainer>
                <SIconContainer>
                  <AiOutlineFileGif id="blue" />
                </SIconContainer>
                <SIconContainer>
                  <GrEmoji id="blue" />
                </SIconContainer>
                <SIconContainer>
                  <RiBarChartHorizontalFill id="blue" />
                </SIconContainer>
                <SIconContainer>
                  <FiCalendar id="blue" />
                </SIconContainer>
              </UploadcontentContainer>
            </Div>
            <Div width="30%">
              <ButtonDecider />
            </Div>
          </UtilContainer>
        </Restcontainer>
      </TweetContainer>
    </>
  );
}
