const express = require("express");
const router = express.Router();
const controller = require("../controller/Block_controller");
router.post("/api/block", controller.block);
router.post("/api/unblock", controller.unblock);
router.get("/api/blocked/data", controller.blockeddata);

module.exports = router;
