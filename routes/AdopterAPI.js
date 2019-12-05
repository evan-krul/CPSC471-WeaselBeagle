const {phoneNumbersInputHandler} = require("../public/helpers/AccountHelpers");
const {accountInputHandler} = require("../public/helpers/AccountHelpers");
module.exports = function (app) {

  app.get('/api/adopter', function (req, res) {
    req.getConnection(function (err, connection) {
      connection.query('SELECT * FROM Account JOIN Adopter ON email = ?', [req.email], function (err, rows) {
        if (err) {
          console.log("Error Selecting : %s ", err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(rows));
      });
    });
  });

  app.post('/api/adopter/add', function (req, res) {
    let input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
      let data = adopterInputHandler(input);
      console.log('save request...', data);
      connection.query("INSERT INTO Account set ?", [data.account], function (err) {
        if (err) {
          console.log("Error inserting : %s ", err);
        }
      });
      connection.query("INSERT INTO Adopter set ?", [data.adopter], function (err) {
        if (err) {
          console.log("Error inserting : %s ", err);
        }
      });
      connection.query("INSERT INTO UserAccountPhoneNumbers set ?", [data.userAccountPhoneNumbers], function (err) {
        if (err) {
          console.log("Error inserting : %s ", err);
        }
      });
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify('success'));
    });

  });

  app.get('/api/adopter/delete/:id', function (req, res) {
    let email = req.params.email;
    req.getConnection(function (err, connection) {
      connection.query("DELETE FROM Account WHERE email = ? ", [email], function (err) {
        if (err) {
          console.log("Error deleting : %s ", err);
        }
        res.redirect('/api/adopter');
      });
    });
  });

  app.get('/api/adopter/edit/:id', function (req, res) {
    let email = req.params.id;
    req.getConnection(function (err, connection) {
      connection.query('SELECT * FROM Account WHERE email = ?', [email], function (err, rows) {
        if (err) {
          console.log("Error Selecting : %s ", err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(rows));
      });
    });
  });

  app.post('/api/adopter/edit/:id', function (req, res) {
    let input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
      let data = adopterInputHandler(input);
      console.log('save request...', data);
      connection.query("INSERT INTO Account set ? ", [data.account], function (err) {
        if (err) {
          console.log("Error inserting : %s ", err);
        }
      });
      connection.query("INSERT INTO Adopter set ?", [data.adopter], function (err) {
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

  function adopterInputHandler(input) {
    return {
      account: {
        accountVars: accountInputHandler(input),
        accountType: "adopter"
      },
      userAccountPhoneNumbers: {
        phoneNumbersInputHandler
      },
      trainer: {
        scheduleID: input.scheduleID,
        email: input.email
      }
    };
  }


};
