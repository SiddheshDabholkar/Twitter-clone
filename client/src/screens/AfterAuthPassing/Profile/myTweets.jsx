import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
//
import Tweet from "../../../components/Tweet/Tweet";
import ReTweet from "../../../components/Tweet/ReTweet";

const FETCH_MY_TWEETS = gql`
  query ($profileId: ID!) {
    getUserTweets(profileId: $profileId) {
      id
      body
      username
      createdAt
      photo
      updatedAt
      # likes {
      #   id
      #   createdAt
      #   username
      # }
      user {
        id
        username
        phone
        email
        token
        createdAt
        updatedAt
        profilePic
        banner
        bio
        location
        website
        name
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
