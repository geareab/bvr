const express = require('express');
const router = express.Router();
const verifi = require('../controller/Verify_Controller');


router.post("/api/verify", verifi.verification);

module.exports = router;