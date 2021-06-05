const { model, Schema } = require("mongoose");
const { ObjectId } = Schema.Types;

const tweetSchema = new Schema(
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
  },
  { timeStamp: true }
);

module.exports = model("Tweet", tweetSchema);
