const router = require("express").Router();
router.use([require("./products/index")]);

module.exports = router;
