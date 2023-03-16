const express = require("express");

const controller = require("../../controllers/lab/lab.js");
const { validator } = require("../../validators/lab/lab");
const { authorization } = require("../../authorization/authorization");

const router = express.Router();

router.post("/lab/create", validator, authorization, controller.postLab);

router.get("/lab/list", authorization, controller.getLabs);

router.get("/lab/:id", authorization, controller.getLab);

router.put("/lab/update/:id", validator, authorization, controller.putLab);

module.exports = router;
