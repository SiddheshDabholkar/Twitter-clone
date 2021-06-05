const { gql } = require("apollo-server");

module.exports = gql`
  type Tweet {
    id: ID!
    body: String!
    username: String
  }
  type User {
    id: ID!
    username: String
    password: String!
    phone: String
    email: String
  }
  input RegisterInput {
    username: String
    password: String!
    confirmPassword: String!
    phone: String
    email: String
  }
  input LoginInput {
    username: String
    password: String!
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
    login(loginInput: LoginInput): User!
    createTweet(body: String!): Tweet!
    deleteTweet(tweetId: ID!): String
    createComment(tweetId: String!, body: String!): Tweet!
    deleteComment(tweetId: ID!, commentId: ID!): Tweet!
    likeTweet(tweetId: ID!): Tweet!
  }
`;
