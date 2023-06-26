const express = require('express');
const router = express.Router();
const control = require('../controller/getStudentCard_info_cont');

router.get("/api/students/cards", control.getdata);
router.get("/api/swipe/action", control.getaction);
module.exports = router;