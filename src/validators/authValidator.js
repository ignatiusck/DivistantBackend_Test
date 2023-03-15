const { body } = require("express-validator");

exports.signupUser = [
  body("email")
    .isEmail()
    .withMessage("Please enter the valid email")
    .custom((value, { req }) => {
      return User.findByPk({ email: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject("E-Mail address already exists");
        }
      });
    })
    .normalizeEmail(),
  body("name").trim().not().isEmpty(),
  body("password").trim().isLength({ min: 5 }),
];

exports.signinUser = [];
