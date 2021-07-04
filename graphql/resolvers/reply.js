const { AuthenticationError, UserInputError } = require("apollo-server-errors");
const Tweet = require("../../model/Tweet");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
  Query: {
    async getReplies(_, { tweetId }) {
      try {
        const replies = await Tweet.findById(tweetId).populate("replies");
        if (replies) {
          return replies;
        } else {
          throw new Error("Replies not found");
        }
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Mutation: {
    //*-----------------------------------//
    async createReply(_, { tweetId, body }, context) {
      const { username } = checkAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Reply body must not be empty",
          },
        });
      }
      const tweet = await Tweet.findById(tweetId);
      if (tweet) {
        tweet.replies.unshift({
          body,
          username,
        });
        await tweet.save();
        return tweet;
      } else throw new UserInputError("Tweet not found");
    },
    //*-----------------------------------//
    async deleteReply(_, { tweetId, replyId }, context) {
      const { username } = checkAuth(context);
      const tweet = await Tweet.findById(tweetId);
      if (tweet) {
        const commentIndex = tweet.comments.findIndex((c) => c.id === replyId);
        if (tweet.replies[commentIndex].username === username) {
          tweet.replies.splice(commentIndex, 1);
          await tweet.save();
          return tweet;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("Tweet not found");
      }
    },
  },
};
