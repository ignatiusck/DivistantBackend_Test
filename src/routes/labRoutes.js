const express = require("express");

const labController = require("../controllers/labController.js");

const route = express.Router();

route.post("/lab/create", labController.postLab);
route.get("/lab/list", labController.getLabs);
route.get("/lab/:id", labController.getLab);
route.put("/lab/update/:id", labController.putLab);

module.exports = route;
