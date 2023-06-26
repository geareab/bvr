const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');
app.use('/stripe', bodyParser.raw({ type: "*/*" }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const middle = require('./Middleware/auth');



app.use('/uploads', express.static('./uploads'));
app.use('/', require('./api/route/Registration'));
app.use('/', require('./api/route/Verification_Route'));
app.use('/', require('./api/route/Login_route'));
app.use('/', require("./api/route/Payment_Route"));
app.use('/', middle.verifyToken, require("./api/route/Notification_route"));
app.use('/', middle.verifyToken, require("./api/route/Payment_Boost"));
app.use('/', middle.verifyToken, require('./api/route/Student_Registration'));
app.use('/', middle.verifyToken, require('./api/route/getBasicInfo_route'));
app.use('/', middle.verifyToken, require('./api/route/coach_registration_route'));
app.use('/', middle.verifyToken, require("./api/route/getCoachData_route"));
app.use('/', middle.verifyToken, require("./api/route/getStudentData_route"));
app.use("/", middle.verifyToken, require("./api/route/student_filter_route"));
app.use("/", middle.verifyToken, require("./api/route/get_Coachescard_info"));
app.use("/", middle.verifyToken, require("./api/route/coach_filter_route"));
app.use("/", middle.verifyToken, require("./api/route/get_StudentsCard_info"));
app.use("/", middle.verifyToken, require("./api/route/SwipingRoute"));
app.use("/", middle.verifyToken, require("./api/route/Matches_route"));
app.use("/", middle.verifyToken, require("./api/route/chat_route"));
app.use("/", middle.verifyToken, require("./api/route/updateCoach_route"));
app.use("/", middle.verifyToken, require("./api/route/updateAthlete_route"));
app.use("/", middle.verifyToken, require("./api/route/Block_route"));



module.exports = app;