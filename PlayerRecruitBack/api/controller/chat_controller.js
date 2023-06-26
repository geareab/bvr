const con = require('../../dbconfig/db');

function removeDuplicateObjectFromArray(array, key) {
    let check = {};
    let res = [];
    for (let i = 0; i < array.length; i++) {
        if (!check[array[i][key]]) {
            check[array[i][key]] = true;
            res.push(array[i]);
        }
    }
    return res;
}

exports.coachdata = (req, res) => {
    con.query("SELECT coach_registration.registration_id,coach_registration.firstname,coach_registration.lastname,coach_registration.dob,coach_registration.gender,a.statename ,city.city_name as city,colleges.college_name,b.statename as College_State,coach_registration.university_email,sports.sportsname,coach_registration.coaching_gender,coach_registration.notification_token,matches.student_seen,coach_registration.team,coach_divisions.divisions,coach_registration.jobtitle,coach_registration.personal_bio,coach_registration.video,coach_registration.image,coach_registration.views from coach_registration JOIN state a on a.id = coach_registration.state join state b on b.id = coach_registration.college_state left Join matches on matches.coach_regid = coach_registration.registration_id and matches.student_regid = " + req?.user?.user?.id + "  JOIN sports ON sports.id = coach_registration.coaching_sport Join city on city.id = coach_registration.city Join colleges on colleges.id = coach_registration.college_name JOIN coach_divisions ON coach_divisions.id = coach_registration.division where registration_id in (select coach_regid from matches where student_regid = " + req.user.user.id + ") and registration_id not in (SELECT `blocked` FROM `blocked` WHERE `blocked_by`= " + req.user.user.id + ") order by matches.id desc", async (err, result) => {
        if (err) {
            res.status(400);
            res.send({
                "error": err.sqlMessage
            });
            return res;
        }
        res.status(200);
        const data = removeDuplicateObjectFromArray(result, "registration_id");
        res.send({
            "message": "success",
            "data": data
        });
        return res;
    });
    return res;
}

exports.studentdata = (req, res) => {

    con.query("SELECT student_registration.registration_id,student_registration.firstname,student_registration.lastname,student_registration.dob,student_registration.gender,state.statename,city.city_name as city,student_registration.school_type,colleges.college_name as school_name,student_registration.scholastic_year,gpa.gpa,student_registration.sat,matches.coach_seen,student_registration.act,student_registration.height,student_registration.weight,student_registration.wingspan,student_registration.dominant_hand,student_registration.personal_bio,student_registration.video,student_registration.notification_token,student_registration.image,student_registration.views FROM student_registration JOIN state ON state.id = student_registration.state JOIN gpa ON gpa.id = student_registration.gpa  Join city on city.id =student_registration.city left Join matches on matches.student_regid = student_registration.registration_id and matches.coach_regid = " + req?.user?.user?.id + "  join colleges on colleges.id = student_registration.school_name where registration_id  in(select student_regid from matches where coach_regid = " + req.user.user.id + ") and registration_id not in (SELECT `blocked` FROM `blocked` WHERE `blocked_by`= " + req.user.user.id + ") order by matches.id desc ", async (err, result) => {
        if (err) {
            console.log(err);
            res.status(400);
            res.send({
                "error": err.sqlMessage
            });
            return res;
        }
        const data = removeDuplicateObjectFromArray(result, "registration_id");
        res.status(200);
        res.send({
            "message": "success",
            "data": data
        });
        return res;
    });
    return res;
}