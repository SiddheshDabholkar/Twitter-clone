import React from "react";
import MakeTweet from "../components/MakeTweet";
import Tweet from "../components/Tweet";
import FloatingButton from "../components/FloatingButton";

export default function Home() {
  return (
    <>
      <MakeTweet />
      <Tweet />
      <Tweet />
      <FloatingButton />
    </>
  );
}
