const con = require('../../dbconfig/db');

exports.updateAthlete = (req, res) => {
    try {
        con.query("UPDATE `student_registration` SET `height`=?,`weight`=?,`video`=? where registration_id = ?", [req?.body?.height, req?.body?.weight, req?.body?.video, req?.user?.user?.id], (error, result) => {
            if (error) {
                res.status(400);
                res.send({
                    "error": error.sqlMessage
                });
                return res;
            }
            con.query("DELETE FROM `player_sports` WHERE registration_id=? ", [req.user.user.id], (errr, resss) => {
                if (errr) {
                    res.status(200);
                    res.send({
                        "message": "some error occuered couldn't update sports"
                    });
                    return res;
                }
                var data = req.body.sports;
                var sport = []
                data.forEach(ele => {
                    sport.push([req.user.user.id, ele]);
                });
                if (sport.length > 0) {
                    con.query("insert into `player_sports`( `registration_id`, `sport`) values ?", [sport], (errrr, ressss) => {
                        if (errrr) {
                            console.log(errrr);
                            res.status(400);
                            res.send({
                                "error": "deleted but not inserted"
                            });
                            return res;
                        }
                        res.status(200);
                        res.send({
                            "message": "success"
                        });
                    });
                } else {
                    res.status(200);
                    res.send({
                        "message": success
                    })
                }
                return res;
            });
            return res;
        });
        return res;
    } catch (err) {
        res.status(400);
        res.send({ "error": "Server error" });
        return res;
    }
    return res;
}

exports.updatepersonal = (req, res) => {
    console.log(req.body);
    try {
        con.query("UPDATE `student_registration` SET `firstname`=?,`lastname`=?,age=?,`dob`=?,`gender`=?,`state`=?,`city`=?,`school_name`=?,`school_type`=?,`scholastic_year`=?,`gpa`=?,`sat`=?,`act`=?,`personal_bio`=?,visibility=? where registration_id=?", [req.body.firstname, req.body.lastname, req?.body?.age, req.body.dob, req.body.gender, req.body.state, req.body.city, req.body.school, req.body.school_type, req.body.scholastic_year, req?.body?.gpa, req?.body?.sat, req?.body?.act, req.body.bio, req?.body?.visibility, req.user.user.id], (error, result) => {
            if (error) {
                console.log(error);
                res.status(400);
                res.send({
                    "error": error?.sqlMessage
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
    } catch (err) {
        res.status(400);
        res.send({
            "error": "Internal server error"
        });
        return res;
    }
}

exports.updateMobile = (req, res) => {
    console.log(req.body);
    if (!req?.body?.number || req?.body?.number.length != 10) {
        res.status(400);
        res.send({
            "error": "Invalid number"
        });
        return res;
    }
    con.query("select * from registration where phone = ?", [req.body.number], (err, result) => {
        if (err) {
            res.status(400);
            res.send({
                "error": "Internal server occured"
            });
            return res;
        }
        if (result.length > 0) {
            res.status(400);
            res.send({
                "error": "This number is already registered"
            });
            return res;
        }
        else {
            con.query("update registration set phone = ? where id = ? ", [req.body.number, req.user.user.id], (error, ress) => {
                if (error) {
                    res.status(400);
                    res.send({
                        "error": "Internal server error"
                    });
                    return res;
                }
                res.status(200);
                res.send({
                    "message": "updated"
                });
                return res;
            });
            return res;
        }
    });
    return res;
}


exports.updateEmail = (req, res) => {
    console.log(req.body);
    if (!req?.body?.email) {
        res.status(400);
        res.send({
            "error": "Invalid email"
        });
        return res;
    }
    con.query("select * from registration where email = ?", [req?.body?.email], (err, result) => {
        if (err) {
            res.status(400);
            res.send({
                "error": "Internal server occured"
            });
            return res;
        }
        if (result.length > 0) {
            res.status(400);
            res.send({
                "error": "This email is already registered"
            });
            return res;
        }
        else {
            con.query("update registration set email = ? where id = ? ", [req?.body?.email, req.user.user.id], (error, ress) => {
                if (error) {
                    res.status(400);
                    res.send({
                        "error": "Internal server error"
                    });
                    return res;
                }
                res.status(200);
                res.send({
                    "message": "updated"
                });
                return res;
            });
            return res;
        }
    });
    return res;
}

