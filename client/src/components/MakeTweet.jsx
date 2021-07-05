import { useState } from "react";
import styled from "styled-components";
import { AvatarContainer } from "../container/AvatarContainer";
import { Avatar } from "./Avatar";
import { TweetInput } from "./Input";
import { StyledButton } from "./AuthButton";
import { MdPermMedia } from "react-icons/md";
import { AiOutlineFileGif } from "react-icons/ai";
import { TweetContainer } from "../container/TweetContainer";
import { useLocation } from "react-router-dom";

export const PostSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 95%;
`;
export const UtilContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 20%;
  align-items: center;
  justify-content: center;
`;
export const UploadcontentContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  align-items: center;
  justify-content: flex-start;
`;
export const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 6px;
`;
export const InputnIconCon = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

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
