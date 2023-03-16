const express = require("express");

const controller = require("../../controllers/lab/lab.js");
const { validator } = require("../../validators/lab/lab");
const { authorization } = require("../../authorization/authorization");

const router = express.Router();

//CREATE NEW LAB
router.post("/lab/create", validator, authorization, controller.postLab);

//FETCH LIST LAB
router.get("/lab/list", authorization, controller.getLabs);

//FETCH SINGLE LAB BY ID
router.get("/lab/inventory/list", authorization, controller.getLabInvent);

//FETCH ALL DATA INVENTORY IN LAB
router.get("/lab/:id", authorization, controller.getLab);

//UPDATE DATA LAB BY ID
router.put("/lab/update/:id", validator, authorization, controller.putLab);

module.exports = router;
