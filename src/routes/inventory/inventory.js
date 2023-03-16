const express = require("express");

const controller = require("../../controllers/inventory/inventory");
const { authorization } = require("../../authorization/authorization");
const { validator } = require("../../validators/inventory/invetory");

const router = express.Router();

//CREATE NEW INVENTORY
router.post(
  "/inventories/create",
  authorization,
  validator,
  controller.postInvent
);

//FETCH LIST INVENTORY
router.get("/inventories/list", authorization, controller.getInverts);

//FETCH SINGLE INVENTORY BY ID
router.get("/inventories/:id", authorization, controller.getInvert);

//UPDATE SINGLE INVENTORY DATA BY ID
router.put("/inventories/update", authorization, controller.putInvert);

//DELETE SINGLE INVENTORY BY ID
router.delete("/inventories/delete", authorization, controller.deleteInvert);

module.exports = router;
