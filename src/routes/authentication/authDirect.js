const express = require("express");

const authDirect = require("./../../controllers/authentication/authDirect");
const validator = require("../../validators/authentication/authentication");

const route = express.Router();

route.post("/signup", validator.signupValidator, authDirect.signUp);
route.post("/login", validator.signinValidator, authDirect.signIn);

module.exports = route;
