const { model, Schema } = require("mongoose");
const { ObjectId } = Schema.Types;

const tweetSchema = new Schema(
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
  },
  { timestamps: true }
);

module.exports = model("Tweet", tweetSchema);
