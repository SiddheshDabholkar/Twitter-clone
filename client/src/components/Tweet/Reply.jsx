import { useEffect, useState } from "react";
import styled from "styled-components";
//
import { useAgo } from "../../hooks/useAgo";
import {
  TweetContainer,
  Restcontainer,
  Row,
  Above,
  IconContainer,
  TweetContent,
} from ".";
import { SAvatarContainer, Avatar } from "../Avatar";
import { TweeterUsername } from "../../Typography/index";
//icons
import { FaRegComment, FaRetweet, FaRegHeart } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { MdFavorite } from "react-icons/md";

const StyledAbove = styled(Above)`
  padding: 0;
  margin: 0;
`;

export default function Reply({
  reply: { id, body, username, createdAt, updatedAt },
}) {
  const [liked, setLiked] = useState(false);

  //   useEffect(() => {
  //     if (user && likes.find((like) => like.username === user.username)) {
  //       setLiked(true);
  //     } else setLiked(false);
  //   }, [user, likes]);

  //   const [likeTweet] = useMutation(LIKE_TWEET_MUTATION, {
  //     variables: { tweetId: id },
  //   });

  const likeIcon = () => {
    if (liked) {
      return <MdFavorite id="red" style={{ color: "red" }} />;
    } else {
      return <FaRegHeart id="red" />;
    }
  };

  return (
    <>
      <TweetContainer key={id}>
        <Above>
          <Restcontainer col style={{ width: "10%" }}>
            <SAvatarContainer>
              <Avatar />
            </SAvatarContainer>
          </Restcontainer>
          <Row col>
            <StyledAbove>
              <TweeterUsername>{username}</TweeterUsername>
              <TweeterUsername small> . {useAgo(createdAt)}</TweeterUsername>
            </StyledAbove>
            <StyledAbove>
              <TweeterUsername small>
                Replying to <span style={{ color: "#1da1f2" }}>@venom</span>
              </TweeterUsername>
            </StyledAbove>
            <StyledAbove>
              <TweetContent>{body}</TweetContent>
            </StyledAbove>
          </Row>
        </Above>
        <Row style={{ justifyContent: "space-around" }}>
          <IconContainer>
            <FaRegComment id="blue" />
          </IconContainer>
          <IconContainer>
            <FaRetweet id="green" />
          </IconContainer>
          <IconContainer>{likeIcon()}</IconContainer>
          <IconContainer>
            <FiUpload id="blue" />
          </IconContainer>
        </Row>
      </TweetContainer>
    </>
  );
}
