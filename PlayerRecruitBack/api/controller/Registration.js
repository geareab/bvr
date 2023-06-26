const bcrypt = require("bcrypt");
const con = require("../../dbconfig/db");
var validator = require("validator");
function OTPgen() {
  const val = Math.floor(1000 + Math.random() * 9000);
  return val;
}
exports.register = async (req, res) => {
  const otp = OTPgen();
  const data = await req.body;
  if (!data.username) {
    res.status(400);
    res.send({
      error: "Invalid username Parameters",
    });
    return res;
  }
  if (!data.phone) {
    res.status(400);
    res.send({
      error: "Invalid phone Parameters",
    });
    return res;
  }
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
  if (!data.password) {
    res.status(400);
    res.send({
      error: "Invalid password Parameters",
    });
    return res;
  }
  const password = await bcrypt.hash(data.password, 10);

  con.query(
    "select * from registration where (username='" +
      data.username +
      "' or email='" +
      data.email +
      "' or phone='" +
      data.phone +
      "') and otp_status=1",
    (err, result) => {
      if (err) {
        res.status(400);
        res.send({
          error: err.sqlMessage,
        });
      } else if (result.length > 0) {
        if (data.username == result[0].username) {
          res.status(400);
          res.send({
            error: "User with this username  is already registered.",
          });
        } else if (data.email == result[0].email) {
          res.status(400);
          res.send({
            error: "User with this email address  is already registered.",
          });
        } else if (data.phone == result[0].phone) {
          res.status(400);
          res.send({
            error: "User is this phone is already registered.",
          });
        } else {
          res.status(400);
          res.send({
            error: "already registered.",
          });
        }
      } else {
        con.query(
          "delete from registration where (username ='" +
            data.username +
            "' or email = '" +
            data.email +
            "' or phone = '" +
            data.phone +
            "') and otp_status <> 1"
        );
        con.query(
          "insert into registration(username,email,phone,password,otp) values('" +
            data.username +
            "','" +
            data.email +
            "','" +
            data.phone +
            "','" +
            password +
            "'," +
            otp +
            ")",
          (errorin, resuin) => {
            if (errorin) {
              res.status(400).json({
                error: errorin.sqlMessage,
              });
            } else {
              res.status(201).json({
                status: "successful sent the otp",
                otp: otp,
              });
            }
          }
        );
      }
    }
  );
  return res;
};
