const express = require("express");
const router = express.Router();
const facilityController = require("../controllers/facility");
const utilities = require("../utilities/index");
const {requiresAuth} = require('express-openid-connect')

router.get("/facility",requiresAuth(), utilities.handleErrors(facilityController.getAllFacilities));

router.get("/library/status/:availability", requiresAuth(), utilities.handleErrors(facilityController.getFacilitybyStatus))

module.exports = router;
