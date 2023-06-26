const express = require('express');
const router = express.Router();
const controller = require('../controller/getStudentData_controller');
router.get("/api/student/info", controller.sendStudentData);
router.get("/api/student/profile", controller.getStudentProfile);

module.exports = router;