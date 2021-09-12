import React, { useState, useRef } from "react";
import { FaRetweet } from "react-icons/fa";
import { BsPencil } from "react-icons/bs";
import styled from "styled-components";
import { Dropdown, Ul, Li } from "./DropDownUtils";
import { useMutation } from "@apollo/client";

import { MAKE_RETWEET } from "../../graphql/mutation";
import { FETCH_TWEET } from "../../graphql/queries";
import useOnClickOutside from "../../hooks/useOnClickOutsideRef";

const Span = styled.span`
  font-size: 15px;
  margin-left: 8px;
`;

export default function ReTweetDropdown(props) {
  const ref = useRef(null);
  const { tweetId, setShow: sShow, setShowModal, toggle } = props;
  const [body] = useState("");
  useOnClickOutside(ref, () => sShow(false));

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
      sShow(false);
    },
  });

  return (
    <>
      <Dropdown
        ref={ref}
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
          <Li
            onClick={(e) => {
              setShowModal(true);
              toggle();
            }}
          >
            <FaRetweet />
            <Span>Quote Tweet</Span>
          </Li>
        </Ul>
      </Dropdown>
    </>
  );
}
