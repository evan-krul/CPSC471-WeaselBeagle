module.exports = function (app) {

  app.post('/api/vet/appointments/add-health-record/:animal_id', function (req, res) {
    let input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
      let healthData = {
        chipID: req.params.animal_id,
        type: input.type,
        recordTimestamp: new Date,
        comments: input.comments
      };
      console.log('save request...', input);
      connection.query("INSERT INTO HealthRecord set ?", [healthData], function (err) {
        if (err) {
          console.log("Error inserting : %s ", err);
          let result = {
            message: "Unknown error."
          };
          res.status(401).send(JSON.stringify(result));
        }
        else {
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify('success'));
        }
      });
    });
  })

  app.get('/api/vet/appointments/get-health-record/:animal_id', function (req, res) {
    let input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
      console.log('save request...', input);
      connection.query("SELECT * FROM HealthRecord WHERE HealthRecord.chipID =  ?", [req.params.animal_id], function (err, rows) {
        if (err) {
          console.log("Error getting : %s ", err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(rows));
      });
    });
  })

};
