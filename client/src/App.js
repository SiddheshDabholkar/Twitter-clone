import {
  Route,
  useLocation,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
//
import WelcomePage from "./screens/BeforeAuthPassing/Welcome";
import Login from "./screens/BeforeAuthPassing/Login";
import Signup from "./screens/BeforeAuthPassing/Signup";
// import Confirmotp from "./screens/BeforeAuthPassing/Confirmotp";
import Profile from "./screens/AfterAuthPassing/Profile";
import Home from "./screens/AfterAuthPassing/Home";
//
import SideBar from "./screens/Mobile/SideBar";
import Navbar from "./screens/Mobile/Navbar";
import Footer from "./screens/Mobile/Footer";
//
import { HomeContainer } from "./container/HomeContainer";
import { MiddleContainer } from "./container/MiddleContainer";
import { RestContainer } from "./container/RestContainer";
//
import WhatsHappening from "./screens/AfterAuthPassing/WhatsHappening";
import FeaturesNotReady from "./screens/AfterAuthPassing/FeatureNotReady";
// import MakeTweet from "./components/Tweet/MakeTweet";
import SingleTweet from "./components/Tweet/SingleTweet";
//
import { AuthProvider } from "./context/auth";
//
import FloatingButton from "./components/Buttons/FloatingButton";
import Explore from "./screens/AfterAuthPassing/Explore";
//
const Routing = () => {
  let location = useLocation();
  const background = location.state && location.state.background;
  return (
    <>
      <Switch location={background || location}>
        <Route exact path="/" component={WelcomePage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        {/* <Route exact path="/confirmotp" component={Confirmotp} /> */}
        <HomeContainer>
          <SideBar />
          <MiddleContainer>
            <Navbar />
            <RestContainer>
              <Route exact path="/profile/:profileId" component={Profile} />
              <Route exact path="/tweet/:tweetId" component={SingleTweet} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/explore" component={Explore} />
              <Route exact path="/notification" component={FeaturesNotReady} />
              <Route exact path="/messages" component={FeaturesNotReady} />
              <Route exact path="/bookmarks" component={FeaturesNotReady} />
              <Route exact path="/lists" component={FeaturesNotReady} />
              <Route exact path="/more" component={FeaturesNotReady} />
              {/* <Route exact path="/composetweet" component={MakeTweet} /> */}
              <FloatingButton />
            </RestContainer>
            <Footer />
          </MiddleContainer>
          <WhatsHappening />
        </HomeContainer>
      </Switch>
      {background && <Route path="/signup" children={<Signup />} />}
      {/* {background && <Route path="/confirmotp" children={<Confirmotp />} />} */}
    </>
  );
};

export default function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routing />
        </Router>
      </AuthProvider>
    </>
  );
}
