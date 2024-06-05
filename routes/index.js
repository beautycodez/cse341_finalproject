const router = require("express").Router();
const utilities = require("../utilities/index")

// req.isAuthenticated is provided from the auth router
router.get("/", utilities.handleErrors((req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
}));

router.use("/", require("./swagger"));

router.use("/users", require('./users'));

router.use("/books", require('./books'));

router.use("/library", require('./library'));

router.use("/facility", require('./facility'))

module.exports = router;
