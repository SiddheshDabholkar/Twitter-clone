import { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
};

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (userdata) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userdata) {
    localStorage.setItem("jwtToken", userdata.token);
    dispatch({
      type: "LOGIN",
      payload: userdata,
    });
  }

  function logout() {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("jwtToken");
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout, dispatch }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
