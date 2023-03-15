const { body } = require("express-validator");

exports.signupValidator = [
  body("name").trim().not().isEmpty(),
  body("email").isEmail(),
  body("password").trim().isLength({ min: 5 }),
];

exports.signinValidator = [body("email").isEmail()];
