const express = require('express');
const router = express.Router();
const controller = require('../controller/getCoachData_controller');

router.get("/api/coach/info", controller.sendCoachData);
router.get("/api/coach/profile", controller.getCoachProfile);

module.exports = router;