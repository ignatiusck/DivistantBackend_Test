const express = require("express");

const authDirect = require("./../../controllers/authentication/authDirect");
const validator = require("../../validators/authentication/authentication");

const route = express.Router();

//SIGNUP NEW USER
route.post("/signup", validator.signupValidator, authDirect.signUp);

//SIGNIN USER
route.post("/login", validator.signinValidator, authDirect.signIn);

module.exports = route;
