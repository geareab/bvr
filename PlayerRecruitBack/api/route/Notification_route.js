const express = require('express');
const router = express.Router();
const controller = require('../controller/Notifcation_controller');


router.post("/api/notificationtoken", controller.settoken);

module.exports = router;