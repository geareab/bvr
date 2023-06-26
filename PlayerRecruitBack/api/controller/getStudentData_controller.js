const con = require('../../dbconfig/db');

exports.sendStudentData = async (req, res) => {
    var results =[];

    con.query("SELECT student_registration.firstname,student_registration.lastname,registration.email,registration.phone,student_registration.dob,student_registration.age,student_registration.gender,state.statename,student_registration.state as stateid,city.city_name as city,student_registration.city as cityid,student_registration.school_type, student_registration.school_name,student_registration.scholastic_year,gpa.gpa,student_registration.gpa as gpaid,student_registration.sat,student_registration.act,student_registration.height,student_registration.weight,student_registration.wingspan,student_registration.dominant_hand,student_registration.personal_bio,student_registration.video,student_registration.image,student_registration.views,student_registration.validity,student_registration.swipes,student_registration.last_swipe,student_registration.subscription,student_registration.visibility FROM student_registration JOIN state ON state.id = student_registration.state JOIN gpa ON gpa.id = student_registration.gpa JOIN registration on registration.id = student_registration.registration_id Join city on city.id =student_registration.city WHERE student_registration.registration_id =? ", [req?.user?.user?.id], async (err, result) => {
        if (err) {
            console.log(err);
            res.status(400);
            res.send({
                "error": err.sqlMessage
            });
            return res;
        } else {
            try {

                console.log(req.user.user.id);
                const data = result[0];
                console.log(result);
                var date = new Date();
                const d = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
                var resdate = (date.getDate() - 1) + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
                if (data.last_swipe != null)
                    resdate = data.last_swipe.getDate() + "/" + (data.last_swipe.getMonth() + 1) + "/" + data.last_swipe.getFullYear();
                if (resdate != d) {
                    data.remaining = data?.subscription;
                } else {
                    data.remaining = data?.subscription - data.swipes;
                }

                if (data.subscription == 15) {
                    data.subs = "Platinum";
                } else {
                    data.subs = "Standard";
                }
                await con.query("SELECT sports.sportsname, player_sports.sport as sportid,position.position,player_sports.position as positionid FROM `player_sports` JOIN sports ON sports.id = player_sports.sport JOIN position ON position.id = player_sports.position WHERE player_sports.registration_id = " + req?.user?.user?.id, async (errors, results) => {
                    if (errors) {
                        res.status(200);
                        res.send({
                            data
                        })

                    } else {
                        data.sport = results;
                        data.registration_id = req.user.user.id;
                        res.status(200);
                        res.send({
                            "message": "successfull",
                            data
                        });
                    }
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
    return res;
}

exports.getStudentProfile = async (req, res) => {
    con.query("SELECT student_registration.registration_id,student_registration.firstname,student_registration.lastname,registration.email,registration.phone,student_registration.dob,student_registration.gender,state.statename,city.city_name as city,student_registration.school_type,student_registration.scholastic_year,gpa.gpa,student_registration.sat,student_registration.act,student_registration.height,student_registration.weight,student_registration.wingspan,student_registration.dominant_hand,student_registration.personal_bio,student_registration.video,student_registration.image,student_registration.visibility,student_registration.views FROM student_registration left JOIN state ON state.id = student_registration.state left JOIN gpa ON gpa.id = student_registration.gpa left JOIN registration on registration.id = student_registration.registration_id left Join city on city.id =student_registration.city WHERE student_registration.registration_id = ? ", [req?.query?.id], async (err, result) => {
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
                await con.query("SELECT sports.sportsname,position.position FROM `player_sports` JOIN sports ON sports.id = player_sports.sport JOIN position ON position.id = player_sports.position WHERE player_sports.registration_id = ?", [req.query.id], async (errors, results) => {
                    if (errors) {
                        res.status(200);
                        res.send({
                            data
                        });
                        return res;
                    } else {
                        con.query("update student_registration set views =? where registration_id =? ", [data.views + 1, req.query.id]);
                        if (data?.visibility == "Never") {
                            delete data.email;
                            delete data.phone;
                        } else if (data?.visibility == "Only matches") {
                            await con.query("select * from matches where student_regid=? and coach_regid=?", [req?.query?.id, req?.user?.user?.id], (errmatch, resmatch) => {
                                if (errmatch) {
                                    console.log(errmatch);
                                    return;
                                }
                                console.log(resmatch);
                                if (resmatch.length < 1) {
                                    delete data.email;
                                    delete data.phone;
                                }
                                data.sport = results;
                                data.registration_id = req.user.user.id;
                                res.status(200);
                                res.send({
                                    "message": "successfull",
                                    data
                                });
                                return res;
                            });
                            return res;
                        } else {
                            data.sport = results;
                            data.registration_id = req.user.user.id;
                            res.status(200);
                            res.send({
                                "message": "successfull",
                                data
                            });
                            return res;
                        }
                        data.sport = results;
                        data.registration_id = req.user.user.id;
                        res.status(200);
                        res.send({
                            "message": "successfull",
                            data
                        });
                        return res;

                    }
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
        return res;
    });
    return res;
}