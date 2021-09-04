import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
//
import useDropdown from "../../hooks/useDropdown";
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
import { BsThreeDots } from "react-icons/bs";

import { AuthContext } from "../../context/auth";
import { LIKE_TWEET_MUTATION } from "../../graphql/mutation";
import MoreList from "../Dropdown/MoreList";

const StyledAbove = styled(Above)`
  padding: 0;
  margin: 0;
`;

export default function Reply({
  reply: {
    id,
    body,
    username,
    createdAt,
    updatedAt,
    likes,
    user: { id: userid },
  },
}) {
  const [liked, setLiked] = useState(false);
  const { user } = useContext(AuthContext);

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

  const {
    DropDown: MoreListDropdown,
    show: showMoreListDropdown,
    toggle: toggleMoreListDropdown,
    setShow: setShowMoreListDropdown,
  } = useDropdown(MoreList);

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
              <TweeterUsername small> . {useAgo(updatedAt)}</TweeterUsername>
              {user.id === userid && (
                <IconContainer onClick={(e) => e.preventDefault()}>
                  <BsThreeDots onClick={toggleMoreListDropdown} />
                </IconContainer>
              )}
            </StyledAbove>
            <StyledAbove>
              <TweeterUsername small>
                Replying to <span style={{ color: "#1da1f2" }}>@venom</span>
              </TweeterUsername>
            </StyledAbove>
            <Row onClick={(e) => e.preventDefault()}>
              {showMoreListDropdown && (
                <MoreListDropdown
                  onClick={(e) => e.preventDefault()}
                  tweetId={id}
                  setShow={setShowMoreListDropdown}
                />
              )}
            </Row>
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
          <IconContainer
            onClick={(e) => {
              likeTweet({ variables: { tweetId: id } });
              e.preventDefault();
            }}
          >
            {likeIcon()}
          </IconContainer>
          <IconContainer>
            <FiUpload id="blue" />
          </IconContainer>
        </Row>
      </TweetContainer>
    </>
  );
}
