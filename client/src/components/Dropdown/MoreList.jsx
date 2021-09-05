import React, { useRef } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { RiDeleteBinLine } from "react-icons/ri";
import { FETCH_TWEET } from "../../graphql/queries";
import { DELETE_TWEET } from "../../graphql/mutation";
import useOnClickOutside from "../../hooks/useOnClickOutsideRef";

const ListModalContainer = styled.div`
  display: flex;
  width: 100%;
  height: 0px;
  overflow: visible;
  flex-direction: column;
  background-color: blue;
  align-items: flex-end;
  justify-content: flex-start;
`;

const ListModal = styled.div`
  width: 40%;
  z-index: 1;
  height: auto;
  margin: -2% 6% 0px 0px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: -10px 9px 36px -10px rgba(110, 110, 110, 0.69);
  -webkit-box-shadow: -10px 9px 36px -10px rgba(110, 110, 110, 0.69);
  -moz-box-shadow: -10px 9px 36px -10px rgba(110, 110, 110, 0.69);
`;

const ListBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px;
  width: 100%;
  :nth-child(1) {
    padding-top: 20px;
  }
  :last-child {
    padding-bottom: 20px;
  }
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20%;
`;
const ListNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 80%;
`;
export default function MoreList(props) {
  const { tweetId, setShow } = props;
  const ref = useRef(null);
  useOnClickOutside(ref, () => setShow(false));
  const [deleteTweet] = useMutation(DELETE_TWEET, {
    variables: { tweetId },
    update(proxy, result) {
      const d = proxy.readQuery({
        query: FETCH_TWEET,
      });
      const filteredData = d.getTweets.filter(
        (i) => i.id !== result.data.deleteTweet
      );
      proxy.writeQuery({
        query: FETCH_TWEET,
        data: {
          getTweets: filteredData,
        },
      });
    },
  });
  return (
    <>
      <ListModalContainer ref={ref}>
        <ListModal>
          <ListBox onClick={deleteTweet}>
            <IconContainer>
              <RiDeleteBinLine style={{ color: "black" }} />
            </IconContainer>
            <ListNameContainer>
              <span style={{ color: "black" }} onClick={deleteTweet}>
                delete
              </span>
            </ListNameContainer>
          </ListBox>
        </ListModal>
      </ListModalContainer>
    </>
  );
}
