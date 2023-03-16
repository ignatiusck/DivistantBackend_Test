const crypto = require("crypto");
const { validationResult } = require("express-validator");

const { user } = require("../../models");

//FETCH PROFILE USER
exports.getUser = async (req, res, next) => {
  try {
    //search the user
    const userModel = await user.findOne({ where: { id: req.userId } });
    if (!userModel) {
      const err = new Error("User not found.");
      err.statusCode = 404;
      throw err;
    }

    //respon for client
    res.status(200).json({
      message: "User found.",
      name: userModel.name,
      email: userModel.email,
    });
  } catch (err) {
    //catch the error
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//UPDATE USER DATA
exports.putUser = async (req, res, next) => {
  try {
    //Error handler for validation proccess
    const err = validationResult(req);
    if (!err.isEmpty()) {
      const err = new Error("Validation Failed.");
      err.statusCode = 422;
      throw err;
    }

    //Update user data
    const userModel = await user.findOne({ where: { id: req.userId } });
    const password = req.body.password;
    const salt = bcrypt.genSaltSync(12);
    const hashedPass = await bcrypt.hash(password, salt);
    await userModel.update({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
    });
    await userModel.save();

    //respon for client
    res.status(200).json({
      message: "profile updated.",
      name: userModel.name,
      email: userModel.email,
    });
  } catch (err) {
    //catch the error
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
