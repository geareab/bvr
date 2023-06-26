const express = require('express');
const router = express.Router();
const control = require('../controller/updateAthleteProfile');

router.post("/api/athlete/updateathletics", control.updateAthlete);
router.post("/api/athlete/updatepersonal", control.updatepersonal);

router.post("/api/update/mobile", control.updateMobile);
router.post("/api/update/email", control.updateEmail);

module.exports = router;