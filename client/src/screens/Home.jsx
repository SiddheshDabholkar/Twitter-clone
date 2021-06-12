import React from "react";
import MakeTweet from "../components/MakeTweet";
import Tweet from "../components/Tweet";
import { useQuery, gql } from "@apollo/client";

const FETCH_TWEET = gql`
  {
    getTweets {
      id
      body
      username
      createdAt
      updatedAt
    }
  }
`;

export default function Home() {
  const { loading, data } = useQuery(FETCH_TWEET);
  if (loading) {
    return <h1>loading...</h1>;
  } else {
    const tweets = data.getTweets;
    console.log(tweets);
    return (
      <>
        <MakeTweet />
        {tweets.map((tweet) => (
          <Tweet tweet={tweet} />
        ))}
      </>
    );
  }
}
