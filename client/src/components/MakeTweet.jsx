import React from "react";
import styled from "styled-components";
import { AvatarContainer } from "../container/AvatarContainer";
import { Avatar } from "./Avatar";
import { TweetInput } from "./Input";
import { StyledButton } from "./AuthButton";
import { MdPermMedia } from "react-icons/md";
import { AiOutlineFileGif } from "react-icons/ai";
import { TweetContainer } from "../container/TweetContainer";

const PostSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 95%;
`;
const UtilContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 20%;
  align-items: center;
  justify-content: center;
`;
const UploadcontentContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  align-items: center;
  justify-content: flex-start;
`;
const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 6px;
`;
const InputnIconCon = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export default function MakeTweet() {
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
          </UtilContainer>
        </PostSection>
      </TweetContainer>
    </>
  );
}
