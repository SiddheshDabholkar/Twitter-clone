import { useContext, useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import { useAgo } from "../../hooks/useAgo";
//
import { FaRegComment, FaRetweet, FaRegHeart } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { MdFavorite } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
//
import { SAvatar, SAvatarContainer } from "../Avatar";
import { AuthContext } from "../../context/auth.jsx";
import { TweeterUsername } from "../../Typography/index";
import {
  SLink,
  Restcontainer,
  Row,
  ImageContainer,
  STweetContainer,
  TweetContent,
  IconContainer,
} from "./";
import MoreList from "../Modals/MoreList";
import useModal from "../../hooks/useModal";
//
const LIKE_TWEET_MUTATION = gql`
  mutation likeTweet($tweetId: ID!) {
    likeTweet(tweetId: $tweetId) {
      id
      likes {
        username
        id
      }
    }
  }
`;

export default function Tweet({
  tweet: {
    id,
    body,
    username,
    createdAt,
    photo,
    likes,
    user: {
      id: userid,
      username: userUsername,
      phone,
      email,
      createdAt: userCreatedAt,
      updatedAt: userUpdatedAt,
    },
  },
}) {
  const { user } = useContext(AuthContext);
  const [liked, setLiked] = useState(false);
  const [Modal, show, toggle] = useModal(MoreList);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likeTweet] = useMutation(LIKE_TWEET_MUTATION, {
    variables: { tweetId: id },
  });

  const likeIcon = () => {
    if (liked) {
      return <MdFavorite id="red" style={{ color: "red" }} />;
    } else {
      return <FaRegHeart id="red" />;
    }
  };

  return (
    <>
      <SLink to={`/tweet/${id}`} col>
        <STweetContainer>
          <SAvatarContainer>
            <Link to={`/profile/${userid}`}>
              <SAvatar />
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
                  {useAgo(createdAt)}
                </TweeterUsername>
              </Row>
              {user.id === userid && (
                <IconContainer onClick={(e) => e.preventDefault()}>
                  <BsThreeDots onClick={toggle} />
                </IconContainer>
              )}
            </Row>
            <Row onClick={(e) => e.preventDefault()}>
              {show && <Modal onClick={(e) => e.preventDefault()} />}
            </Row>

            <Row>
              <TweetContent>{body}</TweetContent>
            </Row>
            {photo && <ImageContainer src={photo} />}
            <Row style={{ justifyContent: "space-around" }}>
              <IconContainer onClick={(e) => e.preventDefault()}>
                <FaRegComment id="blue" />
              </IconContainer>
              <IconContainer onClick={(e) => e.preventDefault()}>
                <FaRetweet id="green" />
              </IconContainer>
              <IconContainer
                onClick={(e) => {
                  likeTweet();
                  e.preventDefault();
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
