const { body } = require("express-validator");

exports.updateUser = [
  body("name").trim().not().isEmpty(),
  body("email").isEmail(),
  body("password").trim().isLength({ min: 5 }),
];
