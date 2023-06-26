const express = require('express');
const router = express.Router();
const control = require('../controller/getCoachesCard_info_cont');

router.get("/api/coaches/cards", control.getdata);

module.exports = router;