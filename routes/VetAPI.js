const {phoneNumbersInputHandler} = require("../public/helpers/AccountHelpers");
const {accountInputHandler} = require("../public/helpers/AccountHelpers");
module.exports = function (app) {

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
      let data = trainerInputHandler(input);
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
        res.redirect('/api/trainer');
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
      let data = trainerInputHandler(input);
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
