const { UserInputError } = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../model/User");
const { SECRET_KEY } = require("../../Keys");
const { validateRegisterInput } = require("../../utils/validator");

module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find();
        return users;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  //!MUTATIONS
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword, phone } }
    ) {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      //* cheking if user already exists with same email || phone number || username
      const usedUsername = await User.findOne({ username });
      if (usedUsername) {
        throw new UserInputError("username already in use", {
          errors: {
            username: "username already taken",
          },
        });
      }

      const usedEmail = await User.findOne({ email });
      if (usedEmail) {
        throw new UserInputError("Email already in use", {
          errors: {
            email: "email already taken",
          },
        });
      }

      const usedPhoneNo = await User.findOne({ phone });
      if (usedPhoneNo) {
        throw new UserInputError("phone number already in use", {
          errors: {
            phone: "phone number already in use",
          },
        });
      }

      if (valid && !usedUsername && !usedEmail && !usedPhoneNo) {
        hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
          email,
          username,
          password: hashedPassword,
          phone,
        });
        const res = await newUser.save();
        const token = await jwt.sign(
          {
            id: res._id,
          },
          SECRET_KEY,
          { expiresIn: "1h" }
        );
        // console.log(token);
        // console.log(res);
        return {
          ...res.toJSON(),
          id: res._id,
          token,
        };
      }
    },
  },
};
