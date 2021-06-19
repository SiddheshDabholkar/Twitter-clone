const ReTweet = require("../../model/reTweet");
const Tweet = require("../../model/Tweet");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
  Query: {
    async getReTweets() {
      try {
        const retweets = await ReTweet.find()
          .populate("user tweet")
          .sort({ createdAt: -1 });
        return retweets;
      } catch (e) {
        throw new Error(e);
      }
    },
    //*-----------------------------------//

    async getProfileTweets(_, { profileId }) {
      try {
        const tweeets = await Tweet.find().populate("user");
        const mtweets = tweeets.map((tweet) => {
          if (tweet.user.id === profileId) {
            return tweet;
          }
        });
        const myprofileTweets = mtweets.filter((notnull) => notnull != null);
        return myprofileTweets;
      } catch (error) {
        throw new Error(error);
      }
    },
    //*-----------------------------------//

    async getProfileReTweets(_, { profileId }) {
      try {
        const retweeets = await ReTweet.find().populate("user tweet");
        const mtweets = retweeets.map((tweet) => {
          if (tweet.user.id === profileId) {
            return tweet;
          }
        });
        const myprofileTweets = mtweets.filter((notnull) => notnull != null);
        return myprofileTweets;
      } catch (error) {
        throw new Error(error);
      }
      //*-----------------------------------//
    },
    //*-----------------------------------//
  },
  Mutation: {
    async reTweets(_, { tweetId, body }, context) {
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
    async likeReTweet(_, { reTweetId }, context) {
      const { username } = checkAuth(context);
      const reTweet = await ReTweet.findById(reTweetId);
      if (reTweet) {
        if (reTweet.likes.find((like) => like.username === username)) {
          reTweet.likes = reTweet.likes.filter(
            (like) => like.username !== username
          );
          await reTweet.save();
        } else {
          reTweet.likes.push({
            username,
          });
        }
        await reTweet.save();
        return reTweet;
      } else throw new Error("ReTweet not found");
    },
  },
};
