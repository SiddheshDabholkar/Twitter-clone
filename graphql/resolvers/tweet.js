const Tweet = require("../../model/Tweet");

module.exports = {
  Query: {
    async getTweets() {
      try {
        const tweets = await Tweet.find();
        return tweets;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
