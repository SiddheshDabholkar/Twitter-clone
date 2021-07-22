const { AuthenticationError, UserInputError } = require("apollo-server-errors");
const Tweet = require("../../model/Tweet");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
  Query: {
    async getTweets() {
      try {
        const tweets = await Tweet.find()
          .sort({ createdAt: -1 })
          .populate("user")
          .populate("tweet");
        return tweets;
      } catch (e) {
        throw new Error(e);
      }
    },

    async getTweet(_, { tweetId }) {
      try {
        const tweet = await Tweet.findById(tweetId).populate("user");
        if (tweet) {
          return tweet;
        } else {
          throw new Error("Tweet not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async getUserTweets(_, { userId }) {
      try {
        const tweeets = await Tweet.find().populate("user");
        const mtweets = tweeets.map((tweet) => {
          if (tweet.user.id === userId) {
            return tweet;
          }
        });
        const myprofileTweets = mtweets.filter((notnull) => notnull != null);
        return myprofileTweets;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    //*-----------------------------------//
    async createTweet(_, { body }, context) {
      const user = checkAuth(context);
      if (body.trim() === "") {
        throw new Error("Post body cannot be empty");
      }
      const newTweet = new Tweet({
        body,
        user: user.id,
        username: user.username,
      });
      const tweet = await newTweet.save();
      return tweet;
    },
    //*-----------------------------------//

    async reTweet(_, { tweetId, body }, context) {
      const user = checkAuth(context);
      const tweet = await Tweet.findById(tweetId).populate("tweet").exec();
      const newReTweet = new ReTweet({
        body,
        user: user.id,
        tweet,
        username: user.username,
      });
      const reTweet = await newReTweet.save();
      // console.log(reTweet);
      return reTweet;
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
