import WelcomePage from "./screens/Welcome";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import {
  Route,
  useLocation,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

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
      </Switch>
      {background && <Route path="/signup" children={<Signup />} />}
    </>
  );
};

export default function App() {
  return (
    <>
      <Router>
        <Routing />
      </Router>
    </>
  );
}
