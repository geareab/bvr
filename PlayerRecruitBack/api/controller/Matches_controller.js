const con = require('../../dbconfig/db');
const fetch = require("node-fetch");


exports.getlikebymedata = async (req, res) => {
    con.query("select * from swiping where actionby=?", [req?.user?.user?.id], (error, result) => {
        if (error) {
            console.log(error);
            res.status(400);
            res.send({
                "error": error.sqlMessage
            });
            return res;
        }
        var registraionlist = [];
        result.forEach(element => {
            if (element.action == 1) {
                registraionlist.push(element?.actionto);
            }
        });
        if (registraionlist.length < 1) {
            registraionlist = [0, -1];
        }
        con.query("SELECT coach_registration.registration_id,coach_registration.firstname,coach_registration.lastname,coach_registration.dob,coach_registration.gender,a.statename ,city.city_name as city,colleges.college_name,b.statename as College_State,coach_registration.university_email,sports.sportsname,coach_registration.coaching_gender,coach_registration.team,coach_divisions.divisions,coach_registration.jobtitle,coach_registration.personal_bio,coach_registration.video,coach_registration.image,coach_registration.views from coach_registration JOIN state a on a.id = coach_registration.state join state b on b.id = coach_registration.college_state JOIN sports ON sports.id = coach_registration.coaching_sport Join city on city.id = coach_registration.city Join colleges on colleges.id = coach_registration.college_name JOIN coach_divisions ON coach_divisions.id = coach_registration.division where registration_id in (" + registraionlist + ")", (errorr, resultt) => {
            if (errorr) {
                console.log(errorr);
                res.status(400);
                res.send({
                    "error": errorr.sqlMessage
                });
                return res;
            }
            res.status(200);
            res.send({
                "message": "success",
                "data": resultt
            });
            return res;
        });
        return res;
    });
    return res;
}

exports.getlikedbycoachesdata = async (req, res) => {
    con.query("select * from swiping where actionto=?", [req?.user?.user?.id], (error, result) => {
        if (error) {
            console.log(error);
            res.status(400);
            res.send({
                "error": error.sqlMessage
            });
            return res;
        }
        var registraionlist = [];
        result.forEach(element => {
            if (element.action == 1) {
                registraionlist.push(element.actionby);
            }
        });

        if (registraionlist.length < 1) {
            registraionlist = [0, -1];
        }
        con.query("SELECT coach_registration.registration_id,coach_registration.firstname,coach_registration.lastname,coach_registration.dob,coach_registration.gender,a.statename ,city.city_name as city,colleges.college_name,b.statename as College_State,coach_registration.university_email,sports.sportsname,coach_registration.coaching_gender,coach_registration.team,coach_divisions.divisions,coach_registration.jobtitle,coach_registration.personal_bio,coach_registration.video,coach_registration.image,coach_registration.views,swiping.seen_status from coach_registration  JOIN state a on a.id = coach_registration.state join state b on b.id = coach_registration.college_state JOIN sports ON sports.id = coach_registration.coaching_sport Join city on city.id = coach_registration.city Join swiping on swiping.actionby = coach_registration.registration_id and actionto=" + req?.user?.user?.id + " Join colleges on colleges.id = coach_registration.college_name JOIN coach_divisions ON coach_divisions.id = coach_registration.division where registration_id in (" + registraionlist + ") order by swiping.id desc ", (errorr, resultt) => {
            if (errorr) {
                console.log(errorr);
                res.status(400);
                res.send({
                    "error": errorr.sqlMessage
                });
                return res;
            }
            res.status(200);
            res.send({
                "message": "success",
                "data": resultt
            });
            return res;
        });
        return res;
    });
    return res;
}

