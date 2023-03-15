const express = require("express");

const authController = require("../controllers/authController");
const {
  signupValidator,
  signinValidator,
} = require("../validators/authValidator");

const route = express.Router();

route.post("/signup", signupValidator, authController.signUp);
route.post("/login", signinValidator, authController.signIn);

module.exports = route;
