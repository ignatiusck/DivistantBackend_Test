const express = require("express");

const controllers = require("../../controllers/user/user");
const { authorization } = require("../../authorization/authorization");
const validator = require("../../validators/user/user");

const router = express.Router();

//FETCH PROFILE USER
router.get("/profile", authorization, controllers.getUser);

//UPDATE USER DATA
router.put(
  "/profile/update",
  validator.updateUser,
  authorization,
  controllers.putUser
);

module.exports = router;
