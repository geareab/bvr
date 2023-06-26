const express = require('express');
const router = express.Router();
const controller = require('../controller/getinformation_controller');

router.get("/api/getstates", controller.getstates);

router.get("/api/getcolleges", controller.getcollege);

router.get("/api/getsports", controller.getsports);

router.get("/api/getethnicity", controller.getethnicity);

router.get("/api/getgpa", controller.getgpa);

router.get("/api/getposition", controller.getposition);

router.get("/api/getdivisions", controller.getdivision);

router.get("/api/getcities", controller.getcities);

router.get("/api/getvalidity", controller.getvalidity);

router.get("/api/student/checkpremium", controller.checkPremium);

module.exports = router;