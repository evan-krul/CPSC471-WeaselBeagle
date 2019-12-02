const request = require('request-promise');
let promises = [];
let animalsData;

module.exports = function (app) {
  app.get('/api/animal/get/shelter/:id', function (req, res) {
    req.getConnection(function (err, connection) {
        const query = connection.query('SELECT * FROM Animal JOIN WaitingPlacement ON WaitingPlacement.chipID=Animal.chipID WHERE shelterid=? ORDER BY WaitingPlacement.surrenderTimestamp DESC', [req.params.id], function (err, rows) {
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



  app.post('/api/animal/add', function (req, res) {
    let data = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
      let animal = {
        shelterID: data.shelterID,
        chipID: data.chipID,
        name: data.name,
        animalType: data.animalType,
        breed: data.breed,
        birthDate: data.birthDate
      };

      var query = connection.query("INSERT INTO Animal set ?", [animal], function (err) {
        if (err) {
          console.log("Error inserting : %s ", err);

          if (err.code === "ER_DUP_ENTRY") {
            res.setHeader('Content-Type', 'application/json');
            let result = {
              message: "Chip ID already exists!"
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
          const animalTraits = [];
          data.traits.forEach(function (item, index) {
            animalTraits.push([
              data.chipID,
              item
            ]);
          });
          connection.query("INSERT INTO AnimalTraits (chipID, trait) VALUES ?", [animalTraits], function (err) {
            if (err) {
              console.log("Error inserting : %s ", err);
              res.setHeader('Content-Type', 'application/json');
              let result = {
                message: "Unknown error."
              };
              res.status(401).send(JSON.stringify(result));
            } else {
              const waitingPlacement = [[data.chipID]];
              connection.query("INSERT INTO WaitingPlacement (chipID) VALUES ?", [waitingPlacement], function (err) {
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

  app.get('/api/animal/get/:id', function (req, res) {
    req.getConnection(function (err, connection) {
      const query = connection.query('SELECT * FROM Animal WHERE chipID=? ', [req.params.id], function (err, rows) {
        if (err) {
          console.log('Get err: %s', err);
          res.setHeader('Content-Type', 'application/json');
          let result = {
            message: "Unknown error."
          };
          res.status(401).send(JSON.stringify(result));
        } else {
          console.log(query.sql);
          let apiURL;
          switch (rows[0].animalType) {
            case 'dog':
              apiURL = 'https://api.TheDogAPI.com/v1/images/search?breed_ids=';
              break;
            case 'cat':
              apiURL = 'https://api.thecatapi.com/v1/images/search?breed_ids=';
              break;
            default:
              apiURL = '';
          }
          request({url: apiURL+rows[0].breed, json: true}).then(function (obj) {
            rows[0].apiData = obj[0];
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(rows[0]));
          });
        }
      });
    });
  });

  app.get('/api/animal/get_traits/:id', function (req, res) {
    req.getConnection(function (err, connection) {
      const query = connection.query('SELECT * FROM AnimalTraits WHERE chipID=? ', [req.params.id], function (err, rows) {
        if (err) {
          console.log('Get err: %s', err);
          res.setHeader('Content-Type', 'application/json');
          let result = {
            message: "Unknown error."
          };
          res.status(401).send(JSON.stringify(result));
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify(rows));
        }
      });
    });
  });
};
