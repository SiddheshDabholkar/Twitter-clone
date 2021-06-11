import React from "react";
import MakeTweet from "../components/MakeTweet";
import Tweet from "../components/Tweet";
export default function Home() {
  return (
    <>
      <MakeTweet />
      <Tweet />
      <Tweet />
    </>
  );
}
