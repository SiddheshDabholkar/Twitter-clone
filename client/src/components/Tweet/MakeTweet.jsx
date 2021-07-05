import { useState } from "react";
import { useLocation } from "react-router-dom";
//
import { MdPermMedia } from "react-icons/md";
import { AiOutlineFileGif } from "react-icons/ai";
//
import { Avatar, AvatarContainer } from "../Avatar";
import { TweetInput } from "../Input";
import { StyledButton } from "./../Buttons/AuthButton";
import { ButtonContainer } from "./../Buttons/ButtonContainer";
import {
  TweetContainer,
  IconContainer,
  PostSection,
  UtilContainer,
  UploadcontentContainer,
  InputnIconCon,
} from "./";

export default function MakeTweet() {
  const { pathname } = useLocation();
  const newPathname = pathname.substring(1);
  const [tweetBody, setTweetBody] = useState("");

  const ButtonDecider = () => {
    if (newPathname.startsWith("composetweet")) {
      return null;
    } else {
      return (
        <>
          <ButtonContainer>
            <StyledButton
              small
              txtColor="#fff"
              bgColor="#1da1f2"
              borderColor="transparent"
            >
              tweet
            </StyledButton>
          </ButtonContainer>
        </>
      );
    }
  };

  return (
    <>
      <TweetContainer>
        <InputnIconCon>
          <AvatarContainer
            style={{
              flexDirection: "column",
              width: "10%",
            }}
          >
            <Avatar style={{ marginTop: "20%" }} />
          </AvatarContainer>
          <TweetInput placeholder="Whats Happening ?" cols="40" rows="5" />
        </InputnIconCon>

        <PostSection>
          <UtilContainer>
            <UploadcontentContainer>
              <IconContainer>
                <MdPermMedia style={{ fontSize: "25px", color: "#1da1f2" }} />
              </IconContainer>
              <IconContainer>
                <AiOutlineFileGif
                  style={{ fontSize: "25px", color: "#1da1f2" }}
                />
              </IconContainer>
            </UploadcontentContainer>
            <ButtonDecider />
          </UtilContainer>
        </PostSection>
      </TweetContainer>
    </>
  );
}
