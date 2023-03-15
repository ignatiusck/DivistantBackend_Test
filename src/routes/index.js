const express = require("express");

const labRoute = require("./labRoutes");
const inventRoute = require("./inventRoute");
const authRoute = require("./authRoute");

const route = express.Router();

route.use(labRoute);
route.use(inventRoute);
route.use(authRoute);

module.exports = route;
