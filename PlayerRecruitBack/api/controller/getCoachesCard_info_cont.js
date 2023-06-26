const con = require('../../dbconfig/db');
exports.getdata = async (req, res) => {
    con.query("select * from student_filter where registration_id=" + req.user.user.id, (errors, result) => {
        const state = result[0]?.states;
        const sport = result[0]?.sports;
        const div = result[0]?.division?.split(",");
        var a = [];
        for (var i = 0; i < div?.length; i++) {
            a.push(parseInt(div[i]));
        }

        var ststr = "null";
        var spstr = "null";
        state?.split(",").forEach(element => {
            ststr = (ststr) ? ststr + (",'" + element + "'") : "'" + element + "'";
        });
        sport?.split(",").forEach(m => {
            spstr = (spstr) ? spstr + (",'" + m + "'") : "'" + m + "'";
        });
        var statequery = result[0]?.states != null && result[0]?.states != "null" ? " and statename in (" + ststr + ")" : " ";
        var divisionquery = result[0]?.division != null && result[0]?.division != "null" ? " and division in (" + a + ")" : " ";
        var sportquery = result[0]?.sports != null && result[0]?.sports != "null" ? " and sportsname in (" + spstr + ")" : " ";
        if (result.length < 1) {
            statequery = "";
            divisionquery = "";
            sportquery = "";
        }
        con.query("SELECT coach_registration.registration_id, coach_registration.firstname,coach_registration.lastname,registration.email,registration.phone,coach_registration.dob,coach_registration.gender,state.statename,city.city_name as city,colleges.college_name,state.statename as College_State,coach_registration.university_email,sports.sportsname,coach_registration.coaching_gender,coach_registration.team,coach_registration.division,coach_divisions.divisions,coach_registration.jobtitle,coach_registration.personal_bio,coach_registration.video,coach_registration.image,coach_registration.visibility from coach_registration JOIN state on state.id = coach_registration.state OR state.id = coach_registration.college_state  JOIN sports ON sports.id = coach_registration.coaching_sport JOIN coach_divisions ON coach_divisions.id = coach_registration.division Join city on city.id = coach_registration.city Join colleges on colleges.id = coach_registration.college_name JOIN registration ON registration.id = coach_registration.registration_id where 1=1 " + statequery + sportquery + divisionquery + " and coach_registration.registration_id not in (select actionto from swiping where actionby = " + req.user.user.id + ") and coach_registration.registration_id not in (select coach_regid from matches where student_regid=" + req.user.user.id + ") order by Rand() LIMIT 10", (err, results) => {
            if (err) {
                console.log(err);
                res.status(400);
                res.send({
                    "error": err.sqlMessage
                });
                return res;
            }
            try {
                var dataa = removeDuplicateObjectFromArray(results, "email");
                
                con.query( "select subscription,swipes,last_swipe from student_registration where registration_id="+req.user.user.id+"",  (errorr, resultt) => {
                    if (errorr) {
                        dataa.forEach(e => {
                            if (e.visibility != "Always") {
                                delete e?.email;
                                delete e?.phone;
                            }
                        });
                        res.status(200);
                        res.send({
                            "data": dataa
                        });
                        return res;
                    }
                    const data = resultt[0];
                   
                    var date = new Date();
                    var remaining = 0;
                    const d = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
                    var resdate = (date.getDate() - 1) + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
                    if (data.last_swipe != null)
                        resdate = data.last_swipe.getDate() + "/" + (data.last_swipe.getMonth() + 1) + "/" + data.last_swipe.getFullYear();
                    if (resdate != d) {
                        remaining = data?.subscription;
                    } else {
                        remaining = data?.subscription - data.swipes;
                    }
                    dataa.forEach(e => {
                        if (e.visibility != "Always") {
                            delete e?.email;
                            delete e?.phone;
                        }
                    });
                    res.status(200);
                    res.send({
                        "data": dataa,
                        "remaining": remaining
                    })
                });
            } catch (er) {
                console.log(er);
            }

            return res;
        })
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