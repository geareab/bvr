const con = require('../../dbconfig/db');

exports.setFilter = async (req, res) => {
    const data = (req.body);
    // if (!(data.states && data.sports && data.positions && data.minheight && data.years && data.maxheight && data.minweight && data.maxweight && data.minage && data.maxage && data.mingpa && data.maxgpa && data.minsat && data.maxsat && data.minact && data.maxact)) {
    //     res.status(400);
    //     res.send({
    //         "error": "invalid  parameters"
    //     });
    //     return res;
    // }

    
    var state = 'null';
    var sports = 'null';
    var position = 'null';
    var year = 'null';
    data?.states?.forEach(element => {
        if (element != undefined)
            state = ((state && state != 'null') ? (state + ",") : "") + element
    });
    data?.sports?.forEach(m => {
        if (m != undefined)
            sports = ((sports && sports != 'null') ? (sports + ",") : "") + m;
    });
    data?.positions?.forEach(m => {
        if (m != undefined)
            position = ((position && position != 'null') ? (position + ",") : "") + m;
    });
    data?.years?.forEach(m => {
        if (m != undefined)
            year = ((year && year != 'null') ? (year + ",") : "") + m;
    });


    con.query("delete from coach_filter where registration_id = ?", req.user.user.id);
    con.query("INSERT INTO `coach_filter`( `registration_id`, `states`, `sports`, `positions`, `min_height`, `max_height`, `min_weight`, `max_weight`, `min_age`, `max_age`, `years`, `min_gpa`, `max_gpa`, `min_sat`, `max_sat`, `min_act`, `max_act`) VALUES (?) ", [[req?.user?.user?.id, state, sports, position, data?.minheight, data?.maxheight, data?.minweight, data?.maxweight, data?.minage, data?.maxage, year, data?.mingpa, data?.maxgpa, data?.minsat, data?.maxsat, data?.minact, data?.maxact]], (error, result) => {
        if (error) {
            res.status(400);
            res.send({
                "error": error.sqlMessage
            });
            return res;
        }
        res.status(200);
        res.send({
            "message": "successfully applied."
        });
        return res;
    });
    return res;
}

exports.getFilter = async (req, res) => {
    con.query("select * from coach_filter where registration_id = ?", req.user.user.id, (err, result) => {
        if (err) {
            res.status(400);
            res.send({
                "error": err.sqlMessage
            });
            return res;
        }
        var arr = result[0];
        var states = [];
        var sports = [];
        var positions = [];
        var years = [];
        arr?.states.split(',').forEach(m => {
            if (m != "null") {
                states.push(m);
            }
        });
        arr?.sports.split(',').forEach(m => {
            if (m != "null") {
                sports.push(m);
            }
        });
        arr?.positions.split(',').forEach(m => {
            if (m != "null") {
                positions.push(m);
            }
        });
        arr?.years.split(',').forEach(m => {
            if (m != "null") {
                years.push(parseInt(m));
            }
        });
        if (result.lenght < 1) {
            res.status(200);
            res.send({ "message": "success", "data": "1" });
            return res;
        }
        else {
            res.status(200);

            res.send({
                "message": "success",
                "data": {
                    sports,
                    years,
                    positions,
                    states,
                    "max_act": arr?.max_act,
                    "max_age": arr?.max_age,
                    "max_gpa": arr?.max_gpa,
                    "max_height": arr?.max_height,
                    "max_sat": arr?.max_sat,
                    "max_weight": arr?.max_weight,
                    "min_act": arr?.min_act,
                    "min_age": arr?.min_age,
                    "min_gpa": arr?.min_gpa,
                    "min_height": arr?.min_height,
                    "min_sat": arr?.min_sat,
                    "min_weight": arr?.min_weight,
                }
            });
        }
        return res;
    });
    return res;
}