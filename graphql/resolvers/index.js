const tweetsResolvers = require("./tweet");
const usersResolvers = require("./users");
const replyResolvers = require("./reply");

module.exports = {
  Query: {
    ...tweetsResolvers.Query,
    ...usersResolvers.Query,
    ...replyResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...tweetsResolvers.Mutation,
    ...replyResolvers.Mutation,
  },
};
