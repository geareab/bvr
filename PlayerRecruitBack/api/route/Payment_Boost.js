const express = require('express');
const router = express.Router();
const controller = require('../controller/Payment_controller');

router.post("/boost/pay", controller.boost);
module.exports = router;