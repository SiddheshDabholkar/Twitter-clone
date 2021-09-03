import React, { useContext, useState } from "react";
import { FaRetweet } from "react-icons/fa";
import { BsPencil } from "react-icons/bs";
import styled from "styled-components";
import { Dropdown, Ul, Li } from "./DropDownUtils";
import { gql, useMutation } from "@apollo/client";
import { AuthContext } from "../../context/auth";
import { FETCH_TWEET } from "../../screens/AfterAuthPassing/Home";
import ReTweetModal from "../Modals/ReTweetQuoteModal";
import useModal from "../../hooks/useModal";

const Span = styled.span`
  font-size: 15px;
  margin-left: 8px;
`;

const MAKE_RETWEET = gql`
  mutation reTweet($body: String, $tweetId: ID!) {
    reTweet(body: $body, tweetId: $tweetId) {
      id
      body
      username
      createdAt
      updatedAt
      likes {
        id
        username
        phone
        email
        profilePic
        banner
        bio
        location
        website
        name
      }
      user {
        id
        username
        phone
        email
        token
        createdAt
        updatedAt
        profilePic
      }
      tweet {
        id
        body
        username
        createdAt
        user {
          id
          profilePic
        }
      }
    }
  }
`;
export default function ReTweetDropdown({ tweetId }) {
  const { user } = useContext(AuthContext);
  const [body] = useState("");
  const { Modal, show, toggle } = useModal(ReTweetModal);

  const [makeReTweet] = useMutation(MAKE_RETWEET, {
    variables: { body, tweetId },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_TWEET,
      });
      proxy.writeQuery({
        query: FETCH_TWEET,
        data: {
          getTweets: [result.data.reTweet, ...data.getTweets],
        },
      });
    },
  });

  return (
    <>
      <Dropdown
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <Ul>
          <Li onClick={makeReTweet}>
            <BsPencil />
            <Span>Retweet</Span>
          </Li>
          <Li onClick={toggle}>
            <FaRetweet />
            <Span>Quote Tweet</Span>
          </Li>
        </Ul>
      </Dropdown>
      {show && <Modal onClick={(e) => e.preventDefault()} />}
    </>
  );
}
