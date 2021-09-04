import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
//
import Tweet from "../../../components/Tweet/Tweet";
import ReTweet from "../../../components/Tweet/ReTweet";
import { FETCH_MY_TWEETS } from "../../../graphql/queries";

export default function MyTweets() {
  const { profileId } = useParams();
  const { data, loading } = useQuery(FETCH_MY_TWEETS, {
    variables: {
      profileId,
    },
  });
  if (loading) {
    return <h1>loading....</h1>;
  } else {
    if (data === undefined) {
      return <h1>waiting for your first tweet</h1>;
    } else {
      const tweets = data.getUserTweets;
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
  }
}
