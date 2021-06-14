import React from "react";
import MakeTweet from "../components/MakeTweet";
import Tweet from "../components/Tweet";
import ReTweet from "../components/ReTweet";
import { useQuery, gql } from "@apollo/client";

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
        username
      }
    }
  }
`;

// const FETCH_RETWEET = gql``;

export default function Home() {
  const { loading, data, error } = useQuery(FETCH_TWEET);
  if (loading) {
    return <h1>Loading....</h1>;
  } else if (error) {
    return `Error! ${error.message}`;
  } else {
    // const tweets = data.getTweets;
    // console.log(tweets);
    return (
      <>
        <MakeTweet />
        {/* {tweets.map((tweet) => (
          <Tweet tweet={tweet} />
        ))} */}
        {/* <ReTweet /> */}
      </>
    );
  }
}
