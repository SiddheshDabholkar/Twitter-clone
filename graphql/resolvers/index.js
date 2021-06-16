const tweetsResolvers = require("./tweet");
const usersResolvers = require("./users");
const retweetResolvers = require("./reTweet");

module.exports = {
  Query: {
    ...tweetsResolvers.Query,
    ...usersResolvers.Query,
    ...retweetResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...tweetsResolvers.Mutation,
    ...retweetResolvers.Mutation,
  },
};
