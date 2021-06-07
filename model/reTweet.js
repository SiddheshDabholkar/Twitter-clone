const { model, Schema } = require("mongoose");
const { ObjectId } = Schema.Types;

const reTweetSchema = new Schema(
  {
    body: String,
    username: String,
    comments: [
      {
        body: String,
        username: String,
      },
      { timeStamp: true },
    ],
    likes: [
      {
        username: String,
      },
      { timeStamp: true },
    ],
    user: {
      type: ObjectId,
      ref: "User",
    },
    tweet: {
      type: ObjectId,
      ref: "Tweet",
    },
  },
  { timeStamp: true }
);

module.exports = model("reTweet", reTweetSchema);
