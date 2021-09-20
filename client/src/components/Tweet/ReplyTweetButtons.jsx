import { useRef, useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
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
  ImageUploaderButton,
  ImageContainer,
} from ".";
import { MAKE_TWEET } from "../../graphql/mutation";
import { FETCH_TWEET_REPLIES } from "../../graphql/queries";
//
const RestCon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
`;

export default function ReplyTweetButtons({ tweetId }) {
  const [reply, setReply] = useState("");
  const [selectPhoto, setSelectPhoto] = useState("");

  const hiddenFileInput = useRef(null);
  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };

  const [makeReply] = useMutation(MAKE_TWEET, {
    variables: { body: reply, photo: selectPhoto, tweetId },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_TWEET_REPLIES,
        variables: { tweetId },
      });
      proxy.writeQuery({
        query: FETCH_TWEET_REPLIES,
        variables: { tweetId },
        data: {
          getReplies: [result.data.createTweet, ...data.getReplies],
        },
      });
    },
  });

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
            <TweetInput
              placeholder="Tweet Reply ?"
              cols="40"
              rows="5"
              onChange={(e) => setReply(e.target.value)}
            />
            {selectPhoto && (
              <ImageContainer src={selectPhoto} height="300px" width="90%" />
            )}
            <UtilContainer>
              <UploadcontentContainer>
                <IconContainer>
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
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onloadend = () => {
                          setSelectPhoto(reader.result);
                        };
                      }
                    }}
                    style={{ display: "none" }}
                  />
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
                  onClick={() => {
                    makeReply();
                  }}
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
