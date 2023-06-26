const con = require('../../dbconfig/db');
exports.getdata = async (req, res) => {
    con.query("select * from coach_filter where registration_id =?", req.user.user.id, (error, result) => {
        if (error) {
            console.log(error);
            res.status(400);
            res.send({
                "error": error.sqlMessage
            });
            return res;
        }
        if (result && result.length < 1) {
            con.query("SELECT student_registration.registration_id as id, student_registration.firstname,student_registration.lastname,student_registration.father_number,registration.email,registration.phone,student_registration.dob,student_registration.age,student_registration.gender,state.statename,city.city_name as city,student_registration.school_type,student_registration.school_name,student_registration.scholastic_year,student_registration.image,gpa.gpa,student_registration.sat,student_registration.act,student_registration.height,student_registration.weight,student_registration.wingspan,student_registration.dominant_hand,student_registration.personal_bio,student_registration.video,student_registration.image,student_registration.visibility FROM student_registration JOIN state ON state.id = student_registration.state JOIN gpa ON gpa.id = student_registration.gpa Join city on city.id =student_registration.city JOIN registration on registration.id = student_registration.registration_id and student_registration.registration_id not in (select actionto from swiping where actionby = " + req.user.user.id + ") and student_registration.registration_id not in (select student_regid from matches where coach_regid=" + req.user.user.id + ") order by Rand() Limit 10", (errorrr, resulttt) => {
                if (errorrr) {
                    console.log(errorrr);
                    res.status(400);
                    res.send({
                        "error": errorrr.sqlMessage
                    });
                    return res;
                }
                const data = removeDuplicateObjectFromArray(resulttt, "email");
                con.query("SELECT player_sports.registration_id as id, sports.sportsname,position.position FROM `player_sports` JOIN sports ON sports.id = player_sports.sport JOIN position ON position.id = player_sports.position ", (e, r) => {
                    if (e) {
                        console.log(e);
                        res.status(400);
                        res.send({
                            "error": e.sqlMessage
                        });
                        return res;
                    }
                    for (var k = 0; k < data.length; k++) {
                        if (data[k].visibility != "Always") {
                            delete data[k]?.email;
                            delete data[k]?.phone;
                        }
                        data[k].sport = [];
                        for (var l = 0; l < r.length; l++) {
                            if (data[k].id == r[l].id) {
                                data[k].sport.push(r[l]);
                            }
                        }
                    }
                    res.status(200);
                    res.send({
                        "data": data
                    });

                });

            });
            return res;
        } else {
            var ststr;
            var spstr;
            var positionarr;

            result[0]?.states?.split(",").forEach(element => {
                ststr = (ststr) ? ststr + (",'" + element + "'") : "'" + element + "'";
            });

            result[0]?.sports?.split(",").forEach(m => {
                spstr = (spstr) ? spstr + (",'" + m + "'") : "'" + m + "'";
            });

            result[0]?.positions?.split(",").forEach(m => {
                positionarr = (positionarr) ? positionarr + (",'" + m + "'") : "'" + m + "'";
            });

            var statequery = (result[0].states != "null" && result[0].states != null) ? " and statename in (" + ststr + ")" : " ";
            var positionquery = (result[0].positions != "null" && result[0].positions != null) ? " and position.position in (" + positionarr + ")" : " ";
            var sportquery = (result[0].sports != "null" && result[0].sports != null) ? " and sportsname in (" + spstr + ")" : " ";
            var scholasticarr = (result[0].years != 'null' && result[0].years != null) ? " and scholastic_year in (" + result[0].years + ")" : " ";


            con.query("SELECT player_sports.registration_id, sports.sportsname,position.position FROM `player_sports` JOIN sports ON sports.id = player_sports.sport JOIN position ON position.id = player_sports.position WHERE 1=1 " + sportquery + positionquery, (errrr, ressss) => {
                if (errrr) {
                    console.log(errrr);
                    res.status(400);
                    res.send({
                        "error": errrr.sqlMessage
                    });
                    return res;
                }
                var rid = [];
                ressss.forEach(m => {
                    rid.push(m.registration_id);
                });

                rstr = " and student_registration.registration_id in (" + rid + ")";


                con.query("SELECT student_registration.registration_id as id, student_registration.firstname,student_registration.lastname,registration.email,registration.phone,student_registration.dob,student_registration.age,student_registration.gender,state.statename,city.city_name as city,student_registration.school_type,student_registration.school_name,student_registration.scholastic_year,student_registration.image,gpa.gpa,student_registration.sat,student_registration.act,student_registration.height,student_registration.weight,student_registration.wingspan,student_registration.dominant_hand,student_registration.personal_bio,student_registration.video,student_registration.image,student_registration.visibility FROM student_registration JOIN state ON state.id = student_registration.state Join city on city.id =student_registration.city JOIN gpa ON gpa.id = student_registration.gpa  JOIN registration on registration.id = student_registration.registration_id where 1=1 " + statequery + scholasticarr + " and height between " + result[0]?.min_height + " and " + result[0]?.max_height + " and weight between " + result[0]?.min_weight + " and " + result[0]?.max_weight + " and gpa.gpa >= Round(" + result[0]?.min_gpa + ",2) and  Round(gpa.gpa,2) <= Round(" + result[0].max_gpa + ",2) and sat between  " + result[0].min_sat + " and " + result[0].max_sat + " and act between  " + result[0]?.min_act + " and " + result[0]?.max_act + rstr + " and student_registration.age between " + result[0]?.min_age + " and " + result[0]?.max_age + " and student_registration.registration_id not in (select actionto from swiping where actionby = " + req?.user?.user?.id + ") and student_registration.registration_id not in (select student_regid from matches where coach_regid=" + req?.user?.user?.id + ") order by Rand() Limit 10", (err, results) => {
                    if (err) {
                        console.log(err);
                        res.status(400);
                        res.send({
                            "error": err.sqlMessage
                        });
                        return res;
                    }
                    const data = removeDuplicateObjectFromArray(results, "email");
                    con.query("SELECT player_sports.registration_id as id, sports.sportsname,position.position FROM `player_sports` JOIN sports ON sports.id = player_sports.sport JOIN position ON position.id = player_sports.position ", (e, r) => {
                        if (e) {
                            console.log(e);
                            res.status(400);
                            res.send({
                                "error": e?.sqlMessage
                            });
                            return res;
                        }
                        for (var k = 0; k < data.length; k++) {
                            data[k].sport = [];
                            if (data[k].visibility != "Always") {
                                delete data[k]?.email;
                                delete data[k]?.phone;
                            }
                            for (var l = 0; l < r.length; l++) {
                                if (data[k]?.id == r[l]?.id) {
                                    data[k]?.sport?.push(r[l]);
                                }
                            }
                        }
                        res.status(200);
                        res.send({
                            "data": data
                        });

                    });
                });
            });
        }
        return res;
    })
    return res;
}

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

exports.getaction = async (req, res) => {
    con.query("select * from swiping where actionby=? and actionto=? ", [req.user.user.id, req.query.id], (error, result) => {
        if (error) {
            res.status(400);
            res.send({
                "error": sqlMessage
            });
            return res;
        }
        else {
            console.log(result);
            if (result.length < 1) {
                res.status(200);
                res.send({
                    "message": "success",
                    "action": 2
                });
                return res;
            }
            else {
                res.status(200);
                res.send({
                    "message": "success",
                    "action": result[0].action
                });
                return res;
            }
            return res.states(400).json({ "error": "unknown erorr" });
        }
    });
    return res;
}