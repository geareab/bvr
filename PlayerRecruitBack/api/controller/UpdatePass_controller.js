const bcrypt = require("bcrypt");
const con = require("../../dbconfig/db");
var validator = require("validator");

exports.updatePass = async (req, res) => {
  const data = await req.body;
  if (!data.email) {
    res.status(400);
    res.send({
      error: "Invalid email Parameters",
    });
  }
  if (!data.password) {
    res.status(400);
    res.send({
      error: "Invalid password Parameters",
    });
    return res;
  }
  if (!validator.isEmail(data.email)) {
    res.status(400);
    res.send({
      error: "Invalid email id.",
    });
    return res;
  }
  const password = await bcrypt.hash(data.password, 10);
  con.query(
    "select * from registration where (email='" + data.email + "')",
    (err, result) => {
      if (err) {
        res.status(400);
        res.send({
          error: err.sqlMessage,
        });
      } else {
        if (data.otp == result[0].otp) {
          con.query(
            "select * from registration where (email='" + data.email + "')",
            (err, result) => {
              if (err) {
                res.status(400);
                res.send({
                  error: err.sqlMessage,
                });
              } else {
                con.query(
                  "update registration set password = '" +
                    password +
                    "' where id =" +
                    result[0].id,
                  (err, result) => {
                    if (err) {
                      res.status(400);
                      res.send({
                        error: err.sqlMessage,
                      });
                    }
                    console.log(result);
                    res.status(201);
                    res.send({
                      otp: password,
                    });
                  }
                );
              }
            }
          );
        } else {
          res.status(400);
          res.send({
            otp: "wrong OTP",
          });
        }
      }
    }
  );

  return res;
};
