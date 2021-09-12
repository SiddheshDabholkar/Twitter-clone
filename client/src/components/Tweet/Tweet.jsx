import { useContext, useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
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
import MoreList from "../Dropdown/MoreList";
import ReTweetModal from "../Modals/ReTweetQuoteModal";

import { LIKE_TWEET_MUTATION } from "../../graphql/mutation";

export default function Tweet(props) {
  const {
    tweet: {
      id,
      body,
      username,
      createdAt,
      photo,
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
    },
  } = props;
  const { user } = useContext(AuthContext);
  const [liked, setLiked] = useState(false);

  const { Modal, toggle, setShow } = useModal(ReTweetModal);

  const {
    DropDown: ReTweetDropdown,
    show: showReTweetDropdown,
    toggle: toggleReTweetDropdown,
    setShow: setShowReTweetDropDown,
    showModal,
    setShowModal,
    toggleModal,
  } = useDropdown(ReTweet);

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
  return (
    <>
      <SLink to={`/tweet/${id}`} col key={id}>
        <STweetContainer no>
          <SAvatarContainer>
            <Link to={`/profile/${userid}`}>
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
            <Row>
              <Row>
                <TweeterUsername>{username}</TweeterUsername>
                <TweeterUsername small>
                  {" . "}
                  {useAgo(createdAt)}
                </TweeterUsername>
              </Row>
              {user.id === userid && (
                <IconContainer onClick={(e) => e.preventDefault()} p>
                  <BsThreeDots onClick={toggleMoreListDropdown} />
                </IconContainer>
              )}
            </Row>
            <Row onClick={(e) => e.preventDefault()}>
              {showMoreListDropdown && (
                <MoreListDropdown
                  onClick={(e) => e.preventDefault()}
                  tweetId={id}
                  setShow={setShowMoreListDropdown}
                />
              )}
            </Row>

            <Row>
              <TweetContent>{body}</TweetContent>
            </Row>
            {photo && <ImageContainer src={photo} height="90%" width="90%" />}
            <Row style={{ justifyContent: "space-around" }}>
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
