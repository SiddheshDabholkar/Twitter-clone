import React from "react";
import Tab, { TabPane } from "../../components/Tab";
import styled from "styled-components";

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
            1
          </TabPane>
          <TabPane name="Tweets & replies" key="2">
            2
          </TabPane>
          <TabPane name="Media" key="3">
            3
          </TabPane>
          <TabPane name="likes" key="4">
            4
          </TabPane>
        </Tab>
      </TabContainer>
    </>
  );
}
