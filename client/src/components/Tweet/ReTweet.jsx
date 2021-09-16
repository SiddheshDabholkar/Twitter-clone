import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
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
import useDropdown from "../../hooks/useDropdown";
import MoreList from "../Dropdown/MoreList";
import ReTweetD from "../Dropdown/ReTweetDropdown";
import ReTweetModal from "../Modals/ReTweetQuoteModal";

import { LIKE_TWEET_MUTATION } from "../../graphql/mutation";
import useModal from "../../hooks/useModal";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
export const TwetCon = styled(TweetContainer)`
  border: 1px solid #80808052;
  /* width: inherit; */
  width: ${({ full }) => (full ? "98%" : "inherit")};
  margin-right: ${({ full }) => (full ? "10px" : "")};
  border-radius: 15px;
  cursor: pointer;
  :hover {
    background-color: #8080800f;
  }
`;
export default function ReTweet(props) {
  const {
    retweet: {
      id,
      body,
      username,
      createdAt,
      // updatedAt,
      likes,
      user: {
        id: userid,
        // username: userUsername,
        // phone,
        // email,
        // createdAt: userCreatedAt,
        // updatedAt: userUpdatedAt,
        profilePic,
      },
      tweet: {
        id: tweetid,
        body: tweetBody,
        photo: tweetPhoto,
        username: tweetUsername,
        createdAt: tweetCreatedAt,
        // updatedAt: tweetUpdatedAt,
        user: { id: insideUserId, profilePic: insideUserProfilePic },
      },
    },
  } = props;

  const { user } = useContext(AuthContext);
  const [liked, setLiked] = useState(false);
  const hookretweetCreatedAt = useAgo(createdAt);
  const hooktweetCreatedAt = useAgo(tweetCreatedAt);

  const { Modal, toggle, setShow } = useModal(ReTweetModal);

  const {
    DropDown: ReTweetDropdown,
    show: showReTweetDropdown,
    toggle: toggleReTweetDropdown,
    setShow: setShowReTweetDropDown,
    showModal,
    setShowModal,
    toggleModal,
  } = useDropdown(ReTweetD);

  const {
    DropDown: MoreListDropdown,
    show: showMoreListDropdown,
    toggle: toggleMoreListDropdown,
    setShow: setShowMoreListDropdown,
  } = useDropdown(MoreList);

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

  const BottomButtons = ({ tweetId }) => {
    return (
      <>
        <Row
          style={{ justifyContent: "space-around" }}
          onClick={(e) => e.stopPropagation()}
        >
          <IconContainer onClick={(e) => e.preventDefault()}>
            <FaRegComment id="blue" />
          </IconContainer>
          <IconContainer
            onClick={(e) => {
              e.preventDefault();
              toggleReTweetDropdown();
            }}
          >
            <FaRetweet id="green" />
            {showReTweetDropdown && (
              <ReTweetDropdown
                tweetId={id}
                data={props}
                setShow={setShowReTweetDropDown}
                setShowModal={setShowModal}
                toggle={toggleReTweetDropdown}
              />
            )}
          </IconContainer>
          <IconContainer
            onClick={(e) => {
              e.preventDefault();
              likeTweet({ variables: { tweetId } });
            }}
          >
            {likeIcon()}
          </IconContainer>
          <IconContainer onClick={(e) => e.preventDefault()}>
            <FiUpload id="blue" />
          </IconContainer>
        </Row>
      </>
    );
  };

  const TweetInsideReTweet = () => {
    return (
      <SLink to={`/tweet/${tweetid}`} col>
        <TwetCon>
          <Container>
            <SAvatarContainer>
              <SAvatar
                small
                src={
                  insideUserProfilePic
                    ? insideUserProfilePic
                    : "https://res.cloudinary.com/drntday51/image/upload/v1627672437/rchs2sorpbxtkilgisyn.png"
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
                {tweetPhoto && (
                  <ImageContainer src={tweetPhoto} height="90%" width="90%" />
                )}
              </SLink>
            </Restcontainer>
          </Container>
        </TwetCon>
      </SLink>
    );
  };

  const MiddlePart = ({
    username,
    createdat,
    id,
    likeid,
    body,
    photo,
    tir,
  }) => {
    return (
      <>
        <Row>
          <Row>
            <TweeterUsername>{username}</TweeterUsername>
            <TweeterUsername small>
              {" . "}
              {createdat}
            </TweeterUsername>
          </Row>
          {user.id === userid && (
            <IconContainer onClick={(e) => e.preventDefault()}>
              <BsThreeDots onClick={toggleMoreListDropdown} />
            </IconContainer>
          )}
        </Row>
        {showMoreListDropdown && (
          <MoreListDropdown
            onClick={(e) => e.preventDefault()}
            tweetId={id}
            setShow={setShowMoreListDropdown}
          />
        )}
        <Row>
          <TweetContent>{body}</TweetContent>
        </Row>
        {photo && <ImageContainer src={photo} height="90%" width="90%" />}
        {tir && <TweetInsideReTweet />}
        <BottomButtons tweetId={likeid} />
      </>
    );
  };

  if (body.length === 0 || body === null) {
    return (
      <>
        <SLink to={`/tweet/${id}`} col>
          <Above style={{ marginLeft: "15%" }}>
            <RetweetIconContainer>
              <FaRetweet style={{ color: "grey" }} />
            </RetweetIconContainer>
            <RetweetedHeadingContainer>
              <RetweetedHeading>{username} retweeted</RetweetedHeading>
            </RetweetedHeadingContainer>
          </Above>
          <STweetContainer>
            <SAvatarContainer>
              <Link to={`profile/${insideUserId}`}>
                <SAvatar
                  src={
                    insideUserProfilePic
                      ? insideUserProfilePic
                      : "https://res.cloudinary.com/drntday51/image/upload/v1627672437/rchs2sorpbxtkilgisyn.png"
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
              <MiddlePart
                username={tweetUsername}
                createdat={hooktweetCreatedAt}
                id={id}
                likeid={tweetid}
                body={tweetBody}
                photo={tweetPhoto}
                tir={false}
              />
            </Restcontainer>
          </STweetContainer>
        </SLink>
        {showModal && (
          <Modal
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            toggle={toggle}
            data={props}
            setShow={setShow}
            setShowModal={setShowModal}
            toggleModal={toggleModal}
          />
        )}
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
                      : "https://res.cloudinary.com/drntday51/image/upload/v1627672437/rchs2sorpbxtkilgisyn.png"
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
              <MiddlePart
                username={username}
                createdat={hookretweetCreatedAt}
                id={id}
                likeid={id}
                body={body}
                photo={null}
                tir={true}
              />
            </Restcontainer>
          </STweetContainer>
        </SLink>
        {showModal && (
          <Modal
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            toggle={toggle}
            data={props}
            setShow={setShow}
            setShowModal={setShowModal}
            toggleModal={toggleModal}
          />
        )}
      </>
    );
  }
}
