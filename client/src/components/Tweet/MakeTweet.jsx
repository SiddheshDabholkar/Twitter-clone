import { useState } from "react";
import { useLocation } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
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
} from "./";
import styled from "styled-components";

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

const MAKE_TWEET = gql`
  mutation createTweet($body: String!) {
    createTweet(body: $body) {
      id
      body
    }
  }
`;

export default function MakeTweet() {
  const { pathname } = useLocation();
  const newPathname = pathname.substring(1);
  const [tweetBody, setTweetBody] = useState("");

  const [makeTweet] = useMutation(MAKE_TWEET);

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
              onClick={() => makeTweet({ variables: { body: tweetBody } })}
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
                  <MdPermMedia id="blue" />
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
