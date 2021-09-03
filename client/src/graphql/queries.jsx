import { gql } from "@apollo/client";

export const GET_SINGLE_TWEET = gql`
  query ($tweetId: ID!) {
    getTweet(tweetId: $tweetId) {
      id
      body
      username
      createdAt
      updatedAt
      likes {
        id
      }
      photo
      user {
        id
        username
        profilePic
      }
      replies {
        id
        body
        username
        createdAt
        updatedAt
      }
    }
  }
`;
export const FETCH_USER = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      id
      username
      phone
      email
      profilePic
      banner
      bio
      location
      website
      name
      following {
        id
      }
      followers {
        id
      }
    }
  }
`;
export const FETCH_TWEET = gql`
  {
    getTweets {
      id
      body
      username
      createdAt
      photo
      updatedAt
      likes {
        id
        username
        phone
        email
        profilePic
        banner
        bio
        location
        website
        name
      }
      user {
        id
        username
        phone
        email
        token
        createdAt
        updatedAt
        profilePic
      }
      tweet {
        id
        body
        username
        createdAt
        user {
          id
          profilePic
        }
      }
    }
  }
`;
export const FETCH_MY_TWEETS = gql`
  query ($profileId: ID!) {
    getUserTweets(profileId: $profileId) {
      id
      body
      username
      createdAt
      photo
      updatedAt
      likes {
        id
      }
      user {
        id
        username
        phone
        email
        token
        createdAt
        updatedAt
        profilePic
        banner
        bio
        location
        website
        name
      }
      tweet {
        id
        body
        username
        createdAt
      }
    }
  }
`;
export const GET_USER_DATA = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      name
      website
      location
      bio
      profilePic
      banner
    }
  }
`;
export const FETCH_SEARCHED_USER = gql`
  query getSearchedUser($username: String) {
    getSearchedUser(username: $username) {
      id
      username
      phone
      email
      createdAt
      updatedAt
      profilePic
      banner
      bio
      location
      website
      name
    }
  }
`;
