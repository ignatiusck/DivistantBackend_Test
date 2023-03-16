const jwt = require("jsonwebtoken");
const session = require("express-session");

const { user } = require("../../models");

exports.getResult = async (req, res, next) => {
  const { data } = await this.getDataUser.registerWithGoogle(userProfile);

  //Create json web token
  const token = jwt.sign(
    {
      email: data.email,
      userId: data.id,
    },
    "supersecreat",
    { expiresIn: "1h" }
  );

  //send jwt to client
  res.status(200).json({ token: token, userId: data.id });
};

exports.getDataUser = {
  registerWithGoogle: async (oauthUser) => {
    // check the user already registered or not
    const isUserExist = await user.findOne({
      where: { email: oauthUser.emails[0].value },
    });
    if (isUserExist) {
      const data = {
        message: "Email already registered.",
        id: oauthUser.id,
        email: oauthUser.emails[0].value,
      };
      return { data };
    }

    //add new user
    const userModel = await user.create({
      id: oauthUser.id,
      name: oauthUser.displayName,
      email: oauthUser.emails[0].value,
    });
    await userModel.save();
    let data = {
      message: "user registered.",
      id: oauthUser.id,
      email: oauthUser.emails[0].value,
    };
    console.log(success);
    return { data };
  },
};

exports.signout = (req, res, next) => {
  try {
    req.session = null;
    res.status(200).json({
      message: "Logout Succesfully.",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