exports.getlikebymedatacoach = async (req, res) => {
    con.query("select * from swiping where actionby=?", [req?.user?.user?.id], (error, result) => {
        if (error) {
            console.log(error);
            res.status(400);
            res.send({
                "error": error.sqlMessage
            });
            return res;
        }
        var registraionlist = [];
        result.forEach(element => {
            if (element.action == 1) {
                registraionlist.push(element.actionto);
            }
        });
        if (registraionlist.length < 1) {
            registraionlist = [0, -1];
        }

        con.query("SELECT student_registration.registration_id,student_registration.firstname,student_registration.lastname,student_registration.dob,student_registration.gender,state.statename,city.city_name as city,student_registration.school_type,colleges.college_name as school_name,student_registration.scholastic_year,gpa.gpa,student_registration.sat,student_registration.act,student_registration.height,student_registration.weight,student_registration.wingspan,student_registration.dominant_hand,student_registration.personal_bio,student_registration.video,student_registration.image,student_registration.views FROM student_registration JOIN state ON state.id = student_registration.state JOIN gpa ON gpa.id = student_registration.gpa   Join city on city.id =student_registration.city join colleges on colleges.id = student_registration.school_name where registration_id in (" + registraionlist + ")", (errorr, resultt) => {
            if (errorr) {
                console.log(errorr);
                res.status(400);
                res.send({
                    "error": errorr.sqlMessage
                });
                return res;
            }
            res.status(200);
            res.send({
                "message": "success",
                "data": resultt
            });
            return res;
        });
        return res;
    });
    return res;
}

exports.getlikedbyathletesdata = async (req, res) => {
    con.query("select * from swiping where actionto=?", [req?.user?.user?.id], (error, result) => {
        if (error) {
            console.log(error);
            res.status(400);
            res.send({
                "error": error.sqlMessage
            });
            return res;
        }
        var registraionlist = [];
        result.forEach(element => {
            if (element.action == 1) {
                registraionlist.push(element.actionby);
            }
        });
        if (registraionlist?.length < 1) {
            registraionlist = [0, -1];
        }
        con.query("SELECT student_registration.registration_id,student_registration.firstname,student_registration.lastname,student_registration.dob,student_registration.gender,state.statename,city.city_name as city,student_registration.school_type,colleges.college_name as school_name,student_registration.scholastic_year ,swiping.seen_status,gpa.gpa,student_registration.sat,student_registration.act,student_registration.height,student_registration.weight,student_registration.wingspan,student_registration.dominant_hand,student_registration.personal_bio,student_registration.video,student_registration.image,student_registration.views FROM student_registration Join swiping on swiping.actionby = student_registration.registration_id and actionto=" + req?.user?.user?.id + "  JOIN state ON state.id = student_registration.state JOIN gpa ON gpa.id = student_registration.gpa  Join city on city.id =student_registration.city join colleges on colleges.id = student_registration.school_name where registration_id in (" + registraionlist + ") order by swiping.id desc", (errorr, resultt) => {
            if (errorr) {
                console.log(errorr);
                res.status(400);
                res.send({
                    "error": errorr.sqlMessage
                });
                return res;
            }
            res.status(200);
            res.send({
                "message": "success",
                "data": resultt
            });
            return res;
        });
        return res;
    });
    return res;
}

exports.getstudentneutral = async (req, res) => {
    con.query("select * from swiping where actionby=?", [req.user.user.id], (error, result) => {
        if (error) {
            console.log(error);
            res.status(400);
            res.send({
                "error": error.sqlMessage
            });
            return res;
        }
        var registraionlist = [];
        result.forEach(element => {
            if (element.action == 2) {
                registraionlist.push(element.actionto);
            }
        });
        if (registraionlist.length < 1) {
            registraionlist = [0, -1];
        }
        con.query("SELECT coach_registration.registration_id,coach_registration.firstname,coach_registration.lastname,coach_registration.dob,coach_registration.gender,a.statename ,city.city_name as city,colleges.college_name,b.statename as College_State,coach_registration.university_email,sports.sportsname,coach_registration.coaching_gender,coach_registration.team,coach_divisions.divisions,coach_registration.jobtitle,coach_registration.personal_bio,coach_registration.video,coach_registration.image,coach_registration.views from coach_registration JOIN state a on a.id = coach_registration.state join state b on b.id = coach_registration.college_state JOIN sports ON sports.id = coach_registration.coaching_sport Join city on city.id = coach_registration.city Join colleges on colleges.id = coach_registration.college_name JOIN coach_divisions ON coach_divisions.id = coach_registration.division where registration_id in (" + registraionlist + ")", (errorr, resultt) => {
            if (errorr) {
                console.log(errorr);
                res.status(400);
                res.send({
                    "error": errorr.sqlMessage
                });
                return res;
            }
            res.status(200);
            res.send({
                "message": "success",
                "data": resultt
            });
            return res;
        });
        return res;
    });
    return res;
}

