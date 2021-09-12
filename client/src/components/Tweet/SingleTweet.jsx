import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery, useMutation } from "@apollo/client";
//
import { FaRegComment, FaRetweet, FaRegHeart } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
//
import { Avatar } from "../Avatar";
import ReplyTweetButtons from "./ReplyTweetButtons";
import Reply from "./Reply";
import { TweeterUsername } from "../../Typography";
import {
  TweetContainer,
  Row,
  TweetContent,
  IconContainer,
  SRow,
  ImageContainer,
} from "./";
import useDropdown from "../../hooks/useDropdown";
import MoreListReply from "../Dropdown/MoreListReply";
import { ago } from "../../utils/timeago";
import { AuthContext } from "../../context/auth";

import { LIKE_TWEET_MUTATION } from "../../graphql/mutation";
import { GET_SINGLE_TWEET, FETCH_TWEET_REPLIES } from "../../graphql/queries";

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
  const { user } = useContext(AuthContext);
  const [liked, setLiked] = useState(false);
  const { DropDown, show, toggle, setShow } = useDropdown(MoreListReply);
  const [likeTweet] = useMutation(LIKE_TWEET_MUTATION);
  const [likes, setLikes] = useState([]);

  const { data: SingleTweetData, loading: SingleTweetLoading } = useQuery(
    GET_SINGLE_TWEET,
    {
      variables: {
        tweetId,
      },
    }
  );
  const { data: SingleReplyData, loading: SingleReplyLoading } = useQuery(
    FETCH_TWEET_REPLIES,
    {
      variables: {
        tweetId,
      },
    }
  );

  useEffect(() => {
    const singleTweet = SingleTweetData && SingleTweetData.getTweet;
    singleTweet?.likes && setLikes(likes);
  }, [SingleTweetData, likes]);

  const likeIcon = () => {
    if (liked) {
      return <MdFavorite id="red" style={{ color: "red" }} />;
    } else {
      return <FaRegHeart id="red" />;
    }
  };

  useEffect(() => {
    if (user && likes.find((like) => like.id === user.id)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const Replies = () => {
    if (!SingleReplyLoading) {
      const replies = SingleReplyData && SingleReplyData.getReplies;
      return (
        <>
          {replies.map((reply) => (
            <Reply reply={reply} />
          ))}
        </>
      );
    } else {
      return <h1>loading...</h1>;
    }
  };

  if (SingleTweetLoading) {
    return <h1>loading...</h1>;
  } else {
    const singleTweet = SingleTweetData.getTweet;
    const {
      id,
      body,
      createdAt,
      photo,
      likes,
      username,
      user: { profilePic },
    } = singleTweet;

    return (
      <>
        <TweetContainer style={{ marginTop: "10px" }}>
          <Row>
            <Row>
              <Avatar src={profilePic} />
              <Row col>
                <TweeterUsername style={{ width: "95%" }}>
                  {username}
                </TweeterUsername>
                {/* <TweeterUsername small style={{ width: "95%" }}>
                  lmao
                </TweeterUsername> */}
              </Row>
            </Row>
            <IconContainer onClick={(e) => e.preventDefault()}>
              <BsThreeDots onClick={toggle} />
            </IconContainer>
          </Row>
          <Row onClick={(e) => e.preventDefault()}>
            {show && (
              <DropDown
                onClick={(e) => e.preventDefault()}
                id={id}
                setShow={setShow}
              />
            )}
          </Row>
          <Row>
            <TweetContent>{body}</TweetContent>
          </Row>
          {photo && <ImageContainer src={photo} height="80%" width="90%" />}
          <Row>
            <TweeterUsername small>{ago(createdAt)}</TweeterUsername>
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
            <IconContainer p>
              <FaRegComment id="blue" />
            </IconContainer>
            <IconContainer p>
              <FaRetweet id="green" />
            </IconContainer>
            <IconContainer
              p
              onClick={(e) => {
                e.preventDefault();
                likeTweet({ variables: { tweetId: id } });
                // setCheck(true);
              }}
            >
              {likeIcon()}
            </IconContainer>
            <IconContainer p>
              <FiUpload id="blue" />
            </IconContainer>
          </SRow>
        </TweetContainer>
        <ReplyTweetButtons tweetId={tweetId} />
        <Replies />
      </>
    );
  }
}
