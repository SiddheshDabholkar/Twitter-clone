import { useContext, useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import useModal from "../../hooks/useModal";
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
//modal component
import useDropdown from "../../hooks/useDropdown";
import ReTweet from "../Dropdown/ReTweetDropdown";
import MoreList from "../Modals/MoreList";

import { FETCH_TWEET } from "../../screens/AfterAuthPassing/Home";

export const LIKE_TWEET_MUTATION = gql`
  mutation likeTweet($tweetId: ID!) {
    likeTweet(tweetId: $tweetId) {
      id
      username
      photo
      body
      likes {
        id
      }
    }
  }
`;
// export const FETCH_TWEET = gql`
//   {
//     getTweets {
//       id
//       body
//       username
//       createdAt
//       photo
//       updatedAt
//       likes {
//         id
//         username
//         phone
//         email
//         profilePic
//         banner
//         bio
//         location
//         website
//         name
//       }
//       user {
//         id
//         username
//         phone
//         email
//         token
//         createdAt
//         updatedAt
//         profilePic
//       }
//       tweet {
//         id
//         body
//         username
//         createdAt
//       }
//     }
//   }
// `;

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
      profilePic,
    },
  },
}) {
  const { user } = useContext(AuthContext);
  const [liked, setLiked] = useState(false);

  const { Modal, show, toggle } = useModal(MoreList);

  const {
    DropDown: ReTweetDropdown,
    show: showReTweetDropdown,
    toggle: toggleReTweetDropdown,
  } = useDropdown(ReTweet);

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

  return (
    <>
      <SLink to={`/tweet/${id}`} col key={id}>
        <STweetContainer>
          <SAvatarContainer>
            <Link to={`/profile/${userid}`}>
              <SAvatar src={profilePic} />
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
              {show && (
                <Modal onClick={(e) => e.preventDefault()} tweetId={id} />
              )}
            </Row>

            <Row>
              <TweetContent>{body}</TweetContent>
            </Row>
            {photo && <ImageContainer src={photo} />}
            <Row style={{ justifyContent: "space-around" }}>
              <IconContainer onClick={(e) => e.preventDefault()}>
                <FaRegComment id="blue" />
              </IconContainer>

              <IconContainer
                onClick={(e) => {
                  // RetweetToggle();
                  toggleReTweetDropdown();
                  e.preventDefault();
                }}
              >
                <FaRetweet id="green" />
                {showReTweetDropdown && <ReTweetDropdown tweetId={id} />}
              </IconContainer>
              <IconContainer
                onClick={(e) => {
                  likeTweet({ variables: { tweetId: id } });
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