exports.getcoachneutral = (req, res) => {
    con.query("select * from swiping where actionby=?", [req.user.user.id], (error, result) => {
        if (error) {
            console.log(error);
            res.status(400);
            res.send({
                "error": error.sqlMessage
            });
            return res;
        }
        var registraionlist = [];
        result.forEach(element => {
            if (element.action == 2) {
                registraionlist.push(element.actionto);
            }
        });
        if (registraionlist.length < 1) {
            registraionlist = [0, -1];
        }
        con.query("SELECT student_registration.registration_id,student_registration.firstname,student_registration.lastname,student_registration.dob,student_registration.gender,state.statename,city.city_name as city,student_registration.school_type,colleges.college_name as school_name,student_registration.scholastic_year,gpa.gpa,student_registration.sat,student_registration.act,student_registration.height,student_registration.weight,student_registration.wingspan,student_registration.dominant_hand,student_registration.personal_bio,student_registration.video,student_registration.image,student_registration.views FROM student_registration JOIN state ON state.id = student_registration.state JOIN gpa ON gpa.id = student_registration.gpa  Join city on city.id =student_registration.city join colleges on colleges.id = student_registration.school_name where registration_id in (" + registraionlist + ")", (errorr, resultt) => {
            if (errorr) {
                console.log(errorr);
                res.status(400);
                res.send({
                    "error": errorr.sqlMessage
                });
                return res;
            }
            res.status(200);
            res.send({
                "message": "success",
                "data": resultt
            });
            return res;
        });
        return res;
    });
    return res;
}

exports.matchadd = (req, res) => {
    if (req?.body?.athleteid || req?.body?.coachid) {
        con.query("insert into  matches(student_regid, coach_regid) values(?)", [[(req?.body?.athleteid ? req?.body?.athleteid : req.user.user.id), (req?.body?.coachid ? req?.body?.coachid : req.user.user.id)]], (err, result) => {
            if (err) {
                res.status(400);
                res.send({
                    "error": err.sqlMessage
                })
                return res;
            }
            if (req?.body?.athleteid && req?.body?.athleteid != undefined) {
                notification(req?.user?.user?.id, req?.body?.athleteid, 1);
            } else {
                notification(req?.user?.user?.id, req?.body?.coachid, 2);
            }
            con.query("delete from swiping where actionby in (?) and actionto in (?)", [[(req?.body?.athleteid ? req?.body?.athleteid : req.user.user.id), (req?.body?.coachid ? req?.body?.coachid : req.user.user.id)], [(req?.body?.athleteid ? req?.body?.athleteid : req.user.user.id), (req?.body?.coachid ? req?.body?.coachid : req.user.user.id)]], (error, ress) => {
                if (error) {
                    console.log(error);
                    res.status(400).json({ "error": error.sqlMessage });
                    return res;
                } else {

                    res.status(200);
                    res.send({
                        "message": "success"
                    });
                    return res;
                }
            })
            return res;
        });

        return res;
    } else {
        res.status(400);
        res.send({
            "error": "not  proper parameter"
        });
        return res;
    }
    return res;
}

