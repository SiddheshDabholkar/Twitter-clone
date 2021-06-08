import React from "react";
import { HomeContainer } from "../container/HomeContainer";
import SideBar from "./Home/SideBar";
import Middle from "./Home/Middle";
import WhatsHappening from "./Home/WhatsHappening";
import Footer from "./Home/Footer";

export default function Home() {
  return (
    <>
      <HomeContainer>
        <SideBar />
        <Middle />
        <WhatsHappening />
      </HomeContainer>
    </>
  );
}
