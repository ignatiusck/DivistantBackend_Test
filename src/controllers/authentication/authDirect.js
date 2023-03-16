const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const { user } = require("../../models");

//SIGNUP NEW USER
exports.signUp = async (req, res, next) => {
  try {
    //Error handler for validation proccess
    const err = validationResult(req);
    if (!err.isEmpty()) {
      const err = new Error("Validation Failed.");
      err.statusCode = 422;
      throw err;
    }
    //check email user already in DB or not
    const userEmail = await user.findOne({ where: { email: req.body.email } });
    if (userEmail) {
      const err = Error("Email already exist.");
      err.statusCode = 422;
      throw err;
    }
    //Add new user
    const password = req.body.password;
    const salt = bcrypt.genSaltSync(12);
    const hashedPass = await bcrypt.hash(password, salt);
    const userModel = await user.create({
      id: crypto.randomUUID(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
    });
    await userModel.save();
    //respon for client
    res.status(200).json({
      message: "User Created",
      userId: userModel.id,
    });
  } catch (err) {
    //catch the error
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//SIGNIN USER
exports.signIn = async (req, res, next) => {
  try {
    //Error handler for validation proccess
    const err = validationResult(req);
    if (!err.isEmpty()) {
      const err = new Error("Email not Valid.");
      err.statusCode = 422;
      throw err;
    }

    //Check email user already in DB or not
    const userModel = await user.findOne({ where: { email: req.body.email } });
    if (!userModel.email) {
      const err = Error("Email not found.");
      err.statusCode = 401;
      throw err;
    }

    //Check the email and password is correct or not
    const isEqual = await bcrypt.compare(req.body.password, userModel.password);
    if (!isEqual) {
      const err = Error("Password wrong.");
      err.statusCode = 500;
      throw err;
    }

    //Create json web token
    const token = jwt.sign(
      {
        email: userModel.email,
        userId: userModel.id,
      },
      `${process.env.SECREAT_KEY}`,
      { expiresIn: "1h" }
    );

    //send jwt to client
    res.status(200).json({ token: token, userId: user.id });
  } catch (err) {
    //catch the error
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
