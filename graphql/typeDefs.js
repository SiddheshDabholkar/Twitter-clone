const { gql } = require("apollo-server");

module.exports = gql`
  scalar Date
  type User {
    id: ID!
    username: String
    password: String!
    phone: String
    email: String
    token: String
    createdAt: Date
    updatedAt: Date
    tweet: Tweet
    ReTweet: reTweet
  }
  type Tweet {
    id: ID!
    body: String!
    username: String
    createdAt: Date
    updatedAt: Date
    likes: [Like]
    user: User!
    replies: [replies]
  }
  type reTweet {
    id: ID!
    body: String
    username: String
    createdAt: Date
    updatedAt: Date
    likes: [Like]
    tweet: Tweet
    user: User!
  }
  type replies {
    id: ID!
    body: String
    username: String
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

  type Like {
    id: ID
    createdAt: String
    username: String
  }

  type Query {
    getTweets: [Tweet]
    getUsers: [User]
    getUser(userId: ID!): User!
    getTweet(tweetId: ID!): Tweet!
    getReTweets: [reTweet]
    getProfileTweets(profileId: ID!): [Tweet]
    getProfileReTweets(profileId: ID!): [reTweet]
    getReplies(tweetId: ID!): [replies!]!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(input: String!, password: String!): User!
    createTweet(body: String!): Tweet!
    deleteTweet(tweetId: ID!): String
    createReply(tweetId: String!, body: String!): Tweet!
    deleteReply(tweetId: ID!, replyId: ID!): Tweet!
    likeTweet(tweetId: ID!): Tweet!
    likeReTweet(reTweetId: ID!): reTweet!
    reTweets(tweetId: ID!, body: String): reTweet!
  }
`;
