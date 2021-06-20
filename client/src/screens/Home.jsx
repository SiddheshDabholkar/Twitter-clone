import React from "react";
import MakeTweet from "../components/MakeTweet";
import Tweet from "../components/Tweet";
import ReTweet from "../components/ReTweet";
import { useQuery, gql } from "@apollo/client";
import useWindowSize from "../hooks/useWindow";

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
            <Tweet tweet={tweet} />
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
