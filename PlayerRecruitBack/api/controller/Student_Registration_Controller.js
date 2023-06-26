const bcrypt = require('bcrypt');
const con = require('../../dbconfig/db');
const fs = require('fs');


exports.registrationinfo = async (req, res) => {
    const data = await req.body;
    if (!(data?.firstname && data?.lastname && data?.dob && data?.gender && data?.father_number && data?.state && data?.city && data?.school_name && data?.gpa && data?.sat && data?.act && data?.height && data?.weight && data?.sports && data?.wingspan && data?.dominant_hand && data?.video)) {
        res.status(400);
        return res.send({
            "error": "not proper parameter."
        });
    }
    con.query("INSERT INTO student_registration(`registration_id`, `firstname`, `lastname`, `dob`,`age`, `gender`,`father_number`, `state`, `city`,`school_type`, `school_name`, `scholastic_year`, `gpa`, `sat`, `act`, `height`,  `weight`, `wingspan`,  `dominant_hand`, `personal_bio`, `video`) VALUES (?) ", [[req?.user?.user?.id, data?.firstname, data?.lastname, data?.dob, data?.age, data?.gender,data?.father_number, data?.state, data?.city, data?.school_type, data?.school_name, data?.scholastic_year, data?.gpa, data?.sat, data?.act, data?.height, data?.weight, data?.wingspan, data?.dominant_hand, data?.personal_bio, data?.video]], (err, result) => {
        if (err) {
            console.log(err);
            res.status(400);
            res.send({
                "error": err.sqlMessage
            });
            return res;
        }
        for (var i = 0; i < sport.length; i++) {
            con.query("insert into player_sports(`registration_id`, `sport`) values(?)", [[req?.user?.user?.id, sport[i]?.sport?.id]], (errs, results) => {
                if (errs) {
                    res.status(400);
                    res.send({
                        "error": errs.sqlMessage
                    });
                    return res;
                }
            });
        }
        con.query("update registration set account_type = 1 where id =?", [req?.user?.user?.id]);
        res.status(200);
        res.send({
            "message": "data inserted successfully."
        });
    });
    return res;
}

exports.profileImage = async (req, res) => {
    console.log(req);
    if (!req.file) {
        res.status(400);
        res.send({
            "error": "Send the image with image parameter",
        });
        return res;
    }
    try {
        con.query("select * from `student_registration`  where `registration_id`= ?", [req?.user?.user?.id], (err, result) => {
            if (err) {
                res.status(400);
                res.send({
                    "error": err.sqlMessage
                });
                return res;
            }
            if (result.length > 0) {
                if (result[0].image) {
                    const imagename = result[0].image;
                    fs.unlinkSync("./uploads/" + imagename);
                }
                con.query("UPDATE `student_registration` SET image= ? WHERE  `registration_id`= ?", [req?.file?.filename, req?.user?.user?.id], (errup, resultup) => {
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

exports.registeruser = async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    const data = req.body;
    const sport = data.sports;

    const {
      firstname,
      lastname,
      dob,
      gender,
      father_number,
      state,
      city,
      age,
      school_type,
      school_name,
      scholastic_year,
      gpa,
      sat,
      act,
      sports,
      height,
      weight,
      dominant_hand,
      personal_bio,
      video
    } = data;
  
    if (!req.file) {
     const query = `INSERT INTO student_registration (registration_id, firstname, lastname, dob, gender, father_number, state, city, age, school_type, school_name, scholastic_year, gpa, sat, act, height, weight, dominant_hand, personal_bio, video, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            con.query(
              query,
              [
                req?.user?.user?.id,
                firstname,
                lastname,
                dob,
                gender,
                father_number,
                state,
                city,
                age,
                school_type,
                school_name,
                scholastic_year,
                gpa,
                sat,
                act,
                height,
                weight,
                dominant_hand,
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

                // sports
                if (sports) {
                  const sportsArray = sports.split(','); // Split the string into an array of numbers
                  
                  // Insert each sport into the player_sports table
                  sportsArray.forEach((sport) => {
                    const sportQuery = `INSERT INTO player_sports (registration_id, sport) VALUES (?, ?)`;
                    con.query(sportQuery, [req?.user?.user?.id, sport], (errSportInsert, resultSportInsert) => {
                      if (errSportInsert) {
                        console.error(errSportInsert);
                      }
                    });
                  });
                }
                res.status(200);
                res.send({
                  "message": "Successfully registered the user.",
                });
              }
            );
      return res;
    }

    else{
try {
      con.query(
        "SELECT * FROM `student_registration` WHERE `registration_id`= ?",
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
              "UPDATE `student_registration` SET image = ? WHERE `registration_id`= ?",
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
            const query = `INSERT INTO student_registration (registration_id, firstname, lastname, dob, gender, father_number, state, city, age, school_type, school_name, scholastic_year, gpa, sat, act, height, weight, dominant_hand, personal_bio, video, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            con.query(
              query,
              [
                req?.user?.user?.id,
                firstname,
                lastname,
                dob,
                gender,
                father_number,
                state,
                city,
                age,
                school_type,
                school_name,
                scholastic_year,
                gpa,
                sat,
                act,
                height,
                weight,
                dominant_hand,
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
                //sports
                if (sports) {
                  const sportsArray = sports.split(','); // Split the string into an array of numbers
                  
                  // Insert each sport into the player_sports table
                  sportsArray.forEach((sport) => {
                    const sportQuery = `INSERT INTO player_sports (registration_id, sport) VALUES (?, ?)`;
                    con.query(sportQuery, [req?.user?.user?.id, sport], (errSportInsert, resultSportInsert) => {
                      if (errSportInsert) {
                        console.error(errSportInsert);
                      }
                    });
                  });
                }
                res.status(200);
                res.send({
                  "message": "Successfully registered the user.",
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
  