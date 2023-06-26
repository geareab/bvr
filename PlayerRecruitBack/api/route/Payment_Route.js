const express = require('express');
const router = express.Router();
const controller = require('../controller/Payment_controller');


router.post("/stripe", controller.eventhandle);
router.post("/pay/platinum", controller.platinum);
router.post("/pay", controller.pay);
module.exports = router;