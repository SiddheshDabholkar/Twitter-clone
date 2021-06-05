const tweetsResolvers = require("./tweet");
const usersResolvers = require("./users");

module.exports = {
  Query: {
    ...tweetsResolvers.Query,
    ...usersResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...tweetsResolvers.Mutation,
  },
};
