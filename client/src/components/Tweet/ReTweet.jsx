import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import { useAgo } from "../../hooks/useAgo";
//
import { FaRegComment, FaRetweet, FaRegHeart } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
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
import { SAvatar, SAvatarContainer } from "../Avatar.jsx";
import MoreList from "../Modals/MoreList";
// import Retweet from "../Modals/ReTweetModal";
import useModal from "../../hooks/useModal";
import { LIKE_TWEET_MUTATION } from "./Tweet";
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
      profilePic,
    },
    tweet: {
      id: tweetid,
      body: tweetBody,
      username: tweetUsername,
      createdAt: tweetCreatedAt,
      updatedAt: tweetUpdatedAt,
      user: { id: insideUserId, profilePic: insideUserProfilePic },
    },
  },
}) {
  const { user } = useContext(AuthContext);
  const [liked, setLiked] = useState(false);
  const hookretweetCreatedAt = useAgo(createdAt);
  const hooktweetCreatedAt = useAgo(tweetCreatedAt);
  const { Modal, show, toggle } = useModal(MoreList);

  useEffect(() => {
    if (user && likes.find((like) => like.id === user.id)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likeTweet] = useMutation(LIKE_TWEET_MUTATION);

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
            <SAvatar
              small
              src={
                insideUserProfilePic
                  ? insideUserProfilePic
                  : "https://res.cloudinary.com/drntday51/image/upload/v1627108184/twitter/ptupstjuaejspvhj9mfj.jpg"
              }
            />
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
                  {hooktweetCreatedAt}
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
    if (body.length === 0 || body === null) {
      // when you retweet without body
      // you will see the same tweet of
      // but with the retweeted heading
      // with username
      return (
        <>
          <SLink to={`/tweet/${id}`} col>
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
                  <SAvatar
                    src={
                      profilePic
                        ? profilePic
                        : "https://res.cloudinary.com/drntday51/image/upload/v1627108184/twitter/ptupstjuaejspvhj9mfj.jpg"
                    }
                  />
                </Link>
              </SAvatarContainer>
              <Restcontainer
                col
                style={{
                  width: "90%",
                }}
              >
                <Row>
                  <Row>
                    <TweeterUsername>{username}</TweeterUsername>
                    <TweeterUsername small>
                      {" . "}
                      {hooktweetCreatedAt}
                    </TweeterUsername>
                  </Row>
                  {user.id === userid && (
                    <IconContainer onClick={(e) => e.preventDefault()}>
                      <BsThreeDots onClick={toggle} />
                    </IconContainer>
                  )}
                </Row>
                {show && (
                  <Modal onClick={(e) => e.preventDefault()} tweetId={id} />
                )}
                <Row
                  style={{ justifyContent: "space-around" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <IconContainer onClick={(e) => e.preventDefault()}>
                    <FaRegComment id="blue" />
                  </IconContainer>
                  <IconContainer onClick={(e) => e.preventDefault()}>
                    <FaRetweet id="green" />
                  </IconContainer>
                  <IconContainer
                    onClick={(e) => {
                      e.preventDefault();
                      likeTweet({ variables: { tweetId: id } });
                    }}
                  >
                    {likeIcon()}
                  </IconContainer>
                  <IconContainer onClick={(e) => e.preventDefault()}>
                    <FiUpload id="blue" />
                  </IconContainer>
                </Row>
              </Restcontainer>
            </STweetContainer>
          </SLink>
        </>
      );
    } else {
      return (
        <>
          <SLink to={`/tweet/${id}`} col>
            <STweetContainer>
              <SAvatarContainer>
                <Link to={`profile/${userid}`}>
                  <SAvatar
                    src={
                      profilePic
                        ? profilePic
                        : "https://res.cloudinary.com/drntday51/image/upload/v1627108184/twitter/ptupstjuaejspvhj9mfj.jpg"
                    }
                  />
                </Link>
              </SAvatarContainer>
              <Restcontainer
                col
                style={{
                  width: "90%",
                }}
              >
                <Row>
                  <Row>
                    <TweeterUsername>{username}</TweeterUsername>
                    <TweeterUsername small>
                      {" . "}
                      {hookretweetCreatedAt}
                    </TweeterUsername>
                  </Row>
                  {user.id === userid && (
                    <IconContainer onClick={(e) => e.preventDefault()}>
                      <BsThreeDots onClick={toggle} />
                    </IconContainer>
                  )}
                </Row>
                {show && (
                  <Modal onClick={(e) => e.preventDefault()} tweetId={id} />
                )}
                <Row>
                  <TweetContent>{body}</TweetContent>
                </Row>
                <SLink to={`/tweet/${tweetid}`} col>
                  <TweetInsideReTweet />
                </SLink>
                <Row style={{ justifyContent: "space-around" }}>
                  <IconContainer onClick={(e) => e.preventDefault()}>
                    <FaRegComment id="blue" />
                  </IconContainer>
                  <IconContainer onClick={(e) => e.preventDefault()}>
                    <FaRetweet id="green" />
                  </IconContainer>
                  <IconContainer
                    onClick={(e) => {
                      e.preventDefault();
                      likeTweet({ variables: { tweetId: id } });
                    }}
                  >
                    {likeIcon()}
                  </IconContainer>
                  <IconContainer onClick={(e) => e.preventDefault()}>
                    <FiUpload id="blue" />
                  </IconContainer>
                </Row>
              </Restcontainer>
            </STweetContainer>
          </SLink>
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
