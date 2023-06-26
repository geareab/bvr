const bcrypt = require("bcrypt");
const con = require("../../dbconfig/db");
var validator = require("validator");
function OTPgen() {
  const val = Math.floor(1000 + Math.random() * 9000);
  return val;
}
exports.forgot = async (req, res) => {
  const otp = OTPgen();
  const data = await req.body;
  if (!data.email) {
    res.status(400);
    res.send({
      error: "Invalid email Parameters",
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

  con.query(
    "select * from registration where (email='" + data.email + "')",
    (err, result) => {
      if (err) {
        res.status(400);
        res.send({
          error: err.sqlMessage,
        });
      } else {
        const otpp = otp;
        con.query(
          "UPDATE `registration` SET `otp`=" +
            otpp +
            " where id =" +
            result[0].id,
          (error, result) => {
            res.status(201);
            res.send({
              otp: otpp,
            });
          }
        );
      }
    }
  );
  return res;
};
