const con = require('../../dbconfig/db');

exports.settoken = (req, res) => {
    console.log(req.body);
    if (req?.body?.type == 1) {
        try {
            con.query("update student_registration set notification_token=? where registration_id=?", [req?.body?.notification_token, req?.user?.user?.id], (error, result) => {
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
            });
            return res;
        } catch (error) {
            console.log(error);
            res.status(400);
            res.send({
                "error": "Internal server error"
            });
            return res;
        }
    } else {
        try {
            console.log(req?.body);
            con.query("update coach_registration set notification_token=? where registration_id=?", [req?.body?.notification_token, req?.user?.user?.id], (error, result) => {
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
                })
            })
        } catch (error) {
            console.log(error);
            res.status(400);
            res.send({
                "error": "Internal server error"
            })
        }

    }
}