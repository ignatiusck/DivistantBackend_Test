const express = require("express");

const routeLab = require("./lab/lab");
const routeInvent = require("./inventory/inventory");
const routeAuthDirect = require("./authentication/authDirect");
const routeAuthGoogle = require("./authentication/authGoogle");

const router = express.Router();

router.use(routeLab);
router.use(routeInvent);
router.use(routeAuthDirect);
router.use(routeAuthGoogle);

module.exports = router;
