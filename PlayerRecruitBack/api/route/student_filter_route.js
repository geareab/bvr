const express = require('express');
const router = express.Router();
const filter = require('../controller/student_filter_controller');


router.post("/api/student/filter", filter.setFilter);
router.get("/api/student/filter", filter.getFilter);

module.exports = router;