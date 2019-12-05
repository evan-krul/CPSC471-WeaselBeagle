const {phoneNumbersInputHandler} = require("../public/helpers/AccountHelpers");
const {accountInputHandler} = require("../public/helpers/AccountHelpers");
module.exports = function (app) {

  app.get('/api/trainer/schedule', function (req, res) {
    req.getConnection(function (err, connection) {
      const query = connection.query('SELECT * FROM TrainerSchedule WHERE trainerEmail=? AND NOT EXISTS ( SELECT * FROM TrainerAppointment WHERE TrainerSchedule.trainerEmail=TrainerAppointment.trainerEmail AND TrainerSchedule.date=TrainerAppointment.date )', [req.query.email], function (err, rows) {
        if (err) {
          console.log("Error Selecting : %s ", err);
          res.setHeader('Content-Type', 'application/json');
          let result = {
            message: "Unknown error."
          };
          res.status(401).send(JSON.stringify(result));
        } else {
          console.log(query.sql);
          res.setHeader('Content-Type', 'application/json');
          const result = rows.map(row => ({title: "Availability", date: row.date}));
          res.send(JSON.stringify(result));
        }
      });
    });
  });

  app.get('/api/trainer/availability', function (req, res) {
    req.getConnection(function (err, connection) {
      const query = connection.query('SELECT  * FROM TrainerAppointment WHERE trainerEmail=?', [req.query.email], function (err, rows) {
        if (err) {
          console.log("Error Selecting : %s ", err);
          res.setHeader('Content-Type', 'application/json');
          let result = {
            message: "Unknown error."
          };
          res.status(401).send(JSON.stringify(result));
        } else {
          console.log(query.sql);
          res.setHeader('Content-Type', 'application/json');
          const result = rows.map(row => ({title: "Appointment", date: row.date}));
          res.send(JSON.stringify(result));
        }
      });
    });
  });

  app.get('/api/trainer/attends', function (req, res) {
    req.getConnection(function (err, connection) {
      const query = connection.query('SELECT trainerEmail AS email, CONCAT(fname, \' \', lname) AS name, date AS date FROM AttendsTraining JOIN TrainerAppointment ON TrainerAppointment.appointmentID= AttendsTraining.appointmentID JOIN Account ON Account.email = TrainerAppointment.trainerEmail WHERE AttendsTraining.chipID = ? ORDER BY date desc LIMIT 10', [req.query.chipID], function (err, rows) {
        if (err) {
          console.log("Error Selecting : %s ", err);
          res.setHeader('Content-Type', 'application/json');
          let result = {
            message: "Unknown error."
          };
          res.status(401).send(JSON.stringify(result));
        } else {
          console.log(query.sql);
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify(rows));
        }
      });
    });
  });


  app.get('/api/trainer/bookings', function (req, res) {
    req.getConnection(function (err, connection) {
      console.log(req.params);
      const query = connection.query('SELECT CONCAT(fname, \' \', lname) AS ownerName, name AS petName, date AS date FROM AttendsTraining JOIN TrainerAppointment ON TrainerAppointment.appointmentID= AttendsTraining.appointmentID JOIN Animal A on AttendsTraining.chipID = A.chipID JOIN AdoptionApplication AA on A.chipID = AA.chipID JOIN Account ON Account.email= AA.adopterEmail WHERE TrainerAppointment.trainerEmail = ? ORDER BY date desc LIMIT 10', [req.query.email], function (err, rows) {
        if (err) {
          console.log("Error Selecting : %s ", err);
          res.setHeader('Content-Type', 'application/json');
          let result = {
            message: "Unknown error."
          };
          res.status(401).send(JSON.stringify(result));
        } else {
          console.log(query.sql);
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify(rows));
        }
      });
    });
  });

  app.get('/api/trainer/attends/:adopter_email', function (req, res) {
    req.getConnection(function (err, connection) {
      console.log(req.params);
      const query = connection.query('SELECT trainerEmail AS email, CONCAT(fname, \' \', lname) AS name, date AS date FROM AttendsTraining JOIN TrainerAppointment ON TrainerAppointment.appointmentID= AttendsTraining.appointmentID JOIN Account ON Account.email = TrainerAppointment.trainerEmail JOIN AdoptionApplication ON AdoptionApplication.chipID=AttendsTraining.chipID  WHERE AttendsTraining.chipID = ? AND AdoptionApplication.adopterEmail = ? ORDER BY date desc LIMIT 10', [req.query.chipID, req.params.adopter_email], function (err, rows) {
        if (err) {
          console.log("Error Selecting : %s ", err);
          res.setHeader('Content-Type', 'application/json');
          let result = {
            message: "Unknown error."
          };
          res.status(401).send(JSON.stringify(result));
        } else {
          console.log(query.sql);
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify(rows));
        }
      });
    });
  });

  app.get('/api/trainer/all_trainers', function (req, res) {
    req.getConnection(function (err, connection) {
      const query = connection.query('SELECT Account.email AS email, concat(Account.fname, \' \',Account.lname) AS name FROM Trainer JOIN Account ON Account.email = Trainer.email', function (err, rows) {
        if (err) {
          console.log("Error Selecting : %s ", err);
          res.setHeader('Content-Type', 'application/json');
          let result = {
            message: "Unknown error."
          };
          res.status(401).send(JSON.stringify(result));
        } else {
          console.log(query.sql);
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify(rows));
        }
      });
    });
  });


  app.post('/api/trainer/appointment/add', function (req, res) {
    let input = JSON.parse(JSON.stringify(req.body));
    let newAppointment = {
      trainerEmail: input.email,
      date: input.date
    };
    req.getConnection(function (err, connection) {
      connection.query("INSERT INTO TrainerAppointment set ? ", [newAppointment], function (err, sqlRes) {
        if (err) {
          console.log("Error inserting : %s ", err);
          res.setHeader('Content-Type', 'application/json');
          let result = {
            message: "Unknown error."
          };
          res.status(401).send(JSON.stringify(result));
        } else {
          let newAttends = {
            chipID: input.chipID,
            appointmentID: sqlRes.insertId
          };
          connection.query("INSERT INTO AttendsTraining set ? ", [newAttends], function (err) {
            if (err) {
              console.log("Error inserting : %s ", err);
              res.setHeader('Content-Type', 'application/json');
              let result = {
                message: "Unknown error."
              };
              res.status(401).send(JSON.stringify(result));
            } else {
              res.setHeader('Content-Type', 'application/json');
              res.send(JSON.stringify('success'));
            }
          });
        }
      });
    });
  });

  app.post('/api/trainer/schedule/add', function (req, res) {
    let input = JSON.parse(JSON.stringify(req.body));
    let newDate = {
      trainerEmail: input.email,
      date: input.date
    };
    req.getConnection(function (err, connection) {
      connection.query("INSERT INTO TrainerSchedule set ? ", [newDate], function (err) {
        if (err) {
          console.log("Error inserting : %s ", err);
          res.setHeader('Content-Type', 'application/json');
          let result = {
            message: "Unknown error."
          };
          res.status(401).send(JSON.stringify(result));
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify('success'));
        }
      });
    });
  });

  app.post('/api/trainer/schedule/delete', function (req, res) {
    let input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
      let date = input.date.split('T')[0];
      let  q = connection.query("DELETE FROM TrainerSchedule WHERE trainerEmail=? AND date=? ", [input.email, date], function (err) {
        if (err) {
          console.log("Error deleting : %s ", err);
          res.setHeader('Content-Type', 'application/json');
          let result = {
            message: "Unknown error."
          };
          res.status(401).send(JSON.stringify(result));
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify('success'));
        }
      });
    });
  });

  app.post('/api/trainer/appointment/delete', function (req, res) {
    let input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
      let date = input.date.split('T')[0];
      let  q = connection.query("DELETE FROM TrainerAppointment WHERE trainerEmail=? AND date=? ", [input.email, date], function (err) {
        if (err) {
          console.log("Error deleting : %s ", err);
          res.setHeader('Content-Type', 'application/json');
          let result = {
            message: "Unknown error."
          };
          res.status(401).send(JSON.stringify(result));
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify('success'));
        }
      });
    });
  });

  // app.post('/api/trainer/add', function (req, res) {
  //   let input = JSON.parse(JSON.stringify(req.body));
  //   req.getConnection(function (err, connection) {
  //     let data = trainerInputHandler(input);
  //     console.log('save request...', data);
  //     connection.query("INSERT INTO Account set ? ", [data.account], function (err) {
  //       if (err) {
  //         console.log("Error inserting : %s ", err);
  //       }
  //     });
  //     connection.query("INSERT INTO Trainer set ?", [data.trainer], function (err) {
  //       if (err) {
  //         console.log("Error inserting : %s ", err);
  //       }
  //     });
  //     connection.query("INSERT INTO UserAccountPhoneNumbers set ? ", [data.userAccountPhoneNumbers], function (err) {
  //       if (err) {
  //         console.log("Error inserting : %s ", err);
  //       }
  //     });
  //     res.setHeader('Content-Type', 'application/json');
  //     res.send(JSON.stringify('success'));
  //   });
  // });
  //
  // app.get('/api/trainer/delete/:id', function (req, res) {
  //   let email = req.params.email;
  //   req.getConnection(function (err, connection) {
  //     connection.query("DELETE FROM Account WHERE email = ?", [email], function (err) {
  //       if (err) {
  //         console.log("Error deleting : %s ", err);
  //       }
  //       res.redirect('/api/trainer');
  //     });
  //   });
  // });
  //
  // app.get('/api/trainer/edit/:id', function (req, res) {
  //   let email = req.params.email;
  //   req.getConnection(function (err, connection) {
  //     connection.query('SELECT * FROM Account JOIN Trainer ON email = ?', [email], function (err, rows) {
  //       if (err) {
  //         console.log("Error Selecting : %s ", err);
  //       }
  //       res.setHeader('Content-Type', 'application/json');
  //       res.send(JSON.stringify(rows));
  //     });
  //   });
  // });
  //
  // app.post('/api/trainer/edit/:id', function (req, res) {
  //   let input = JSON.parse(JSON.stringify(req.body));
  //   req.getConnection(function (err, connection) {
  //     let data = trainerInputHandler(input);
  //     console.log('save request...', data);
  //     connection.query("INSERT INTO Account set ? ", [data.account], function (err) {
  //       if (err) {
  //         console.log("Error inserting : %s ", err);
  //       }
  //     });
  //     connection.query("INSERT INTO Trainer set ?", [data.trainer], function (err) {
  //       if (err) {
  //         console.log("Error inserting : %s ", err);
  //       }
  //     });
  //     connection.query("INSERT INTO UserAccountPhoneNumbers set ? ", [data.userAccountPhoneNumbers], function (err) {
  //       if (err) {
  //         console.log("Error inserting : %s ", err);
  //       }
  //     });
  //     res.setHeader('Content-Type', 'application/json');
  //     res.send(JSON.stringify(rows));
  //   });
  // });

  function trainerInputHandler(input) {
    return {
      account: {
        accountVars: accountInputHandler(input),
        accountType: "trainer"
      },
      userAccountPhoneNumbers: {
        phoneNumbersInputHandler
      },
      trainer: {
        email: input.email
      }
    };
  }

}; // end of module
