const con = require('../../dbconfig/db');

exports.setFilter = async (req, res) => {
    const data = await req.body;
    if (req.body)
        var div = null;
    var state = null;
    var sports = null;
    data?.states?.forEach(element => {
        if (element != undefined)
            state = ((state) ? (state + ",") : "") + element
    });
    data?.divisions?.forEach(m => {
        if (m != null && m != 0)
            div = ((div) ? (div + ",") : "") + m;
    });
    data?.sports?.forEach(m => {
        if (m != undefined)
            sports = ((sports) ? (sports + ",") : "") + m;
    });
    con.query("delete from student_filter where registration_id=" + req.user.user.id);
    con.query("INSERT INTO `student_filter`( `registration_id`, `division`, `sports`, `states`) VALUES (?)", [[req.user.user.id, div, sports, state]], (err, result) => {
        if (err) {
            console.log(err);
            res.status(401);
            res.send({
                "error": err.sqlMessage
            });
            return res;
        } else {
            res.status(201);
            res.send({
                "message": "successfully inserted the values"
            });
            return res;
        }
    });

    return res;
}

exports.getFilter = async (req, res) => {
    con.query("select * from student_filter where registration_id=?", [req.user.user.id], (err, result) => {
        if (err) {
            res.status(400);
            res.send({
                "error": sqlMessage
            });
            return res;
        } else {
            const arr = result[0];
            var states = []
            var sports = []
            arr?.states?.split(',').forEach(m => {
                if (m != "null") {
                    states.push(m);
                }
            });
            arr?.sports?.split(',').forEach(m => {
                if (m != "null") {
                    sports.push(m);
                }
            });
            res.status(200);
            res.send({
                "message": "successfully got the data",
                "data": {
                    "division": result[0]?.division,
                    "sports": sports,
                    "states": states
                }
            });
            return res;
        }
    });
    return res;
}