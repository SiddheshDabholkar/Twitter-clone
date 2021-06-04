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
        // throw new UserInputError({ errors });
        return new UserInputError("Errorsssss", { errors });
      }
      //* cheking if user already exists with same email || phone number
      // const user = await User.findOne({ username, email, phone });
      const user = await User.findOne({ username });
      if (user) {
        // throw new UserInputError({ errors });
        return new UserInputError("username is already taken", {
          errors: { username: "this username is taken" },
        });
      }

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
      console.log(token);
      console.log(res);
      return {
        token,
        res,
      };
    },
  },
};
