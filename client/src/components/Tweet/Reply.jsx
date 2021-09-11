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
  ImageContainer,
  SLink,
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
import MoreListReply from "../Dropdown/MoreListReply";

const StyledAbove = styled(Above)`
  padding: 0;
  margin: 0;
`;

const Left = styled.div`
  display: flex;
  flex-direction: row;
  width: 30%;
`;
const Right = styled.div`
  display: flex;
  flex-direction: row;
  width: 60%;
  justify-content: flex-end;
`;

export default function Reply({
  reply: {
    id,
    body,
    username,
    createdAt,
    updatedAt,
    likes,
    photo,
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
  } = useDropdown(MoreListReply);

  return (
    <>
      <SLink to={`/tweet/${id}`} col key={id}>
        <TweetContainer>
          <Above>
            <Restcontainer col style={{ width: "10%" }}>
              <SAvatarContainer>
                <Avatar />
              </SAvatarContainer>
            </Restcontainer>
            <Row col>
              <StyledAbove>
                <Left>
                  <TweeterUsername>{username}</TweeterUsername>
                  <TweeterUsername small>
                    {" "}
                    . {useAgo(updatedAt)}
                  </TweeterUsername>
                </Left>
                <Right>
                  {user.id === userid && (
                    <IconContainer onClick={(e) => e.preventDefault()}>
                      <BsThreeDots onClick={toggleMoreListDropdown} />
                    </IconContainer>
                  )}
                </Right>
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
              {photo && <ImageContainer src={photo} height="90%" width="90%" />}
            </Row>
          </Above>
          <Row style={{ justifyContent: "space-around", marginBottom: "10px" }}>
            <IconContainer p>
              <FaRegComment id="blue" />
            </IconContainer>
            <IconContainer p>
              <FaRetweet id="green" />
            </IconContainer>
            <IconContainer
              p
              onClick={(e) => {
                likeTweet({ variables: { tweetId: id } });
                e.preventDefault();
              }}
            >
              {likeIcon()}
            </IconContainer>
            <IconContainer p>
              <FiUpload id="blue" />
            </IconContainer>
          </Row>
        </TweetContainer>
      </SLink>
    </>
  );
}
