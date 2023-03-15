const { body } = require("express-validator");

exports.inventValidator = [
  body("inventory_name").trim().isLength({ min: 5 }),
  body("inventory_images").trim().not().isEmpty(),
];
