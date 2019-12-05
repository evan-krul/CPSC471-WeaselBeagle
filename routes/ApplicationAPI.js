const {phoneNumbersInputHandler} = require("../public/helpers/AccountHelpers");
const {accountInputHandler} = require("../public/helpers/AccountHelpers");
module.exports = function (app) {

  app.get('/api/application', function (req, res) {
    req.getConnection(function (err, connection) {
      connection.query('SELECT * FROM AdoptionApplication ON chipID = ?', [req.chipID], function (err, rows) {
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
      connection.query("INSERT INTO AdoptionApplication set ?", [data.account], function (err) {
        console.log(query.sql);
        if (err) {
          console.log("Error inserting : %s ", err);
        }
      });
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify('success'));
    });

  });

  function adoptionInputHandler(input) {
    return {
      adoptionApplication: {
        email: input.email,
        chipID: input.chipID,
        submissionTimestamp: new Date(),
        adoptionTimestamp: null,
        adoptionStatus: input.adoptionStatus
      }
    };
  }
}
