const { gql } = require("apollo-server");

module.exports = gql`
  type Tweet {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type User {
    id: ID!
    username: String!
    password: String!
    phone: String!
    email: String
  }
  type Query {
    getTweets: [Tweet]
    getUsers: [User]
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    phone: String!
    email: String!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
  }
`;
