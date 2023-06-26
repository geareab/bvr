const express = require('express');
const router = express.Router();
const data = require("../controller/Matches_controller");
const { route } = require('./SwipingRoute');

router.get("/api/student/likebyme", data.getlikebymedata);
router.get("/api/student/likebycoaches", data.getlikedbycoachesdata);
router.get("/api/student/neutral", data.getstudentneutral);

router.get("/api/coach/likebyme", data.getlikebymedatacoach);
router.get("/api/coach/likebyathletes", data.getlikedbyathletesdata);

router.get("/api/coach/neutral", data.getcoachneutral);

router.post("/api/match/add", data.matchadd);
router.post("/api/match/remove", data.removematched);

router.get("/api/like/count", data.countLike);
router.post("/api/student/likeread", data.readlikedbymatch);

router.get("/api/student/matchcount", data.countStudentNewMatch);
router.post("/api/student/matchread", data.readStudentNewMatch);


router.get("/api/coach/likecount", data.countCoachNewLikes);
router.post("/api/coach/likeread", data.readCoachNewLikes);

router.get("/api/coach/matchcount", data.countCoachNewMatch);
router.post("/api/coach/matchread", data.readCoachNewMatch);

module.exports = router;