const express = require('express');
const router = express.Router();
const register = require('../controller/Student_Registration_Controller');
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
// router.post("/api/student/register", register.registrationinfo);

router.post("/api/student/uploadimage", upload.single('image'), register.profileImage);
router.post("/api/student/register", upload.single('image'), register.registeruser);

module.exports = router;

