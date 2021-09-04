const { model, Schema } = require("mongoose");
const { ObjectId } = Schema.Types;

const tweetSchema = new Schema(
  {
    body: String,
    photo: String,
    username: String,
    likes: [
      {
        type: ObjectId,
        ref: "User",
      },
      { timestamps: true },
    ],
    user: {
      type: ObjectId,
      ref: "User",
    },
    tweet: {
      type: ObjectId,
      ref: "Tweet",
    },
    parentTweet: {
      type: ObjectId,
      ref: "Tweet",
    },
    reply: [{ type: ObjectId, ref: "Tweet" }],
  },
  { timestamps: true }
);

module.exports = model("Tweet", tweetSchema);
