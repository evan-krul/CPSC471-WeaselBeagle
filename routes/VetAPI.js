const {phoneNumbersInputHandler} = require("../public/helpers/AccountHelpers");
const {accountInputHandler} = require("../public/helpers/AccountHelpers");
const request = require('request-promise');
let promises = [];
let animalsData;

module.exports = function (app) {

  app.get('/api/vet/animals/:vet_email', function (req, res) {
    req.getConnection(function (err, connection) {
      const query = connection.query(' SELECT * FROM Animal JOIN AttendsVetAppointment ON Animal.chipID = AttendsVetAppointment.chipID JOIN VetAppointment ON VetAppointment.appointmentID = AttendsVetAppointment.appointmentID WHERE VetAppointment.vetEmail = ?', [req.params.vet_email], function (err, rows) {
        if (err) {
          console.log("Error Selecting : %s ", err);
          res.setHeader('Content-Type', 'application/json');
          let result = {
            message: "Unknown error."
          };
          res.status(401).send(JSON.stringify(result));
        } else {
          animalsData = rows;
          rows.forEach(function (row, index) {
            let apiURL;
            switch (row.animalType) {
              case 'dog':
                apiURL = 'https://api.TheDogAPI.com/v1/images/search?breed_ids=';
                break;
              case 'cat':
                apiURL = 'https://api.thecatapi.com/v1/images/search?breed_ids=';
                break;
              default:
                apiURL = '';
            }
            promises.push(apiBreed(apiURL + row.breed, index));
          });

          Promise.all(promises).then(() => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(animalsData));
          }).catch(err => {
            console.log('Promise err: %s', err);
            res.setHeader('Content-Type', 'application/json');
            let result = {
              message: "Unknown error."
            };
            res.status(401).send(JSON.stringify(result));
          });
        }
      });
    });

    function apiBreed(urlApi, index) {
      return request({url: urlApi, json: true}).then(function (obj) {
        console.log(obj);
        animalsData[index].apiData = obj[0];
      });
    }
  });




  app.get('/api/vet', function (req, res) {
    req.getConnection(function (err, connection) {
      connection.query('SELECT * FROM Account JOIN Vet ON email = ?', [req.email], function (err, rows) {
        if (err) {
          console.log("Error Selecting : %s ", err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(rows));
      });
    });
  });

  app.post('/api/vet/add', function (req, res) {
    let input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
      let data = vetInputHandler(input);
      console.log('save request...', data);
      connection.query("INSERT INTO Account set ? ", [data.account], function (err) {
        if (err) {
          console.log("Error inserting : %s ", err);
        }
      });
      connection.query("INSERT INTO Vet set ?", [data.vet], function (err) {
        if (err) {
          console.log("Error inserting : %s ", err);
        }
      });
      connection.query("INSERT INTO UserAccountPhoneNumbers set ? ", [data.userAccountPhoneNumbers], function (err) {
        if (err) {
          console.log("Error inserting : %s ", err);
        }
      });
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify('success'));
    });
  });

  app.get('/api/vet/delete/:id', function (req, res) {
    let email = req.params.email;
    req.getConnection(function (err, connection) {
      connection.query("DELETE FROM Account WHERE email = ?", [email], function (err) {
        if (err) {
          console.log("Error deleting : %s ", err);
        }
        res.setHeader('Content-Type', 'application/json');
        let result = {
          message: "Unknown error."
        };
        res.status(401).send(JSON.stringify(result));
        res.redirect('/api/vet');
      });
    });
  });

  app.get('/api/vet/edit/:id', function (req, res) {
    let email = req.params.email;
    req.getConnection(function (err, connection) {
      connection.query('SELECT * FROM Account JOIN Vet ON email = ?', [email], function (err, rows) {
        if (err) {
          console.log("Error Selecting : %s ", err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(rows));
      });
    });
  });

  app.post('/api/vet/edit/:id', function (req, res) {
    let input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
      let data = vetInputHandler(input);
      console.log('save request...', data);
      connection.query("INSERT INTO Account set ? ", [data.account], function (err) {
        if (err) {
          console.log("Error inserting : %s ", err);
        }
      });
      connection.query("INSERT INTO Vet set ?", [data.vet], function (err) {
        if (err) {
          console.log("Error inserting : %s ", err);
        }
      });
      connection.query("INSERT INTO UserAccountPhoneNumbers set ? ", [data.userAccountPhoneNumbers], function (err) {
        if (err) {
          console.log("Error inserting : %s ", err);
        }
      });
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(rows));
    });
  });



  app.get('/api/vet/schedule', function (req, res) {
    req.getConnection(function (err, connection) {
      const query = connection.query('SELECT * FROM VetSchedule WHERE vetEmail=? AND NOT EXISTS ( SELECT * FROM VetAppointment WHERE VetSchedule.vetEmail=VetAppointment.vetEmail AND VetSchedule.date=VetAppointment.date )', [req.query.email], function (err, rows) {
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


  app.get('/api/vet/availability', function (req, res) {
    req.getConnection(function (err, connection) {
      const query = connection.query('SELECT  * FROM VetAppointment WHERE vetEmail=?', [req.query.email], function (err, rows) {
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

  app.get('/api/vet/attends', function (req, res) {
    req.getConnection(function (err, connection) {
      const query = connection.query('SELECT vetEmail AS email, CONCAT(fname, \' \', lname) AS name, date AS date FROM AttendsVetAppointment JOIN VetAppointment ON VetAppointment.appointmentID= AttendsVetAppointment.appointmentID JOIN Account ON Account.email = VetAppointment.vetEmail WHERE AttendsVetAppointment.chipID = ? ORDER BY date desc LIMIT 10', [req.query.chipID], function (err, rows) {
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

  app.get('/api/vet/bookings', function (req, res) {
    req.getConnection(function (err, connection) {
      console.log(req.params);
      const query = connection.query('SELECT CONCAT(fname, \' \', lname) AS ownerName, name AS petName, date AS date FROM AttendsVetAppointment JOIN VetAppointment ON VetAppointment.appointmentID= AttendsVetAppointment.appointmentID JOIN Animal A on AttendsVetAppointment.chipID = A.chipID JOIN AdoptionApplication AA on A.chipID = AA.chipID JOIN Account ON Account.email= AA.adopterEmail WHERE VetAppointment.vetEmail = ? ORDER BY date desc LIMIT 10', [req.query.email], function (err, rows) {
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


  app.get('/api/vet/attends/:adopter_email', function (req, res) {
    req.getConnection(function (err, connection) {
      console.log(req.params);
      const query = connection.query('SELECT vetEmail AS email, CONCAT(fname, \' \', lname) AS name, date AS date FROM AttendsVetAppointment JOIN VetAppointment ON VetAppointment.appointmentID= AttendsVetAppointment.appointmentID JOIN Account ON Account.email = VetAppointment.vetEmail JOIN AdoptionApplication ON AdoptionApplication.chipID=AttendsVetAppointment.chipID  WHERE AttendsVetAppointment.chipID = ? AND AdoptionApplication.adopterEmail = ? ORDER BY date desc LIMIT 10', [req.query.chipID, req.params.adopter_email], function (err, rows) {
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

  app.get('/api/vet/all_vets', function (req, res) {
    req.getConnection(function (err, connection) {
      const query = connection.query('SELECT Account.email AS email, concat(Account.fname, \' \',Account.lname) AS name FROM Vet JOIN Account ON Account.email = Vet.email', function (err, rows) {
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


  app.post('/api/vet/appointment/add', function (req, res) {
    let input = JSON.parse(JSON.stringify(req.body));
    let newAppointment = {
      vetEmail: input.email,
      date: input.date.split('T')[0]
    };
    req.getConnection(function (err, connection) {
      connection.query("INSERT INTO VetAppointment set ? ", [newAppointment], function (err, sqlRes) {
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
          connection.query("INSERT INTO AttendsVetAppointment set ? ", [newAttends], function (err) {
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


  app.post('/api/vet/schedule/add', function (req, res) {
    let input = JSON.parse(JSON.stringify(req.body));
    let newDate = {
      vetEmail: input.email,
      date: input.date
    };
    req.getConnection(function (err, connection) {
      connection.query("INSERT INTO VetSchedule set ? ", [newDate], function (err) {
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

  app.post('/api/vet/schedule/delete', function (req, res) {
    let input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
      let date = input.date.split('T')[0];
      let  q = connection.query("DELETE FROM VetSchedule WHERE vetEmail=? AND date=? ", [input.email, date], function (err) {
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

  app.post('/api/vet/appointment/delete', function (req, res) {
    let input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
      let date = input.date.split('T')[0];
      let  q = connection.query("DELETE FROM VetAppointment WHERE vetEmail=? AND date=? ", [input.email, date], function (err) {
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

  function vetInputHandler(input) {
    return {
      account: {
        accountVars: accountInputHandler(input),
        accountType: "vet"
      },
      userAccountPhoneNumbers: {
        phoneNumbersInputHandler
      },
      vet: {
        email: input.email
      }
    };
  }

}; // end of module
