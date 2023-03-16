const jwt = require("jsonwebtoken");

//AUTHORIZATION FOR EVERY FEATURE FOR USER
exports.authorization = async (req, res, next) => {
  try {
    //Read data from header
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      const err = new Error("not authenticated");
      err.statusCode = 401;
      throw err;
    }
    //Decode jwt token
    const token = authHeader.split(" ")[1];
    const decodeToken = await jwt.verify(token, `${process.env.SECREAT_KEY}`);
    if (!decodeToken) {
      const err = new Error("not authenticated.");
      err.statusCode = 401;
      throw err;
    }
    //add userId to req.userId for authorization user feature
    req.userId = decodeToken.userId;
    next();
  } catch (err) {
    //catch the error
    err.statusCode = 500;
    throw err;
  }
};
