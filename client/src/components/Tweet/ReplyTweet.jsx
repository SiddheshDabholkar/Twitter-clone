import React from "react";
import styled from "styled-components";
//
import { MdPermMedia } from "react-icons/md";
import { AiOutlineFileGif } from "react-icons/ai";
//
import { StyledButton } from "../Buttons/AuthButton";
import { Avatar, AvatarContainer } from "../Avatar";
import { ButtonContainer } from "../Buttons/ButtonContainer";
import { TweetInput } from "../Input";
import { TweeterUsername } from "../../Typography";
import {
  TweetContainer,
  Row,
  IconContainer,
  PostSection,
  UtilContainer,
  UploadcontentContainer,
} from "./";
//
const RestCon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
`;

export default function ReplyTweet() {
  return (
    <>
      <TweetContainer style={{ flexDirection: "row" }}>
        <AvatarContainer
          style={{
            flexDirection: "column",
            width: "10%",
            height: "100%",
            justifyContent: "end",
          }}
        >
          <Avatar style={{ marginTop: "20%" }} />
        </AvatarContainer>
        <RestCon>
          <Row>
            <TweeterUsername small>Replying to </TweeterUsername>
          </Row>

          <PostSection>
            <TweetInput placeholder="Tweet Reply ?" cols="40" rows="5" />
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
                  Reply
                </StyledButton>
              </ButtonContainer>
            </UtilContainer>
          </PostSection>
        </RestCon>
      </TweetContainer>
    </>
  );
}
