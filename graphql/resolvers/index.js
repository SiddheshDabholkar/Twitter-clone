const tweetsResolvers = require("./tweet");
const usersResolvers = require("./users");
const retweetResolvers = require("./reTweet");
const replyResolvers = require("./reply");

module.exports = {
  Query: {
    ...tweetsResolvers.Query,
    ...usersResolvers.Query,
    ...retweetResolvers.Query,
    ...replyResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...tweetsResolvers.Mutation,
    ...retweetResolvers.Mutation,
    ...replyResolvers.Mutation,
  },
};
