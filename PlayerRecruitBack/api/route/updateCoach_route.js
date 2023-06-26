const express = require('express');
const router = express.Router();
const control = require('../controller/updateCoachProfile');

router.post("/api/coach/updateathletics", control.updateAthlete);
router.post("/api/coach/updatepersonal", control.updatepersonal);

module.exports = router;