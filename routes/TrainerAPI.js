const {phoneNumbersInputHandler} = require("../public/helpers/AccountHelpers");
const {accountInputHandler} = require("../public/helpers/AccountHelpers");
module.exports = function (app) {

  app.get('/api/trainer/schedule', function (req, res) {
    req.getConnection(function (err, connection) {
      const query = connection.query('SELECT * FROM TrainerSchedule WHERE trainerEmail=?', [req.query.email], function (err, rows) {
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
