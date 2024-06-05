const express = require("express");
const router = express.Router();
const booksController = require("../controllers/books");
const utilities = require("../utilities/index");
const {requiresAuth} = require('express-openid-connect')

router.get("/:state",requiresAuth(), utilities.handleErrors(booksController.getAllByStatus));

router.get("/byId/:id", requiresAuth(), utilities.handleErrors(booksController.getSingleBook))

router.post(
  "/",
  requiresAuth(),
  utilities.handleErrors(booksController.createBook)
);

router.put(
  "/:id",
  requiresAuth(),
  utilities.handleErrors(booksController.updateBook)
);

router.delete("/:id", requiresAuth(), utilities.handleErrors(booksController.deleteBook));

module.exports = router;
