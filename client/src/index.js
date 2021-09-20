import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const url =
  process.env.NODE_ENV === "production"
    ? "https://tweeetr.herokuapp.com/"
    : "http://localhost:5000";

const httpLink = new HttpLink({
  // uri: "http://localhost:5000",
  // uri: "https://tweeetr.herokuapp.com/",
  uri: url,
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
