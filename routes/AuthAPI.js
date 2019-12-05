const {accountInputHandler} = require("../public/helpers/AccountHelpers");

module.exports = function (app) {

  app.post('/api/register/shelter', function (req, res) {
    let data = JSON.parse(JSON.stringify(req.body));
    let shelterData = {
      name: data.name,
      address: data.address
    };
    req.getConnection(function (err, connection) {
      var query = connection.query("INSERT INTO Shelter set ?", [shelterData], function (err, sqlRes) {
        if (err) {
          console.log("Error inserting : %s ", err);
          res.setHeader('Content-Type', 'application/json');
          let result = {
            message: "Unknown error."
          };
          res.status(401).send(JSON.stringify(result));
        } else {
          let phoneNos = [];
          if (data.primaryPhone != null) {
            phoneNos.push([
              sqlRes.insertId,
              data.primaryPhone
            ]);
          }
          if (data.secondaryPhone != null) {
            phoneNos.push([
              sqlRes.insertId,
              data.secondaryPhone
            ]);
          }
          connection.query("INSERT INTO ShelterPhoneNumbers (shelterID, phoneNumber) VALUES ? ", [phoneNos], function (err) {
            if (err) {
              console.log("Error inserting : %s ", err);
              res.setHeader('Content-Type', 'application/json');
              let result = {
                message: "Unknown error."
              };
              res.status(401).send(JSON.stringify(result));
            } else {
              res.setHeader('Content-Type', 'application/json');
              let result = {
                message: "success",
                new_shelter_id: sqlRes.insertId
              };
              res.send(JSON.stringify(result));
            }
          });
        }
      });
    });
  });

  app.post('/api/register', function (req, res) {
    let account_table;
    let data = JSON.parse(JSON.stringify(req.body));
    switch (data.accountType) {
      case "adopter":
        account_table = 'INSERT INTO Adopter set ?';
        break;
      case "trainer":
        account_table = 'INSERT INTO Trainer set ?';
        break;
      case "vet":
        account_table = 'INSERT INTO Vet set ?';
        break;
      case "Shelter_Emp":
        account_table = 'INSERT INTO ShelterEmployee set ?';
        break;
      default:
        account_table = "";
    }

    req.getConnection(function (err, connection) {
      let account = accountInputHandler(data).account;
      console.log('save request...', data);
      var query = connection.query("INSERT INTO Account set ?", [account], function (err) {
        if (err) {
          console.log("Error inserting : %s ", err);

          if (err.code === "ER_DUP_ENTRY") {
            res.setHeader('Content-Type', 'application/json');
            let result = {
              message: "Account already exists fot this email!"
            };
            res.status(401).send(JSON.stringify(result));
          } else {
            res.setHeader('Content-Type', 'application/json');
            let result = {
              message: "Unknown error."
            };
            res.status(401).send(JSON.stringify(result));
          }
        } else {
          let accountData;

          if (data.accountType === 'Shelter_Emp') {
            accountData = {
              email: data.email,
              shelterID: data.shelterID
            };
          } else {
            accountData = {
              email: data.email
            };
          }

          connection.query(account_table, [accountData], function (err) {
            if (err) {
              console.log("Error inserting : %s ", err);
              res.setHeader('Content-Type', 'application/json');
              let result = {
                message: "Unknown error."
              };
              res.status(401).send(JSON.stringify(result));
            } else {
              let phoneNos = [];
              if (data.primaryPhone != null) {
                phoneNos.push([
                  data.email,
                  data.primaryPhone
                ]);
              }
              if (data.secondaryPhone != null) {
                phoneNos.push([
                  data.email,
                  data.secondaryPhone
                ]);
              }
              connection.query("INSERT INTO UserAccountPhoneNumbers (email, phoneNumber) VALUES ? ", [phoneNos], function (err) {
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
        }
      });
    });
  });

  app.post('/api/login', function (req, res) {
    let loginData = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
      var query = connection.query('SELECT * FROM Account WHERE email = ? AND password = ?', [loginData.email, loginData.password], function (err, rows) {
        if (err) {
          console.log("Error Selecting : %s ", err);
          res.setHeader('Content-Type', 'application/json');
          let result = {
            message: "Unknown error."
          };
          res.status(401).send(JSON.stringify(result));
        }
        if (rows.length === 1) {
          let accountObject = rows[0];
          let accountSql;
          switch (accountObject.accountType) {
            case "adopter":
              accountSql = "SELECT * FROM Adopter WHERE email = ?";
              break;
            case "trainer":
              accountSql = "SELECT * FROM Trainer WHERE email = ?";
              break;
            case "vet":
              accountSql = "SELECT * FROM Vet WHERE email = ?";
              break;
            case "Shelter_Emp":
              accountSql = "SELECT * FROM ShelterEmployee WHERE email = ?";
              break;
            default:
              accountSql = "";
          }
          var query = connection.query(accountSql, [loginData.email], function (err, rows) {
            if (err) {
              console.log("Error Selecting : %s ", err);
              res.setHeader('Content-Type', 'application/json');
              let result = {
                message: "Unknown error."
              };
              res.status(401).send(JSON.stringify(result));
            } else {
              res.setHeader('Content-Type', 'application/json');
              let responseData = {
                account: accountObject,
                accountData: rows[0]
              };
              res.send(JSON.stringify(responseData));
              //SEND
            }
          });
        } else {
          res.setHeader('Content-Type', 'application/json');
          let result = {
            message: "Username or password incorrect."
          };
          res.status(401).send(JSON.stringify(result));
        }
      });
    });
  });

}; // end of module
