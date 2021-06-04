const { model, Schema } = require("mongoose");

const tweetSchema = new Schema(
  {
    body: String,
    username: String,
    likes: String,
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
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timeStamp: true }
);

module.exports = model("Post", tweetSchema);
