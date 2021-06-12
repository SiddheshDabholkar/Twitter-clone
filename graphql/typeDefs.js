const { gql } = require("apollo-server");

module.exports = gql`
  scalar Date
  type Tweet {
    id: ID!
    body: String!
    username: String
    createdAt: Date
    updatedAt: Date
  }
  type reTweet {
    id: ID!
    body: String!
    username: String
    createdAt: Date
    updatedAt: Date
  }
  type User {
    id: ID!
    username: String
    password: String!
    phone: String
    email: String
    token: String
    createdAt: Date
    updatedAt: Date
  }
  input RegisterInput {
    username: String
    password: String!
    confirmPassword: String!
    phone: String
    email: String
  }
  type Query {
    getTweets: [Tweet]
    getUsers: [User]
    getTweet(tweetId: ID!): Tweet!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(input: String!, password: String!): User!
    createTweet(body: String!): Tweet!
    deleteTweet(tweetId: ID!): String
    createComment(tweetId: String!, body: String!): Tweet!
    deleteComment(tweetId: ID!, commentId: ID!): Tweet!
    likeTweet(tweetId: ID!): Tweet!
    reTweets(tweetId: ID!, body: String!): reTweet!
  }
`;
