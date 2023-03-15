const express = require("express");

const labController = require("../controllers/labController.js");
const { labValidator } = require("../validators/labValidators");
const { authorization } = require("../controllers/authController");

const route = express.Router();

route.post("/lab/create", authorization, labValidator, labController.postLab);

route.get("/lab/list", authorization, labController.getLabs);

route.get("/lab/:id", authorization, labController.getLab);

route.put("/lab/update/:id", authorization, labValidator, labController.putLab);

module.exports = route;
