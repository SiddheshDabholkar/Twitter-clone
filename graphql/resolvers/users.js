const { UserInputError } = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../model/User");
const { SECRET_KEY } = require("../../Keys");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validator");

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
        // console.log("res--->", res);
        const token = await jwt.sign(
          {
            id: res._id,
            email: res.email,
            username: res.username,
            phone: res.phone,
          },
          SECRET_KEY,
          { expiresIn: "1h" }
        );
        console.log("register token--->", token);
        return {
          ...res.toJSON(),
          id: res._id,
          token,
        };
      }
    },

    async login(_, { input, password }) {
      const { valid, errors } = validateLoginInput(input, password);
      const user =
        (await User.findOne({ username: `${input}` })) ||
        (await User.findOne({ phone: `${input}` })) ||
        (await User.findOne({ email: `${input}` }));

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      if (!user) {
        errors.general = "Users not found";
        throw new UserInputError("user not found", { errors });
      }
      const matchPassword = await bcrypt.compare(password, user.password);
      // console.log("user---->", user);
      if (!matchPassword) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }
      if (matchPassword && valid && user) {
        const token = await jwt.sign(
          {
            id: user._id,
            email: user.email,
            username: user.username,
            phone: user.phone,
          },
          SECRET_KEY,
          { expiresIn: "1h" }
        );
        console.log(token);

        return {
          ...user.toJSON(),
          id: user._id,
          token,
        };
      }
    },
  },
};
