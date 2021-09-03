import { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
//
import useWindowSize from "../../hooks/useWindow";
//
import MakeTweet from "../../components/Tweet/MakeTweet";
import Tweet from "../../components/Tweet/Tweet";
import ReTweet from "../../components/Tweet/ReTweet";
import { AuthContext } from "../../context/auth";
import { FETCH_TWEET, FETCH_USER } from "../../graphql/queries";

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
      dispatch({
        type: "LOGIN",
        payload: u,
      });
    }
  }, [userdata, dispatch]);

  const Tweets = () => {
    if (loading) {
      return <h1>loading....</h1>;
    } else {
      if (data.getTweets === undefined || null) {
        return <h1>undefined</h1>;
      } else if (data.getTweets.length === 0) {
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
