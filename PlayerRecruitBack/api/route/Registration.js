const express = require('express');
const router = express.Router();
const registration = require('../controller/Registration');


router.post("/api/register", registration.register);

module.exports = router;