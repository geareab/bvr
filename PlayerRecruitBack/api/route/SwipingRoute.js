const express = require('express');
const router = express.Router();
const swipe = require("../controller/Swiping_Controller");

router.post("/api/swipe/left", swipe.leftswipe);
router.post("/api/swipe/right", swipe.rightswipe);
// router.post("/api/swipe/neutral", swipe.neutralswipe);
router.post("/api/swipe/reset", swipe.reset);
module.exports = router;