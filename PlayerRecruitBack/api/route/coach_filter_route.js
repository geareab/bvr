const express = require('express');
const router = express.Router();
const filter = require('../controller/coach_filter_controller');


router.post("/api/coach/filter", filter.setFilter);
router.get("/api/coach/filter", filter.getFilter);

module.exports = router;