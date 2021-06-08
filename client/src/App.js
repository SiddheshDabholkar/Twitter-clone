import WelcomePage from "./screens/Welcome";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Confirmotp from "./screens/Confirmotp";
import {
  Route,
  useLocation,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { AuthProvider } from "./context/auth";
import Profile from "./screens/Profile";

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
        <Route exact path="/profile">
          <Profile />
        </Route>
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
