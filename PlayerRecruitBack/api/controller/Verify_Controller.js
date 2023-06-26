const bcrypt = require('bcrypt');
const con = require('../../dbconfig/db');
const jwt = require('jsonwebtoken');

function generateToken(result) {

    const user = {
        id: result[0]?.id,
        username: result[0]?.username,
        phone: result[0]?.phone,
        email: result[0]?.email,
        password: result[0]?.password
    }

    const jsonToken = jwt.sign({ user }, process.env.TOKEN_KEY);
    return jsonToken;
}

exports.verification = async (req, res) => {
    const data = await req.body;
    if (!data.email) {
        res.status(400);
        res.send({
            "error": "Email is not in request."
        });
        return res;
    }
    if (!data.otp) {
        res.status(400);
        res.send({
            "error": "enter otp"
        });
        return res;
    }

    con.query("select * from registration where email =?", [data.email], (err, result) => {
        if (err) {
            res.status(400);
            res.send({
                "error": err.sqlMessage
            });

        } else {
            if (result.length > 0) {
                if (result[0].otp == data.otp) {
                    con.query("update registration set otp_status=1 where id= ?", [result[0].id]);
                    res.status(200);
                    res.send({
                        "message": "otp verified.",
                        "access_token": generateToken(result)
                    });
                }
                else {
                    res.status(401);
                    res.send({
                        "error": "otp is not matched."
                    })

                }
            }
            else {

                res.status(404);
                res.send({
                    "error": "account not found."
                });
            }
        }
    });

    return res;
}

