import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($input: String!, $password: String!) {
    login(input: $input, password: $password) {
      token
      username
      phone
      email
      id
    }
  }
`;
export const SIGN_UP = gql`
  mutation register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      id
      username
      token
    }
  }
`;
export const DELETE_TWEET = gql`
  mutation deleteTweet($tweetId: ID!) {
    deleteTweet(tweetId: $tweetId)
  }
`;
export const EDIT_PROFILE = gql`
  mutation editProfile(
    $name: String
    $username: String
    $password: String
    $email: String
    $phone: String
    $profilePic: String
    $banner: String
    $bio: String
    $location: String
    $website: String
    $userId: ID!
  ) {
    editProfile(
      name: $name
      username: $username
      password: $password
      email: $email
      phone: $phone
      profilePic: $profilePic
      banner: $banner
      bio: $bio
      location: $location
      website: $website
      userId: $userId
    ) {
      name
      website
      location
      bio
      profilePic
      banner
    }
  }
`;
export const MAKE_TWEET = gql`
  mutation createTweet($body: String!, $photo: String, $tweetId: ID) {
    createTweet(body: $body, photo: $photo, tweetId: $tweetId) {
      id
      body
      username
      createdAt
      updatedAt
      photo
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
export const LIKE_TWEET_MUTATION = gql`
  mutation likeTweet($tweetId: ID!) {
    likeTweet(tweetId: $tweetId) {
      id
      username
      photo
      body
      likes {
        id
      }
    }
  }
`;
export const FOLLOW_UNFOLLOW = gql`
  mutation followUnfollow($otherUserId: ID!) {
    followUnfollow(otherUserId: $otherUserId) {
      id
      username
      following {
        id
      }
      followers {
        id
      }
    }
  }
`;
export const MAKE_RETWEET = gql`
  mutation reTweet($body: String, $tweetId: ID!, $photo: String) {
    reTweet(body: $body, tweetId: $tweetId, photo: $photo) {
      id
      body
      username
      createdAt
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
