const con = require('../../dbconfig/db');

exports.sendCoachData = async (req, res) => {
    con.query("SELECT coach_registration.registration_id,coach_registration.firstname,coach_registration.lastname,registration.email,registration.phone,coach_registration.dob,coach_registration.gender,a.statename,coach_registration.state as stateid ,city.city_name as city,coach_registration.city as cityid,colleges.college_name, coach_registration.college_name as collegeid,b.statename as College_State,coach_registration.college_state as collegestateid,coach_registration.university_email,sports.sportsname,coach_registration.coaching_sport as sportid,coach_registration.coaching_gender,coach_registration.team,coach_divisions.divisions,coach_registration.division as divisionid,coach_registration.jobtitle,coach_registration.personal_bio,coach_registration.video,coach_registration.image,coach_registration.views,coach_registration.visibility from coach_registration JOIN state a on a.id = coach_registration.state join state b on b.id = coach_registration.college_state JOIN sports ON sports.id = coach_registration.coaching_sport Join city on city.id = coach_registration.city Join colleges on colleges.id = coach_registration.college_name JOIN coach_divisions ON coach_divisions.id = coach_registration.division JOIN registration ON registration.id = coach_registration.registration_id where coach_registration.registration_id = " + req.user.user.id, async (err, result) => {
        if (err) {
            console.log(err);
            res.status(400);
            res.send({
                "error": err.sqlMessage
            });
            return res;
        } else {
            try {
                const data = result[0];
                res.status(200);
                res.send({
                    "message": "successfully retrieved the data.",
                    "data": data
                });

                return res;
            } catch (errc) {
                console.log(errc);
                res.status(400);
                res.send({
                    "error": "error occured."
                });

                return res;
            }

        }
    });
    return res.status(200);
}


exports.getCoachProfile = async (req, res) => {

    con.query("SELECT coach_registration.registration_id, coach_registration.firstname,coach_registration.lastname,registration.email,registration.phone,coach_registration.dob,coach_registration.gender,a.statename ,city.city_name as city,colleges.college_name,b.statename as College_State,coach_registration.university_email,sports.sportsname,coach_registration.coaching_gender,coach_registration.team,coach_divisions.divisions,coach_registration.jobtitle,coach_registration.personal_bio,coach_registration.video,coach_registration.image,coach_registration.views,coach_registration.visibility from coach_registration JOIN state a on a.id = coach_registration.state join state b on b.id = coach_registration.college_state JOIN sports ON sports.id = coach_registration.coaching_sport Join city on city.id = coach_registration.city Join colleges on colleges.id = coach_registration.college_name JOIN coach_divisions ON coach_divisions.id = coach_registration.division JOIN registration ON registration.id = coach_registration.registration_id where coach_registration.registration_id = " + req.query.id, async (err, result) => {
        if (err) {
            console.log(err);
            res.status(400);
            res.send({
                "error": err.sqlMessage
            });
            return res;
        } else {
            try {
                const data = result[0];
                con.query("update coach_registration set views = ? where registration_id=?", [data.views + 1, req.query.id]);
                if (data?.visibility == "Always") {
                    res.status(200);
                    res.send({
                        "message": "successfully retrieved the data.",
                        "data": data
                    });
                } else if (data?.visibility == "Never") {
                    delete data?.phone;
                    delete data?.email;
                    res.status(200);
                    res.send({
                        "message": "successfully retrieved the data.",
                        "data": data
                    });
                } else {
                    con.query("select * from matches where student_regid=? and coach_regid=? ", [req?.user?.user?.id, req?.query?.id], (ermatch, resmatch) => {
                        if (ermatch) {
                            res.status(200);
                            res.send({
                                "message": "successfully retrieved the data.",
                                "data": data
                            });
                            return res;
                        }
                        if (resmatch.length < 1) {
                            delete data?.phone;
                            delete data?.email;
                            res.status(200);
                            res.send({
                                "message": "successfully retrieved the data.",
                                "data": data
                            });
                            return res;
                        }
                        res.status(200);
                        res.send({
                            "message": "successfully retrieved the data.",
                            "data": data
                        });
                        return res;
                    });
                    return res;
                }

                return res;
            } catch (errc) {
                console.log(errc);
                res.status(400);
                res.send({
                    "error": "error occured."
                });

                return res;
            }
            return res;
        }
    });
    return res;
}