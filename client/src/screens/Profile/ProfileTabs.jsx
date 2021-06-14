import React from "react";
import Tab, { TabPane } from "../../components/Tab";
import styled from "styled-components";
import FeatureNotReady from "../FeatureNotReady";
import MyTweets from "../Profile/myTweets";

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 98%;
`;

export default function ProfileTabs() {
  return (
    <>
      <TabContainer>
        <Tab>
          <TabPane name="Tweets" key="1">
            <MyTweets />
          </TabPane>
          <TabPane name="Tweets & replies" key="2">
            <FeatureNotReady />
          </TabPane>
          <TabPane name="Media" key="3">
            <FeatureNotReady />
          </TabPane>
          <TabPane name="likes" key="4">
            <FeatureNotReady />
          </TabPane>
        </Tab>
      </TabContainer>
    </>
  );
}
