const validator = require("validator");

module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "username cannot be empty";
  }
  if (email.trim() === "") {
    errors.email = "email cannot be empty";
  }
  //  else {
  //   if (!validator.isEmail(email)) {
  //     errors.email = "email address must be valid";
  //   }
  // }
  // if (password.trim() === "") {
  //   errors.password = "Password must not be empty";
  // } else if (password !== confirmPassword) {
  //   errors.confirmPassword = "Password didnt match";
  // }

  // ! phone number validation will be on front-end using (react-phone-input-2 third-party library)
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (input, password) => {
  const errors = {};
  if (input.trim() === "") {
    errors.password = "field cannot be empty";
  }
  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

// module.exports.validateLoginInput = (username, password, email) => {
//   const errors = {};
//   // if (username.trim() === "") {
//   //   errors.username = "Username must not be empty";
//   // }
//   if (password.trim() === "") {
//     errors.password = "Password must not be empty";
//   }
//   // if (email.trim() === "") {
//   //   errors.email = "email cannot be empty";
//   // } else {
//   //   if (!validator.isEmail(email)) {
//   //     errors.email = "email address must be valid";
//   //   }
//   // }
//   return {
//     errors,
//     valid: Object.keys(errors).length < 1,
//   };
// };
