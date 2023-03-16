const { body } = require("express-validator");

exports.validator = [
  body("inventory_name").trim().isLength({ min: 5 }),
  body("inventory_images").trim().not().isEmpty(),
];
