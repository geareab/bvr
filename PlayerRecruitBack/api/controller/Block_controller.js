const con = require('../../dbconfig/db');

exports.block = (req, res) => {
    try {
        con.query("INSERT INTO `blocked`( `blocked_by`, `blocked`) VALUES (?)", [[req?.user?.user?.id, req?.body?.id]], (error, result) => {
            if (error) {
                console.log(error);
                res.status(400);
                res.send({
                    "error": error.sqlMessage
                });
                return res;
            }
            console.log(result);
            res.status(200);
            res.send({
                "message": "success"
            });
            return res;
        });
    } catch (err) {
        res.status(400);
        res.send({
            "error": "Try again! internal server error"
        });
        return res;
    }
    return res;
}

exports.unblock = (req, res) => {
    try {
        con.query("delete from blocked where blocked_by = ? and blocked = ? ", [req?.user?.user?.id, req?.body?.id], (err, result) => {
            if (err) {
                res.status(400);
                res.send({
                    "error": err.sqlMessage
                });
                return res;
            }
            res.status(200);
            res.send({
                "message": "success"
            });
            return res;
        });
        return res;
    } catch (error) {
        res.status(400);
        res.send({
            "error": "Unknown error, Try again"
        });
        return res;
    }
}

exports.blockeddata = (req, res) => {
    console.log(req);
    if (req?.query?.type == "1") {
        try {
            con.query("SELECT coach_registration.registration_id,coach_registration.firstname,coach_registration.lastname,coach_registration.dob,coach_registration.gender,a.statename ,city.city_name as city,colleges.college_name,b.statename as College_State,coach_registration.university_email,sports.sportsname,coach_registration.coaching_gender,coach_registration.team,coach_divisions.divisions,coach_registration.jobtitle,coach_registration.personal_bio,coach_registration.video,coach_registration.image,coach_registration.views from coach_registration JOIN state a on a.id = coach_registration.state join state b on b.id = coach_registration.college_state  JOIN sports ON sports.id = coach_registration.coaching_sport Join city on city.id = coach_registration.city left Join colleges on colleges.id = coach_registration.college_name JOIN coach_divisions ON coach_divisions.id = coach_registration.division where registration_id  in (SELECT `blocked` FROM `blocked` WHERE `blocked_by`= " + req?.user?.user?.id + " )", (error, result) => {
                if (error) {
                    console.log(error);
                    res.status(400);
                    res.send({
                        "error": error.sqlMessage
                    });
                    return res;
                }
                res.status(200);
                res.send({
                    "data": result,
                    "message": "success"
                });
                return res;
            });
            return res;
        } catch (error) {
            res.status(400);
            res.send({
                "error": "Try again! internal error"
            });
            return res;
        }
        return res;
    } else if (req?.query?.type == "2") {
        try {
            con.query("SELECT student_registration.registration_id,student_registration.firstname,student_registration.lastname,student_registration.dob,student_registration.gender,state.statename,city.city_name as city,student_registration.school_type,colleges.college_name as school_name,student_registration.scholastic_year,gpa.gpa,student_registration.sat,student_registration.act,student_registration.height,student_registration.weight,student_registration.wingspan,student_registration.dominant_hand,student_registration.personal_bio,student_registration.video,student_registration.image,student_registration.views FROM student_registration JOIN state ON state.id = student_registration.state JOIN gpa ON gpa.id = student_registration.gpa  Join city on city.id =student_registration.city join colleges on colleges.id = student_registration.school_name where registration_id in (SELECT `blocked` FROM `blocked` WHERE `blocked_by`= " + req.user.user.id + ")", (error, result) => {
                if (error) {
                    console.log(error);
                    res.status(400);
                    res.send({
                        "error": error.sqlMessage
                    });
                    return res;
                }
                res.status(200);
                res.send({
                    "data": result,
                    "message": "success"
                });
                return res;
            });
            return res;
        } catch (error) {
            res.status(400);
            res.send({
                "error": "Try again! internal error"
            });
            return res;
        }
        return res;
    } else {
        res.status(400);
        res.send({
            "error": "coundn't find the type"
        });
        return res;
    }
}