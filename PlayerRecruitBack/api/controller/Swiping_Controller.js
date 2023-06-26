const { compareSync } = require('bcrypt');
const con = require('../../dbconfig/db');

const fetch = require("node-fetch");

exports.leftswipe = async (req, res) => {
    con.query("select * from swiping where actionby=? and actionto=?", [req.user.user.id, req.body.id], (error, result) => {
        if (error) {
            console.log(error);
            res.status(400);
            res.send({
                "error": error.sqlMessage
            });
            return res;
        }
        if (result.length < 1) {
            con.query("insert into swiping(actionby,actionto,action) values (?)", [[req.user.user.id, req.body.id, 0]], (errorr, resultt) => {
                if (errorr) {
                    console.log(errorr);
                    res.status(400);
                    res.send({
                        "error": errorr.sqlMessage
                    });
                    return res;
                }
                res.status(201);
                res.send({
                    "message": "inserted success"
                });
                return res;
            });
            return res;
        } else {
            con.query("update swiping set action = 0 where actionby=? and actionto=?", [req.user.user.id, req.body.id], (errorrr, resulttt) => {
                if (errorrr) {
                    console.log(errorrr);
                    res.status(400);
                    res.send({
                        "error": errorrr.sqlMessage
                    });
                    return res;
                }
                res.status(200);
                res.send({
                    "message": "Success"
                });
                return res;
            });
        }

        return res;
    });
}

