const { AuthenticationError, UserInputError } = require("apollo-server-errors");
const Tweet = require("../../model/Tweet");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
  Query: {
    //*-----------------------------------//
    async getTweets() {
      try {
        const tweets = await Tweet.find()
          .sort({ createdAt: -1 })
          .populate("tweet likes replies user tweet.user");
        return tweets;
      } catch (e) {
        throw new Error(e);
      }
    },
    //*-----------------------------------//
    async getTweet(_, { tweetId }) {
      try {
        const tweet = await Tweet.findById(tweetId).populate(
          "tweet likes replies user tweet.user"
        );
        if (tweet) {
          console.log("tweet", tweet);
          return tweet;
        } else {
          throw new Error("Tweet not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    //*-----------------------------------//
    async getUserTweets(_, { profileId }) {
      try {
        const tweeets = await Tweet.find()
          .populate("tweet likes replies user tweet.user")
          .sort({ createdAt: -1 });
        const mtweets = tweeets.map((tweet) => {
          if (tweet.user.id === profileId) {
            return tweet;
          }
        });
        const myprofileTweets = mtweets.filter((notnull) => notnull != null);
        // console.log(myprofileTweets);
        return myprofileTweets;
      } catch (error) {
        throw new Error(error);
      }
    },
    //*-----------------------------------//
  },
  Mutation: {
    //*-----------------------------------//
    async createTweet(_, { body, photo }, context) {
      const user = checkAuth(context);
      if (body.trim() === "") {
        throw new Error("Post body cannot be empty");
      }
      console.log(photo);
      const newTweet = new Tweet({
        body,
        photo,
        user: user.id,
        username: user.username,
      });
      const tweet = await newTweet.save();
      await tweet.populate("user").execPopulate();
      return tweet;
    },
    //*-----------------------------------//
    async reTweet(_, { tweetId, body }, context) {
      const user = checkAuth(context);
      const tweet = await Tweet.findById(tweetId)
        // .populate("tweet tweet.user")
        .populate({ path: "tweet", populate: "user" })
        .exec();
      console.log("tweet", tweet);
      const newReTweet = new Tweet({
        body,
        user: user.id,
        tweet,
        username: user.username,
      });
      const reTweet = await newReTweet.save();
      await reTweet.populate("user tweet.user").execPopulate();
      return reTweet;
    },
    //*-----------------------------------//
    async deleteTweet(_, { tweetId }, context) {
      const user = checkAuth(context);
      try {
        const tweet = await Tweet.findById(tweetId);
        if (user.username === tweet.username) {
          await tweet.delete();
          // return "Tweet deleted sucessfully";
          return tweetId;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    //*-----------------------------------//
    async likeTweet(_, { tweetId }, context) {
      const { id } = checkAuth(context);
      const tweet = await Tweet.findById(tweetId).populate("likes likes.user");
      if (tweet) {
        if (tweet.likes.some((like) => like.id === id)) {
          return await Tweet.findByIdAndUpdate(
            tweetId,
            {
              $pull: { likes: id },
            },
            { new: true }
          ).populate("likes likes.user");
        } else {
          tweet.likes.push(id);
          await tweet.save();
          return tweet;
        }
      } else throw new UserInputError("Tweet not found");
    },
    //*-----------------------------------//
  },
};
