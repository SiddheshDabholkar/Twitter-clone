import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
//
import { FaRegComment, FaRetweet, FaRegHeart } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
//
import { AuthContext } from "../../context/auth.jsx";
//
import { TweeterUsername } from "../../Typography/index.jsx";
import {
  TweetContainer,
  SLink,
  Restcontainer,
  Row,
  ImageContainer,
  STweetContainer,
  TweetContent,
  IconContainer,
  RetweetedHeading,
  Above,
  RetweetedHeadingContainer,
  RetweetIconContainer,
} from "./";
//day.js
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { SAvatar, SAvatarContainer } from "../Avatar.jsx";
dayjs.extend(relativeTime);
//
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const TwetCon = styled(TweetContainer)`
  border: 1px solid #80808052;
  width: inherit;
  border-radius: 15px;
  cursor: pointer;
  :hover {
    background-color: #8080800f;
  }
`;
const LIKE_RETWEET_MUTATION = gql`
  mutation likeReTweet($reTweetId: ID!) {
    likeReTweet(reTweetId: $reTweetId) {
      id
      likes {
        username
        id
        createdAt
      }
    }
  }
`;

export default function ReTweet({
  retweet: {
    id,
    body,
    username,
    createdAt,
    updatedAt,
    likes,
    user: {
      id: userid,
      username: userUsername,
      phone,
      email,
      createdAt: userCreatedAt,
      updatedAt: userUpdatedAt,
    },
    tweet: {
      id: tweetid,
      body: tweetBody,
      username: tweetUsername,
      createdAt: tweetCreatedAt,
      updatedAt: tweetUpdatedAt,
    },
  },
}) {
  const { user } = useContext(AuthContext);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likeTweet] = useMutation(LIKE_RETWEET_MUTATION, {
    variables: { reTweetId: id },
  });

  const likeIcon = () => {
    if (liked) {
      return <MdFavorite id="red" style={{ color: "red" }} />;
    } else {
      return <FaRegHeart id="red" />;
    }
  };

  const TweetInsideReTweet = () => {
    return (
      <TwetCon>
        <Container>
          <SAvatarContainer>
            <SAvatar small />
          </SAvatarContainer>
          <Restcontainer
            col
            style={{
              width: "90%",
            }}
          >
            <SLink to={`/tweet/${tweetid}`} col>
              <Row>
                <TweeterUsername>{tweetUsername}</TweeterUsername>
                <TweeterUsername small>
                  {" . "}
                  {dayjs(tweetCreatedAt).fromNow(true)}
                </TweeterUsername>
              </Row>
              <Row>
                <TweetContent>{tweetBody}</TweetContent>
              </Row>
            </SLink>
          </Restcontainer>
        </Container>
      </TwetCon>
    );
  };

  const CheckIfItHaveBody = () => {
    if (body === null) {
      // when you retweet without body
      // you will see the same tweet of
      // but with the retweeted heading
      // with username
      return (
        <>
          <Above>
            <RetweetIconContainer>
              <FaRetweet style={{ color: "grey" }} />
            </RetweetIconContainer>
            <RetweetedHeadingContainer>
              <RetweetedHeading>{username} retweeted</RetweetedHeading>
            </RetweetedHeadingContainer>
          </Above>
          <STweetContainer>
            <SAvatarContainer>
              <Link to={`profile/${userid}`}>
                <SAvatar />
              </Link>
            </SAvatarContainer>
            <Restcontainer
              col
              style={{
                width: "90%",
              }}
            >
              <SLink to={`/tweet/${id}`} col>
                <Row>
                  <TweeterUsername>{username}</TweeterUsername>
                  <TweeterUsername small>
                    {" . "}
                    {dayjs(createdAt).fromNow(true)}
                  </TweeterUsername>
                </Row>
                <ImageContainer src="data:image/jpeg;base64,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" />
              </SLink>
              <Row
                style={{ justifyContent: "space-around" }}
                onClick={(e) => e.stopPropagation()}
              >
                <IconContainer>
                  <FaRegComment id="blue" />
                </IconContainer>
                <IconContainer>
                  <FaRetweet id="green" />
                </IconContainer>
                <IconContainer onClick={likeTweet}>{likeIcon()}</IconContainer>
                <IconContainer>
                  <FiUpload id="blue" />
                </IconContainer>
              </Row>
            </Restcontainer>
          </STweetContainer>
        </>
      );
    } else {
      return (
        <>
          <STweetContainer>
            <SAvatarContainer>
              <Link to={`profile/${userid}`}>
                <SAvatar />
              </Link>
            </SAvatarContainer>
            <Restcontainer
              col
              style={{
                width: "90%",
              }}
            >
              <SLink to={`/tweet/${id}`} col>
                <Row>
                  <TweeterUsername>{username}</TweeterUsername>
                  <TweeterUsername small>
                    {" . "}
                    {dayjs(createdAt).fromNow(true)}
                  </TweeterUsername>
                </Row>
                <Row>
                  <TweetContent>{body}</TweetContent>
                </Row>
              </SLink>
              <SLink to={`/tweet/${tweetid}`} col>
                <TweetInsideReTweet />
              </SLink>
              <Row style={{ justifyContent: "space-around" }}>
                <IconContainer>
                  <FaRegComment id="blue" />
                </IconContainer>
                <IconContainer>
                  <FaRetweet id="green" />
                </IconContainer>
                <IconContainer onClick={likeTweet}>{likeIcon()}</IconContainer>
                <IconContainer>
                  <FiUpload id="blue" />
                </IconContainer>
              </Row>
            </Restcontainer>
          </STweetContainer>
        </>
      );
    }
  };

  return (
    <>
      <CheckIfItHaveBody />
    </>
  );
}
