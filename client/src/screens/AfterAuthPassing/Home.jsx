import React from "react";
import { useQuery, gql } from "@apollo/client";
//
import useWindowSize from "../../hooks/useWindow";
//
import MakeTweet from "../../components/Tweet/MakeTweet";
import Tweet from "../../components/Tweet/Tweet";
import ReTweet from "../../components/Tweet/ReTweet";

export const FETCH_TWEET = gql`
  {
    getTweets {
      id
      body
      username
      createdAt
      photo
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
      tweet {
        id
        body
        username
        createdAt
      }
    }
  }
`;

export default function Home() {
  const { width } = useWindowSize();
  const { loading, data, error } = useQuery(FETCH_TWEET);

  const Tweets = () => {
    if (loading) {
      return <h1>loading....</h1>;
    } else {
      const tweets = data.getTweets;
      console.log("tweets", tweets);
      return (
        <>
          {tweets.map((data) => {
            const { tweet } = data;
            if (tweet === null) {
              return <Tweet tweet={data} />;
            } else {
              return <ReTweet retweet={data} />;
            }
          })}
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
    </>
  );
}
