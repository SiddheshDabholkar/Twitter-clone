const { AuthenticationError, UserInputError } = require("apollo-server-errors");
const Tweet = require("../../model/Tweet");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
  Query: {
    async getTweets() {
      try {
        const tweets = await Tweet.find().sort({ createdAt: -1 });
        return tweets;
      } catch (e) {
        throw new Error(e);
      }
    },

    async getTweet(_, { tweetId }) {
      try {
        const tweet = await Tweet.findById(tweetId);
        if (tweet) {
          return tweet;
        } else {
          throw new Error("Tweet not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    //*-----------------------------------//
    async createTweet(_, { body }, context) {
      const user = checkAuth(context);
      // console.log("craete tweet user-->", user);

      if (body.trim() === "") {
        throw new Error("Post body cannot be empty");
      }
      const newTweet = new Tweet({
        body,
        user: user.id,
        username: user.username,
      });
      const tweet = await newTweet.save();
      // console.log("tweet ---->", tweet);
      return tweet;
    },
    //*-----------------------------------//
    async deleteTweet(_, { tweetId }, context) {
      const user = checkAuth(context);
      try {
        const tweet = await Tweet.findById(tweetId);
        if (user.username === tweet.username) {
          await tweet.delete();
          return "Tweet deleted sucessfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    //*-----------------------------------//
    async createComment(_, { tweetId, body }, context) {
      const { username } = checkAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must nt be empty",
          },
        });
      }
      const tweet = await Tweet.findById(tweetId);
      if (tweet) {
        tweet.comments.unshift({
          body,
          username,
        });
        await tweet.save();
        return tweet;
      } else throw new UserInputError("Tweet not found");
    },
    //*-----------------------------------//
    async deleteComment(_, { tweetId, commentId }, context) {
      const { username } = checkAuth(context);
      const tweet = await Tweet.findById(tweetId);
      if (tweet) {
        const commentIndex = tweet.comments.findIndex(
          (c) => c.id === commentId
        );
        if (tweet.comments[commentIndex].username === username) {
          tweet.comments.splice(commentIndex, 1);
          await tweet.save();
          return tweet;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("Tweet not found");
      }
    },
    //*-----------------------------------//
    async likeTweet(_, { tweetId }, context) {
      const { username } = checkAuth(context);
      const tweet = await Tweet.findById(tweetId);
      if (tweet) {
        if (tweet.likes.find((like) => like.username === username)) {
          tweet.likes = tweet.likes.filter(
            (like) => like.username !== username
          );
          await tweet.save();
        } else {
          tweet.likes.push({
            username,
          });
        }

        await tweet.save();
        return tweet;
      } else throw new UserInputError("Tweet not found");
    },
    //*-----------------------------------//
  },
};
