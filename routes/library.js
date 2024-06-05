const express = require("express");
const router = express.Router();
const libraryController = require("../controllers/library");
const utilities = require("../utilities/index");
const {requiresAuth} = require('express-openid-connect')

router.get("/library/order",requiresAuth(), utilities.handleErrors(libraryController.getAllOrders));

router.get("/library/:id", requiresAuth(), utilities.handleErrors(libraryController.getSingleOrder))

router.post(
  "/",
  requiresAuth(),
  utilities.handleErrors(libraryController.createOrder)
);

router.put(
  "/:id",
  requiresAuth(),
  utilities.handleErrors(libraryController.updateOrder)
);

router.delete("/:id", requiresAuth(), utilities.handleErrors(libraryController.deleteOrder));

module.exports = router;
