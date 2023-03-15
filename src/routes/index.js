const express = require("express");

const labRoute = require("./labRoutes");
const inventRoute = require("./inventRoute");
const authRoute = require("./authRoute");
const oauthRoute = require("./oauthRoute");

const route = express.Router();

route.use(labRoute);
route.use(inventRoute);
route.use(authRoute);
route.use(oauthRoute);

module.exports = route;
