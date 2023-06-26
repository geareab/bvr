const express = require("express");
const router = express.Router();
const log = require("../controller/Login_controller");
const fog = require("../controller/ForgotPass_controller");
const upd = require("../controller/UpdatePass_controller");

router.post("/api/login", log.login);
router.post("/api/forgot", fog.forgot);
router.post("/api/updatePass", upd.updatePass);
module.exports = router;
