const { gql } = require("apollo-server");

module.exports = gql`
  scalar Date
  type User {
    id: ID!
    username: String!
    password: String!
    phone: String
    email: String
    token: String
    createdAt: Date!
    updatedAt: Date!
    profilePic: String
    banner: String
    bio: String
    location: String
    website: String
    name: String
    following: [User]
    followers: [User]
  }
  type Tweet {
    id: ID!
    parentTweet: ID
    body: String!
    username: String
    createdAt: Date
    updatedAt: Date
    # likes: [Like]
    likes: [User!]
    photo: String
    user: User!
    tweet: Tweet
    reply: [Tweet]
  }
  type replies {
    id: ID!
    body: String
    username: String
    user: User!
    createdAt: Date
    updatedAt: Date
  }
  # input RegisterInput {
  # username: String
  # password: String!
  # confirmPassword: String!
  # phone: String
  # email: String
  # }

  # type Like {
  #   # createdAt: Date
  #   # updatedAt: Date
  #   user: User!
  # }

  type Query {
    getTweets: [Tweet]
    getUsers: [User]
    getUser(userId: ID!): User!
    getTweet(tweetId: ID!): Tweet!
    getUserTweets(profileId: ID!): [Tweet]
    getSearchedUser(username: String): [User]
    getReplies(tweetId: ID): [Tweet]
  }

  type Mutation {
    register(username: String!, password: String!): User!
    login(input: String!, password: String!): User!
    createTweet(body: String!, photo: String, tweetId: ID): Tweet!
    deleteTweet(tweetId: ID!): String
    likeTweet(tweetId: ID!): Tweet!
    reTweet(tweetId: ID!, body: String, photo: String): Tweet!
    editProfile(
      name: String
      username: String
      password: String
      email: String
      phone: String
      profilePic: String
      banner: String
      bio: String
      location: String
      website: String
      userId: ID!
    ): User!
    followUnfollow(otherUserId: ID!): User
  }
`;
