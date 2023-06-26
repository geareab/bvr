const con = require('../../dbconfig/db');
exports.getstates = async (req, res) => {
    con.query("select * from state", (err, result) => {
        if (err) {
            res.status(400);
            res.send({
                "error": "Unexpected error."
            });
            return res;
        }

        res.status(200);
        const arr = [];
        for (var i = 0; i < result.length; i++) {
            arr.push(result[i]);
        }
        res.send({
            states: arr
        });
    });
    return res;
}

exports.getsports = async (req, res) => {
    con.query("select * from sports", (err, result) => {
        if (err) {
            res.status(400);
            res.send({
                "error": "Unexpected error."
            });
            return res;
        }

        res.status(200);
        const arr = [];
        for (var i = 0; i < result.length; i++) {
            arr.push(result[i]);
        }
        res.send({
            sports: arr
        });
    });
    return res;
}

exports.getgpa = async (req, res) => {
    con.query("select * from gpa", (err, result) => {
        if (err) {
            res.status(400);
            res.send({
                "error": "Unexpected error."
            });
            return res;
        }

        res.status(200);
        const arr = [];
        for (var i = 0; i < result.length; i++) {
            arr.push(result[i]);
        }
        res.send({
            gpa: arr
        });
    });
    return res;

}

exports.getethnicity = async (req, res) => {
    con.query("select * from ethnicity", (err, result) => {
        if (err) {
            res.status(400);
            res.send({
                "error": "Unexpected error."
            });
            return res;
        }

        res.status(200);
        const arr = [];
        for (var i = 0; i < result.length; i++) {
            arr.push(result[i]);
        }
        res.send({
            ethnicity: arr
        });
    });
    return res;

}

exports.getcities = async (req, res) => {
    con.query("select * from city where state_id=?", [req.query.state], (error, result) => {
        if (error) {
            res.status(400);
            res.send({
                "error": error.sqlMessage
            });
            return res;
        }
        res.status(200);
        res.send({
            "cities": result
        });
        return res;
    });
    return res;
}
exports.getposition = async (req, res) => {
    con.query("select * from position", (err, result) => {
        if (err) {
            res.status(400);
            res.send({
                "error": "Unexpected error."
            });
            return res;
        }

        res.status(200);
        const arr = [];
        for (var i = 0; i < result.length; i++) {
            arr.push(result[i]);
        }
        res.send({
            position: arr
        });
    });
    return res;

}

exports.getdivision = async (req, res) => {

    con.query("select * from coach_divisions", (err, result) => {
        if (err) {
            res.status(400);
            res.send({
                "error": "Unexpected error."
            });
            return res;
        }

        res.status(200);
        const arr = [];
        for (var i = 0; i < result.length; i++) {
            arr.push(result[i]);
        }
        res.send({
            divisions: arr
        });
    });
    return res;

}

exports.getcollege = async (req, res) => {
    con.query("select * from colleges", (err, result) => {
        if (err) {
            res.status(400);
            res.send({
                "error": "Unexpected error."
            });
            return res;
        }

        res.status(200);
        console.log(result);
        res.send({
            "colleges": result
        });
    });
    return res;

}

exports.getvalidity = (req, res) => {
    con.query("select validity,registration_id from student_registration where registration_id = ?", [req.user.user.id], (error, result) => {
        if (error) {
            console.log(error);
            res.status(400);
            res.send({
                "error": error.sqlMessage
            });
            return res;
        }
        var date = new Date();

        if (result[0].validity == null) {
            res.status(200);
            res.send({
                "message": "success",
                "validity": false,
                "data": {
                    id: result[0]?.registration_id
                }
            });
            return res;
        }

        const d = new Date(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
        const resdate = new Date(result[0].validity.getFullYear() + "-" + (result[0].validity.getMonth() + 1) + "-" + result[0].validity.getDate());
        console.log(d, resdate);
        if (resdate < d) {
            res.status(200);
            res.send({
                "message": "success",
                "validity": false,
                "data": {
                    id: result[0]?.registration_id
                }
            });
            return res;
        } else {
            res.status(200);
            res.send({
                "message": "success",
                "validity": true,
                "data": {
                    id: result[0]?.registration_id
                }
            });
            return res;
        }
    });
    return res;
}

exports.checkPremium = (req, res) => {
    try {
        con.query("select * from student_registration where registration_id=?", [req?.user?.user?.id], (error, result) => {
            if (error) {
                res.status(400);
                res.send({
                    "error": error.sqlMessage
                });
                return res;
            }
            if (result[0].length < 1) {
                res.status(404);
                res.send({
                    "error": "Not found"
                });
                return res;
            }
            res.status(200);
            if (result[0].subscription == 15) {
                res.send({
                    "message": "Platinum",
                    "userid": req?.user?.user?.id
                });
                return res;
            } else {
                res.send({
                    "message": "Standard",
                    "userid": req?.user?.user?.id
                });
                return res;
            }
        })
    } catch (error) {
        res.status(400);
        res.send({
            "error": "Internal server error, try again later."
        })
    }
}