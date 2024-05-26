const router = require('express').Router();

router.use('/', require('./swagger'));

router.use('/users', require("./users"));
router.use('/books', require("./books"));


module.exports = router;