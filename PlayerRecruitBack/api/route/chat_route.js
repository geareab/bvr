const express = require('express');
const router = express.Router();
const controller = require('../controller/chat_controller');
router.get("/api/student/matches", controller.coachdata);
router.get("/api/coach/matches", controller.studentdata);

module.exports = router;