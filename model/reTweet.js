const { model, Schema } = require("mongoose");

const { ObjectId } = Schema.Types;

const reTweetSchema = new Schema(
  {
    body: String,
    username: String,
    replies: [
      {
        type: new Schema(
          {
            body: String,
            username: String,
          },
          { timestamps: true }
        ),
      },
    ],
    likes: [
      {
        username: String,
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
  },
  { timestamps: true }
);

module.exports = model("ReTweet", reTweetSchema);
