import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
//
import { FaRegComment, FaRetweet, FaRegHeart } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
//
import { Avatar } from "../Avatar";
import ReplyTweetButtons from "./ReplyTweetButtons";
import Reply from "./Reply";
import { TweeterUsername } from "../../Typography";
import { TweetContainer, Row, TweetContent, IconContainer, SRow } from "./";
//
const FETCH_REPLIES = gql`
  query ($tweetId: ID!) {
    getReplies(tweetId: $tweetId) {
      id
      body
      username
      replies {
        id
        body
        username
        createdAt
        updatedAt
      }
    }
  }
`;
//
const StatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5px;
`;
const Scount = styled.span`
  color: black;
`;

export default function SingleTweet() {
  let { tweetId } = useParams();
  const [liked, setLiked] = useState(false);

  const { data: tweetReplies, loading: myTweetRepliesLoading } = useQuery(
    FETCH_REPLIES,
    {
      variables: {
        tweetId,
      },
    }
  );

  const likeIcon = () => {
    if (liked) {
      return <MdFavorite id="red" style={{ color: "red" }} />;
    } else {
      return <FaRegHeart id="red" />;
    }
  };

  const Replies = () => {
    if (myTweetRepliesLoading) {
      return <h1>loading.....</h1>;
    } else {
      const replies = tweetReplies && tweetReplies.getReplies.replies;
      return (
        <>
          {replies.map((reply) => (
            <Reply reply={reply} />
          ))}
        </>
      );
    }
  };

  return (
    <>
      <TweetContainer style={{ marginTop: "10px" }}>
        <Row>
          <Avatar />
          <Row col>
            <TweeterUsername style={{ width: "95%" }}>lmao</TweeterUsername>
            <TweeterUsername small style={{ width: "95%" }}>
              lmao
            </TweeterUsername>
          </Row>
        </Row>
        <Row>
          <TweetContent>laksjhwdg asichb aishcn p9aiscn oaihscn </TweetContent>
        </Row>
        <Row>
          <TweeterUsername small>date</TweeterUsername>
        </Row>
        <Row>
          <StatContainer>
            <TweeterUsername small>
              <Scount> 1 </Scount>Retweets
            </TweeterUsername>
          </StatContainer>
          <StatContainer>
            <TweeterUsername small>
              <Scount> 1 </Scount>Quote Tweet
            </TweeterUsername>
          </StatContainer>
          <StatContainer>
            <TweeterUsername small>
              <Scount> 1 </Scount>Likes
            </TweeterUsername>
          </StatContainer>
        </Row>
        <SRow>
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
        </SRow>
      </TweetContainer>
      <ReplyTweetButtons tweetId={tweetId} />
      <Replies />
    </>
  );
}
