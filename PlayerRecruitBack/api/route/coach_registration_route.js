const express = require('express');
const router = express.Router();
const register = require('../controller/coach_registation_controller');
const multer = require('multer');
const path = require("path");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname.split('.')[0] + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// router.post("/api/coach/register", register.registrationinfo);

router.post("/api/coach/uploadimage", upload.single('image'), register.profileImage);
router.post("/api/coach/register", upload.single('image'), register.registercoach);

module.exports = router;