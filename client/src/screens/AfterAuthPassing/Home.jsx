import { useContext, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
//
import useWindowSize from "../../hooks/useWindow";
//
import MakeTweet from "../../components/Tweet/MakeTweet";
import Tweet from "../../components/Tweet/Tweet";
import ReTweet from "../../components/Tweet/ReTweet";
import { AuthContext } from "../../context/auth";

//NOTE:
//There is a problem with likes field when
const FETCH_USER = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      id
      username
      phone
      email
      profilePic
      banner
      bio
      location
      website
      name
    }
  }
`;
export const FETCH_TWEET = gql`
  {
    getTweets {
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
  const { user, dispatch } = useContext(AuthContext);
  const { loading, data, error } = useQuery(FETCH_TWEET);
  const { loading: userLoading, data: userdata } = useQuery(FETCH_USER, {
    variables: { userId: user.id },
  });
  useEffect(() => {
    if (userdata) {
      const u = userdata.getUser;
      console.log("u", u);
      dispatch({
        type: "LOGIN",
        payload: u,
      });
    }
  }, [userdata]);

  const Tweets = () => {
    if (loading) {
      return <h1>loading....</h1>;
    } else {
      if (data === undefined) {
        return <h1>lol.. no one is using your platform</h1>;
      }
      const tweets = data.getTweets;
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
