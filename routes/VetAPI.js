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
