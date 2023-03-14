const express = require("express");

const labRoute = require("./labRoutes");
const inventRoute = require("./inventRoute");

const route = express.Router();

route.use(labRoute);
route.use(inventRoute);

module.exports = route;
