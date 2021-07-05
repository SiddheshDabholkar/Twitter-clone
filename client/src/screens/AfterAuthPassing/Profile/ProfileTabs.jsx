import Tab, { TabPane } from "../../../components/Tab";
import FeatureNotReady from "../FeatureNotReady";
import MyTweets from "../Profile/myTweets";

export default function ProfileTabs() {
  return (
    <>
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
    </>
  );
}