exports.rightswipe = async (req, res) => {
    if (req?.body?.type == 1) {
        con.query("select last_swipe,swipes,subscription from student_registration where registration_id = ?", [req.user.user.id], (errsel, ressel) => {
            if (errsel) {
                return res.send(400).json({ "error": errsel.sqlMessage });
            }
            var date = new Date();
            const d = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
            var resdate = (date.getDate() - 1) + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
            if (ressel[0].last_swipe != null)
                resdate = ressel[0].last_swipe.getDate() + "/" + (ressel[0].last_swipe.getMonth() + 1) + "/" + ressel[0].last_swipe.getFullYear();
            if (ressel[0].swipes < ressel[0].subscription || d != resdate) {
                if (d === resdate) {
                    con.query("select * from swiping where actionby=? and actionto=?", [req.user.user.id, req?.body?.coach_id], (error, result) => {
                        if (error) {
                            console.log(error);
                            res.status(400);
                            res.send({
                                "error": error.sqlMessage
                            });
                            return res;
                        }
                        if (result.length < 1) {
                            con.query("select * from swiping where actionby=? and actionto=?", [req.body.coach_id, req.user.user.id], (errorrrr, resultttt) => {
                                if (errorrrr) {
                                    res.status(400);
                                    res.send({
                                        "error": errorrrr.sqlMessage
                                    });
                                    return res;
                                }
                                if (resultttt.length > 0) {
                                    con.query("delete from swiping where actionby=? and actionto=?", [req.body.coach_id, req.user.user.id], (errdel, resdel) => {
                                        if (errdel) {
                                            res.status(400);
                                            res.send({
                                                "error": errdel.sqlMessage
                                            })
                                            return res;
                                        }
                                        con.query("insert into matches(`student_regid`, `coach_regid`) values(?) ", [[req.user.user.id, req?.body?.coach_id]], (inerr, inres) => {
                                            if (inerr) {
                                                res.status(400);
                                                res.send({
                                                    "error": inerr.sqlMessage
                                                });
                                                return res;
                                            }
                                            notification(req?.user?.user?.id, req?.body?.coach_id, 2);
                                            con.query("update student_registration set swipes = swipes + 1, last_swipe = ? where registration_id=?", [date, req.user.user.id]);
                                            res.status(200);
                                            res.send({
                                                "message": "success"
                                            });
                                            return res;
                                        });
                                        return res;
                                    });
                                    return res;
                                } else {
                                    con.query("insert into swiping(actionby,actionto,action) values (?)", [[req.user.user.id, req.body.coach_id, 1]], (errorr, resultt) => {
                                        if (errorr) {
                                            console.log(errorr);
                                            res.status(400);
                                            res.send({ "error": errorr.sqlMessage });
                                            return res;
                                        }
                                        con.query("update student_registration set swipes = swipes + 1, last_swipe = ? where registration_id=?", [date, req.user.user.id]);
                                        res.status(201);
                                        res.send({
                                            "message": "inserted success"
                                        });
                                        return res;
                                    });
                                    return res;
                                }
                            });
                            return res;
                        } else {
                            con.query("update swiping set action = 1 where actionby=? and actionto=?", [req.user.user.id, req.body.coach_id], (errorrr, resulttt) => {
                                if (errorrr) {
                                    console.log(errorrr);
                                    res.status(400);
                                    res.send({
                                        "error": errorrr.sqlMessage
                                    });
                                    return res;
                                }
                                con.query("update student_registration set swipes = swipes + 1, last_swipe = ? where registration_id=?", [date, req.user.user.id]);
                                res.status(200);
                                res.send({
                                    "message": "Success"
                                });
                                return res;
                            })
                            return res;
                        }
                    });
                } else {
                    con.query("select * from swiping where actionby=? and actionto=?", [req.user.user.id, (req?.body?.student_id ? req?.body?.student_id : req.body.coach_id)], (error, result) => {
                        if (error) {
                            console.log(error);
                            res.status(400);
                            res.send({
                                "error": error.sqlMessage
                            });
                            return res;
                        }
                        if (result.length < 1) {
                            con.query("select * from swiping where actionby=? and actionto=?", [(req?.body?.student_id ? req?.body?.student_id : req.body.coach_id), req.user.user.id], (errorrrr, resultttt) => {
                                if (errorrrr) {
                                    res.status(400);
                                    res.send({
                                        "error": errorrrr.sqlMessage
                                    });
                                    return res;
                                }
                                if (resultttt.length > 0) {
                                    con.query("delete from swiping where actionby=? and actionto=?", [(req?.body?.student_id ? req?.body?.student_id : req.body.coach_id), req.user.user.id], (errdel, resdel) => {
                                        if (errdel) {
                                            res.status(400);
                                            res.send({
                                                "error": errdel.sqlMessage
                                            })
                                            return res;
                                        }
                                        con.query("insert into matches(`student_regid`, `coach_regid`) values(?) ", [[(req?.body?.student_id ? req?.body?.student_id : req.user.user.id), (req?.body?.coach_id ? req?.body?.coach_id : req.user.user.id)]], (inerr, inres) => {
                                            if (inerr) {
                                                console.log(inerr);
                                                res.status(400);
                                                res.send({
                                                    "error": inerr.sqlMessage
                                                });
                                                return res;
                                            }
                                            notification(req?.user?.user?.id, req?.body?.coach_id, 2);
                                            con.query("update student_registration set swipes = 1, last_swipe = ? where registration_id=?", [date, req.user.user.id]);
                                            res.status(200);
                                            res.send({
                                                "message": "success"
                                            });
                                            return res;
                                        });
                                        return res;
                                    });
                                    return res;
                                } else {
                                    console.log(1);
                                    con.query("insert into swiping(actionby,actionto,action) values (?)", [[req.user.user.id, (req?.body?.student_id ? req?.body?.student_id : req.body.coach_id), 1]], (errorr, resultt) => {
                                        if (errorr) {
                                            console.log(errorr);
                                            res.status(400);
                                            res.send({ "error": errorr.sqlMessage });
                                            return res;
                                        }
                                        con.query("update student_registration set swipes = 1, last_swipe = ? where registration_id=?", [date, req.user.user.id]);
                                        res.status(201);
                                        res.send({
                                            "message": "inserted success"
                                        });
                                        return res;
                                    });
                                    return res;
                                }
                            });
                            return res;
                        } else {
                            con.query("update swiping set action = 1 where actionby=? and actionto=?", [req.user.user.id, (req?.body?.student_id ? req?.body?.student_id : req.body.coach_id)], (errorrr, resulttt) => {
                                if (errorrr) {
                                    console.log(errorrr);
                                    res.status(400);
                                    res.send({
                                        "error": errorrr.sqlMessage
                                    });
                                    return res;
                                }
                                con.query("update student_registration set swipes =  1, last_swipe = ? where registration_id=?", [date, req.user.user.id]);
                                res.status(200);
                                res.send({
                                    "message": "Success"
                                });
                                return res;
                            })
                            return res;
                        }
                    });
                }
            } else {
                res.status(200);
                res.send({
                    "Message": "Daily limit is reached."
                });
                return res;
            }
        });


    } else {
        con.query("select * from swiping where actionby=? and actionto=?", [req.user.user.id, (req?.body?.student_id ? req?.body?.student_id : req.body.coach_id)], (error, result) => {
            if (error) {
                console.log(error);
                res.status(400);
                res.send({
                    "error": error.sqlMessage
                });
                return res;
            }
            if (result.length < 1) {
                con.query("select * from swiping where actionby=? and actionto=?", [(req?.body?.student_id ? req?.body?.student_id : req.body.coach_id), req.user.user.id], (errorrrr, resultttt) => {
                    if (errorrrr) {
                        res.status(400);
                        res.send({
                            "error": errorrrr.sqlMessage
                        });
                        return res;
                    }
                    if (resultttt.length > 0) {
                        console.log(resultttt);
                        con.query("delete from swiping where actionby=? and actionto=?", [(req?.body?.student_id ? req?.body?.student_id : req.body.coach_id), req.user.user.id], (errdel, resdel) => {
                            if (errdel) {
                                res.status(400);
                                res.send({
                                    "error": errdel.sqlMessage
                                })
                                return res;
                            }
                            console.log(resdel);
                            con.query("insert into matches(`student_regid`, `coach_regid`) values(?) ", [[(req?.body?.student_id ? req?.body?.student_id : req.user.user.id), (req?.body?.coach_id ? req?.body?.coach_id : req.user.user.id)]], (inerr, inres) => {
                                if (inerr) {
                                    console.log(inerr);
                                    res.status(400);
                                    res.send({
                                        "error": inerr.sqlMessage
                                    });
                                    return res;
                                }
                                notification(req?.user?.user?.id, req?.body?.student_id, 1);
                                res.status(200);
                                res.send({
                                    "message": "success"
                                });
                                return res;
                            });
                            return res;
                        });
                        return res;
                    } else {
                        console.log(1);
                        con.query("insert into swiping(actionby,actionto,action) values (?)", [[req.user.user.id, (req?.body?.student_id ? req?.body?.student_id : req.body.coach_id), 1]], (errorr, resultt) => {
                            if (errorr) {
                                console.log(errorr);
                                res.status(400);
                                res.send({ "error": errorr.sqlMessage });
                                return res;
                            }
                            res.status(201);
                            res.send({
                                "message": "inserted success"
                            });
                            return res;
                        });
                        return res;
                    }
                });
                return res;
            } else {
                con.query("update swiping set action = 1 where actionby=? and actionto=?", [req.user.user.id, (req?.body?.student_id ? req?.body?.student_id : req.body.coach_id)], (errorrr, resulttt) => {
                    if (errorrr) {
                        console.log(errorrr);
                        res.status(400);
                        res.send({
                            "error": errorrr.sqlMessage
                        });
                        return res;
                    }
                    res.status(200);
                    res.send({
                        "message": "Success"
                    });
                    return res;
                })
                return res;
            }
        });
    }
    return res;
}

