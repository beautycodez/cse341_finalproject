const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const utilities = require("../utilities/index");
const validation = require("../utilities/validation")
const {requiresAuth} = require('express-openid-connect')

router.get("/",requiresAuth(), utilities.handleErrors(usersController.getAll));

router.get("/:id", requiresAuth(), utilities.handleErrors(usersController.getSingle));

router.post(
  "/",
  requiresAuth(),
  validation.registationRules(),
  validation.checkRegData,
  utilities.handleErrors(usersController.createUser)
);

router.put(
  "/:id",
  requiresAuth(),
  utilities.handleErrors(usersController.updateUser)
);

router.delete("/:id", requiresAuth(), utilities.handleErrors(usersController.deleteUSer));

module.exports = router;
