
const con = require('../../dbconfig/db');
const fs = require('fs');

exports.registrationinfo = async (req, res) => {
    const data = await req.body;
    if (!(data.firstname && data.lastname && data.dob && data.gender && data.phone && data.state && data.city && data.college_name && data.college_state && data.university_email && data.sport_coach && data.team_name && data.coaching_gender && data.division && data.job_title && data.personal_bio && data.video)) {
        res.status(400);
        res.send({
            "error": "Send all the parameters."
        });
        return res;
    }

    con.query("select * from registration where id =" + req.user.user.id + " and account_type<>0", (error, result) => {
        if (error) {
            res.status(401);
            res.send({
                "error": error.sqlMessage
            });
            return;
        }
        if (result.length > 0) {
            res.status(400);
            res.send({
                "error": "This account is already registered."
            });
            return;
        }
        con.query("INSERT INTO `coach_registration`( `registration_id`, `firstname`, `lastname`, `dob`,`gender`,`phone`, `state`, `city`,  `college_name`, `college_state`, `university_email`, `coaching_sport`, `coaching_gender`, `team`, `division`, `jobtitle`, `personal_bio`, `video`) VALUES (?)", [[req.user.user.id, data.firstname, data.lastname, data.dob, data.gender, data.state, data.city, data.college_name, data.college_state, data.university_email, data.sport_coach, data.coaching_gender, data.team_name, data.division, data.job_title, data.personal_bio, data.video]], (err, result) => {
            if (err) {
                console.log(err);
                res.status(400);
                res.send({
                    "error": err.sqlMessage
                });
                return;
            }
            con.query("update registration set account_type = 2 where id =" + req.user.user.id);
            res.status(200);
            res.send({
                "message": "data inserted successfully."
            });
        });
    });
    return res;
}


exports.profileImage = async (req, res) => {
    if (!req.file) {
        res.status(400);
        res.send({
            "error": "Send the image with image parameter",
        });
        return res;
    }

    try {
        con.query("select * from `coach_registration`  where `registration_id`=" + req.user.user.id, (err, result) => {
            if (err) {
                res.status(400);
                res.send({
                    "error": err.sqlMessage
                });
                return res;
            }
            if (result.length > 0) {
                if (result[0].image) {
                    try {
                        const imagename = result[0].image;
                        fs.unlinkSync("./uploads/" + imagename);
                    }
                    catch (errorfile) {
                        console.log("File deletion error");
                    }
                }
                con.query("UPDATE `coach_registration` SET image='" + req.file.filename + "' WHERE  `registration_id`=" + req.user.user.id, (errup, resultup) => {
                    if (errup) {
                        res.status(400);
                        res.send({
                            "error": errup.sqlMessage
                        });
                        return res;
                    }
                    res.status(200);
                    res.send({
                        "message": "successfully image uploaded."
                    });
                });
                return res;
            }
            else {
                res.status(401);
                res.send({
                    "error": "First register the user"
                });
                return res;
            }
        });

    } catch (err) {
        res.status(err);
        res.send({
            "error": "error occured"
        });
        return res;
    }

    return res;
}


exports.registercoach = async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    const data = req.body;
    const sport = data.sports;

    const {
      firstname,
      lastname,
      dob,
      gender,
      state,
      city,
      college_name,
      college_state,
      university_email,
      sport_coach,
      coaching_gender,
      team_name,
      division,
      job_title,
      personal_bio,
      video
    } = data;
  
    if (!req.file) {
     const query = `INSERT INTO coach_registration ( registration_id, firstname, lastname, dob, gender, state, city, college_name, college_state, university_email, coaching_sport, coaching_gender, team, division, jobtitle, personal_bio, video) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            con.query(
              query,
              [
                req?.user?.user?.id,
                firstname, 
                lastname, 
                dob, 
                gender, 
                state, 
                city, 
                college_name, 
                college_state, 
                university_email, 
                sport_coach, 
                coaching_gender, 
                team_name, 
                division, 
                job_title, 
                personal_bio, 
                video
    
              ],
              (errInsert, resultInsert) => {
                if (errInsert) {
                  res.status(400);
                  res.send({
                    "error": errInsert.sqlMessage,
                  });
                  return res;
                }
                con.query("update registration set account_type = 2 where id =" + req.user.user.id);
                res.status(200);
                res.send({
                  "message": "Successfully registered the coach.",
                });
              }
            );
      return res;
    }

    else{
try {
      con.query(
        "SELECT * FROM `coach_registration` WHERE `registration_id`= ?",
        [req?.user?.user?.id],
        (err, result) => {
          if (err) {
            res.status(400);
            res.send({
              "error": err.sqlMessage,
            });
            return res;
          }
          if (result.length > 0) {
            if (result[0].image) {
              const imagename = result[0].image;
              fs.unlinkSync("./uploads/" + imagename);
            }
            con.query(
              "UPDATE `coach_registration` SET image = ? WHERE `registration_id`= ?",
              [req?.file?.filename, req?.user?.user?.id],
              (errup, resultup) => {
                if (errup) {
                  res.status(400);
                  res.send({
                    "error": errup.sqlMessage,
                  });
                  return res;
                }
                res.status(200);
                res.send({
                  "message": "Successfully uploaded the image.",
                });
              }
            );
            return res;
          } else {
            const query = `INSERT INTO coach_registration ( registration_id, firstname, lastname, dob, gender, state, city, college_name, college_state, university_email, coaching_sport, coaching_gender, team, division, jobtitle, personal_bio, video, image) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            con.query(
              query,
              [
                req?.user?.user?.id,
                firstname, 
                lastname, 
                dob, 
                gender, 
                state, 
                city, 
                college_name, 
                college_state, 
                university_email, 
                sport_coach, 
                coaching_gender, 
                team_name, 
                division, 
                job_title, 
                personal_bio, 
                video,
                req?.file?.filename,
              ],
              (errInsert, resultInsert) => {
                if (errInsert) {
                  res.status(400);
                  res.send({
                    "error": errInsert.sqlMessage,
                  });
                  return res;
                }
                con.query("update registration set account_type = 2 where id =" + req.user.user.id);
                res.status(200);
                res.send({
                  "message": "Successfully registered the coach.",
                });
              }
            );
          }
        }
      );
    } catch (err) {
      res.status(err);
      res.send({
        "error": "An error occurred",
      });
      return res;
    
    }
  
    }
    return res;
  };
  