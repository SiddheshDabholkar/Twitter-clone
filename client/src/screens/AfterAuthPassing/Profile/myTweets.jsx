import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
//
import Tweet from "../../../components/Tweet/Tweet";
import ReTweet from "../../../components/Tweet/ReTweet";

const FETCH_MY_TWEETS = gql`
  query ($profileId: ID!) {
    getProfileTweets(profileId: $profileId) {
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
        createdAt
        updatedAt
      }
    }
  }
`;

const FETCH_MY_RETWEETS = gql`
  query ($profileId: ID!) {
    getProfileReTweets(profileId: $profileId) {
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
        createdAt
        updatedAt
      }
      tweet {
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
      }
    }
  }
`;

export default function MyTweets() {
  const { profileId } = useParams();
  const { data: mytweetsdata, loading: myTweetsloading } = useQuery(
    FETCH_MY_TWEETS,
    {
      variables: {
        profileId,
      },
    }
  );
  const { data: myretweetsdata, loading: myReTweetsloading } = useQuery(
    FETCH_MY_RETWEETS,
    {
      variables: {
        profileId,
      },
    }
  );
  const Tweets = () => {
    if (myTweetsloading) {
      return <h1>loading....</h1>;
    } else {
      const tweets = mytweetsdata && mytweetsdata.getProfileTweets;
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
    if (myReTweetsloading) {
      return <h1>loading.....</h1>;
    } else {
      const reTweets = myretweetsdata && myretweetsdata.getProfileReTweets;
      return (
        <>
          {reTweets.map((retweet) => (
            <ReTweet retweet={retweet} />
          ))}
        </>
      );
    }
  };
  return (
    <>
      <Tweets />
      {/* <ReTweets /> */}
    </>
  );
}
