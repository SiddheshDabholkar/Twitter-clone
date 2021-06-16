const { model, Schema } = require("mongoose");
const { ObjectId } = Schema.Types;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    email: String,
    phone: String,
    token: String,
    tweet: [
      {
        type: ObjectId,
        ref: "Tweet",
      },
    ],
    ReTweet: [
      {
        type: ObjectId,
        ref: "ReTweet",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
