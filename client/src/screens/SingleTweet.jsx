import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { FaRegComment, FaRetweet, FaRegHeart } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import { Avatar } from "../components/Avatar";
import { TweetContainer } from "../container/TweetContainer";
import {
  TweetContent,
  TweeterUsername,
  IconContainer,
  Row,
} from "../components/Tweet";

const SRow = styled(Row)`
  justify-content: space-around;
  margin: 15px;
`;
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
  const likeIcon = () => {
    if (liked) {
      return <MdFavorite id="red" style={{ color: "red" }} />;
    } else {
      return <FaRegHeart id="red" />;
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
    </>
  );
}
