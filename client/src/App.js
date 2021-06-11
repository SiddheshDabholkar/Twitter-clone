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

const Routing = () => {
  let location = useLocation();
  const background = location.state && location.state.background;
  return (
    <>
      <Switch location={background || location}>
        <Route exact path="/">
          <WelcomePage />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/confirmotp">
          <Confirmotp />
        </Route>
        <HomeContainer>
          <SideBar />
          <MiddleContainer>
            <Navbar />
            <RestContainer>
              <Route exact path="/profile">
                <Profile />
              </Route>
              <Route exact path="/home">
                <Home />
              </Route>
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
