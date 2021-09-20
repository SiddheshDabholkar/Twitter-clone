const { ApolloServer } = require("apollo-server");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB = process.env.MONGODB;
const PORT = process.env.PORT || 5000;

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  context: ({ req }) => ({ req }),
});

// if (process.env.NODE_ENV == "production") {
//   app.use(express.static("client/build"));
//   const path = require("path");
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to mongodb sucessfully");
    return server.listen({ port: PORT }).then((res) => {
      console.log(`server running at ${res.url}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
