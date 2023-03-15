const express = require("express");

const inventRoute = require("../controllers/inventController");
const { authorization } = require("../controllers/authController");
const { inventValidator } = require("../validators/invetValidator");

const route = express.Router();

route.post(
  "/inventories/create",
  authorization,
  inventValidator,
  inventRoute.postInvent
);

// route.get("/inventories/list");
// route.get("/inventories/:id");
// route.put("/inventories/update/:id");
// route.delete("/inventories/delete/:id");

module.exports = route;
