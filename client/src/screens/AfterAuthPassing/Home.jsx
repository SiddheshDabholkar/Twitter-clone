import React from "react";
import { useQuery, gql } from "@apollo/client";
//
import useWindowSize from "../../hooks/useWindow";
//
import MakeTweet from "../../components/Tweet/MakeTweet";
import Tweet from "../../components/Tweet/Tweet";
import ReTweet from "../../components/Tweet/ReTweet";
import useModal from "../../hooks/useModal";
import TweetUtils from "../../components/Modals/TweetUtils";

const FETCH_TWEET = gql`
  {
    getTweets {
      id
      body
      username
      createdAt
      updatedAt
      likes {
        id
        createdAt
        username
      }
      user {
        id
        username
        phone
        email
        token
        createdAt
        updatedAt
      }
    }
  }
`;

const FETCH_RETWEET = gql`
  {
    getReTweets {
      id
      body
      username
      updatedAt
      createdAt
      tweet {
        id
        body
        username
        createdAt
      }
      likes {
        id
        createdAt
        username
      }
      user {
        id
        username
        phone
        email
        createdAt
        updatedAt
      }
    }
  }
`;

export default function Home() {
  const { width } = useWindowSize();
  const [Modal, show, toggle] = useModal(TweetUtils);
  const {
    loading: fetchTweetLoading,
    data: fetchTweetData,
    error: fetchTweetError,
  } = useQuery(FETCH_TWEET);
  const {
    loading: fetchRetWeetLoading,
    data: fetchReTweetData,
    error: fetchReTweetError,
  } = useQuery(FETCH_RETWEET);

  const Tweets = () => {
    if (fetchTweetLoading) {
      return <h1>loading....</h1>;
    } else {
      const tweets = fetchTweetData.getTweets;
      return (
        <>
          {tweets.map((tweet) => (
            <Tweet tweet={tweet} toggle={toggle} />
          ))}
        </>
      );
    }
  };
  const ReTweets = () => {
    if (fetchRetWeetLoading) {
      return <h1>loading....</h1>;
    } else {
      const reTweet = fetchReTweetData.getReTweets;
      return (
        <>
          {reTweet.map((retweet) => (
            <ReTweet retweet={retweet} />
          ))}
        </>
      );
    }
  };
  const DecideMakeTweet = () => {
    if (width > 500) {
      return <MakeTweet />;
    } else return null;
  };
  return (
    <>
      <DecideMakeTweet />
      <Tweets />
      <ReTweets />
    </>
  );
}
