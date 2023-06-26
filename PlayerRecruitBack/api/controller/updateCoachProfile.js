const con = require('../../dbconfig/db');

exports.updateAthlete = (req, res) => {
    try {
        con.query("UPDATE `coach_registration` SET `coaching_sport`=?,`coaching_gender`=?,`team`=?,`division`=?,`jobtitle`=?,`video`=?  where registration_id = ?", [req?.body?.sport, req?.body?.coaching_gender, req?.body?.team, req?.body?.division, req?.body?.job, req?.body?.video, req?.user?.user.id], (error, result) => {
            if (error) {
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
    return res;
}

exports.updatepersonal = (req, res) => {
    try {
        con.query("UPDATE `coach_registration` SET `firstname`=?,`lastname`=?,`dob`=?,`gender`=?,`state`=?,`city`=?,`college_name`=?,`college_state`=?,`university_email`=?,`personal_bio`=?,visibility=? where registration_id=?", [req?.body?.firstname, req?.body?.lastname, req?.body?.dob, req?.body?.gender, req?.body?.state, req?.body?.city, req?.body?.college, req?.body?.collegestate, req?.body?.university_email, req?.body?.bio, req?.body?.visibility, req?.user?.user?.id], (error, result) => {
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