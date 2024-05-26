const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const {requiresAuth} = require('express-openid-connect')

router.get("/",requiresAuth(), usersController.getAll);

router.get("/:id", requiresAuth(), usersController.getSingle);

router.post(
  "/",
  requiresAuth(),
  usersController.createUser
);

router.put(
  "/:id",
  requiresAuth(),
  usersController.updateUser
);

router.delete("/:id", requiresAuth(), usersController.deleteUser);

module.exports = router;