exports.neutralswipe = async (req, res) => {
    if (req?.body?.type == 1) {
        con.query("select last_swipe,swipes from student_registration where registration_id = ?", [req.user.user.id], (errsel, ressel) => {
            if (errsel) {
                console.log(errsel);
                return res.send(400).json({ "error": errsel.sqlMessage });
            }
            var date = new Date();
            const d = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
            var resdate = (date.getDate() - 1) + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
            if (ressel[0].last_swipe != null)
                resdate = ressel[0].last_swipe.getDate() + "/" + (ressel[0].last_swipe.getMonth() + 1) + "/" + ressel[0].last_swipe.getFullYear();
            if (ressel[0].swipes < 20 || resdate != d) {
                if (d === resdate) {
                    con.query("select * from swiping where actionby=? and actionto=?", [req.user.user.id, req.body.id], (error, result) => {
                        if (error) {
                            console.log(error);
                            res.status(400);
                            res.send({
                                "error": error.sqlMessage
                            });
                            return res;
                        }
                        if (result.length < 1) {
                            con.query("insert into swiping(actionby,actionto,action) values (?)", [[req.user.user.id, req.body.id, 2]], (errorr, resultt) => {
                                if (errorr) {
                                    console.log(errorr);
                                    res.status(400);
                                    res.send({ "error": errorr.sqlMessage });
                                    return res;
                                }
                                con.query("update student_registration set swipes = swipes + 1, last_swipe = ? where registration_id=?", [date, req.user.user.id]);
                                res.status(201);
                                res.send({
                                    "message": "inserted success"
                                });
                                return res;
                            });
                            return res;
                        } else {
                            con.query("update swiping set action = 2 where actionby=? and actionto=?", [req.user.user.id, req.body.id], (errorrr, resulttt) => {
                                if (errorrr) {
                                    console.log(errorrr);
                                    res.status(400);
                                    res.send({
                                        "error": errorrr.sqlMessage
                                    });
                                    return res;
                                }
                                con.query("update student_registration set swipes = swipes + 1, last_swipe = ? where registration_id=?", [date, req.user.user.id]);
                                res.status(200);
                                res.send({
                                    "message": "Success"
                                });
                                return res;
                            })
                            return res;
                        }
                    });
                } else {
                    con.query("select * from swiping where actionby=? and actionto=?", [req.user.user.id, req.body.id], (error, result) => {
                        if (error) {
                            console.log(error);
                            res.status(400);
                            res.send({
                                "error": error.sqlMessage
                            });
                            return res;
                        }
                        if (result.length < 1) {
                            con.query("insert into swiping(actionby,actionto,action) values (?)", [[req.user.user.id, req.body.id, 2]], (errorr, resultt) => {
                                if (errorr) {
                                    console.log(errorr);
                                    res.status(400);
                                    res.send({ "error": errorr.sqlMessage });
                                    return res;
                                }
                                con.query("update student_registration set swipes =  1, last_swipe = ? where registration_id=?", [date, req.user.user.id]);
                                res.status(201);
                                res.send({
                                    "message": "inserted success"
                                });
                                return res;
                            });
                            return res;
                        } else {
                            con.query("update swiping set action = 2 where actionby=? and actionto=?", [req.user.user.id, req.body.id], (errorrr, resulttt) => {
                                if (errorrr) {
                                    console.log(errorrr);
                                    res.status(400);
                                    res.send({
                                        "error": errorrr.sqlMessage
                                    });
                                    return res;
                                }
                                con.query("update student_registration set swipes =  1, last_swipe = ? where registration_id=?", [date, req.user.user.id]);
                                res.status(200);
                                res.send({
                                    "message": "Success"
                                });
                                return res;
                            })
                            return res;
                        }
                    });
                }
            } else {
                res.status(200);
                res.send({
                    "Message": "Daily limit is reached."
                });
                return res;
            }

        });
    } else {
        con.query("select * from swiping where actionby=? and actionto=?", [req.user.user.id, req.body.id], (error, result) => {
            if (error) {
                console.log(error);
                res.status(400);
                res.send({
                    "error": error.sqlMessage
                });
                return res;
            }
            if (result.length < 1) {
                con.query("insert into swiping(actionby,actionto,action) values (?)", [[req.user.user.id, req.body.id, 2]], (errorr, resultt) => {
                    if (errorr) {
                        console.log(errorr);
                        res.status(400);
                        res.send({ "error": errorr.sqlMessage });
                        return res;
                    }
                    res.status(201);
                    res.send({
                        "message": "inserted success"
                    });
                    return res;
                });
                return res;
            } else {
                con.query("update swiping set action = 2 where actionby=? and actionto=?", [req.user.user.id, req.body.id], (errorrr, resulttt) => {
                    if (errorrr) {
                        console.log(errorrr);
                        res.status(400);
                        res.send({
                            "error": errorrr.sqlMessage
                        });
                        return res;
                    }

                    res.status(200);
                    res.send({
                        "message": "Success"
                    });
                    return res;
                })
                return res;
            }
        });
    }
    return res;
}

exports.reset = async (req, res) => {
    try {
        con.query("delete from swiping where actionby=?", [req?.user?.user?.id], (error, result) => {
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
                "message": "succcess"
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
    return res;
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