const bcrypt = require("bcrypt");
const con = require("../../dbconfig/db");
const jwt = require("jsonwebtoken");

function generateToken(result) {
  const user = {
    id: result[0].id,
    username: result[0].username,
    phone: result[0].phone,
    email: result[0].email,
    password: result[0].password,
  };
  const jsonToken = jwt.sign({ user }, process.env.TOKEN_KEY);
  return jsonToken;
}

exports.login = async (req, res) => {
  const data = await req.body;
  if (!data.username) {
    res.status(400);
    res.send({
      error: "username is not present.",
    });
    return res;
  }
  if (!data.password) {
    res.status(400);
    res.send({
      error: "password is not present.",
    });
    return res;
  }

  con.query(
    "select * from registration where username = '" +
      data.username +
      "' and otp_status = 1",
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400);
        res.send({
          error: "unexpected error",
        });
        return res;
      } else {
        if (result.length != 0) {
          const passcomp = bcrypt.compareSync(
            data.password,
            result[0].password
          );
          if (passcomp) {
            res.status(200);
            res.send({
              type: result[0].account_type,
              message: "logged in",
              access_token: generateToken(result),
            });
            return res;
          } else {
            res.status(400);
            res.send({
              error: "password doesn't matched.",
            });
          }
        } else {
          res.status(404);
          res.send({
            error: "Please check your credentials.",
          });
        }
      }
    }
  );
  return res;
};
exports.forget = async (req, res) => {};
