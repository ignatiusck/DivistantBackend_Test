const express = require("express");

const controller = require("../../controllers/inventory/inventory");
const { authorization } = require("../../authorization/authorization");
const { validator } = require("../../validators/inventory/invetory");

const router = express.Router();

router.post(
  "/inventories/create",
  authorization,
  validator,
  controller.postInvent
);

// route.get("/inventories/list");
// route.get("/inventories/:id");
// route.put("/inventories/update/:id");
// route.delete("/inventories/delete/:id");

module.exports = router;
