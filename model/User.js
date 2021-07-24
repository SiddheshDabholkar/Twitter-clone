const { model, Schema } = require("mongoose");
const { ObjectId } = Schema.Types;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    email: String,
    phone: String,
    token: String,
    profilePic: String,
    banner: String,
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
