const { body } = require("express-validator");

exports.validator = [body("lab_name").trim().isLength({ min: 5 })];
