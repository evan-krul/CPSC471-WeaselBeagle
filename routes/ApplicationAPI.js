const {phoneNumbersInputHandler} = require("../public/helpers/AccountHelpers");
const {accountInputHandler} = require("../public/helpers/AccountHelpers");
module.exports = function (app) {

  app.get('/api/application/:chipID', function (req, res) {
    req.getConnection(function (err, connection) {
      console.log(req.params.chipID);
      let query=connection.query('SELECT * FROM AdoptionApplication WHERE chipID = ?', [req.params.chipID], function (err, rows){
        if (err) {
          console.log("Error Selecting : %s ", err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(rows));
      });
    });
  });

  app.get('/api/application/this/:chipID', function (req, res) {
    req.getConnection(function (err, connection) {
      console.log(req.params.chipID);
      let query=connection.query('SELECT * FROM AdoptionApplication WHERE chipID = ? AND adopterEmail = ?', [req.params.chipID, req.query.email], function (err, rows){
        if (err) {
          console.log("Error Selecting : %s ", err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(rows));
      });
    });
  });

  app.post('/api/application/add', function (req, res) {
    let input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
      let data = adoptionInputHandler(input);
      console.log('save request...', data);
      let query=connection.query("INSERT INTO AdoptionApplication set ?", [data.adoptionApplication], function (err) {
        console.log(query.sql);
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

  function adoptionInputHandler(input) {
    return {
      adoptionApplication: {
        adopterEmail: input.email,
        chipID: input.chipID,
        submissionTimestamp: new Date(),
        adoptionTimestamp: null,
        adoptionStatus: input.adoptionStatus
      }
    };
  }
}
