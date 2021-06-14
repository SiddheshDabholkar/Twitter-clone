import WelcomePage from "./screens/Welcome";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Confirmotp from "./screens/Confirmotp";
import Profile from "./screens/Profile";
import Home from "./screens/Home";
import {
  Route,
  useLocation,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { HomeContainer } from "./container/HomeContainer";
import SideBar from "./screens/common/SideBar";
import WhatsHappening from "./screens/common/WhatsHappening";
import { MiddleContainer } from "./container/MiddleContainer";
import { RestContainer } from "./container/RestContainer";
import Navbar from "./screens/common/Navbar";
import Footer from "./screens/common/Footer";
import FeaturesNotReady from "./screens/FeatureNotReady";
import FloatingButton from "./components/FloatingButton";

const Routing = () => {
  let location = useLocation();
  const background = location.state && location.state.background;
  return (
    <>
      <Switch location={background || location}>
        <Route exact path="/" component={WelcomePage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/confirmotp" component={Confirmotp} />
        <HomeContainer>
          <SideBar />
          <MiddleContainer>
            <Navbar />
            <RestContainer>
              <Route exact path="/profile/:profileId" component={Profile} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/explore" component={FeaturesNotReady} />
              <Route exact path="/notification" component={FeaturesNotReady} />
              <Route exact path="/messages" component={FeaturesNotReady} />
              <Route exact path="/bookmarks" component={FeaturesNotReady} />
              <Route exact path="/lists" component={FeaturesNotReady} />
              <Route exact path="/more" component={FeaturesNotReady} />
              <FloatingButton />
            </RestContainer>
            <Footer />
          </MiddleContainer>
          <WhatsHappening />
        </HomeContainer>
      </Switch>
      {background && <Route path="/signup" children={<Signup />} />}
      {background && <Route path="/confirmotp" children={<Confirmotp />} />}
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