exports.removematched = (req, res) => {
    console.log(req.body);
    if (req?.body?.coachid) {
        try {
            con.query("delete from matches where coach_regid=? and student_regid=?", [req?.body?.coachid, req?.user?.user?.id], (err, result) => {
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
        } catch (er) {
            res.status(400);
            res.send({
                "error": "internal server error"
            });
            return res;
        }
        return res;
    } else if (req?.body?.athleteid) {
        try {
            con.query("delete from matches where coach_regid=? and student_regid=?", [req?.user?.user?.id, req?.body?.athleteid], (err, result) => {
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
        } catch (er) {
            res.status(400);
            res.send({
                "error": "internal server error"
            });
            return res;
        }
        return res;
    } else {
        res.status(400);
        res.send({
            "error": "Server didn't get the user id"
        });
        return res;
    }
    return res;
}

exports.countLike = (req, res) => {
    try {
        con.query("SELECT * FROM `swiping` WHERE actionto=? and seen_status=? and action=1", [req?.user?.user?.id, "Unread"], (error, result) => {
            if (error) {
                console.log(error);
                res.status(400);
                res.send({
                    "error": error.sqlMessage
                });
                return res
            }
            console.log(result);
            res.status(200);
            res.send({
                "message": "success",
                "count": result.length,
                "userid": req?.user?.user?.id
            })
        })

    } catch (err) {
        res.status(400);
        res.send({
            "error": "Internal server error"
        });
        return res;
    }
}

exports.countStudentNewMatch = (req, res) => {
    try {
        con.query("SELECT * FROM `matches` WHERE student_regid=? and student_seen='Unread'", [req?.user?.user?.id], (error, result) => {
            if (error) {
                console.log(error);
                res.status(400);
                res.send({
                    "error": error.sqlMessage
                });
                return res
            }
            console.log(result);
            res.status(200);
            res.send({
                "message": "success",
                "count": result.length,
                "userid": req?.user?.user?.id
            })
        });

    } catch (err) {
        res.status(400);
        res.send({
            "error": "Internal server error"
        });
        return res;
    }
}
exports.readStudentNewMatch = (req, res) => {
    try {
        con.query("update matches set student_seen = 'Read' where student_regid = ?", [req?.user?.user?.id], (error, result) => {
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

exports.readlikedbymatch = (req, res) => {
    try {
        console.log(req.body);
        con.query("update swiping set seen_status = 'Read' where actionto = ?", [req?.user?.user?.id], (error, result) => {
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
                "message": "success"
            });
            return res;
        });
        return res;
    } catch (err) {
        res.status(400);
        res.send({
            "error": "Server error"
        });
        return res;
    }
}

const notification = async (userid, id, type) => {
    if (type == 1 && id)
        await con.query("select a.notification_token,b.firstname,b.lastname from student_registration a join coach_registration b on b.registration_id = " + userid + " where a.registration_id=?", [id], async (errornot, resultnot) => {
            if (errornot) {
                console.log(errornot);
            }
            console.log(resultnot);
            const body = "Matched  with " + resultnot[0].firstname + " " + resultnot[0].lastname;
            var raw = JSON.stringify({
                "to": resultnot[0]?.notification_token,
                "body": body
            });
            var requestOptions = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: raw,
                redirect: 'follow'
            };

            await fetch("https://exp.host/--/api/v2/push/send", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));

        });
    else
        await con.query("select  a.notification_token,b.firstname,b.lastname from coach_registration a join student_registration b on b.registration_id = " + userid + " where a.registration_id=?", [id], async (errornot, resultnot) => {
            if (errornot) {
                console.log(errornot);
            }
            console.log(resultnot);
            const body = "Matched  with " + resultnot[0]?.firstname + " " + resultnot[0]?.lastname;
            var raw = JSON.stringify({
                "to": resultnot[0]?.notification_token,
                "body": body
            });

            var requestOptions = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: raw,
                redirect: 'follow'
            };

            await fetch("https://exp.host/--/api/v2/push/send", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));

        });
    return

}
exports.readCoachNewLikes = (req, res) => {
    try {
        console.log(req.body);
        con.query("update swiping set seen_status = 'Read' where actionto = ?", [req?.user?.user?.id], (error, result) => {
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
        return res;
    } catch (err) {
        res.status(400);
        res.send({
            "error": "Server error"
        });
        return res;
    }
}
exports.countCoachNewLikes = (req, res) => {
    try {
        con.query("SELECT * FROM `swiping` WHERE actionto=? and seen_status=? and action=1", [req?.user?.user?.id, "Unread"], (error, result) => {
            if (error) {
                console.log(error);
                res.status(400);
                res.send({
                    "error": error.sqlMessage
                });
                return res
            }
            res.status(200);
            res.send({
                "message": "success",
                "count": result.length,
                "userid": req?.user?.user?.id
            })
        })

    } catch (err) {
        res.status(400);
        res.send({
            "error": "Internal server error"
        });
        return res;
    }
}

exports.countCoachNewMatch = (req, res) => {
    try {
        con.query("SELECT * FROM `matches` WHERE coach_regid=? and coach_seen='Unread'", [req?.user?.user?.id], (error, result) => {
            if (error) {
                console.log(error);
                res.status(400);
                res.send({
                    "error": error.sqlMessage
                });
                return res
            }
            console.log(result);
            res.status(200);
            res.send({
                "message": "success",
                "count": result.length,
                "userid": req?.user?.user?.id
            })
        });

    } catch (err) {
        res.status(400);
        res.send({
            "error": "Internal server error"
        });
        return res;
    }
}
exports.readCoachNewMatch = (req, res) => {
    console.log(1);
    try {
        con.query("update matches set coach_seen = 'Read' where coach_regid = ?", [req?.user?.user?.id], (error, result) => {
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