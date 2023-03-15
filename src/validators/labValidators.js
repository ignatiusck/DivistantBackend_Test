const { body } = require("express-validator");

exports.labValidator = [body("lab_name").trim().isLength({ min: 5 })];
