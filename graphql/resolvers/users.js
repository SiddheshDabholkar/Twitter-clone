const { UserInputError } = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const checkAuth = require("../../utils/checkAuth");

const User = require("../../model/User");
const SECRET_KEY = process.env.SECRET_KEY;
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validator");

const { uploadImage } = require("../uploadImage");

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
    async getUser(_, { userId }) {
      try {
        const user = await User.findById(userId).populate(
          "tweet ReTweet following followers"
        );
        if (user) {
          return user;
        } else {
          throw new Error("User not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async getSearchedUser(_, { username }) {
      try {
        let usrname = new RegExp("^" + username);
        const user = await User.find({ username: { $regex: usrname } });
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    async register(_, { username, password }) {
      const { valid, errors } = validateRegisterInput(username, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      //* cheking if user already exists with same email || phone number || username
      const usedUsername = await User.findOne({ username });
      if (usedUsername) {
        errors.general = "username already in use";
        throw new UserInputError("username already in use", { errors });
        // throw new UserInputError("username already in use", {
        //   errors: {
        //     username: "username already taken",
        //   },
        // });
      }

      // const usedEmail = await User.findOne({ email });
      // if (usedEmail) {
      //   throw new UserInputError("Email already in use", {
      //     errors: {
      //       email: "email already taken",
      //     },
      //   });
      // }

      // const usedPhoneNo = await User.findOne({ phone });
      // if (usedPhoneNo) {
      //   throw new UserInputError("phone number already in use", {
      //     errors: {
      //       phone: "phone number already in use",
      //     },
      //   });
      // }

      // if (valid && !usedUsername && !usedEmail && !usedPhoneNo) {
      if (valid && !usedUsername) {
        hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
          // email,
          username,
          password: hashedPassword,
          // phone,
        });
        const res = await newUser.save();
        // console.log("res--->", res);
        const token = await jwt.sign(
          {
            id: res._id,
            email: res.email,
            username: res.username,
            // phone: res.phone,
          },
          SECRET_KEY,
          { expiresIn: "1h" }
        );
        // console.log("res user", res);
        // console.log("register token--->", token);
        // document.localStorage.setItem("jwtToken", token);
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
          SECRET_KEY
          // { expiresIn: "1h" }
        );
        // console.log(token);

        return {
          ...user.toJSON(),
          id: user._id,
          token,
        };
      }
    },
    async editProfile(
      _,
      {
        username,
        password,
        email,
        phone,
        token,
        profilePic,
        banner,
        bio,
        location,
        website,
        name,
        userId,
      }
    ) {
      try {
        const user = await User.findById(userId);
        const pPic = profilePic && (await uploadImage(profilePic));
        console.log("pPic", profilePic && (await uploadImage(profilePic)));
        const bPic = banner && (await uploadImage(banner));
        console.log("bPic", bPic);
        if (user) {
          if (username !== undefined) {
            user.username = username;
          }
          if (userId !== undefined) {
            user.userId = userId;
          }
          if (password !== undefined) {
            user.password = password;
          }
          if (email !== undefined) {
            user.email = email;
          }
          if (phone !== undefined) {
            user.phone = phone;
          }
          if (profilePic !== undefined) {
            if (profilePic.length > 0) {
              // user.profilePic = profilePic;
              user.profilePic = pPic;
            }
          }
          if (banner !== undefined) {
            if (banner.length > 0) {
              // user.banner = banner;
              user.banner = bPic;
            }
          }
          if (token !== undefined) {
            user.token = token;
          }
          if (bio !== undefined) {
            user.bio = bio;
          }
          if (location !== undefined) {
            user.location = location;
          }
          if (website !== undefined) {
            user.website = website;
          }
          if (name !== undefined) {
            user.name = name;
          }
          user.save();
          return user;
        } else {
          throw new Error("user not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async followUnfollow(_, { otherUserId }, context) {
      try {
        const { id } = checkAuth(context);
        const otherUser = await User.findById(otherUserId).populate(
          "following followers"
        );
        const user = await User.findById(id).populate("following followers");
        if (otherUser.followers.find((m) => m.id === id)) {
          return await User.findByIdAndUpdate(
            otherUserId,
            {
              $pull: { followers: id },
            },
            { new: true },
            (result) => {
              User.findByIdAndUpdate(
                id,
                {
                  $pull: { following: otherUserId },
                },
                { new: true }
              ).populate("following followers");
            }
          ).populate("following followers");
        } else {
          otherUser.followers.push(id);
          user.following.push(otherUserId);
          otherUser.save();
          user.save();
          return user, otherUser;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
